# Multi-Language Plan for AstroPaper

> Internationalization (i18n) architecture for a scalable multilingual blog.

## Overview

| Aspect | Decision |
|--------|----------|
| **Architecture** | Option B - Dynamic `[lang]` routes |
| **Original languages** | `fr-CA`, `en-US` only |
| **Translated languages** | AI-generated (Spanish + 17 more planned) |
| **Translation tracking** | Full metadata (model, date, status) |
| **User notice** | Visible banner on AI-translated content |
| **Default behavior** | Browser language detection → redirect |
| **URL style** | Fully translated (page names + slugs) |

---

## Target Languages

### Phase 1 (Initial)
- `en-US` - English (US) - **Original content**
- `fr-CA` - French (Canada) - **Original content**
- `es` - Spanish - AI-translated

### Phase 2 (Scale to 20+)
Top languages to add: German, Portuguese, Chinese, Japanese, Korean, Arabic, Hindi, Russian, Italian, Dutch, Polish, Turkish, Vietnamese, Thai, Indonesian, etc.

---

## URL Structure

### Final URLs

| Content | English | French | Spanish |
|---------|---------|--------|---------|
| Home | `/en-US/` | `/fr-CA/` | `/es/` |
| About | `/en-US/about/` | `/fr-CA/a-propos/` | `/es/acerca-de/` |
| Post listing | `/en-US/posts/` | `/fr-CA/articles/` | `/es/publicaciones/` |
| Single post | `/en-US/posts/my-article/` | `/fr-CA/articles/mon-article/` | `/es/publicaciones/mi-articulo/` |
| Tags | `/en-US/tags/` | `/fr-CA/etiquettes/` | `/es/etiquetas/` |
| Archives | `/en-US/archives/` | `/fr-CA/archives/` | `/es/archivos/` |
| Search | `/en-US/search/` | `/fr-CA/recherche/` | `/es/buscar/` |
| Root `/` | → Browser detection → redirects to appropriate locale |

---

## Astro Configuration

```ts
// astro.config.ts
export default defineConfig({
  i18n: {
    locales: ["en-US", "fr-CA", "es"],
    defaultLocale: "en-US",
    routing: {
      prefixDefaultLocale: true  // All locales prefixed (for browser detection)
    }
  }
});
```

---

## Language Configuration

```ts
// src/i18n/config.ts
export const locales = {
  "en-US": { 
    name: "English", 
    native: "English",
    isOriginal: true,    // Can be source language
    dir: "ltr" 
  },
  "fr-CA": { 
    name: "French (Canada)", 
    native: "Français",
    isOriginal: true,    // Can be source language
    dir: "ltr" 
  },
  "es": { 
    name: "Spanish", 
    native: "Español",
    isOriginal: false,   // Always AI-translated
    dir: "ltr" 
  },
  // Easy to add more:
  // "de": { name: "German", native: "Deutsch", isOriginal: false, dir: "ltr" },
  // "zh": { name: "Chinese", native: "中文", isOriginal: false, dir: "ltr" },
  // "ar": { name: "Arabic", native: "العربية", isOriginal: false, dir: "rtl" },
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = "en-US";
```

---

## URL Route Mapping

```ts
// src/i18n/routes.ts
export const routeMap = {
  "about": {
    "en-US": "about",
    "fr-CA": "a-propos",
    "es": "acerca-de",
  },
  "posts": {
    "en-US": "posts",
    "fr-CA": "articles",
    "es": "publicaciones",
  },
  "tags": {
    "en-US": "tags",
    "fr-CA": "etiquettes",
    "es": "etiquetas",
  },
  "archives": {
    "en-US": "archives",
    "fr-CA": "archives",
    "es": "archivos",
  },
  "search": {
    "en-US": "search",
    "fr-CA": "recherche",
    "es": "buscar",
  },
} as const;
```

---

## Folder Structure

