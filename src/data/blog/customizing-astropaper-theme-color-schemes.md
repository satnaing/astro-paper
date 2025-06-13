---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
modDatetime: 2025-06-13T16:46:34.155Z
title: Customizing AstroPaper theme color schemes
featured: false
draft: false
tags:
  - color-schemes
  - docs
description:
  How you can enable/disable light & dark mode; and customize color schemes
  of AstroPaper theme.
---

This post will explain how you can enable/disable light & dark mode for the website. Moreover, you'll learn how you can customize color schemes of the entire website.

## Table of contents

## Enable/disable light & dark mode

AstroPaper theme will include light and dark mode by default. In other words, there will be two color schemes\_ one for light mode and another for dark mode. This default behavior can be disabled in `SITE` configuration object.

```js file="src/config.ts"
export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // [!code highlight]
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
```

To disable `light & dark mode` set `SITE.lightAndDarkMode` to `false`.

## Choose primary color scheme

By default, if we disable `SITE.lightAndDarkMode`, we will only get system's prefers-color-scheme.

Thus, to choose primary color scheme instead of prefers-color-scheme, we have to set color scheme in the `primaryColorScheme` variable inside `toggle-theme.js`.

```js file="public/toggle-theme.js"
const primaryColorScheme = ""; // "light" | "dark" // [!code hl]

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// ...
```

The **primaryColorScheme** variable can hold two values\_ `"light"`, `"dark"`. You can leave the empty string (default) if you don't want to specify the primary color scheme.

- `""` - system's prefers-color-scheme. (default)
- `"light"` - use light mode as primary color scheme.
- `"dark"` - use dark mode as primary color scheme.

<details>
<summary>Why primaryColorScheme' is not inside config.ts?</summary>
To avoid color flickering on page reload, we have to place the toggle-switch JavaScript codes as early as possible when the page loads. It solves the problem of flickering, but as a trade-off, we cannot use ESM imports anymore.
</details>

## Customize color schemes

Both light & dark color schemes of AstroPaper theme can be customized in the `global.css` file.

```css file="src/styles/global.css"
@import "tailwindcss";
@import "./typography.css";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
/* ... */
```

In the AstroPaper theme, the `:root` and `html[data-theme="light"]` selectors define the light color scheme, while `html[data-theme="dark"]` defines the dark color scheme.

To customize your own color scheme, specify your light colors inside `:root, html[data-theme="light"]`, and your dark colors inside `html[data-theme="dark"]`.

Here is the detail explanation of color properties.

| Color Property | Definition & Usage                                         |
| -------------- | ---------------------------------------------------------- |
| `--background` | Primary color of the website. Usually the main background. |
| `--foreground` | Secondary color of the website. Usually the text color.    |
| `--accent`     | Accent color of the website. Link color, hover color etc.  |
| `--muted`      | Card and scrollbar background color for hover state etc.   |
| `--border`     | Border color. Especially used in horizontal row (hr)       |

Here is an example of changing the light color scheme.

```css file="src/styles/global.css"
/* ... */
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
/* ... */
```

> Check out some [predefined color schemes](https://astro-paper.pages.dev/posts/predefined-color-schemes/) AstroPaper has already crafted for you.
