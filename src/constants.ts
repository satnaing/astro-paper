import type { Props } from "astro";
import type { GiscusProps } from "@giscus/react";

import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconRss from "@/assets/icons/IconRss.svg";
// import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
// import IconFacebook from "@/assets/icons/IconFacebook.svg";
// import IconTelegram from "@/assets/icons/IconTelegram.svg";
// import IconPinterest from "@/assets/icons/IconPinterest.svg";
// import { SITE } from "@/config";

export const GISCUS: GiscusProps = {
  repo: "doit1024/doit-blog",
  repoId: "R_kgDOPnMZsQ",
  category: "Announcements",
  categoryId: "DIC_kwDOPnMZsc4Cu1PP",
  mapping: "pathname",
  strict: "0",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "top",
  // theme: "preferred_color_scheme",
  lang: "zh-CN",
  loading: "lazy",
};

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/doit1024",
    linkTitle: '访问Doit的GitHub主页',
    icon: IconGitHub,
  },
  // {
  //   name: "X",
  //   href: "https://x.com/username",
  //   linkTitle: `${SITE.title} on X`,
  //   icon: IconBrandX,
  // },
  // {
  //   name: "LinkedIn",
  //   href: "https://www.linkedin.com/in/username/",
  //   linkTitle: `${SITE.title} on LinkedIn`,
  //   icon: IconLinkedin,
  // },
  {
    name: "Mail",
    href: "mailto:doit10241024@gmail.com",
    linkTitle: '给Doit发送邮件',
    icon: IconMail,
  },
  {
    name: 'Rss',
    href: "/rss.xml",
    linkTitle: '订阅Doit的博客',
    icon: IconRss,
  }
] as const;

export const SHARE_LINKS: Social[] = [
  // {
  //   name: "WhatsApp",
  //   href: "https://wa.me/?text=",
  //   linkTitle: `Share this post via WhatsApp`,
  //   icon: IconWhatsapp,
  // },
  // {
  //   name: "Facebook",
  //   href: "https://www.facebook.com/sharer.php?u=",
  //   linkTitle: `Share this post on Facebook`,
  //   icon: IconFacebook,
  // },
  // {
  //   name: "X",
  //   href: "https://x.com/intent/post?url=",
  //   linkTitle: `Share this post on X`,
  //   icon: IconBrandX,
  // },
  // {
  //   name: "Telegram",
  //   href: "https://t.me/share/url?url=",
  //   linkTitle: `Share this post via Telegram`,
  //   icon: IconTelegram,
  // },
  // {
  //   name: "Pinterest",
  //   href: "https://pinterest.com/pin/create/button/?url=",
  //   linkTitle: `Share this post on Pinterest`,
  //   icon: IconPinterest,
  // },
  // {
  //   name: "Mail",
  //   href: "mailto:?subject=See%20this%20post&body=",
  //   linkTitle: `Share this post via email`,
  //   icon: IconMail,
  // },
] as const;
