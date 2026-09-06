import type { AstroIntegration } from "astro";
import { draftToggleState } from "./state";

const APP_ID = "draft-toggle";
const TOGGLE_EVENT = "draft-toggle:toggle";
const STATE_EVENT = "draft-toggle:state";

export default function draftToggle(): AstroIntegration {
  return {
    name: APP_ID,
    hooks: {
      "astro:config:setup": ({ addDevToolbarApp }) => {
        addDevToolbarApp({
          id: APP_ID,
          name: "Show drafts",
          icon: "📝",
          entrypoint: new URL("./toolbar-app.ts", import.meta.url),
        });
      },
      "astro:server:setup": ({ server, toolbar, logger }) => {
        // Broadcast state to every connected tab, so all toolbar UIs agree.
        const broadcastState = () =>
          toolbar.send(STATE_EVENT, {
            showDrafts: draftToggleState.showDrafts,
          });

        // client -> server: toggle request
        toolbar.on(TOGGLE_EVENT, () => {
          draftToggleState.showDrafts = !draftToggleState.showDrafts;
          logger.info(`showDrafts -> ${draftToggleState.showDrafts}`);
          broadcastState();

          // Reload every connected page so postFilter re-reads draftToggleState.
          server.hot.send({ type: "full-reload" });
        });

        // send current state to a toolbar app the moment it initializes
        // (e.g. a tab opened after the flag was already toggled)
        toolbar.onAppInitialized(APP_ID, broadcastState);
      },
    },
  };
}
