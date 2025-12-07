# AGENTS.md

## Project Overview

This is **tanc-talk**, a personal blog built with Astro v5, based on the AstroPaper theme. The site features a minimalist design with support for light/dark mode, blog posts, search functionality, and SEO optimization.

## Essential Commands

### Development
- `pnpm run dev` - Start development server at `localhost:4321`
- `pnpm run build` - Build production site to `./dist/`
- `pnpm run preview` - Preview the built site locally
- `pnpm run sync` - Generate TypeScript types for Astro modules

### Code Quality
- `pnpm run lint` - Run ESLint
- `pnpm run format` - Format code with Prettier
- `pnpm run format:check` - Check code formatting without modifying

## Project Structure

```
/
├── public/                # Static assets
│   ├── assets/           # Images and other media
│   └── favicon.svg       # Site favicon
├── src/
│   ├── assets/           # Internal assets (icons, images)
│   ├── components/       # Astro components
│   ├── data/blog/        # Blog posts in Markdown
│   ├── layouts/          # Astro layout components
│   ├── pages/            # Route pages
│   ├── styles/           # CSS styles (global.css, typography.css)
│   ├── utils/            # Utility functions
│   ├── config.ts         # Site configuration
│   ├── constants.ts      # Constants
│   └── content.config.ts # Content collections config
├── astro.config.ts       # Astro configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.js      # ESLint configuration
└── .prettierrc.mjs       # Prettier configuration
```

## Configuration

The main site configuration is in `src/config.ts` with the `SITE` object:
- `website`: Site URL (required for production)
- `author`: Author name
- `title`: Site title
- `postPerIndex`: Posts shown on index page
- `postPerPage`: Posts per page in pagination
- `lightAndDarkMode`: Enable theme toggle
- `showArchives`: Show archives page
- `dynamicOgImage`: Enable dynamic OG image generation

## Content Management

Blog posts are stored in `src/data/blog/` as Markdown files with frontmatter:
- `pubDatetime`: Publication date (required)
- `modDatetime`: Modification date
- `title`: Post title
- `description`: Post description
- `tags`: Array of tags
- `draft`: Set to `true` for drafts
- `featured`: Set to `true` for featured posts

Files starting with underscore (`_`) are ignored by the content collection.

## Code Patterns

### Import Paths
- Use path aliases with `@/` prefix for src imports (e.g., `@/config`)
- Astro files use `.astro` extension
- Components in `src/components` are directly importable

### Styling
- Uses TailwindCSS v4
- Global styles in `src/styles/global.css`
- Typography styles in `src/styles/typography.css`

### TypeScript
- Strict TypeScript configuration
- Type-safe content collections with zod schemas
- Astro's Content Collections API for type-safe blog posts

## Code Standards

### ESLint Rules
- `no-console` is enforced as an error
- Follows Astro and TypeScript ESLint recommended configs
- Node.js and browser globals available

### Prettier Configuration
- 2-space indentation
- 80 character line width
- Single quotes disabled (uses double quotes)
- Trailing commas in ES5 style
- LF line endings

### Commit Convention
Follows conventional commits (configured in cz.yaml):
- Use semantic types: feat, fix, docs, etc.
- Automated versioning and changelog updates

## Deployment & Build Process

The build process includes:
1. `astro check` - Type checking
2. `astro build` - Site building
3. `pagefind --site dist` - Search index generation
4. `cp -r dist/pagefind public/` - Copy search index to public

## Search Functionality

Uses Pagefind for fuzzy search:
- Search index generated at build time
- Search UI located at `/search`
- Automatic indexing of blog posts

## Dynamic Features

### OG Image Generation
- Automatic OG images for blog posts using Satori
- Configurable templates in `src/utils/og-templates/`
- SVG-based generation for performance

### Theme Toggle
- Supports light/dark mode
- Theme toggle JavaScript in `public/toggle-theme.js`
- Tailwind classes for dark mode variants

## Gotchas & Important Notes

1. **Content Updates**: After modifying blog posts, run `pnpm run sync` to update types
2. **Build Process**: Always build before deployment to ensure search index is generated
3. **Docker Support**: Available but not required for local development
4. **Site Verification**: Google site verification can be added via `PUBLIC_GOOGLE_SITE_VERIFICATION` env var
5. **Timezone Handling**: Default timezone is Asia/Shanghai (configurable in SITE)
6. **Scheduled Posts**: 15-minute margin for scheduled posts (configurable)

## Testing

No formal test suite is currently configured. Manual testing focuses on:
- Build process completion
- Search functionality
- Theme toggle
- Responsive design
- Content rendering