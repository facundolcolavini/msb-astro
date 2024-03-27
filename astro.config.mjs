import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  output: "server",


  adapter: vercel(), 
  integrations: [db(), tailwind(), icon(), preact(),
    {
      name: "middleware",
      middleware:  async (context, next) => {
        if (context.request.method !== "GET") {
          const originHeader = context.request.headers.get("Origin");
          const hostHeader = context.request.headers.get("Host");
          if (
            !originHeader ||
            !hostHeader ||
            !verifyRequestOrigin(originHeader, [hostHeader])
          ) {
            return new Response(null, {
              status: 403,
            });
          }
        }
      
        const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
        if (!sessionId) {
          context.locals.user = null;
          context.locals.session = null;
          return next();
        }
      
        const { session, user } = await lucia.validateSession(sessionId);
        if (session && session.fresh) {
          const sessionCookie = lucia.createSessionCookie(session.id);
          context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          );
        }
        if (!session) {
          const sessionCookie = lucia.createBlankSessionCookie();
          context.cookies.set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes
          );
        }
        context.locals.session = session;
        context.locals.user = user;
        return next();
      }
    }
    
],
  vite: {
    optimizeDeps: {
      exclude: ["oslo"]
    }
  },

});