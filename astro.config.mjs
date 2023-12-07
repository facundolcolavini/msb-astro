import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify"; 

export default defineConfig({
  integrations: [tailwind(), preact()],
  output: 'server',
  adapter: netlify(),
  
});