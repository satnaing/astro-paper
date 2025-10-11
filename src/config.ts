export const SITE = {
  website: "https://pporeddy.com", // your domain
  author: "Prithvi Poreddy",
  profile: "https://www.linkedin.com/in/pporeddy/", // optional
  desc: "Writing about Identity security, Cyber Security, AI Governace & Security and Personal Finace.",
  title: "Prithvi Poreddy",
  ogImage: "astropaper-og.jpg", // leave default
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false, // true if you want "Edit this post on GitHub" links
    url: "https://github.com/prithvikrishnab4u/pporeddy-site/blob/main/src/content/post/",
    text: "Edit this post",
  },
  scheduledPostMargin: 0, 
  dir: "ltr",
  lang: "en",
  timezone: "America/Los_Angeles", // optional but correct for you
  dynamicOgImage: true,
} as const;
