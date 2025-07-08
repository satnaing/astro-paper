export const SITE = {
  // 网站基础信息
  website: "https://lhasa.icu/",              // 网站完整URL
  author: "游钓四方",                          // 作者名称
  profile: "https://lhasa.icu/",              // 作者个人资料页面URL
  desc: "千禧年小孩、长途骑行小学生、野钓路亚、振出并继、古典乐爱好者、野生程序员、独立开发者", // 网站描述
  title: "lhasa's Blog",                      // 网站标题
  
  // 图片资源配置
  ogImage: "https://cos.lhasa.icu/StylePictures/my-photo.jpg",          // 社交媒体分享图片
  notFoundImage: "https://cos.lhasa.icu/StylePictures/404.gif",         // 404页面动态图片
  notFoundStaticImage: "https://cos.lhasa.icu/StylePictures/404.webp",  // 404页面静态图片
  logo: "https://lhasa.icu/apple-touch-icon.png", // 网站logo图片链接
  
  // 功能开关配置
  lightAndDarkMode: true,    // 启用浅色/深色主题切换
  showArchives: true,        // 显示归档页面
  showBackButton: true,      // 显示返回按钮
  dynamicOgImage: false,      // 启用动态生成社交媒体图片
  
  // 分页配置
  postPerIndex: 5,          // 首页显示的文章数量
  postPerPage: 5,           // 每页显示的文章数量
  
  // 定时发布配置
  scheduledPostMargin: 15 * 60 * 1000,  // 定时发布边距时间（15分钟，单位：毫秒）
  
  // 编辑功能配置
  editPost: {
    enabled: false,         // 是否启用编辑功能
    text: "Edit page",      // 编辑按钮文本
    url: "https://github.com/achuanya/lhasa/edit/main/",  // 编辑页面URL前缀
  },
  
  // 本地化配置
  dir: "ltr",              // 文本方向: "ltr"（左到右）| "rtl"（右到左）| "auto"（自动）
  lang: "zh-CN",           // 网站语言代码
  timezone: "Asia/Shanghai", // 默认全局时区（IANA格式）
                            // 时区列表参考: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;