---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
title: Adding LaTeX Equations in AstroPaper blog posts
featured: false
tags:
  - rendering
  - docs
description: How to use LaTeX equations in your Markdown files for AstroPaper.
---

This document demonstrates how to use LaTeX equations in your Markdown files for AstroPaper. LaTeX is a powerful typesetting system often used for mathematical and scientific documents.

## Table of contents

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for AstroPaper.

1. Install the necessary remark and rehype plugins by running `npm install rehype-katex remark-math katex`.

2. Update the Astro configuration (`astro.config.ts`) to use the these plugins:

```ts
// other imports
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default defineConfig({
  // other configs
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    rehypePlugins: [rehypeKatex],
    // other markdown configs
  },
  // other configs
});
```

3. Import KaTeX CSS in the main layout file `src/layouts/Layout.astro`

```astro
---
import { LOCALE, SITE } from "@config";

// astro code
---

<!doctype html>
<!-- others... -->
<script is:inline src="/toggle-theme.js"></script>
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css"
/>

<body>
  <slot />
</body>
```

And _voilà_, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built. Once you do it, the rest of the document will appear rendered correctly.

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: `$E = mc^2$`
2. The quadratic formula: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. Euler's identity: `$e^{i\pi} + 1 = 0$`

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, use double dollar signs `$$...$$`:

The Gaussian integral:

```bash
$$ \int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi} $$
```

The definition of the Riemann zeta function:

```bash
$$ \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s} $$
```

Maxwell's equations in differential form:

```bash
$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$
```

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\epsilon$`, `$\pi$`
- Operators: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relations: `$\leq$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Logical symbols: `$\forall$`, `$\exists$`, `$\neg$`, `$\wedge$`, `$\vee$`
