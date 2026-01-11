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

## Official Astro docs

> Astro is an all-in-one web framework for building websites. 

- Astro uses island architecture and server-first design to reduce client-side JavaScript overhead and ship high performance websites.
- Astro’s friendly content-focused features like content collections and built-in Markdown support make it an excellent choice for blogs, marketing, and e-commerce sites amongst others.
- The `.astro` templating syntax provides powerful server rendering in a format that follows HTML standards and will feel very familiar to anyone who has used JSX.
- Astro supports popular UI frameworks like React, Vue, Svelte, Preact, and Solid through official integrations.
- Astro is powered by Vite, comes with a fast development server, bundles your JavaScript and CSS for you, and makes building websites feel fun.

### Documentation Sets

- [Abridged documentation](https://docs.astro.build/llms-small.txt): a compact version of the documentation for Astro, with non-essential content removed
- [Complete documentation](https://docs.astro.build/llms-full.txt): the full documentation for Astro
- [API Reference](https://docs.astro.build/_llms-txt/api-reference.txt): terse, structured descriptions of Astro’s APIs
- [How-to Recipes](https://docs.astro.build/_llms-txt/how-to-recipes.txt): guided examples of adding features to an Astro project
- [Build a Blog Tutorial](https://docs.astro.build/_llms-txt/build-a-blog-tutorial.txt): a step-by-step guide to building a basic blog with Astro
- [Deployment Guides](https://docs.astro.build/_llms-txt/deployment-guides.txt): recipes for how to deploy an Astro website to different services
- [CMS Guides](https://docs.astro.build/_llms-txt/cms-guides.txt): recipes for how to use different content management systems in an Astro project
- [Backend Services](https://docs.astro.build/_llms-txt/backend-services.txt): advice on how to integrate backend services like Firebase, Sentry, and Supabase in an Astro project
- [Migration Guides](https://docs.astro.build/_llms-txt/migration-guides.txt): advice on how to migrate a project built with another tool to Astro
- [Additional Guides](https://docs.astro.build/_llms-txt/additional-guides.txt): guides to e-commerce, authentication, testing, and digital asset management in Astro projects

### Notes

- The complete documentation includes all content from the official documentation
- The content is automatically generated from the same source as the official documentation

### Optional

- [The Astro blog](https://astro.build/blog/): the latest news about Astro development

## Build, Lint, and Development Commands

**Package manager: bun** (not npm)

```bash
# Development
bun run dev              # Start development server (localhost:4321)
bun run preview          # Preview production build locally

# Build
bun run build            # Full build: type check + build + pagefind indexing
bun run sync             # Sync Astro content collections

# Linting & Formatting
bun run lint             # Run ESLint
bun run format           # Format all files with Prettier
bun run format:check     # Check formatting without writing

# Type Checking
bun astro check          # Run Astro's TypeScript checker

# Install dependencies
bun install              # Install all dependencies
```

### Dev Server

**The user must run the dev server, not the AI agent.**

Starting/stopping the dev server from the agent causes issues:
- Agent loses control of the process
- Port conflicts when restarting
- HMR state becomes unpredictable

Let the user run `bun run dev` in their own terminal.

### Testing

This project does not currently have automated tests. Manual testing is recommended:
- Run `bun run dev` and verify changes in browser
- Run `bun run build` to ensure production build succeeds
- Check `bun run lint` passes before committing

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
- **Never hardcode colors** - always use theme variables
- Layout utility: `app-layout` (max-width container with padding)

#### Theme Colors (shadcn/ui compatible)

| Variable | Purpose |
|----------|---------|
| `background` / `foreground` | Page background and text |
| `card` / `card-foreground` | Card surfaces |
| `popover` / `popover-foreground` | Popover/dropdown surfaces |
| `primary` / `primary-foreground` | Primary actions, links |
| `secondary` / `secondary-foreground` | Secondary elements |
| `muted` / `muted-foreground` | Muted backgrounds, subtle text |
| `accent` / `accent-foreground` | Accents (maps to primary) |
| `destructive` / `destructive-foreground` | Error/danger states |
| `border` | Border color |
| `input` | Input borders |
| `ring` | Focus rings |

Themes are defined in `src/config.ts` using `THEMES` object. Change `ACTIVE_THEME` to switch.

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
description: "Brief description"   # Used for SEO meta + post cards, NOT in post body
pubDatetime: 2024-01-15T10:00:00Z
tags: ["astro", "blog"]
author: "Author Name"          # optional, defaults to SITE.author
featured: false                # optional
draft: false                   # optional
ogImage: "./og-image.png"      # optional
modDatetime: null              # optional
---
```

### Table of Contents

TOC is **automatic** - generated from h2/h3 headings in the layout. No manual `## Table of Contents` needed in markdown.

Post structure:
```md
---
frontmatter
---

Your intro text...

## First Section

Content...
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
