---
layout: ../layouts/AboutLayout.astro
title: "About"
---

Astro-Paper is a minimal, responsive and SEO-friendly Astro blog theme. This theme is written in vanilla JavaScript (+ TypeScript for type checking) without any additional frontend frameworks like React, Vue, Svelte etc. TailwindCSS is used for styling; and Markdown is used for blog posts.

This theme is aimed to be responsive, SEO-friendly and accessible out of
the box. Light and dark mode are supported by default and additional
color schemes can also be configured. See the documentation for more
info.

<div>
  <img src="/assets/dev.svg" class="sm:w-1/2 mx-auto" alt="coding dev illustration">
</div>

Now I'm going to show you an example of an unordered list to make sure that looks good, too:

- So here is the first item in this list.
- In this example we're keeping the items short.
- Later, we'll use longer, more complex list items.

I think most people are going to use [highlight.js](https://highlightjs.org/) or [Prism](https://prismjs.com/) or something if they want to style their code blocks but it wouldn't hurt to make them look _okay_ out of the box, even with no syntax highlighting.

Here's what a default `tailwind.config.js` file looks like at the time of writing:

```js
module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
```

Hopefully that looks good enough to you.
