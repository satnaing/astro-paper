### Task 005 — Add OG image generator

Plan
- Install `astro-og-canvas`.
- Add `/og/[lang]/[slug].png.ts` endpoint using existing utilities for now.
- Update meta tag used on post pages.

What I did
- Installed dependency and created a new OG route.
- Updated `PostDetails.astro` to set the OG meta to `/og/<lang>/<slug>.png`.

Findings
- Project already generates dynamic OG images for `/posts/.../index.png`.

How I solved it
- Kept existing generator for compatibility and aliased to new route.