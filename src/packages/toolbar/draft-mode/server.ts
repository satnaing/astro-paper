import type { ViteDevServer } from "vite";

export function draftModeServer(server: ViteDevServer) {
  let block = true;
  if (process.env.DRAFT_MODE === undefined) {
    console.debug("DRAFT_MODE env not set, defaulting to false");
    process.env.DRAFT_MODE = String(false);
  }
  server.ws.on("astro-dev-toolbar:draft-mode:toggled", data => {
    if (!block) {
      console.debug(
        `Draft Mode has been toggled to ${data.state ? "enabled" : "disabled"}!`
      );
      process.env.DRAFT_MODE = data.state;
    } else {
      console.debug("still initialising, action blocked");
    }
  });
  server.ws.on("astro-dev-toolbar:draft-mode:initialized", () => {
    console.debug(
      "Draft Mode has been initialised, removing blocks and sending sync"
    );
    block = false;
    server.ws.send("draftMode:sync", process.env.DRAFT_MODE);
  });
  server.ws.on("connection", () => {
    console.debug(
      "Client has connected, initialisation will begin, blocking updates until complete."
    );
    block = true;
  });
}
