import IconMail from "@/assets/icons/IconMail.svg";
import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconBrandX from "@/assets/icons/IconBrandX.svg";
// import IconWhatsapp from "@/assets/icons/IconWhatsapp.svg";
// import IconFacebook from "@/assets/icons/IconFacebook.svg";
import IconTelegram from "@/assets/icons/IconTelegram.svg";
// import IconPinterest from "@/assets/icons/IconPinterest.svg";
import IconDouyin from "@/assets/icons/IconDouyin.svg";
import IconMastodon from "@/assets/icons/IconMastodon.svg";
import { SITE } from "@/config";

export const SOCIALS = [
  {
    name: "Github",
    href: "https://github.com/achuanya/lhasa",
    linkTitle: ` ${SITE.title} on Github`,
    icon: IconGitHub,
  },
  {
    name: "Douyin",
    href: "https://www.douyin.com/user/MS4wLjABAAAAKa6NwPUcIhC4qAwdvPjfGSyyENvEk1rGPBJVRQIQmCo",
    linkTitle: `${SITE.title} on Douyin`,
    icon: IconDouyin,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@lhasarider",
    linkTitle: `${SITE.title} on Mastodon`,
    icon: IconMastodon,
  },
  {
    name: "Telegram",
    href: "https://t.me/lhasa88",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Mail",
    href: "mailto:haibao1027@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS = [
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
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    icon: IconBrandX,
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    icon: IconTelegram,
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/share?text=",
    linkTitle: `Share this post on Mastodon`,
    icon: IconMastodon,
  },
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
