### Task 003 — Mirror content by locale

Plan
- Keep existing `src/data/blog` collection; mirror content under `en/` and `zh-TW/`.
- Create `[lang]`-prefixed routes mirroring index and posts.
- Add `lang` to collection schema with default `en`.

What I did
- Added two posts (`en` and `zh-TW`) under `src/data/blog/<locale>/`.
- Created localized routes in `src/pages/[lang]/...` that filter by `data.lang`.

Findings
- Existing helper `getPath` includes subfolder segments; locale kept out of slug param for `[lang]/posts/...` route.

How I solved it
- Derived `lang` from `Astro.params.lang` at route level and filtered collections accordingly.