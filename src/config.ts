import type { ThemeConfig } from "./types";

export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Edit page",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;

// ============================================
// THEME CONFIGURATION
// ============================================
// Themes use shadcn/ui CSS variable convention with oklch() colors
// Add more themes from https://tweakcn.com as needed

export const THEMES: Record<string, ThemeConfig> = {
  caffeine: {
    name: "Caffeine",
    light: {
      background: "oklch(0.9821 0 0)",
      foreground: "oklch(0.2435 0 0)",
      card: "oklch(0.9911 0 0)",
      "card-foreground": "oklch(0.2435 0 0)",
      popover: "oklch(0.9911 0 0)",
      "popover-foreground": "oklch(0.2435 0 0)",
      primary: "oklch(0.4341 0.0392 41.9938)",
      "primary-foreground": "oklch(1.0000 0 0)",
      secondary: "oklch(0.9200 0.0651 74.3695)",
      "secondary-foreground": "oklch(0.3499 0.0685 40.8288)",
      muted: "oklch(0.9521 0 0)",
      "muted-foreground": "oklch(0.5032 0 0)",
      accent: "oklch(0.9310 0 0)",
      "accent-foreground": "oklch(0.2435 0 0)",
      destructive: "oklch(0.6271 0.1936 33.3390)",
      "destructive-foreground": "oklch(1.0000 0 0)",
      border: "oklch(0.8822 0 0)",
      input: "oklch(0.8822 0 0)",
      ring: "oklch(0.4341 0.0392 41.9938)",
    },
    dark: {
      background: "oklch(0.1776 0 0)",
      foreground: "oklch(0.9491 0 0)",
      card: "oklch(0.2134 0 0)",
      "card-foreground": "oklch(0.9491 0 0)",
      popover: "oklch(0.2134 0 0)",
      "popover-foreground": "oklch(0.9491 0 0)",
      primary: "oklch(0.9247 0.0524 66.1732)",
      "primary-foreground": "oklch(0.2029 0.0240 200.1962)",
      secondary: "oklch(0.3163 0.0190 63.6992)",
      "secondary-foreground": "oklch(0.9247 0.0524 66.1732)",
      muted: "oklch(0.2520 0 0)",
      "muted-foreground": "oklch(0.7699 0 0)",
      accent: "oklch(0.2850 0 0)",
      "accent-foreground": "oklch(0.9491 0 0)",
      destructive: "oklch(0.6271 0.1936 33.3390)",
      "destructive-foreground": "oklch(1.0000 0 0)",
      border: "oklch(0.2351 0.0115 91.7467)",
      input: "oklch(0.4017 0 0)",
      ring: "oklch(0.9247 0.0524 66.1732)",
    },
  },
};

/** Active theme - change this value to switch themes */
export const ACTIVE_THEME: keyof typeof THEMES = "caffeine";
