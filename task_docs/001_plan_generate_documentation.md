### Task 001 — Generate comprehensive documentation (project.md)

Plan
- Audit repository structure and features.
- Draft `project.md` to cover setup, structure, i18n, OG images, theme, TOC, and content authoring.

What I did
- Scanned codebase (`astro.config.ts`, layouts, components, data collection).
- Authored `project.md` at repo root.

Findings
- Project uses `src/data/blog` with `astro:content` and glob loader.
- Existing dynamic OG generator exists; kept for compatibility and added a new route.

How I solved it
- Wrote concise doc with quick start, routing, i18n, OG, theme, TOC, Mermaid, and authoring guidance.