### Task 008 — Misc routing notes

Plan
- Provide optional `/[lang]/blog/[slug]` path compatibility that redirects to `/[lang]/posts/[slug]`.

What I did
- Added `src/pages/[lang]/blog/[slug].astro` with a meta refresh.

Why
- The user asked for a pattern with `blog/[slug]`. This keeps both forms working while main implementation uses `posts` structure from theme.