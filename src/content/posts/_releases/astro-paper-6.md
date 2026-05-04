---
pubDatetime: 2026-05-04T18:44:44.000+07:00
title: AstroPaper 6.0
slug: astro-paper-v6
featured: true
tags:
  - release
description: "AstroPaper v6: a from-scratch rewrite on Astro v6, Tailwind v4, and a new config system."
---

AstroPaper v6 is here — a complete rewrite built on Astro v6, Tailwind v4, and a redesigned configuration system that puts everything in one place.

## Table of contents

## Major Changes

### Upgrade to Astro v6

AstroPaper now ships with Astro v6.2, including the stable Content Layer API (`glob()` loader), the graduated Fonts API, and full TypeScript v6 support.

### New two-tier config system

The flat `SITE` object in `src/config.ts` and the separate `constants.ts` file have been replaced by a single `astro-paper.config.ts` at the project root. Use `defineAstroPaperConfig()` for full IntelliSense:

```ts file="astro-paper.config.ts"
import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://your-site.com/",
    title: "AstroPaper",
    description: "...",
    author: "Your Name",
  },
  posts: { perPage: 4, perIndex: 4 },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    search: "pagefind",
  },
  socials: [{ name: "github", url: "https://github.com/..." }],
  shareLinks: [{ name: "x", url: "https://x.com/intent/post?url=" }],
});
```

All options (site metadata, pagination, feature flags, social links, and share links) now live here.

### Stable Fonts API

The font configuration has graduated from `experimental.fonts` to a top-level `fonts` key in `astro.config.ts`, matching Astro v6's stable API:

```ts file="astro.config.ts"
export default defineConfig({
  fonts: [
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
    },
  ],
});
```

### MDX support

`@astrojs/mdx` is now included. Posts can use `.mdx` extension to embed components, use JSX expressions, and import from other files. The content loader pattern `**/[^_]*.{md,mdx}` picks up both formats automatically.

### Content collection restructure

Blog posts have moved from `src/data/blog/` to `src/content/posts/`, aligning with Astro conventions. A new `pages` collection at `src/content/pages/` covers standalone pages (About, etc.). The `posts` collection uses Astro's `glob()` loader — no more `defineCollection` with `type: "content"`.

### Design token system

The 5-token color palette from v5 has grown to 7 tokens in `src/styles/theme.css`:

```css file="src/styles/theme.css"
:root,
[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --accent-foreground: #ffffff; /* new */
  --muted: #e6e6e6;
  --muted-foreground: #6b7280; /* new */
  --border: #ece9e9;
}
```

Theme tokens live in their own `theme.css` file (imported by `global.css`) and are registered to Tailwind v4 via `@theme inline`.

### i18n string extraction

All UI strings are extracted to `src/i18n/lang/en.ts` with the `UIStrings` interface. Adding a new language requires only a new file in `src/i18n/lang/`. The `tplStr()` helper handles parameterized strings so translators can reorder tokens freely.

### Base path & subdirectory deploy support

All internal links go through `getRelativeLocaleUrl()` and the `withBase.ts` helpers (`stripLocale`, `stripBase`, `getAssetPath`). Deploying to a subdirectory (e.g. `/astro-paper`) works without manual link updates.

### Google Site Verification via config

The `PUBLIC_GOOGLE_SITE_VERIFICATION` environment variable has been replaced by `site.googleVerification` in `astro-paper.config.ts`.

## Other Notable Changes

- Updated and renamed helper/util functions.
- Adjacent post navigation (prev/next) is now computed once in `getStaticPaths` and passed as props — the component no longer fetches all posts per page.
- `_components/` scoping: post-specific components live under `pages/posts/[...slug]/_components/` and don't pollute the global `src/components/` directory.
- Thin `PostLayout.astro` (structured data/SEO only) — post page logic lives in the page file itself.

## Outtro

AstroPaper v6 retains its minimal, clean look while rethinking the internals around Astro v6's new primitives. The config system is simpler, the codebase is easier to navigate, and the theme is ready for i18n and subdirectory deployments out of the box.

Feel free to explore the changes and share your thoughts. As always, thank you for your support!

If you enjoy this theme, please consider starring the [repo](https://github.com/satnaing/astro-paper). You can also support me via these:

<a href="https://buymeacoffee.com/satnaing" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

<a href="https://github.com/sponsors/satnaing" target="_blank"><img src="https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#EA4AAA" alt="GitHub Sponsors" height="41" width="174"></a>

Of course, this is entirely optional. :)

Enjoy!

[Sat Naing](https://satnaing.dev/)
