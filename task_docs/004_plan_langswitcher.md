### Task 004 — Build <LangSwitcher>

Plan
- Create `src/components/LangSwitcher.astro`.
- Use `getRelativeLocaleUrl` to link sibling locale to the current path.

What I did
- Implemented `<LangSwitcher>` and mounted in `Header` and post layout.

Findings
- Works for both root (`/`) and nested pages (posts).

How I solved it
- Reads `Astro.url.pathname` and renders links for `en` and `zh-TW` excluding the current locale.