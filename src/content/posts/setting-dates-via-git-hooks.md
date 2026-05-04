---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: How to use Git Hooks to set Created and Modified Dates
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: How to use Git Hooks to set your Created and Modified Dates on AstroPaper
---

In this post I will explain how to use the pre-commit Git hook to automate the input of the created (`pubDatetime`) and modified (`modDatetime`) in the AstroPaper blog theme frontmatter

## Table of contents

## Have them Everywhere

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) are great for automating tasks like [adding](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea) or [checking](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e) the branch name to your commit messages or [stopping you committing plain text secrets](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000). Their biggest flaw is that client-side hooks are per machine.

You can get around this by having a `hooks` directory and manually copy them to the `.git/hooks` directory or set up a symlink, but this all requires you to remember to set it up, and that is not something I am good at doing.

As this project uses npm, we are able to make use of a package called [Husky](https://typicode.github.io/husky/) (this is already installed in AstroPaper) to automatically install the hooks for us.

> Update! In AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0), the pre-commit hook has been removed in favor of GitHub Actions. However, you can easily [install Husky](https://typicode.github.io/husky/get-started.html) yourself.

## The Hook

As we want this hook to run as we commit the code to update the dates and then have that as part of our change we are going to use the `pre-commit` hook. This has already been set up by this AstroPaper project, but if it hadn't, you would run `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`.

Navigating to the `hooks/pre-commit` file, we are going to add one or both of the following snippets.

### Updating the modified date when a file is edited

---

UPDATE:

This section has been updated with a new version of the hook that is smarter. It will now not increment the `modDatetime` until the post is published. On the first publish, set the draft status to `first` and watch the magic happen.

---

```shell
# Modified files, update the modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` gets the files from git that have been staged for committing. The output looks like:

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

The letter at the start denotes what action has been taken, in the above example the file has been added. Modified files have `M`

We pipe that output into the grep command where we are looking at each line to find that have been modified. The line needs to start with `M` (`^(M)`), have any number of characters after that (`.*`) and end with the `.md` file extension (`.(md)$`).This is going to filter out the lines that are not modified markdown files `egrep -i "^(M).*\.(md)$"`.

---

#### Improvement - More Explicit

This could be added to only look for files that we markdown files in the `blog` directory, as these are the only ones that will have the right frontmatter

---

The regex will capture the two parts, the letter and the file path. We are going to pipe this list into a while loop to iterate over the matching lines and assign the letter to `a` and the path to `b`. We are going to ignore `a` for now.

To know the draft status of the file, we need its frontmatter. In the following code we are using `cat` to get the content of the file, then using `awk` to split the file on the frontmatter separator (`---`) and taking the second block (the fonmtmatter, the bit between the `---`). From here we are using `awk` again to find the draft key and print is value.

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

Now we have the value for `draft` we are going to do 1 of 3 things, set the modDatetime to now (when draft is false `if [ "$draft" = "false" ]; then`), clear the modDatetime and set draft to false (when draft is set to first `if [ "$draft" = "first" ]; then`), or nothing (in any other case).

The next part with the sed command is a bit magical to me as I don't often use it, it was copied from [another blog post on doing something similar](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/). In essence, it is looking inside the frontmatter tags (`---`) of the file to find the `pubDatetime:` key, getting the full line and replacing it with the `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"` same key again and the current datetime formatted correctly.

This replacement is in the context of the whole file so we put that into a temporary file (`> tmp`), then we move (`mv`) the new file into the location of the old file, overwriting it. This is then added to git ready to be committed as if we made the change ourselves.

---

#### NOTE

For the `sed` to work the frontmatter needs to already have the `modDatetime` key in the frontmatter. There are some other changes you will need to make for the app to build with a blank date, see [further down](#empty-moddatetime-changes)

---

### Adding the Date for new files

Adding the date for a new file is the same process as above, but this time we are looking for lines that have been added (`A`) and we are going to replace the `pubDatetime` value.

```shell
# New files, add/update the pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### Improvement - Only Loop Once

We could use the `a` variable to switch inside the loop and either update the `modDatetime` or add the `pubDatetime` in one loop.

---

## Populating the frontmatter

If your IDE supports snippets then there is the option to create a custom snippet to populate the frontmatter.[In AstroPaper v4 will come with one for VSCode by default.](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## Empty `modDatetime` changes

To allow Astro to compile the markdown and do its thing, it needs to know what is expected in the frontmatter. It does this via the config in `src/content/config.ts`

To allow the key to be there with no value we need to edit line 10 to add the `.nullable()` function.

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

To stop the IDE complaining in the blog engine files I have also done the following:

1. added `| null` to line 15 in `src/layouts/Layout.astro` so that it looks like

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. added `| null` to line 5 in `src/components/Datetime.tsx` so that it looks like

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
