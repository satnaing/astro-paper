---
author: Federico D'Eredità
pubDatetime: 2026-09-06T00:00:00Z
title: Previewing draft posts in dev mode
draft: false
tags:
  - docs
description: How to preview draft posts locally with the dev-toolbar toggle, without publishing them.
---

If you write a post with `draft: true` in the frontmatter, AstroPaper hides it everywhere by default, including on your own machine while you're writing. That's usually what you want, but it makes it hard to see how an unfinished post actually looks on the site.

Running `astro dev`, you'll see a small pencil icon (📝) in the dev toolbar at the bottom of the page. Click it, and every draft post shows up across the site, with a "DRAFT: " label in front of its title so it's easy to tell apart from published posts.

![The "Show drafts" icon in the Astro dev toolbar, with its tooltip visible](@/assets/images/dev-toolbar-show-drafts-toggle.png)

Click it again to hide drafts. This only affects your local dev server: production builds never show draft posts, no matter what state the toggle was left in.
