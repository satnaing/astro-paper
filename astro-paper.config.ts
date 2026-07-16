import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://justinhchow.com",
    title: "Justin H. Chow",
    description: "Personal essays, thoughts, and career portfolio.",
    author: "Justin H. Chow",
    profile: "https://justinhchow.com",
    ogImage: "default-og.jpg",
    lang: "en",
    timezone: "America/Denver",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "github",   url: "https://github.com/justin-h-chow" },
    { name: "linkedin", url: "https://www.linkedin.com/in/justinchow/" },
    { name: "instagram", url: "https://instagram.com/justinhchow" },
    { name: "mail",     url: "mailto:hello@justinhchow.com" },
  ],
  shareLinks: [
  ],
});
