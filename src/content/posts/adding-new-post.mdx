---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2026-06-03T00:00:00.000Z
title: Adding new posts in AstroPaper theme
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description: "Some rules & recommendations for creating or adding new posts using AstroPaper theme."
---
import ResponsiveTable from '@/components/ResponsiveTable.astro';

This guide covers the rules and conventions for creating new posts in AstroPaper — file placement, frontmatter fields, images, and syntax highlighting.

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by{" "}
    <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## Table of contents

## Creating a Blog Post

To write a new blog post, create a markdown (or MDX) file inside the `src/content/posts/` directory.

You can organize posts into subdirectories to make content easier to manage. The subdirectory name becomes part of the post URL. For example, `src/content/posts/2025/example-post.md` will be available at `/posts/2025/example-post`.

If you want a subdirectory for organization only, without it affecting the URL, prefix the folder name with an underscore (`_`).

```bash
# Example: post file paths and their URLs
src/content/posts/very-first-post.md          -> mysite.com/posts/very-first-post
src/content/posts/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/content/posts/_2026/another-post.md       -> mysite.com/posts/another-post
src/content/posts/docs/_legacy/how-to.md      -> mysite.com/posts/docs/how-to
src/content/posts/Example Dir/Dummy Post.md   -> mysite.com/posts/example-dir/dummy-post
```

> [!TIP]
> Files and directories prefixed with `_` are excluded from routing. Use them for drafts, shared assets, or internal-only content.

## Frontmatter

