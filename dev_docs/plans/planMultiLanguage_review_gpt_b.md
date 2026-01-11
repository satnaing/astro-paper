Overview
- AstroPaper is a static Astro 5 blog theme: content flows from Markdown in src/data/blog/ through the Zod-backed collection defined in src/content.config.ts into page layouts under src/layouts/, with routing handled by files in src/pages/.
- Global configuration lives in src/config.ts, supplying site metadata and OKLCH theme palettes that are injected as CSS variables by src/layouts/Layout.astro and mapped into Tailwind utilities via src/styles/global.css.
- Client-side behavior is intentionally minimal: src/scripts/theme.ts syncs light/dark preference, src/scripts/mermaid.ts lazily loads Mermaid when needed, and dynamic assets (RSS, OG images) are generated through API-style routes in src/pages/rss.xml.ts, src/pages/og.png.ts, and src/pages/posts/[...slug]/index.png.ts.
Performance Opportunities
- Cache OG-font downloads (src/utils/loadGoogleFont.ts) so Satori doesn’t hit Google Fonts for every OG render; high impact, high confidence, low effort.
- Disable embedFont in OG templates (src/utils/og-templates/post.js) once fonts are cached locally to shrink output and memory use during batch image generation; medium impact, high confidence, low effort.
- Tune Pagefind indexing (generated under public/pagefind/) to avoid over-indexing long bodies—e.g., limit fields or chunking to keep /search payloads lighter; medium impact, high confidence, medium effort.
- Replace the runtime getComputedStyle call in src/scripts/theme.ts with a direct lookup derived from THEMES to avoid layout thrash on navigation; low impact, medium confidence, low effort.
- Audit Shiki transformer stack in astro.config.ts (multiple custom transformers per code block) for potential pruning or batching if builds become slow; low impact today, medium confidence, medium effort.
Gaps & Next Steps
- Baseline metrics (p50/p95/p99 latency, throughput, memory) and profiling were not collected; this static build currently lacks benchmark scripts, so add reproducible workloads plus bun run build/Pagefind timing harness before changing behavior.
- Define golden outputs: capture representative OG images, RSS XML, and rendered HTML snapshots to guard equivalence proofs when optimizing.
- If any change is pursued, pair it with automated checks (e.g., CI benchmark thresholds) to enforce regression guardrails.
─── ◈ Complete 