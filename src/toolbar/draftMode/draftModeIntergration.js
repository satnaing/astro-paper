import { draftModeServer } from "./draftModeServer";

export default {
  name: "Draft-Mode",
  hooks: {
    "astro:config:setup": ({ addDevToolbarApp }) => {
      addDevToolbarApp("./src/toolbar/draftMode/draftModeClient.js");
    },
    "astro:server:setup": ({ server }) => {
      draftModeServer(server);
    },
  },
};
