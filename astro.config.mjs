import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://astro-paper.pages.dev/",
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
  ],
});
