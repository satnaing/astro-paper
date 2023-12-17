# Changelog

These are the (optional) prerequisites I like to work with:
- VSCode + Dev Containers
- Docker
- Clone the repo, open the folder in container using devcontainer.json, then `pnpm i`. You'll get a dev environment with Node 18, git and pnpm. And the following VSCode extensions are added to the container:<br/><br/>
    "astro-build.astro-vscode",<br/>
    "dbaeumer.vscode-eslint",<br/>
    "rvest.vs-code-prettier-eslint",<br/>
    "eliostruyf.vscode-front-matter"

## What I have done

1. Eliminated the *postSlug* property.
2. Replaced every instance of *slugify()*, *slugifyStr()* and *slugifyAll()* with an appropriate alternative and deleted **src\utils\slugify.ts**.
3. Removed *github-slugger* and *@types/github-slugger* from dependencies and updated the packages to latest.

There are a lot of files, which had to be changed. But it looks much more intimidating, than it is, because in most of the files there are only tiny changes.

## Overview of the main changes

First, there are all the content markdown files. The only thing I did in all of them, was replacing *postSlug* with *slug*. In addition to that, I deleted the *postSlug* property in **src/content/config.ts**.

The only other place, where *postSlug* was used, was in **src\utils\slugify.ts**. Although this wasn't really needed to get rid of the *postSlug* property, I decided to replace all the occurrences of *slugify()*, *slugifyStr()* and *slugifyAll()*, simply because they were doable with Astro tools and plain JS.

The simple cases were the ones like this:

```ts
posts.map(({ data }) => (
    <Card href={`/posts/${slugify(data)}`} frontmatter={data} />
```
These were easy enough, we simply can change it to:
```ts
posts.map(({ slug, data }) => (
    <Card href={`/posts/${slug}`} frontmatter={data} />
```

There are some places, where this is solved slightly different (e.g **src/pages/posts/[slug]/index.astro**), but in the end it's mostly just about getting the *slug* property to create links.

Then there are two special cases. In one, *slugifyStr()* was used to generate the name of a view transition. This regards two files, which are interconnected: **src/components/Card.tsx** and **src/layouts/PostDetails.astro**. Since *slug* is unique, it would have made sense to use it here as well. But I couldn't find a simple way to get the *slug* value, so I chickened out and used some string manipulation, namely `title.replace(/\W/g, '')`.

The most trouble made the occurrences of *slugifyStr()* and *slugifyAll()* in the tag routine (mainly **src/layouts/PostDetails.astro**, **src/utils/getPostsByTag.ts** and **src/utils/getUniqueTags.ts**). Here I also went for some string manipulation, namely `tag.replace(/\s/g, '-').toLocaleLowerCase()`. **src/utils/getPostsByTag.ts** was the only place, I had to make a major change to a function (to replace *slugifyAll()*). 

And that's about it. I strongly believe, that these changes will make the base of the template more robust for future developments. Especially the *postSlug* property opens the door for some nasty issues, getting rid of it is in my opinion a necessity.