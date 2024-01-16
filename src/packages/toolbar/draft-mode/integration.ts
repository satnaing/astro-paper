import { draftModeServer } from "./server";
import type { ViteDevServer } from "vite";
import path from "path";
import url from "url";

export default (): import("astro").AstroIntegration => ({
  name: "Draft-Mode",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      const importPath = path.dirname(url.fileURLToPath(import.meta.url));
      const pluginPath = path.join(importPath, "client.ts");
      addDevToolbarApp(pluginPath);
    },
    "astro:server:setup": ({ server }) => {
      draftModeServer(server as unknown as ViteDevServer);
    },
  },
});
