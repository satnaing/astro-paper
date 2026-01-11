---
title: "Frontmatter Schema"
tags:
  - dev-notes
date_created: 2026-01-11
author: Pascal Andy
description: "Reference for blog post frontmatter fields"
---

# Frontmatter Schema

> Reference for blog post frontmatter fields in AstroPaper.

Based on `src/content.config.ts`.

## Required Fields

| Field          | Type       | Format       | Description                               |
| -------------- | ---------- | ------------ | ----------------------------------------- |
| `title`        | `string`   | —            | Post title                                |
| `tags`         | `string[]` | —            | Post tags (min 1, use `untagged` if none) |
| `date_created` | `date`     | `2026-01-11` | Publication date                          |
| `author`       | `string`   | —            | Post author (default: `Pascal Andy`)      |
| `description`  | `string`   | —            | SEO meta + post cards (not shown in body) |

## Optional Fields

| Field          | Type              | Default | Description                                                                                                   |
| -------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------- |
| `featured`     | `boolean`         | —       | Show on homepage featured section                                                                             |
| `draft`        | `boolean`         | —       | Hide in production (visible in dev)                                                                           |
| `ogImage`      | `image \| string` | —       | Custom OG image (local or URL)                                                                                |
| `canonicalURL` | `string`          | —       | canonicalURL is for SEO when you have duplicate content. It tells search engines "this is the original source |
| `hideEditPost` | `boolean`         | —       | Hide "Edit post" link                                                                                         |
| `mermaid`      | `boolean`         | `false` | Enable Mermaid diagram rendering                                                                              |

## Examples

### Minimal (5 required fields)

(in this order by default)

```yaml
---
title: "My Post Title"
tags:
  - untagged
date_created: 2025-01-15
author: Pascal Andy
description: "Brief description for SEO and cards"
---
```

### Full (all fields)

```yaml
---
title: "My Post Title"
tags:
  - astro
  - tutorial
date_created: 2025-01-15
author: "Your Name"
featured: true
draft: false
ogImage: "./custom-og.png"
canonicalURL: "https://original-source.com/post"
hideEditPost: false
mermaid: true
description: "Brief description for SEO and cards"
---
```

## Notes

- **`slug`** is NOT in the schema — derived from filename/path automatically
- **Files prefixed with `_`** are excluded from the collection (e.g., `_draft-post.md`)
- **Subdirectories starting with `_`** are NOT excluded — only filenames matter
- **Subdirectories** affect the URL path (e.g., `blog/2025/post.md` -> `/posts/2025/post/`)
