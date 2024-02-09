import { type CollectionEntry } from "astro:content";
import type { Post } from "@lib/interfaces";
import { slugifyStr } from "./slugify";

export function blogEntryFromNotionPost(post: Post): CollectionEntry<"blog"> {
  return {
    notionPageId: post.PageId,
    id: post.PageId,
    slug: post.Slug?.trim() || slugifyStr(post.Title),
    body: "", // TODO should we make async call here to get notion content?
    collection: "blog",
    // https://github.com/satnaing/astro-paper/blob/main/src/content/blog/adding-new-post.md
    data: {
      title: post.Title,
      description: post.Excerpt,
      pubDatetime: new Date(post.Date),
      modDatetime: new Date(post.Date),
      // author: "Son Nguyen", // default to SITE.author
      featured: post.Featured,
      draft: false, // assume all posts are published
      tags: post.Tags.map(tag => tag.name),
      ogImage: post.FeaturedImage?.Url,
      // canonicalURL: "",
    },
  };
}
