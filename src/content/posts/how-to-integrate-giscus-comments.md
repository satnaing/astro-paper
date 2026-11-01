---
author: FjellOverflow
pubDatetime: 2024-07-25T11:11:53Z
modDatetime: 2026-11-01T10:00:00Z
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

### Prerequisites

Prerequisites to get _Giscus_ working are

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

Simply add that to the source code of the site. Most likely, if you're using _AstroPaper_ and want to enable comments on posts, navigate to `src/pages/posts/[...slug]/index.astro` and paste it into the desired location where you want the comments to appear, perhaps underneath the `Share this post:` buttons.

_AstroPaper_ uses Astro's [client-side routing](https://docs.astro.build/en/guides/view-transitions/), so a script runs only once by default. Add `data-astro-rerun` to the script tag, so the comments load again when you go to another post.

```astro file=src/pages/posts/[...slug]/index.astro
<ShareLinks />

<!-- [!code ++:7] -->
<script
  src="https://giscus.app/client.js"
  data-repo="[ENTER REPO HERE]"
  data-repo-id="[ENTER REPO ID HERE]"
  data-category="[ENTER CATEGORY NAME HERE]"
  data-category-id="[ENTER CATEGORY ID HERE]"
  data-astro-rerun></script>

<hr class="my-8 border-dashed" />
```

And it's done! You have successfully integrated comments in _AstroPaper_!

## React component with light/dark theme

The embedded script tag in the layout is quite static, with the _Giscus_ configuration, including `theme`, hardcoded into the layout. Given that _AstroPaper_ features a light/dark theme toggle, it would be nice for the comments to seamlessly transition between light and dark themes along with the rest of the site. To achieve this, a more sophisticated approach to embedding _Giscus_ is required.

Firstly, we are going to install the [React component](https://www.npmjs.com/package/@giscus/react) for _Giscus_:

```bash
pnpm astro add react
pnpm add @giscus/react
```

Then we create a new `Comments.tsx` React component in `src/components`:

```tsx file=src/components/Comments.tsx
import Giscus, { type GiscusProps, type Theme } from "@giscus/react";
import { useEffect, useState } from "react";

const GISCUS: GiscusProps = {
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

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
}: CommentsProps) {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme);
    });

    observer.observe(root, { attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8">
      <Giscus theme={theme === "dark" ? darkTheme : lightTheme} {...GISCUS} />
    </div>
  );
}
```

This _React_ component not only wraps the native _Giscus_ component, but also introduces additional props, namely `lightTheme` and `darkTheme`. _AstroPaper_ sets the current theme as `data-theme` on the `<html>` element, so the component watches that attribute. The _Giscus_ comments switch between dark and light themes whenever the site theme changes, whether from the theme button or the browser setting.

The `GISCUS` config at the top of the file holds the values from [giscus.app](https://giscus.app/). Note that specifying a `theme` there will override the `lightTheme` and `darkTheme` props, resulting in a static theme setting, similar to the previous approach of embedding _Giscus_ with the `<script>` tag.

To complete the process, add the new Comments component to `src/pages/posts/[...slug]/index.astro` (replacing the `script` tag from the previous step).

```astro file=src/pages/posts/[...slug]/index.astro
---
// ...
import Comments from "@/components/Comments"; // [!code ++]
// ...
---

<ShareLinks />

<!-- [!code ++:1] -->
<Comments client:only="react" />

<hr class="my-8 border-dashed" />
```

And that's it!
