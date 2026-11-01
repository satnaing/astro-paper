---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
modDatetime: 2026-11-01T10:00:00.000Z
title: How to add LaTeX Equations in Astro blog posts
tags:
  - docs
description: Learn how to add LaTeX equations in Astro blog posts using Markdown, KaTeX, and remark/rehype plugins.
---

This document demonstrates how to use LaTeX equations in your Markdown files for AstroPaper. LaTeX is a powerful typesetting system often used for mathematical and scientific documents.

<figure>
  <img
    src="https://images.pexels.com/photos/22690748/pexels-photo-22690748/free-photo-of-close-up-of-complicated-equations-written-on-a-blackboard.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    alt="Free Close-up of complex equations on a chalkboard, showcasing chemistry and math symbols. Stock Photo"
  />
  <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/close-up-of-complicated-equations-written-on-a-blackboard-22690748/">Vitaly Gariev</a>
  </figcaption>
</figure>

## Table of contents

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for AstroPaper.

1. Install the necessary remark and rehype plugins by running:

   ```bash
   pnpm add rehype-katex remark-math katex@^0.16
   ```

   `rehype-katex` renders equations with KaTeX 0.16, so `katex` is pinned to the same version. This keeps the KaTeX CSS in step 3 in sync with the HTML it styles.

2. Add the plugins to the `unified()` Markdown processor in the Astro config:

   ```ts file=astro.config.ts
   // ...
   import remarkMath from "remark-math"; // [!code ++]
   import rehypeKatex from "rehype-katex"; // [!code ++]

   export default defineConfig({
     // ...
     markdown: {
       processor: unified({
         remarkPlugins: [
           remarkMath, // [!code ++]
           remarkToc,
           [remarkCollapse, { test: "Table of contents" }],
         ],
         rehypePlugins: [rehypeCallouts, rehypeKatex], // [!code highlight]
       }),
       // ...
     },
     // ...
   });
   ```

3. Import the KaTeX CSS in the main layout file:

   ```astro file=src/layouts/Layout.astro
   ---
   // ...
   import "@/styles/global.css";
   import "katex/dist/katex.min.css"; // [!code ++]
   // ...
   ---
   ```

   The CSS and its fonts are bundled with your site at build time, so there's no CDN link to keep up to date.

4. As the last step, give block equations the theme's text color in `typography.css`. Without it, they keep the Tailwind Typography default color, which is hard to read in dark mode.

   ```css file=src/styles/typography.css
   @layer base {
     .app-prose {
       /* other styles */

       /* [!code highlight:3] */
       .katex-display {
         @apply text-foreground;
       }
     }
   }
   ```

And _voilà_, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built.

---

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: `$E = mc^2$`
2. The quadratic formula: `$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$`
3. Euler's identity: `$e^{i\pi} + 1 = 0$`

---

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, put the equation between double dollar signs `$$`, each on its own line (written on a single line, `$$...$$` renders inline):

The Gaussian integral:

```bash
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

The definition of the Riemann zeta function:

```bash
$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$
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

---

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: `$\alpha$`, `$\beta$`, `$\gamma$`, `$\delta$`, `$\epsilon$`, `$\pi$`
- Operators: `$\sum$`, `$\prod$`, `$\int$`, `$\partial$`, `$\nabla$`
- Relations: `$\leq$`, `$\geq$`, `$\approx$`, `$\sim$`, `$\propto$`
- Logical symbols: `$\forall$`, `$\exists$`, `$\neg$`, `$\wedge$`, `$\vee$`
