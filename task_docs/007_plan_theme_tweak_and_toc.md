### Task 007 — Theme tweak and right-rail TOC

Plan
- Switch to white background and clean sans-serif font.
- Add `TOC.astro` and place it to the right of content on large screens.

What I did
- Adjusted variables in `global.css` and body font.
- Implemented `TOC.astro` and integrated with `PostDetails.astro` using `render(...).headings`.

Findings
- `remark-toc` is already active; right-rail TOC improves navigation.

How I solved it
- Two-column layout in post detail with sticky TOC.