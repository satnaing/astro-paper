import { type CollectionEntry } from "astro:content";
import type { Post } from "@lib/interfaces";

export function blogEntryFromNotionPost(post: Post): CollectionEntry<"blog"> {
  return {
    // ...post,
    id: post.PageId,
    slug: post.Slug,
    body: "",
    collection: "blog",
    data: {
      author: "Son Nguyen", // TODO
      featured: false,
      draft: false,
      pubDatetime: new Date(post.Date),
      title: post.Title,
      tags: post.Tags.map(tag => tag.name),
      description: post.Excerpt,
    },
  };
}
