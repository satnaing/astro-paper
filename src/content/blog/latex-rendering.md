---
author: Alberto Perdomo
pubDatetime: 2024-09-08T20:58:52.737Z
title: Markdown and LaTeX
slug: markdown-latex
featured: false
tags:
  - rendering
description: How to use LaTeX equations in your Markdown files for AstroPaper.
---

# Introduction to LaTeX Equations in Markdown

This document demonstrates how to use LaTeX equations in your Markdown files for AstroPaper. LaTeX is a powerful typesetting system often used for mathematical and scientific documents.

## Instructions

In this section, you will find instructions on how to add support for LaTeX in your Markdown files for AstroPaper. 

1. Install the necessary dependencies by running `npm install rehype-katex remark-math katex`.

2. Update the Astro configuration to use the these libraries (see in **diff** format):

```
diff --git a/astro.config.ts b/astro.config.ts
index 8386d5d..28a0cff 100644
--- a/astro.config.ts
+++ b/astro.config.ts
@@ -3,6 +3,8 @@ import tailwind from "@astrojs/tailwind";
 import react from "@astrojs/react";
 import remarkToc from "remark-toc";
 import remarkCollapse from "remark-collapse";
+import remarkMath from 'remark-math';
+import rehypeKatex from 'rehype-katex';
 import sitemap from "@astrojs/sitemap";
 import { SITE } from "./src/config";
 
@@ -25,6 +27,10 @@ export default defineConfig({
           test: "Table of contents",
         },
       ],
+      remarkMath,
+    ],
+    rehypePlugins: [
+      rehypeKatex
     ],
     shikiConfig: {
       // For more themes, visit https://shiki.style/themes

```

3. Import KaTeX CSS in the main layout (see in **diff** format):

```
diff --git a/src/layouts/Layout.astro b/src/layouts/Layout.astro
index decf1c7..a72a75f 100644
--- a/src/layouts/Layout.astro
+++ b/src/layouts/Layout.astro
@@ -132,6 +132,7 @@ const structuredData = {
     <ViewTransitions />
 
     <script is:inline src="/toggle-theme.js"></script>
+    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css">
   </head>
   <body>
     <slot />
```

And *voilà*, this setup allows you to write LaTeX equations in your Markdown files, which will be rendered properly when the site is built. Once you do it, the rest of the document will appear rendered correctly. 

## Inline Equations

Inline equations are written between single dollar signs `$...$`. Here are some examples:

1. The famous mass-energy equivalence formula: $E = mc^2$
2. The quadratic formula: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
3. Euler's identity: $e^{i\pi} + 1 = 0$

## Block Equations

For more complex equations or when you want the equation to be displayed on its own line, use double dollar signs `$$...$$`:

The Gaussian integral:

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

The definition of the Riemann zeta function:

$$
\zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^s}
$$

Maxwell's equations in differential form:

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0\left(\mathbf{J} + \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}\right)
\end{aligned}
$$

## Using Mathematical Symbols

LaTeX provides a wide range of mathematical symbols:

- Greek letters: $\alpha$, $\beta$, $\gamma$, $\delta$, $\epsilon$, $\pi$
- Operators: $\sum$, $\prod$, $\int$, $\partial$, $\nabla$
- Relations: $\leq$, $\geq$, $\approx$, $\sim$, $\propto$
- Logical symbols: $\forall$, $\exists$, $\neg$, $\wedge$, $\vee$