```
src/
├── pages/
│   ├── index.astro                    # Root: browser detect → redirect
│   └── [lang]/
│       ├── index.astro                # Home (all languages)
│       ├── [...about].astro           # Catches /about, /a-propos, /acerca-de
│       ├── [...posts]/
│       │   ├── index.astro            # Post listing
│       │   └── [...slug].astro        # Individual posts
│       ├── [...tags]/
│       │   └── [...tag].astro
│       ├── [...archives].astro
│       └── [...search].astro
│
├── data/blog/
│   ├── en-US/
│   │   └── my-super-article.md        # Original (if written in English)
│   ├── fr-CA/
│   │   └── mon-super-article.md       # Original (if written in French)
│   └── es/
│       └── mi-super-articulo.md       # AI-translated
│
├── i18n/
│   ├── config.ts                      # Language definitions
│   ├── routes.ts                      # URL mapping
│   └── ui.ts                          # UI string translations
│
├── components/
│   ├── LanguageSwitcher.astro         # Language picker
│   └── TranslationNotice.astro        # AI translation banner
```

---

## Enhanced Frontmatter Schema

### For Original Content (French or English)

```yaml
---
title: "Mon super article"
description: "Description en français"
pubDatetime: 2025-01-10T10:00:00Z
tags: ["astro", "blog"]

# i18n fields
lang: fr-CA
originalLang: fr-CA           # Source language (always fr-CA or en-US)
canonicalId: my-super-article # Links all translations together
slug: mon-super-article       # Localized URL slug
---
```

### For AI-Translated Content

```yaml
---
title: "Mi súper artículo"
description: "Descripción en español"
pubDatetime: 2025-01-10T10:00:00Z
tags: ["astro", "blog"]

# i18n fields
lang: es
originalLang: fr-CA           # Was originally written in French
canonicalId: my-super-article # Links to other translations
slug: mi-super-articulo       # Localized URL slug

# Translation metadata
translation:
  translatedBy: claude-3.5     # AI model used
  translatedAt: 2025-01-11     # When translated
  reviewedBy: null             # Human reviewer (if any)
  status: auto                 # auto | reviewed | approved
---
```

---

## Content Collection Schema Update

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const translationSchema = z.object({
  translatedBy: z.string(),
  translatedAt: z.coerce.date(),
  reviewedBy: z.string().nullable(),
  status: z.enum(["auto", "reviewed", "approved"]),
}).optional();

const blog = defineCollection({
  loader: glob({ 
    pattern: "**/[^_]*.md", 
    base: "./src/data/blog" 
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDatetime: z.coerce.date(),
    modDatetime: z.coerce.date().optional().nullable(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    ogImage: z.string().optional(),
    
    // i18n fields
    lang: z.enum(["en-US", "fr-CA", "es"]),
    originalLang: z.enum(["en-US", "fr-CA"]),  // Only original languages
    canonicalId: z.string(),
    slug: z.string(),
    
    // Translation metadata (only for translated content)
    translation: translationSchema,
  }),
});

export const collections = { blog };
```

---

## UI Translations

```ts
// src/i18n/ui.ts
export const ui = {
  "en-US": {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.posts": "Posts",
    "nav.tags": "Tags",
    "nav.search": "Search",
    "nav.archives": "Archives",
    "post.readMore": "Read more",
    "post.postedOn": "Posted on",
    "post.modifiedOn": "Modified on",
    "translation.notice": "This content was automatically translated from",
    "translation.readOriginal": "Read the original",
  },
  "fr-CA": {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.posts": "Articles",
    "nav.tags": "Étiquettes",
    "nav.search": "Recherche",
    "nav.archives": "Archives",
    "post.readMore": "Lire la suite",
    "post.postedOn": "Publié le",
    "post.modifiedOn": "Modifié le",
    "translation.notice": "Ce contenu a été traduit automatiquement depuis",
    "translation.readOriginal": "Lire l'original",
  },
  "es": {
    "nav.home": "Inicio",
    "nav.about": "Acerca de",
    "nav.posts": "Publicaciones",
    "nav.tags": "Etiquetas",
    "nav.search": "Buscar",
    "nav.archives": "Archivos",
    "post.readMore": "Leer más",
    "post.postedOn": "Publicado el",
    "post.modifiedOn": "Modificado el",
    "translation.notice": "Este contenido fue traducido automáticamente desde",
    "translation.readOriginal": "Leer el original",
  },
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof (typeof ui)["en-US"]) {
    return ui[lang][key] || ui["en-US"][key];
  };
}
```

---

## Components

### Language Switcher

```astro
---
// src/components/LanguageSwitcher.astro
import { locales } from "@/i18n/config";

