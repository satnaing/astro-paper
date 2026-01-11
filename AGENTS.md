# AGENTS.md - AstroPaper Codebase Guide

> Guidelines for AI coding agents working in this Astro blog theme repository.

## Outils CLI préférés

- `rg` (ripgrep) — jamais `grep`
- `fd` — jamais `find`
- `uv` — jamais `python3` directement
- `bun` — jamais `npm/pnpm`
- **Screenshot**: `ls -lt ~/Documents/screenshots | head -2`

## Project Overview

AstroPaper is a minimal, responsive, SEO-friendly Astro blog theme built with:
- **Astro 5** - Static site generator
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - Utility-first styling
- **Pagefind** - Static search functionality

## Build, Lint, and Development Commands

```bash
# Development
npm run dev              # Start development server (localhost:4321)
npm run preview          # Preview production build locally

# Build
npm run build            # Full build: type check + build + pagefind indexing
npm run sync             # Sync Astro content collections

# Linting & Formatting
npm run lint             # Run ESLint
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting without writing

# Type Checking
npx astro check          # Run Astro's TypeScript checker
```

### Testing

This project does not currently have automated tests. Manual testing is recommended:
- Run `npm run dev` and verify changes in browser
- Run `npm run build` to ensure production build succeeds
- Check `npm run lint` passes before committing

## Project Structure

```
src/
├── assets/icons/        # SVG icon components
├── components/          # Reusable Astro components
├── data/blog/           # Markdown blog posts
├── layouts/             # Page layout components
├── pages/               # Astro pages (file-based routing)
├── scripts/             # Client-side TypeScript
├── styles/              # Global CSS (Tailwind)
├── utils/               # Utility functions
├── config.ts            # Site configuration (SITE object)
├── constants.ts         # Constants (SOCIALS, SHARE_LINKS)
├── content.config.ts    # Astro content collection schema
└── env.d.ts             # TypeScript environment declarations
```

## Code Style Guidelines

### TypeScript

- **Strict mode** enabled via `astro/tsconfigs/strict`
- Use path alias `@/*` for imports from `./src/*`
- Prefer explicit type annotations for function parameters
- Use `type` keyword for type definitions (not `interface` unless extending)

```typescript
// Good - using path alias and explicit types
import { SITE } from "@/config";
import type { CollectionEntry } from "astro:content";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => { ... };
```

### Imports Order

1. External packages (`astro:content`, `dayjs`, etc.)
2. Internal aliases (`@/config`, `@/utils/*`)
3. Relative imports (`./Component.astro`)
4. Type imports last (use `import type`)

```typescript
import { getCollection } from "astro:content";
import { SITE } from "@/config";
import getSortedPosts from "@/utils/getSortedPosts";
import type { CollectionEntry } from "astro:content";
```

### Formatting (Prettier)

- **Semicolons**: Required
- **Quotes**: Double quotes (`"`)
- **Tab width**: 2 spaces
- **Print width**: 80 characters
- **Trailing commas**: ES5 style
- **Arrow parens**: Avoid when possible (`x => x`)
- **End of line**: LF

### ESLint Rules

- `no-console: "error"` - Console statements are forbidden
- TypeScript recommended rules enabled
- Astro recommended rules enabled

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Card.astro`, `Header.astro` |
| Utility files | camelCase | `getSortedPosts.ts`, `slugify.ts` |
| Functions | camelCase | `postFilter()`, `getPath()` |
| Constants | SCREAMING_SNAKE_CASE | `SITE`, `SOCIALS`, `BLOG_PATH` |
| Types/Interfaces | PascalCase | `Props`, `Social` |

### Astro Components

```astro
---
// 1. Imports (external, then internal, then types)
import { getCollection } from "astro:content";
import Layout from "@/layouts/Layout.astro";
import type { CollectionEntry } from "astro:content";

// 2. Props type definition
type Props = {
  title: string;
  description?: string;
};

// 3. Destructure props with defaults
const { title, description = "Default description" } = Astro.props;

// 4. Component logic
const posts = await getCollection("blog");
---

<!-- 5. Template with Tailwind classes -->
<Layout>
  <h1 class="text-2xl font-semibold">{title}</h1>
</Layout>
```

### Tailwind CSS

- Use `class:list` directive for conditional classes
- Prefer utility classes over custom CSS
- Theme colors: `background`, `foreground`, `accent`, `muted`, `border`
- Layout utility: `app-layout` (max-width container with padding)

```astro
<div
  class:list={[
    "pt-12 pb-6",
    { "border-b border-border": showBorder },
  ]}
>
```

### Utility Functions

- One function per file in `src/utils/`
- Use default exports for main function
- Include JSDoc comments for complex functions

```typescript
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

/**
 * Returns posts sorted by date (newest first)
 */
const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts.filter(postFilter).sort((a, b) => /* ... */);
};

export default getSortedPosts;
```

## Content Collections

Blog posts are in `src/data/blog/` as Markdown files with frontmatter:

```yaml
---
title: "Post Title"
description: "Brief description"
pubDatetime: 2024-01-15T10:00:00Z
tags: ["astro", "blog"]
author: "Author Name"          # optional, defaults to SITE.author
featured: false                # optional
draft: false                   # optional
ogImage: "./og-image.png"      # optional
modDatetime: null              # optional
---
```

## Configuration

### Site Config (`src/config.ts`)

```typescript
export const SITE = {
  website: "https://example.com/",
  author: "Your Name",
  title: "Site Title",
  desc: "Site description",
  // ... see file for all options
} as const;
```

### Environment Variables

- `PUBLIC_GOOGLE_SITE_VERIFICATION` - Optional Google verification meta tag

## Error Handling

- Avoid `console.log` (will fail lint)
- Use Astro's built-in error pages (`src/pages/404.astro`)
- Content schema validation via Zod in `content.config.ts`

## Key Files to Know

- `src/config.ts` - Site-wide configuration
- `src/content.config.ts` - Blog post schema definition
- `astro.config.ts` - Astro framework configuration
- `src/styles/global.css` - Tailwind theme and base styles
- `src/layouts/Layout.astro` - Base HTML layout with meta tags