Frontmatter is the main place to store metadata about a blog post. It lives at the top of the file in YAML format. Read more about frontmatter and its usage in [Astro documentation](https://docs.astro.build/en/guides/markdown-content/).

Here is the list of frontmatter properties for each post:

<ResponsiveTable variant="striped-minimal">

| Property           | Description                                                                                                                         | Remark                                         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **_title_**        | Title of the post. (h1)                                                                                                             | required<sup>\*</sup>                          |
| **_description_**  | Description of the post. Used in post excerpt and site description of the post.                                                     | required<sup>\*</sup>                          |
| **_pubDatetime_**  | Published datetime in ISO 8601 format.                                                                                              | required<sup>\*</sup>                          |
| **_modDatetime_**  | Modified datetime in ISO 8601 format. (only add this property when a blog post is modified)                                         | optional                                       |
| **_author_**       | Author of the post.                                                                                                                 | default = `site.author`                        |
| **_featured_**     | Whether or not to display this post in the featured section of the home page.                                                       | default = false                                |
| **_draft_**        | Mark this post as 'unpublished'.                                                                                                    | default = false                                |
| **_tags_**         | Related keywords for this post. Written in array YAML format.                                                                       | default = others                               |
| **_ogImage_**      | OG image of the post. Useful for social media sharing and SEO. Can be a remote URL or an image path relative to the current folder. | default = `site.ogImage` or generated OG image |
| **_canonicalURL_** | Canonical URL (absolute), in case the article already exists on another source.                                                     | default = `Astro.site` + `Astro.url.pathname`  |
| **_hideEditPost_** | Hide the edit-post button under the post title. Applies only to the current post.                                                   | default = false                                |
| **_timezone_**     | Specify a timezone in IANA format for the current post. Overrides the global `site.timezone` config for this post only.             | default = `site.timezone`                      |

</ResponsiveTable>

> [!TIP]
> You can get an ISO 8601 datetime by running `new Date().toISOString()` in the console.

Only `title`, `description`, and `pubDatetime` fields in frontmatter must be specified.

Title and description (excerpt) are important for search engine optimization (SEO) and thus AstroPaper encourages you to include these in all blog posts.

If you omit `tags` in a blog post (in other words, if no tag is specified), the default tag `others` will be used as a tag for that post. You can set the default tag in `src/content.config.ts`:

```ts file="src/content.config.ts"
// ...
tags: z.array(z.string()).default(["others"]), // replace "others" with whatever you want
// ...
```

### Sample Frontmatter

Here is sample frontmatter for a post.

```yaml file="src/content/posts/sample-post.md"
---
title: The title of the post
author: your name
pubDatetime: 2022-09-21T05:17:19Z
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # remote URL
description: This is the example description of the example post.
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

### VS Code snippets (optional)

AstroPaper includes workspace snippets to speed up creating new posts:

- **frontmatter**: inserts the recommended frontmatter block
- **template**: inserts a basic post template (including `## Table of contents`)

These snippets live in `.vscode/astro-paper.code-snippets`. If you use VS Code (or Cursor), they should be available automatically when you open the workspace.

## Callouts

AstroPaper started supporting callouts in AstroPaper v6.1. They use a simple blockquote syntax powered by `rehype-callouts` (Obsidian theme).

Here are the most commonly used types:

> [!NOTE]
> Supplementary information the reader should be aware of.

> [!TIP]
> Helpful advice, shortcuts, or best practices.

> [!WARNING]
> Something that could go wrong or have unintended consequences.

> [!DANGER]
> Serious risk of failure, data loss, or incorrect behavior.

> [!INFO]
> Neutral informational context — less urgent than a note.

> [!SUCCESS]
> Confirmation that something worked or is correct.

The full list of supported types includes: `NOTE`, `ABSTRACT`, `INFO`, `TODO`, `TIP`, `SUCCESS`, `QUESTION`, `WARNING`, `FAILURE`, `DANGER`, `BUG`, `EXAMPLE`, `QUOTE` — each with its own icon and color. Many types also accept aliases (e.g. `HINT` and `IMPORTANT` for `TIP`, `CAUTION` for `WARNING`). See the [rehype-callouts docs](https://github.com/lin-stephanie/rehype-callouts) for the complete reference.

### Collapsible callouts

Add `-` after the type to make the callout collapsed by default, or `+` to make it expanded but collapsible:

> [!WARNING]- Read before proceeding
> This content is hidden until the reader expands it. Useful for long caveats that would otherwise interrupt the flow.

> [!TIP]+ Pro tip (expanded by default)
> This starts open but can be collapsed. Great for optional detail you still want visible on first load.

### Custom titles

Replace the default type label with any title you like by adding text after the type:

> [!NOTE] Did you know?
> The text after the type becomes the callout's heading. Leave it out and the type name is used automatically.

### Syntax summary

```md
> [!NOTE]
> Supplementary information.

> [!WARNING]- Collapsed by default
> Hidden until expanded.

> [!TIP]+ Expanded, but collapsible
> Starts open.

> [!DANGER] Custom title
> Replaces the default heading.
```

## Adding table of contents

By default, a post does not include any table of contents (TOC). To include one, write `Table of contents` as an h2 heading (`##` in Markdown) and place it where you want it to appear:

```md
---
# frontmatter
---

Here are some recommendations, tips & tricks for creating new posts in AstroPaper blog theme.

<!-- [!code ++] -->
## Table of contents

<!-- the rest of the post -->
```

## Headings

There's one thing to note about headings. AstroPaper blog posts use `title` (from frontmatter) as the main heading of the post. Therefore, the rest of the headings in the post should use `h2` \~ `h6`.

This rule is not mandatory, but highly recommended for visual, accessibility, and SEO purposes.

## Syntax Highlighting

AstroPaper uses [Shiki](https://shiki.style/) as the default syntax highlighter, with [@shikijs/transformers](https://shiki.style/packages/transformers) for enhanced fenced code blocks. If you don't want to use the transformers, you can remove them:

```bash
pnpm remove @shikijs/transformers
```

```ts file="astro.config.ts"
// ...
// [!code --:5]
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
        // [!code --:3]
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  // ...
});
```

## Storing Images for Blog Content

Here are two methods for storing images and using them inside a markdown file.

> [!IMPORTANT]
> If you need to style optimized images in markdown, you should [use MDX](https://docs.astro.build/en/guides/images/#images-in-mdx-files).

### Inside `src/assets/` directory (recommended)

You can store images inside the `src/assets/` directory. These images will be automatically optimized by Astro through the [Image Service API](https://docs.astro.build/en/reference/image-service-reference/).

You can use a relative path or alias path (`@/assets/`) to reference these images.

Example: suppose you want to display `example.jpg` whose path is `src/assets/images/example.jpg`.

```md
![something](@/assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work in markdown ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

> [!TIP]
> Technically, you can store images inside any directory under `src`. `src/assets` is just a recommendation.

### Inside `public/` directory

You can store images inside the `public/` directory. Keep in mind that images stored in `public/` remain untouched by Astro, meaning they will be unoptimized and you need to handle image optimization yourself.

For these images, use an absolute path. They can be displayed using [markdown image syntax](https://www.markdownguide.org/basic-syntax/#images-1) or an HTML `img` tag.

Example: assume `example.jpg` is located at `public/assets/images/example.jpg`.

```md
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

## Bonus

### Image compression

> [!WARNING]
> When putting images in a blog post (especially those in the `public/` directory), compress them first. Unoptimized images significantly hurt page performance.

Recommended image compression sites:

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG Image

The default OG image will be used if a post does not specify one. Though not required, an OG image relevant to the post should be specified in the frontmatter. The recommended size for OG images is **_1200 X 640_** px.

> [!TIP]
> Since AstroPaper v1.4.0, OG images are generated automatically if not specified. Check out [the announcement](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/).
