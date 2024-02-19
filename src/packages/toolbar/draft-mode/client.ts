import type { DevOverlayPlugin } from "astro";

export default {
  id: "draft-mode",
  name: `Toggle Draft Mode ${
    localStorage.getItem("DRAFT_MODE") === "true" ? "Off" : "On"
  }`,
  icon:
    localStorage.getItem("DRAFT_MODE") === "true"
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" /><path d="M13.5 6.5l4 4" /></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-pencil-off" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10l-6 6v4h4l6 -6m1.99 -1.99l2.504 -2.504a2.828 2.828 0 1 0 -4 -4l-2.5 2.5" /><path d="M13.5 6.5l4 4" /><path d="M3 3l18 18" /></svg>`,
  init(canvas, eventTarget) {
    console.debug("Initrialising: setting block to TRUE");
    let block = true;

    eventTarget.addEventListener("app-toggled", event => {
      if (!block) {
        console.debug(
          `Draft Mode has been toggled to  ${
            (event as CustomEvent).detail.state ? "enabled" : "disabled"
          } mode.`
        );
        localStorage.setItem("DRAFT_MODE", (event as CustomEvent).detail.state);
        location.reload();
      } else {
        console.debug(
          "App-Toggled Event blocked until initialiation is completed."
        );
      }
    });
    import.meta.hot?.on("draftMode:sync", data => {
      const bool = data === "true";
      if (localStorage.getItem("DRAFT_MODE") !== data) {
        console.log(
          "Mismatch between server mode and client mode, syncing with the Server. The window will reload."
        );
        localStorage.setItem("DRAFT_MODE", String(bool));
        location.reload();
      }
      console.debug("draftMode:sync event triggered, setting state to :", bool);
      eventTarget.dispatchEvent(
        new CustomEvent("toggle-app", { detail: { state: bool } })
      );

      console.debug("unblocking the state and reload as init has completed");
      block = false;
    });
  },
} satisfies DevOverlayPlugin;
