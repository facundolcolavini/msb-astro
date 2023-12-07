import netlify from "@astrojs/netlify/functions";
import preact from "@astrojs/preact";
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), preact()],
    output: 'server',
    adapter: netlify(),
});