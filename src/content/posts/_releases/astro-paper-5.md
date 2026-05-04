---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: true
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5: keep the clean look, updates under the hood."
---

At last, the long-awaited AstroPaper v5 is finally here. AstroPaper v5 keeps the same minimal & clean look, but comes with significant updates under the hood.

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## Table of contents

## Major Changes

### Upgrade to Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper now comes with Astro v5, bringing all the new features and improvements that come with it.

### Tailwind v4

AstroPaper has been upgraded to Tailwind v4, which includes many style changes under the hood. The `tailwind.config.js` file has been removed, and now all the configuration is located within the `src/styles/global.css` file. Typography-related styles have been extracted and moved to `src/styles/typography.css`.

Due to the new behavior in TailwindCSS v4, styles inside `<style>` blocks within components have been removed and replaced with inline Tailwind classes.

Additionally, the color palette across the UI has been updated. The new palette now consists of only five colors:

```css
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
```

### Remove React + Fuse.js in favor of Pagefind search

In previous versions, React.js and Fuse.js were used for search functionality and OG image generation. In AstroPaper v5, React.js has been removed and replaced with [Pagefind](https://pagefind.app/), a static site search tool.

The search experience is almost identical to previous versions, but now all contents, not just titles and descriptions, are indexed and searchable, thanks to Pagefind.

The idea of using Pagefind in dev mode was inspired by [this blog post](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/).

### Updated import alias

The import alias has been updated from `@directory` to `@/directory`, which means you now have to import like this:

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### Move to `pnpm`

AstroPaper has switched from `npm` to `pnpm`, which offers faster and more efficient package management.

### Replace icons/svg with Astro's Svg Component

AstroPaper v5 replaces inline SVGs with Astro’s experimental [SVG Component](https://docs.astro.build/en/reference/experimental-flags/svg/). This update reduces the need for predefined SVG code in the `socialIcons` object, making the codebase cleaner and more maintainable.

### Separate Constants and Config

The project structure has been reorganized. The `src/config.ts` file now only contains the `SITE` object, which holds the main configuration for the project. All constants, such as `LOCALE`, `SOCIALS`, and `SHARE_LINKS`, have been moved to the `src/constants.ts` file.

## Other notable changes

- The blog posts directory has been updated from `src/content/blog/` to `src/data/blog/`.
- Collection definitions file (`src/content/config.ts`) is now replaced with `src/content.config.ts`.
- Various dependencies have been upgraded for improved performance and security.
- Removed `IBM Plex Mono` font and switched to the default system mono font.
- The `Go back` button logic has been updated. Now, instead of triggering the browser's history API, AstroPaper v5 uses the browser session to temporarily store the back URL. If no back URL exists in the session, it will redirect to the homepage.
- There are some minor styles and layout changes as well.

## Outtro

AstroPaper v5 brings many changes, but the core experience remains the same. Enjoy a smoother, more efficient blogging platform while keeping the clean and minimal design that AstroPaper is known for!

Feel free to explore the changes and share your thoughts. As always, thank you for your support!

If you enjoy this theme, please consider starring the repo. You can also support me via GitHub Sponsors or you can buy me a coffee if you'd like. However, of course, these actions are entirely optional and not required.

Enjoy!

[Sat Naing](https://satnaing.dev/)
