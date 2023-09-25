---
author: Sat Naing
pubDatetime: 2023-09-25T10:25:54.547Z
title: AstroPaper 3.0
postSlug: astro-paper-v3
featured: true
tags:
  - release
description: "AstroPaper Version 3: Elevating Your Web Experience with Astro v3 and Seamless View Transitions"
---

We're excited to announce the release of AstroPaper v3, packed with new features, enhancements, and bug fixes to elevate your web development experience. Let's dive into the highlights of this release:

## Table of contents

## Features & Changes

### Astro v3 Integration

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/18fdb604-1ca3-41a0-8372-1367759091ff" type="video/mp4">
  <!-- <source src="/assets/docs/astro-paper-v3-view-transitions-demo.mp4" type="video/mp4"> -->
</video>

AstroPaper now fully supports [Astro v3](https://astro.build/blog/astro-3/), offering improved performance and rendering speed.

Besides, we've added support for Astro's [ViewTransitions API](https://docs.astro.build/en/guides/view-transitions/), allowing you to create captivating and dynamic transitions between views.

In the "Recent Section", only non-featured posts will be displayed to avoid duplications and better support for ViewTransitions API.

### Update OG Image Generation Logic

![Example OG Image](https://user-images.githubusercontent.com/40914272/269252964-a0dc6735-80f7-41ed-8e74-4d4d70f96891.png)

We've updated the logic for automatic OG image generation, making it even more reliable and efficient. Besides, it now supports special characters in post titles, ensuring accurate, flexible and eye-catching social media previews.

`SITE.ogImage` is now optional. If it is not specified, AstroPaper will automatically generate an OG image using `SITE.title`, `SITE.desc` and `SITE.website`

### Theme meta tag

The theme-color meta tag has been added to dynamically adapt to theme switches, ensuring a seamless user experience.

> Notice the difference at the top

**_AstroPaper v2 theme switch_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/3ab5a1e8-1891-4264-a5bb-0ded69143c1a" type="video/mp4">
</video>

**_AstroPaper v3 theme switch_**

<video autoplay loop="loop" muted="muted" plays-inline="true">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/8ac9deb8-d1f8-4029-86bd-6aa0def380b4" type="video/mp4">
</video>

## Other Changes

### Astro Prettier Plugin

Astro Prettier Plugin is installed out-of-the-box in order to keep the project tidy and organized.

### Minor Style Changes

The single-line code block wrapping issue has been solved, making your code snippets look pristine.

Update nav style CSS to allow adding more nav links to the navigation.

## Outro

Ready to explore the exciting new features and improvements in AstroPaper v3? Start [using AstroPaper](https://github.com/satnaing/astro-paper) now.

For other bug fixes and integration updates, check out the [release notes](https://github.com/satnaing/astro-paper/releases/tag/v3.0.0) to learn more.
