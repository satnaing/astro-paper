import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://astro-paper.netlify.app/",
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
});