type Props = {
  currentLang: string;
  currentPath: string;
};

const { currentLang, currentPath } = Astro.props;

// Build equivalent paths for other languages
// (requires slug mapping logic for translated slugs)
---

<nav class="flex gap-2">
  {Object.entries(locales).map(([code, { native }]) => (
    <a
      href={`/${code}/`}
      class:list={[
        "px-2 py-1 rounded text-sm",
        code === currentLang 
          ? "bg-primary text-primary-foreground" 
          : "hover:bg-muted"
      ]}
      aria-current={code === currentLang ? "page" : undefined}
    >
      {native}
    </a>
  ))}
</nav>
```

### Translation Notice Banner

```astro
---
// src/components/TranslationNotice.astro
import { locales } from "@/i18n/config";
import { useTranslations } from "@/i18n/ui";

type Props = {
  lang: string;
  originalLang: string;
  translation?: {
    translatedBy: string;
    translatedAt: Date;
    status: "auto" | "reviewed" | "approved";
  };
};

const { lang, originalLang, translation } = Astro.props;
const t = useTranslations(lang as keyof typeof locales);
const isTranslated = originalLang !== lang;
const originalLangName = locales[originalLang as keyof typeof locales]?.native;
---

{isTranslated && translation && (
  <div class="bg-muted border border-border rounded-lg p-4 mb-6">
    <p class="text-sm text-muted-foreground flex items-center gap-2">
      <span>🤖</span>
      <span>
        {t("translation.notice")} {originalLangName}.
        <a href={`/${originalLang}/...`} class="underline ml-1">
          {t("translation.readOriginal")}
        </a>
      </span>
    </p>
  </div>
)}
```

---

## SEO: hreflang Tags

```astro
---
// In Layout.astro <head>
import { locales } from "@/i18n/config";
import { SITE } from "@/config";

type Props = {
  canonicalId: string;
  currentLang: string;
};

const { canonicalId, currentLang } = Astro.props;

// Build hreflang URLs for all translations
// (requires fetching all translations by canonicalId)
---

{Object.keys(locales).map(locale => (
  <link 
    rel="alternate" 
    hreflang={locale} 
    href={`${SITE.website}/${locale}/posts/${getSlugForLocale(canonicalId, locale)}/`} 
  />
))}
<link 
  rel="alternate" 
  hreflang="x-default" 
  href={`${SITE.website}/en-US/posts/${getSlugForLocale(canonicalId, "en-US")}/`} 
/>
```

---

## Implementation Phases

### Phase 1: Infrastructure
1. Add i18n config to `astro.config.ts`
2. Create `src/i18n/` folder with config, routes, ui files
3. Update content.config.ts with i18n schema fields

### Phase 2: Routing
4. Create dynamic `[lang]` route structure
5. Implement root redirect with browser detection
6. Add route mapping for translated page names

### Phase 3: Content Migration
7. Restructure `src/data/blog/` into locale folders
8. Add i18n frontmatter fields to existing posts
9. Create translation workflow for AI-generated content

### Phase 4: Components
10. Build LanguageSwitcher component
11. Build TranslationNotice component
12. Update Header with language switcher
13. Add hreflang tags to Layout

### Phase 5: Polish
14. Update Pagefind for multilingual search
15. Generate locale-specific RSS feeds
16. Test all language paths and redirects

---

## Translation Workflow (Future)

For AI translations:
1. Write original content in French or English
2. Run translation script with AI (Claude, GPT, etc.)
3. AI generates translated markdown with metadata
4. Human review (optional) updates `status` field
5. Commit translated files to appropriate locale folder

---

## References

- [Astro i18n Documentation](https://docs.astro.build/en/guides/internationalization/)
- [Astro i18n Recipes](https://docs.astro.build/en/recipes/i18n/)
- [astro:i18n API Reference](https://docs.astro.build/en/reference/modules/astro-i18n/)
