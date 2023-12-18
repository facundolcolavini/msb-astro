import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify/functions";

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  integrations: [tailwind(), preact()],
  output: 'hybrid',
  adapter: netlify()
});