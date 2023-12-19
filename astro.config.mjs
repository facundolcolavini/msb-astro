import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  prefetch: {
    // Example:
   routes: ['/', '/emprendimientos', '/barrios-cerrados-countries']
  

  },
  integrations: [tailwind(), preact()],
  output: 'hybrid',
  adapter: netlify()
});