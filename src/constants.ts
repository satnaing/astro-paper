import type { Props } from "astro";
import IconMail from "@/assets/icons/IconMail.svg";        // 邮件图标
import IconGitHub from "@/assets/icons/IconGitHub.svg";    // GitHub图标
import IconBrandX from "@/assets/icons/IconBrandX.svg";    // X(Twitter)图标
// import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";  // WhatsApp图标
// import IconFacebook from "@/assets/icons/IconFacebook.svg";  // Facebook图标
import IconTelegram from "@/assets/icons/IconTelegram.svg"; // Telegram图标
// import IconPinterest from "@/assets/icons/IconPinterest.svg"; // Pinterest图标
import IconDouyin from "@/assets/icons/IconDouyin.svg";     // 抖音图标
import IconMastodon from "@/assets/icons/IconMastodon.svg"; // Mastodon图标
import { SITE } from "@/config";

interface Social {
  name: string;                        // 社交媒体平台名称
  href: string;                        // 链接地址
  linkTitle: string;                   // 链接标题（用于无障碍访问）
  icon: (_props: Props) => Element;    // 图标组件
}

// 社交媒体链接配置 - 用于页脚和关于页面的社交媒体链接
export const SOCIALS: Social[] = [
  {
    name: "Github",                                      // 平台名称
    href: "https://github.com/achuanya/lhasa",          // GitHub仓库地址
    linkTitle: `${SITE.title} on Github`,               // 链接标题
    icon: IconGitHub,                                   // GitHub图标
  },
  {
    name: "Douyin",                                     // 抖音平台
    href: "https://www.douyin.com/user/MS4wLjABAAAAKa6NwPUcIhC4qAwdvPjfGSyyENvEk1rGPBJVRQIQmCo", // 抖音用户页面
    linkTitle: `${SITE.title} on Douyin`,              // 链接标题
    icon: IconDouyin,                                  // 抖音图标
  },
  {
    name: "Mastodon",                                  // Mastodon社交网络
    href: "https://mastodon.social/@lhasarider",       // Mastodon用户页面
    linkTitle: `${SITE.title} on Mastodon`,           // 链接标题
    icon: IconMastodon,                               // Mastodon图标
  },
  {
    name: "Telegram",                                 // Telegram即时通讯
    href: "https://t.me/lhasa88",                    // Telegram用户页面
    linkTitle: `Share this post via Telegram`,       // 链接标题
    icon: IconTelegram,                              // Telegram图标
  },
  {
    name: "Mail",                                    // 电子邮件
    href: "mailto:haibao1027@gmail.com",            // 邮件地址
    linkTitle: `Send an email to ${SITE.title}`,    // 链接标题
    icon: IconMail,                                 // 邮件图标
  },
] as const;

// 分享链接配置 - 用于文章分享按钮的社交媒体平台
export const SHARE_LINKS: Social[] = [
  // {
  //   name: "WhatsApp",                                  // WhatsApp即时通讯
  //   href: "https://wa.me/?text=",                     // WhatsApp分享链接
  //   linkTitle: `Share this post via WhatsApp`,        // 链接标题
  //   icon: IconWhatsapp,                               // WhatsApp图标
  // },
  // {
  //   name: "Facebook",                                 // Facebook社交网络
  //   href: "https://www.facebook.com/sharer.php?u=",  // Facebook分享链接
  //   linkTitle: `Share this post on Facebook`,         // 链接标题
  //   icon: IconFacebook,                               // Facebook图标
  // },
  {
    name: "X",                                         // X(原Twitter)社交平台
    href: "https://x.com/intent/post?url=",           // X分享链接
    linkTitle: `Share this post on X`,                // 链接标题
    icon: IconBrandX,                                 // X图标
  },
  {
    name: "Telegram",                                 // Telegram即时通讯
    href: "https://t.me/share/url?url=",             // Telegram分享链接
    linkTitle: `Share this post via Telegram`,       // 链接标题
    icon: IconTelegram,                              // Telegram图标
  },
  {
    name: "Mastodon",                                // Mastodon去中心化社交网络
    href: "https://mastodon.social/share?text=",     // Mastodon分享链接
    linkTitle: `Share this post on Mastodon`,       // 链接标题
    icon: IconMastodon,                             // Mastodon图标
  },
  // {
  //   name: "Pinterest",                                      // Pinterest图片社交
  //   href: "https://pinterest.com/pin/create/button/?url=",  // Pinterest分享链接
  //   linkTitle: `Share this post on Pinterest`,             // 链接标题
  //   icon: IconPinterest,                                   // Pinterest图标
  // },
  // {
  //   name: "Mail",                                          // 电子邮件分享
  //   href: "mailto:?subject=See%20this%20post&body=",       // 邮件分享链接
  //   linkTitle: `Share this post via email`,               // 链接标题
  //   icon: IconMail,                                        // 邮件图标
  // },
] as const;
