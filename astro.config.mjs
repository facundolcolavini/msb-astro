import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'hybrid',
  adapter: netlify({
    edgeMiddleware: true
  }),
    vite: {
      
      optimizeDeps: {
        /* crypto */
        include: ["bcrypt", "mock-aws-s3", "aws-sdk", "nock"	]
      }
    }
});