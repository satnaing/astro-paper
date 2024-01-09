---
author: Simon Smale
pubDatetime: 2024-01-08T18:16:00.000Z
modDatetime:
title: How to add a new Social Icon to AstroPaper
featured: false
draft: false
tags:
  - FAQ
description: How to add a new social icon to AstroPaper
---

Hot new platform? Niche corner of the internet? Or one specific to your area? This post will guide you through how to add a new social icon to the theme.

## Table of contents

## Merging back to the theme

The maintainer of the theme [Sat Naing](https://github.com/satnaing) has said that he intends to only

> keep the project supporting only a specific set of popular social icons.

So there is a chance that your icon will not be in the repo, but fear not, it is very easy to add your own!

## Getting things to match

The icon set used by the theme come from [Tabler](https://tabler.io/icons) and there are a quite a few brands on there.

## Adding your icon, by example

For this guide we are going to use the StackOverflow icon as our example.

### Find the icon

> In this case, we are going to use the `StackOverflow` as an example.

Searching on Tabler for 'StackOverflow' we get a single icon <https://tabler.io/icons/icon/brand-stackoverflow>, we are going to need the svg code, so save it for later.

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon icon-tabler icon-tabler-brand-stackoverflow"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  stroke-width="2"
  stroke="currentColor"
  fill="none"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1" />
  <path d="M8 16h8" />
  <path d="M8.322 12.582l7.956 .836" />
  <path d="M8.787 9.168l7.826 1.664" />
  <path d="M10.096 5.764l7.608 2.472" />
</svg>
```

### Clean up

We need to do some tidy up on what the theme provides us.

1. remove all classes other than `icon-tabler`
2. remove width & height
3. remove the viewBox
4. remove the stroke-width
5. remove the stroke
6. remove the fill

This should leave you with the following

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="icon-tabler
  stroke-linecap="round" stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1" />
  <path d="M8 16h8" />
  <path d="M8.322 12.582l7.956 .836" />
  <path d="M8.787 9.168l7.826 1.664" />
  <path d="M10.096 5.764l7.608 2.472" />
</svg>
```

Now we can add the clean svg code to the `src/assets/socialIcons.ts` file in `SocialIcons`.

```typescript
const socialIcons = {
  /* others */
  StackOverflow: `<svg
       xmlns="http://www.w3.org/2000/svg"
       class="icon-tabler
       stroke-linecap="round" stroke-linejoin="round"
     >
       <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
       <path d="M4 17v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-1" />
       <path d="M8 16h8" />
       <path d="M8.322 12.582l7.956 .836" />
       <path d="M8.787 9.168l7.826 1.664" />
       <path d="M10.096 5.764l7.608 2.472" />
     </svg>`,
};
```

Finally we can configure it for our blog in `src/config.ts` under `SOCIALS`. Setting `active: true` to add it to the site.

```typescript
export const SOCIALS: SocialObjects = [
  /* others */
  {
    name: "StackOverflow",
    href: "https://stackoverflow.com/search?q=astropaper",
    linkTitle: `See what questions there are about ${SITE.title} on StackOverflow`,
    active: true,
  },
];
```

> Ensure that `href` and `linkTitle` are updated for the corresponding link and label.

Full code for the above steps can be found in [this pull request](https://github.com/satnaing/astro-paper/pull/216/files)
