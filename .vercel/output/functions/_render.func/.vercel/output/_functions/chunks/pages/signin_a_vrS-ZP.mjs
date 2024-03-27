import { l as lucia } from './github_CyTh-i1q.mjs';
import { d as db, U as User } from './_id__AlMK-SgZ.mjs';
import { Argon2id } from 'oslo/password';
import { eq } from '@astrojs/db/dist/runtime/config.js';

async function POST(context) {
  console.log(context.locals.session);
  const formData = await context.request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  if (typeof username !== "string") {
    return new Response("Invalid username", {
      status: 400
    });
  }
  if (typeof password !== "string") {
    return new Response("Invalid password", {
      status: 400
    });
  }
  const foundUser = (await db.select().from(User).where(eq(User.username, username))).at(0);
  if (!foundUser) {
    return new Response("Incorrect username or password", {
      status: 400
    });
  }
  if (!foundUser.password) {
    return new Response("Invalid password", {
      status: 400
    });
  }
  const validPassword = await new Argon2id().verify(foundUser.password, password);
  if (!validPassword) {
    return new Response("Incorrect username or password", {
      status: 400
    });
  }
  const session = await lucia.createSession(foundUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  console.log(sessionCookie);
  context.cookies.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return context.redirect("/");
}

export { POST };
