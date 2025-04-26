export const SITE = {
  website: "https://www.tanctalk.com/", // replace this with your deployed domain
  author: "tanc",
  profile: "https://www.tanctalk.com",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "TancTalk",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai",
} as const;
