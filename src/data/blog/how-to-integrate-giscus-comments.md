---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2025-03-12T12:28:53Z
title: How to integrate Giscus comments into AstroPaper
slug: how-to-integrate-giscus-comments
featured: false
draft: false
tags:
  - astro
  - blog
  - docs
description: Comment function on a static blog hosted on GitHub Pages with Giscus.
---

Hosting a thin static blog on a platform like [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) has numerous advantages, but also takes away some interactivity. Fortunately, [Giscus](https://giscus.app/) exists and offers a way to embed user comments on static sites.

## Table of contents

## How _Giscus_ works

[Giscus uses the GitHub API](https://github.com/giscus/giscus?tab=readme-ov-file#how-it-works) to read and store comments made by _GitHub_ users in the `Discussions` associated with a repository.

Embed the _Giscus_ client-side script bundle on your site, configure it with the correct repository URL, and users can view and write comments (when logged into _GitHub_).

The approach is serverless, as the comments are stored on _GitHub_ and dynamically loaded from there on client side, hence perfect for a static blog, like _AstroPaper_.

## Setting up _Giscus_

_Giscus_ can be set up easily on [giscus.app](https://giscus.app/), but I will outline the process shortly still.

### Prequisites

Prequisites to get _Giscus_ working are

- the repository is [public](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility#making-a-repository-public)
- the [Giscus app](https://github.com/apps/giscus) is installed
- the [Discussions](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository) feature is turned on for your repository

If any of these conditions cannot be fulfilled for any reason, unfortunately, _Giscus_ cannot be integrated.

### Configuring _Giscus_

Next, configuring _Giscus_ is necessary. In most cases, the preselected defaults are suitable, and you should only modify them if you have a specific reason and know what you are doing. Don't worry too much about making the wrong choices; you can always adjust the configuration later on.

However you need to

- select the right language for the UI
- specify the _GitHub_ repository you want to connect, typically the repository containing your statically hosted _AstroPaper_ blog on _GitHub Pages_
- create and set an `Announcement` type discussion on _GitHub_ if you want to ensure nobody can create random comments directly on _GitHub_
- define the color scheme

After configuring the settings, _Giscus_ provides you with a generated `<script>` tag, which you will need in the next steps.

## Simple script tag

You should now have a script tag that looks like this:

```html
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="bottom"
  data-theme="preferred_color_scheme"
  data-lang="en"
  crossorigin="anonymous"
  async
></script>
```

Simply add that to the source code of the site. Most likely, if you're using _AstroPaper_ and want to enable comments on posts, navigate to `src/layouts/PostDetails.astro` and paste it into the desired location where you want the comments to appear, perhaps underneath the `Share this post on:` buttons.

```diff
      <ShareLinks />
    </div>

+    <script src="https://giscus.app/client.js"
+        data-repo="[ENTER REPO HERE]"
+        data-repo-id="[ENTER REPO ID HERE]"
+        data-category="[ENTER CATEGORY NAME HERE]"
+        data-category-id="[ENTER CATEGORY ID HERE]"
+        ...
+    </script>

  </main>
  <Footer />
</Layout>
```

And it's done! You have successfully integrated comments in _AstroPaper_!

## React component with light/dark theme

The embedded script tag in the layout is quite static, with the _Giscus_ configuration, including `theme`, hardcoded into the layout. Given that _AstroPaper_ features a light/dark theme toggle, it would be nice for the comments to seamlessly transition between light and dark themes along with the rest of the site. To achieve this, a more sophisticated approach to embedding _Giscus_ is required.

Firstly, we are going to install the [React component](https://www.npmjs.com/package/@giscus/react) for _Giscus_:

```bash
npm i @giscus/react && npx astro add react
```

Then we create a new `Comments.tsx` React component in `src/components`:

```tsx
import Giscus, { type Theme } from "@giscus/react";
import { GISCUS } from "@/constants";
import { useEffect, useState } from "react";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(() => {
    const currentTheme = localStorage.getItem("theme");
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    return currentTheme || browserTheme;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = ({ matches }: MediaQueryListEvent) => {
      setTheme(matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const themeButton = document.querySelector("#theme-btn");
    const handleClick = () => {
      setTheme(prevTheme => (prevTheme === "dark" ? "light" : "dark"));
    };

    themeButton?.addEventListener("click", handleClick);

    return () => themeButton?.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "light" ? lightTheme : darkTheme} {...GISCUS} />
    </div>
  );
}
```

This _React_ component not only wraps the native _Giscus_ component, but also introduces additional props, namely `lightTheme` and `darkTheme`. Leveraging two event listeners, the _Giscus_ comments will align with the site's theme, dynamically switching between dark and light themes whenever the site or browser theme is changed.

We also need to define the `GISCUS` config, for which the optimal location is in `src/constants.ts`:

```ts
import type { GiscusProps } from "@giscus/react";

...

export const GISCUS: GiscusProps = {
  repo: "[ENTER REPO HERE]",
  repoId: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  categoryId: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactionsEnabled: "0",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "en",
  loading: "lazy",
};
```

Note that specifying a `theme` here will override the `lightTheme` and `darkTheme` props, resulting in a static theme setting, similar to the previous approach of embedding _Giscus_ with the `<script>` tag.

To complete the process, add the new Comments component to `src/layouts/PostDetails.astro` (replacing the `script` tag from the previous step).

```diff
+ import Comments from "@/components/Comments";

      <ShareLinks />
    </div>

+   <Comments client:only="react" />

    <hr class="my-6 border-dashed" />

  </main>
  <Footer />
</Layout>
```

And that's it!
