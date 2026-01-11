# Production Readiness Plan

> Checklist to prepare AstroPaper for deployment with your own domain.

## Overview

| Aspect | Status |
|--------|--------|
| **Current state** | Theme customized visually, but metadata/content still has placeholders |
| **Blocking issues** | Site config points to `astro-paper.pages.dev`, author is "Sat Naing" |
| **Content cleanup** | ~15 sample/documentation posts to remove |
| **Estimated effort** | 1-2 hours for critical items |

---

## Phase 1: Critical Configuration

> These items **block production deployment**. Site will show wrong metadata without them.

### 1.1 Update Site Metadata

| ID | File | Line | Current Value | Action |
|----|------|------|---------------|--------|
| `1.1.1` | `src/config.ts` | 4 | `"https://astro-paper.pages.dev/"` | Replace with your domain (e.g., `"https://pascalandy.com/"`) |
| `1.1.2` | `src/config.ts` | 5 | `"Sat Naing"` | Replace with `"Pascal Andy"` |
| `1.1.3` | `src/config.ts` | 6 | `"https://satnaing.dev/"` | Replace with your profile URL |
| `1.1.4` | `src/config.ts` | 7 | `"A minimal, responsive and SEO-friendly Astro blog theme."` | Write your site description |
| `1.1.5` | `src/config.ts` | 8 | `"AstroPaper"` | Replace with your site title |
| `1.1.6` | `src/config.ts` | 24 | `"Asia/Bangkok"` | Replace with your timezone (e.g., `"America/Montreal"`) |

### 1.2 Update Edit Post Configuration

| ID | File | Line | Current Value | Action |
|----|------|------|---------------|--------|
| `1.2.1` | `src/config.ts` | 17 | `"https://github.com/satnaing/astro-paper/edit/main/"` | Replace with your repo URL or set `disabled: true` |

### 1.3 Replace Branding Assets

| ID | File | Action |
|----|------|--------|
| `1.3.1` | `public/favicon.svg` | Replace default Astro logo with your favicon |
| `1.3.2` | `public/astropaper-og.jpg` | Replace with your branded OG image (1200×630px recommended) |
| `1.3.3` | `src/config.ts:9` | Update `ogImage` filename if you rename the file |

### 1.4 Rewrite About Page

| ID | File | Action |
|----|------|--------|
| `1.4.1` | `src/pages/about.md` | Complete rewrite - currently describes AstroPaper theme, not you |

**Current problematic content:**
- Links to `satnaing.dev`
- Describes AstroPaper features
- Links to sponsor Sat Naing

---

## Phase 2: Content Cleanup

> Remove sample/placeholder content before going live.

### 2.1 Delete Example Posts

| ID | File | Reason |
|----|------|--------|
| `2.1.1` | `src/data/blog/examples/example-draft-post.md` | Placeholder draft, author: "Sat Naing" |
| `2.1.2` | `src/data/blog/examples/portfolio-website-development.md` | About Sat Naing's portfolio |
| `2.1.3` | `src/data/blog/examples/terminal-development.md` | About Sat Naing's terminal project |
| `2.1.4` | `src/data/blog/examples/tailwind-typography.md` | Example post, author: "Sat Naing" |
| `2.1.5` | `src/data/blog/examples/mermaid-demo.md` | Demo/example content |

**Action:** Delete entire `src/data/blog/examples/` directory.

### 2.2 Decide on Documentation Posts

These posts document AstroPaper usage. **Choose one option:**

| Option | Action |
|--------|--------|
| **A) Remove all** | Delete if you don't want theme docs on your blog |
| **B) Keep as drafts** | Add `draft: true` to frontmatter to hide but preserve |
| **C) Keep public** | Leave as-is if useful for your readers |

| ID | File | Topic |
|----|------|-------|
| `2.2.1` | `src/data/blog/adding-new-post.md` | How to add posts |
| `2.2.2` | `src/data/blog/how-to-configure-astropaper-theme.md` | Theme configuration |
| `2.2.3` | `src/data/blog/customizing-astropaper-theme-color-schemes.md` | Color customization |
| `2.2.4` | `src/data/blog/dynamic-og-images.md` | OG image generation |
| `2.2.5` | `src/data/blog/how-to-add-latex-equations-in-blog-posts.md` | LaTeX support |
| `2.2.6` | `src/data/blog/how-to-integrate-giscus-comments.md` | Comments integration |
| `2.2.7` | `src/data/blog/how-to-update-dependencies.md` | Dependency updates |
| `2.2.8` | `src/data/blog/predefined-color-schemes.md` | Color schemes |
| `2.2.9` | `src/data/blog/setting-dates-via-git-hooks.md` | Git hooks |
| `2.2.10` | `src/data/blog/shadcn-theme-system.md` | Theme system |
| `2.2.11` | `src/data/blog/subscribe-via-rss.md` | RSS subscription |

