---
author: Sat Naing
pubDatetime: 2022-09-26T12:13:24Z
modDatetime: 2024-01-04T09:09:06Z
title: Predefined color schemes
slug: predefined-color-schemes
featured: false
draft: true
tags:
  - color-schemes
description:
  Some of the well-crafted, predefined color schemes for AstroPaper blog
  theme.
---

I've crafted some predefined color schemes for this AstroPaper blog theme. You can replace these color schemes with the original ones.

If you don't know how you can configure color schemes, check [this blog post](https://astro-paper.pages.dev/posts/customizing-astropaper-theme-color-schemes/).

## Table of contents

## Light color schemes

Light color scheme has to be defined using the css selector `:root` and `html[data-theme="light"]`.

### Lobster

![lobster-color-scheme](https://user-images.githubusercontent.com/53733092/192282447-1d222faf-a3ce-44a9-9cfe-ac873155e5a9.png)

```css
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
```

### Leaf Blue

![leaf-blue-color-scheme](https://user-images.githubusercontent.com/53733092/192318782-e80e3c39-54b5-423e-8f4b-9ae60402fc8d.png)

```css
:root,
html[data-theme="light"] {
  --background: #f2f5ec;
  --foreground: #353538;
  --accent: #1158d1;
  --muted: #bbc789;
  --border: #7cadff;
}
```

### Pinky light

![pinky-color-scheme](https://user-images.githubusercontent.com/53733092/192286510-892d0042-2d6d-471e-bb72-954221ae2d17.png)

```css
:root,
html[data-theme="light"] {
  --background: #fafcfc;
  --foreground: #222e36;
  --accent: #d3006a;
  --muted: #f1bad4;
  --border: #e3a9c6;
}
```

## Dark color schemes

Dark color scheme has to be defined as `html[data-theme="dark"]`.

### AstroPaper 1 original Dark Theme

![AstroPaper 1 default dark theme](https://user-images.githubusercontent.com/53733092/215769153-13b0ad8d-5ba2-44b1-af06-e5ae61293f62.png)

```css
html[data-theme="dark"] {
  --background: #2f3741;
  --foreground: #e6e6e6;
  --accent: #1ad9d9;
  --muted: #596b81;
  --border: #3b4655;
}
```

### Deep Oyster

![deep-oyster-color-scheme](https://user-images.githubusercontent.com/53733092/192314524-45ec5904-3d8f-450a-9edf-1e32c5e11d6c.png)

```css
html[data-theme="dark"] {
  --background: #21233d;
  --foreground: #f4f7f5;
  --accent: #ff5256;
  --muted: #4a4e86;
  --border: #b12f32;
}
```

### Pikky dark

![pinky-dark-color-scheme](https://user-images.githubusercontent.com/53733092/192307050-fbd55326-911c-4001-87c6-a8ad9378ac2e.png)

```css
html[data-theme="dark"] {
  --background: #353640;
  --foreground: #e9edf1;
  --accent: #ff78c8;
  --muted: #715566;
  --border: #86436b;
}
```

### Astro dark (High Contrast)

![astro-dark-color-scheme](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

```css
html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #8a3302;
  --border: #ab4b08;
}
```

### Astro dark (New default dark theme in AstroPaper 2)

![new dark color scheme - low contrast](https://user-images.githubusercontent.com/53733092/215772856-d5b7ae35-ddaa-4ed6-b0bf-3fa5dbcf834c.png)

```css
html[data-theme="dark"] {
  --background: #212737; /* lower contrast background */
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #8a3302;
  --border: #ab4b08;
}
```

### Astro Deep Purple (New dark theme in AstroPaper 3)

![AstroPaper v3 new theme](https://github.com/satnaing/astro-paper/assets/53733092/c8b5d7e1-a3bc-4852-a5ad-4abf7b3cec79)

```css
html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #eb3fd3;
  --muted: #7d4f7c;
  --border: #642451;
}
```

### AstroPaper v4 Special (New dark theme in AstroPaper 4)

![AstroPaper v4 new theme](https://github.com/satnaing/astro-paper/assets/53733092/66eb74dc-7a0e-4f2e-982d-25f5c443b25a)

```css
html[data-theme="dark"] {
  --background: #000123;
  --accent: #617bff;
  --foreground: #eaedf3;
  --muted: #0c0e4f;
  --border: #303f8a;
}
```
