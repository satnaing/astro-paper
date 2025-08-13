### Task 009 — zh-TW pages and localized navigation

Plan
- Localize nav labels when browsing under `/zh-TW/*`.
- Prefix nav links with current locale so navigation stays inside the chosen language.
- Add zh-TW `about` and `tags` pages; ensure tag listing filters by locale.

What I did
- Updated `src/components/Header.astro` to detect locale from URL, set labels (文章/標籤/關於我/歸檔/搜尋), and prefix links with `/zh-TW` when applicable. Active-link detection now ignores the locale segment.
- Added `src/pages/[lang]/about.md` (關於我) using `AboutLayout`.
- Added `src/pages/[lang]/tags/index.astro` that filters tags from posts where `data.lang` matches the chosen locale.

How it ensures isolation
- All menu links are locale-prefixed, so switching language via the switcher keeps users within that locale and only locale-matching content is listed.