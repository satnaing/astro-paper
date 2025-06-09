---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
modDatetime: 2025-06-09T07:42:54.791Z
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

AstroPaper theme will include light and dark mode by default. In other words, there will be two color schemes\_ one for light mode and another for dark mode. This default behavior can be disabled in SITE configuration object of the `src/config.ts` file.

```js
// file: src/config.ts
export const SITE = {
  website: "https://astro-paper.pages.dev/",
  author: "Sat Naing",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // true by default
  postPerPage: 3,
};
```

To disable `light & dark mode` set `SITE.lightAndDarkMode` to `false`.

## Choose primary color scheme

By default, if we disable `SITE.lightAndDarkMode`, we will only get system's prefers-color-scheme.

Thus, to choose primary color scheme instead of prefers-color-scheme, we have to set color scheme in the primaryColorScheme variable inside `public/toggle-theme.js`.

```js
/* file: public/toggle-theme.js */
const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// other codes etc...
```

The **primaryColorScheme** variable can hold two values\_ `"light"`, `"dark"`. You can leave the empty string (default) if you don't want to specify the primary color scheme.

- `""` - system's prefers-color-scheme. (default)
- `"light"` - use light mode as primary color scheme.
- `"dark"` - use dark mode as primary color scheme.

<details><summary>Why 'primaryColorScheme' is not inside config.ts?</summary>

> To avoid color flickering on page reload, we have to place the toggle-switch JavaScript codes as early as possible when the page loads. It solves the problem of flickering, but as a trade-off, we cannot use ESM imports anymore.

[Click here](https://docs.astro.build/en/reference/directives-reference/#isinline) to know more about Astro's `is:inline` script.

</details>

## Customize color schemes

Both light & dark color schemes of AstroPaper theme can be customized. You can do this in `src/styles/global.css` file.

```css
/* file: src/styles/global.css */
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
/* other styles */
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

```css
/* other styles */
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
/* other styles */
```

> Check out some [predefined color schemes](https://astro-paper.pages.dev/posts/predefined-color-schemes/) AstroPaper has already crafted for you.
