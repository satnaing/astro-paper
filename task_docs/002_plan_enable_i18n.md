### Task 002 — Enable i18n in astro config

Plan
- Add `i18n` to `astro.config.ts` with locales `en`, `zh-TW`.
- Keep project structure; avoid renaming to `.mjs`.

What I did
- Updated `astro.config.ts` to include `i18n`.

Findings
- Site links assume non-prefixed default locale; `prefixDefaultLocale` remains false.

How I solved it
- Injected `i18n` section preserving other config settings.