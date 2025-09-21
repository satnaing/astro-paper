export const SITE = {
  website: "https://blog.doooit.me/", // replace this with your deployed domain
  author: "Doit",
  profile: "https://blog.doooit.me/about",
  desc: "Doit杜伊特的个人博客，分享自己生活日常和技术探索，记录所思、所见、所想。",
  title: "Doit的博客",
  ogImage: "doit-og.png",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  // scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  scheduledPostMargin: 0, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: false,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
