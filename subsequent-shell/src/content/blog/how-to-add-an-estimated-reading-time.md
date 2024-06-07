---
title: How to add an estimated reading time in AstroPaper
author: Sat Naing
pubDatetime: 2023-07-21T10:11:06.130Z
modDatetime: 2024-01-03T14:53:25Z
slug: how-to-add-estimated-reading-time
featured: false
draft: false
tags:
  - FAQ
description: How you can add an 'Estimated Reading time' in your blog posts of AstroPaper.
---

As the [Astro docs](https://docs.astro.build/en/recipes/reading-time/) say, we can use remark plugin to add a reading time property in our frontmatter. However, for some reason, we can't add this feature by following what stated in Astro docs. Therefore, to achieve this, we have to tweak a little bit. This post will demonstrate how we can do that.

## Table of contents

## Add reading time in PostDetails

Step (1) Install required dependencies.

```bash
npm install reading-time mdast-util-to-string
```

Step (2) Create `remark-reading-time.mjs` file under `utils` directory

```js
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.readingTime = readingTime.text;
  };
}
```

Step (3) Add the plugin to `astro.config.ts`

```js
import { remarkReadingTime } from "./src/utils/remark-reading-time.mjs"; // make sure your relative path is correct

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    // other integrations
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      remarkReadingTime, // 👈🏻 our plugin
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    // other config
  },
  // other config
});
```

Step (4) Add `readingTime` to blog schema (`src/content/config.ts`)

```ts
import { SITE } from "@config";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      // others...
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(), // 👈🏻 readingTime frontmatter
    }),
});

export const collections = { blog };
```

Step (5) Create a new file called `getPostsWithRT.ts` under `src/utils` directory.

```ts
import type { MarkdownInstance } from "astro";
import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export const getReadingTime = async () => {
  // Get all posts using glob. This is to get the updated frontmatter
  const globPosts = import.meta.glob("../content/blog/*.md") as Promise<
    CollectionEntry<"blog">["data"][]
  >;

  // Then, set those frontmatter value in a JS Map with key value pair
  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async globPost => {
      const { frontmatter } = await globPost();
      mapFrontmatter.set(
        slugifyStr(frontmatter.title),
        frontmatter.readingTime
      );
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugifyStr(post.data.title));
    return post;
  });
};

export default getPostsWithRT;
```

Step (6) Refactor `getStaticPaths` of `/src/pages/posts/[slug].astro` as the following

```ts
---
// other imports
import getPostsWithRT from "@utils/getPostsWithRT";

export interface Props {
  post: CollectionEntry<"blog">;
}

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  const postsWithRT = await getPostsWithRT(posts); // replace reading time logic with this func

   const postResult = postsWithRT.map(post => ({ // make sure to replace posts with postsWithRT
    params: { slug: post.slug },
    props: { post },
  }));

// other codes
```

Step (7) Refactor `PostDetails.astro` like this. Now you can access and display `readingTime` in `PostDetails.astro`

```ts
---
// imports

export interface Props {
  post: CollectionEntry<"blog">;
}

const { post } = Astro.props;

const {
  title,
  author,
  description,
  ogImage,
  readingTime, // we can now directly access readingTime from frontmatter
  pubDatetime,
  modDatetime,
  tags } = post.data;

// other codes
---
```

## Access reading time outside of PostDetails (optional)

By following the previous steps, you can now access `readingTime` frontmatter property in you post details page. Sometimes, this is exactly what you want. If so, you can skip to the next section. However, if you want to display "estimated reading time" in index, posts, and technically everywhere, you need to do the following extra steps.

Step (1) Update `utils/getSortedPosts.ts` as the following

```ts
import type { CollectionEntry } from "astro:content";
import getPostsWithRT from "./getPostsWithRT";

const getSortedPosts = async (posts: CollectionEntry<"blog">[]) => {
  // make sure that this func is async
  const postsWithRT = await getPostsWithRT(posts); // add reading time
  return postsWithRT
    .filter(({ data }) => !data.draft)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedPosts;
```

Step (2) Make sure to refactor every file which uses `getSortedPosts` function. You can simply add `await` keyword in front of `getSortedPosts` function.

Files that use `getSortedPosts` function are as follow

- src/pages/index.astro
- src/pages/posts/index.astro
- src/pages/rss.xml.ts
- src/pages/posts/index.astro
- src/pages/posts/[slug].astro
- src/utils/getPostsByTag.ts

All you have to do is like this

```ts
const sortedPosts = getSortedPosts(posts); // old code ❌
const sortedPosts = await getSortedPosts(posts); // new code ✅
```

Now you can access `readingTime` in other places besides `PostDetails`

## Displaying reading time (optional)

Since you can now access `readingTime` in your post details (or everywhere if you do the above section), it's up to you to display `readingTime` wherever you want.

But in this section, I'm gonna show you how I would display `readingTime` in my components. This is optional. You can ignore this section if you want.

Step (1) Update `Datetime` component to display `readingTime`

```tsx
import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
  readingTime?: string; // new type
}

export default function Datetime({
  datetime,
  size = "sm",
  className,
  readingTime, // new prop
}: Props) {
  return (
    // other codes
    <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
      <FormattedDatetime pubDatetime={pubDatetime} modDatetime={modDatetime} />
      <span> ({readingTime})</span> {/* display reading time */}
    </span>
    // other codes
  );
}
```

Step (2) Then, pass `readingTime` props from its parent component.

file: Card.tsx

```ts
export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime description, readingTime } = frontmatter;
  return (
    ...
    <Datetime
      pubDatetime={pubDatetime}
      modDatetime={modDatetime}
      readingTime={readingTime}
    />
    ...
  );
}
```

file: PostDetails.tsx

```jsx
// Other Codes
<main id="main-content">
  <h1 class="post-title">{title}</h1>
  <Datetime
    pubDatetime={pubDatetime}
    modDatetime={modDatetime}
    size="lg"
    className="my-2"
    readingTime={readingTime}
  />
  {/* Other Codes */}
</main>
// Other Codes
```

## Conclusion

By following the provided steps and tweaks, you can now incorporate this useful feature into your content. I hope this post helps you adding `readingTime` in your blog. AstroPaper might include reading time by default in future releases. 🤷🏻‍♂️

Kyay Zuu for Reading 🙏🏻