### 2.3 Clean Up Unused Assets

| ID | File | Action |
|----|------|--------|
| `2.3.1` | `src/assets/images/AstroPaper-v*.png` | Delete theme screenshots (4 files) |
| `2.3.2` | `public/astropaper-og.jpg` | Delete after replacing with your OG image |

---

## Phase 3: Verification

> Verify everything works before deploying.

### 3.1 Build & Test Locally

| ID | Command | Purpose |
|----|---------|---------|
| `3.1.1` | `bun run build` | Ensure production build succeeds |
| `3.1.2` | `bun run preview` | Preview production build locally |
| `3.1.3` | `bun run lint` | Check for linting errors |

### 3.2 Manual Verification Checklist

| ID | Check | How to Verify |
|----|-------|---------------|
| `3.2.1` | Homepage displays correctly | Visit `/` in preview |
| `3.2.2` | About page has your content | Visit `/about/` |
| `3.2.3` | No sample posts visible | Check `/posts/` listing |
| `3.2.4` | Favicon appears in browser tab | Check browser tab icon |
| `3.2.5` | OG image works | Use [opengraph.xyz](https://opengraph.xyz) after deploy |
| `3.2.6` | RSS feed valid | Visit `/rss.xml` |
| `3.2.7` | Sitemap generated | Visit `/sitemap-index.xml` |
| `3.2.8` | Search works | Test Pagefind on `/search/` |

---

## Phase 4: Deployment

> Deploy to your hosting platform.

### 4.1 Choose Hosting Platform

| Platform | Notes |
|----------|-------|
| **Cloudflare Pages** | Current default (`astro-paper.pages.dev`) |
| **Vercel** | Easy Astro integration |
| **Netlify** | Good free tier |
| **GitHub Pages** | Free for public repos |

### 4.2 Configure Domain

| ID | Task | Notes |
|----|------|-------|
| `4.2.1` | Add custom domain in hosting dashboard | e.g., `pascalandy.com` |
| `4.2.2` | Configure DNS records | Usually CNAME or A records |
| `4.2.3` | Enable HTTPS | Most platforms do this automatically |
| `4.2.4` | Verify `SITE.website` matches deployed URL | Must match exactly for sitemap/RSS |

### 4.3 Optional: Environment Variables

| ID | Variable | Purpose |
|----|----------|---------|
| `4.3.1` | `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification |

---

## Phase 5: Post-Deployment

> Final checks after going live.

### 5.1 SEO & Analytics

| ID | Task | Tool/Service |
|----|------|--------------|
| `5.1.1` | Submit sitemap to Google | [Google Search Console](https://search.google.com/search-console) |
| `5.1.2` | Submit sitemap to Bing | [Bing Webmaster Tools](https://www.bing.com/webmasters) |
| `5.1.3` | Verify OG images | [opengraph.xyz](https://opengraph.xyz) |
| `5.1.4` | Test social sharing | Share a post on Twitter/LinkedIn |
| `5.1.5` | Set up analytics (optional) | Google Analytics, Plausible, etc. |

### 5.2 Performance Validation

| ID | Task | Tool |
|----|------|------|
| `5.2.1` | Run Lighthouse audit | Chrome DevTools or [web.dev/measure](https://web.dev/measure) |
| `5.2.2` | Check Core Web Vitals | [PageSpeed Insights](https://pagespeed.web.dev) |

---

## Already Completed ✓

These items are already customized in your codebase:

| Item | Location | Status |
|------|----------|--------|
| Homepage banner image | `src/assets/images/pascalandy-banner.jpg` | ✓ Custom |
| Homepage intro text | `src/pages/index.astro` | ✓ French text |
| Footer copyright | `src/components/Footer.astro` | ✓ "Le blog de Pascal Andy" |
| Site logo | `src/assets/icons/IconPascalAndy.svg` | ✓ Custom SVG |
| Social links | `src/constants.ts` | ✓ Your accounts |

---

## Quick Reference: File Locations

```
src/
├── config.ts              # Site metadata (CRITICAL)
├── constants.ts           # Social links (already done)
├── pages/
│   └── about.md           # About page (needs rewrite)
├── data/blog/
│   ├── examples/          # DELETE entire folder
│   └── *.md               # Documentation posts (decide)
└── assets/images/
    └── AstroPaper-*.png   # DELETE theme screenshots

public/
├── favicon.svg            # REPLACE with your favicon
└── astropaper-og.jpg      # REPLACE with your OG image
```

---

## Execution Order

1. **Phase 1** → Do first, blocks everything
2. **Phase 2** → Content cleanup
3. **Phase 3** → Verify locally
4. **Phase 4** → Deploy
5. **Phase 5** → Post-launch SEO

Total estimated time: **1-2 hours** for critical items, **30 min** for content cleanup.
