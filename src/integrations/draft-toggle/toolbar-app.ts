import type { DevToolbarApp } from "astro";

const TOGGLE_EVENT = "draft-toggle:toggle";
const STATE_EVENT = "draft-toggle:state";

export default {
  init(_canvas, app, server) {
    // The icon click is the toggle; no panel is rendered. DevToolbarCanvas
    // has no positioned ancestor (`position: absolute; top: 0; left: 0`), so
    // a panel here would render pinned to the page's top-left, not the toolbar.
    app.onToggled(() => server.send(TOGGLE_EVENT, undefined));

    // Badge dot on the icon reflects current server state.
    server.on(STATE_EVENT, (data: { showDrafts: boolean }) => {
      app.toggleNotification(
        data.showDrafts ? { state: true, level: "info" } : { state: false }
      );
    });
  },
} satisfies DevToolbarApp;
