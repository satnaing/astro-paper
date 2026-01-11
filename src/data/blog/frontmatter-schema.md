---
title: "Mermaid Diagram Demo"
description: "Demonstrating how to show Mermaid diagrams vs raw code"
author: Pascal Andy
date_created: 2026-01-11
tags:
  - dev-notes
mermaid: true
---


# Frontmatter Schema

> Reference for blog post frontmatter fields in AstroPaper.

Based on `src/content.config.ts`.

## Required Fields

| Field | Type | Format | Description |
|-------|------|--------|-------------|
| `title` | `string` | — | Post title |
| `description` | `string` | — | SEO meta + post cards (not shown in body) |
| `date_created` | `date` | `2026-01-11` | Publication date |
| `tags` | `string[]` | — | Post tags (min 1, use `untagged` if none) |
| `author` | `string` | — | Post author (default: `Pascal Andy`) |

## Optional Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `featured` | `boolean` | — | Show on homepage featured section |
| `draft` | `boolean` | — | Hide in production (visible in dev) |
| `ogImage` | `image \| string` | — | Custom OG image (local or URL) |
| `canonicalURL` | `string` | — | canonicalURL is for SEO when you have duplicate content. It tells search engines "this is the original source |
| `hideEditPost` | `boolean` | — | Hide "Edit post" link |
| `timezone` | `string` | — | Timezone for date display |
| `mermaid` | `boolean` | `false` | Enable Mermaid diagram rendering |

## Examples

### Minimal (5 required fields)

```yaml
---
title: "My Post Title"
description: "Brief description for SEO and cards"
date_created: 2025-01-15
tags:
  - untagged
author: Pascal Andy
---
```

### Full (all fields)

```yaml
---
title: "My Post Title"
description: "Brief description for SEO and cards"
date_created: 2025-01-15
author: "Your Name"
tags:
  - astro
  - tutorial
featured: true
draft: false
ogImage: "./custom-og.png"
canonicalURL: "https://original-source.com/post"
hideEditPost: false
timezone: "America/Montreal"
mermaid: true
---
```

## Notes

- **`slug`** is NOT in the schema — derived from filename/path automatically
- **Files prefixed with `_`** are excluded from the collection (e.g., `_draft-post.md`)
- **Subdirectories starting with `_`** are NOT excluded — only filenames matter
- **Subdirectories** affect the URL path (e.g., `blog/2025/post.md` -> `/posts/2025/post/`)
