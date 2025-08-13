### Task 010 — SEO & i18n improvements (plan and change log)

Plan
- Ensure each locale has stable, crawlable routes (avoid dynamic route requirements for static pages like About).
- Add localized static routes where needed (`/zh-TW/about`, `/zh-TW/tags`).
- Keep language isolation: EN only under root (and `/en` if enabled), zh‑TW under `/zh-TW`.
- Prepare to add SEO signals:
  - rel="alternate" hreflang for en and zh‑TW in the page head
  - JSON‑LD `BlogPosting` with `inLanguage`
  - og:locale + og:locale:alternate
  - Include alternates in sitemap

Changes done in this batch
- Removed dynamic `src/pages/[lang]/about.md` to prevent `getStaticPaths` error.
- Added static `src/pages/zh-TW/about.md` (關於我) using `AboutLayout`.
- Localized header labels and prefixed links by locale; active state ignores locale segment.
- Added zh‑TW tags page (`src/pages/[lang]/tags/index.astro`) that filters tags by locale.
- Confirmed EN home and posts listings show only EN; zh‑TW pages show only zh‑TW.

Next (SEO layer)
- Add `hreflang` alternates in `src/layouts/Layout.astro`.
- Extend JSON‑LD with `inLanguage` and add `og:locale` meta.
- Update sitemap generation to include alternates.