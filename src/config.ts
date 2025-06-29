export const SITE = {
  website: "https://lhasa.icu/",
  author: "游钓四方",
  profile: "https://lhasa.icu/",
  desc: "千禧年小孩、长途骑行小学生、野钓路亚、振出并继、古典乐、野生程序员、独立开发者",
  title: "lhasa's Blog",
  ogImage: "https://cos.lhasa.icu/StylePictures/my-photo.jpg",
  notFoundImage: "https://cos.lhasa.icu/StylePictures/404.gif",
  notFoundStaticImage: "https://cos.lhasa.icu/StylePictures/404.webp",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/achuanya/lhasa/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh-CN",
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
