export const SITE = {
  website: "https://lhasa.icu/",
  author: "游钓四方",
  profile: "https://lhasa.icu/",
  desc: "千禧年小孩、长途骑行小学生、野钓路亚、振出并继、古典乐、茶叶爱好者",
  title: "lhasa's Blog",
  ogImage: "https://cos.lhasa.icu/StylePictures/my-photo.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000,
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/achuanya/lhasa/edit/main/",
  },
  dynamicOgImage: true,
  lang: "zh-CN",
  timezone: "Asia/Shanghai", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
