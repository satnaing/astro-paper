---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: AstroPaper 4.0
slug: "astro-paper-v4"
featured: false
ogImage: ../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4: ensuring a smoother and more feature-rich blogging experience."
---

Hello everyone! Wishing you a happy New Year 🎉 and all the best for 2024! We're excited to announce the release of AstroPaper v4, a significant update that introduces a range of new features, improvements, and bug fixes to elevate your blogging experience. A big thank you to all the contributors for their valuable input and efforts in making version 4 possible!

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## Table of contents

## Major Changes

### Upgrade to Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper now leverages the power and capabilities of Astro v4. However, it’s a subtle upgrade and won’t break most Astro users.

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### Replace `postSlug` with Astro Content `slug` [#197](https://github.com/satnaing/astro-paper/pull/197)

The `postSlug` in the blog content schema is no longer available in AstroPaper v4. Initially Astro doesn't have a `slug` mechanism and thus we have to figure it out on our own. Since Astro v3, it supports content collection and slug features. Now, we believe it's time to adopt Astro's out-of-the-box `slug` feature.

**_file: src/content/blog/astro-paper-4.md_**

```bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # if slug is not specified, it will be 'astro-paper-4' (file name).
# slug: "" ❌ cannot be an empty string
---
```

The behavior of the `slug` is slightly different now. In the previous versions of AstroPaper, if the `postSlug` is not specified in a blog post (markdown file), the title of that blog post would be slugified and used as the `slug`. However, in AstroPaper v4, if the `slug` field is not specified, the markdown file name will be used as the `slug`. One thing to keep in mind is that the `slug` field can be omitted, but it cannot be an empty string (slug: "" ❌).

If you're upgrading AstroPaper from v3 to v4, make sure to replace `postSlug` in your `src/content/blog/*.md` files with `slug`.

## New Features

### Add code-snippets for content creation [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper now includes VSCode snippets for new blog posts, eliminating the need for manual copy/pasting of the frontmatter and content structure (table of contents, heading, excerpt, etc.).

Read more about VSCode Snippets [here](https://code.visualstudio.com/docs/editor/userdefinedsnippets#:~:text=In%20Visual%20Studio%20Code%2C%20snippets,Snippet%20in%20the%20Command%20Palette).

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### Add Modified Datetime in Blog Posts [#195](https://github.com/satnaing/astro-paper/pull/195)

Keep readers informed about the latest updates by displaying the modified datetime in blog posts. This not only instills user trust in the freshness of the articles but also contributes to improved SEO for the blog.

![Last Modified Date feature in AstroPaper](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

You can add a `modDatetime` to your blog post if you've made modifications. Now, the sorting behavior of the posts is slightly different. All posts are sorted by both `pubDatetime` and `modDatetime`. If a post has both a `pubDatetime` and `modDatetime`, its sorting position will be determined by the `modDatetime`. If not, only `pubDatetime` will be considered to determine the post's sorting order.

### Implement Back-to-Top Button [#188](https://github.com/satnaing/astro-paper/pull/188)

Enhance user navigation on your blog detail post with the newly implemented back-to-top button.

![Back to top button in AstroPaper](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### Add Pagination in Tag Posts [#201](https://github.com/satnaing/astro-paper/pull/201)

Improve content organization and navigation with the addition of pagination in tag posts, making it easier for users to explore related content. This ensures that if a tag has many posts, readers won't be overwhelmed by all the tag-related posts.

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### Dynamically Generate robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 now dynamically generates the robots.txt file, giving you more control over search engine indexing and web crawling. Besides, sitemap URL will also be added inside `robot.txt` file.

### Add Docker-Compose File [#174](https://github.com/satnaing/astro-paper/pull/174)

Managing your AstroPaper environment is now easier than ever with the addition of a Docker-Compose file, simplifying deployment and configuration.

## Refactoring & Bug Fixes

### Replace Slugified Title with Unslugified Tag Name [#198](https://github.com/satnaing/astro-paper/pull/198)

To improve clarity, user experience and SEO, titles (`Tag: some-tag`) in tag page are no longer slugified (`Tag: Some Tag`).

![Unslugified Tag Names](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### Implement 100svh for Min-Height ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76))

We've updated the min-height on the body to use 100svh, offering a better UX for mobile users.

### Update Site URL as Single Source of Truth [#143](https://github.com/satnaing/astro-paper/pull/143)

The site URL is now a single source of truth, streamlining configuration and avoiding inconsistencies. Read more at this [PR](https://github.com/satnaing/astro-paper/pull/143) and its related issue(s).

### Solve Invisible Text Code Block Issue in Light Mode [#163](https://github.com/satnaing/astro-paper/pull/163)

We've fixed the invisible text code block issue in light mode.

### Decode Unicode Tag Characters in Breadcrumb [#175](https://github.com/satnaing/astro-paper/pull/175)

The last part of Tag in the breadcrumb is now decoded, making non-English Unicode characters display better.

### Update LOCALE Config to Cover Overall Locales ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))

The LOCALE configuration has been updated to cover a broader range of locales, catering to a more diverse audience.

## Outtro

We believe these updates will significantly elevate your AstroPaper experience. Thank you to everyone who contributed, solved issues, and gave stars to AstroPaper. We look forward to seeing the amazing content you create with AstroPaper v4!

Happy Blogging!

[Sat Naing](https://satnaing.dev) <br/>
Creator of AstroPaper
