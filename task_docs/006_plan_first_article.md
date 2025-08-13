### Task 006 — First article (TW/EN): Shared memory between Go routines

Plan
- Write parallel articles under `en` and `zh-TW`.
- Include working code examples and a Mermaid diagram.

What I did
- Authored `shared-memory-between-go-routines.md` in both locales.
- Verified rendering with Mermaid on post layout.

Findings
- Mermaid requires client script; enabled in `PostDetails.astro`.

How I solved it
- Added a script import from CDN and initialized on load.