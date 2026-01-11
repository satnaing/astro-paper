import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const filteredPosts = posts.filter(postFilter);

  // Count occurrences of each tag
  const tagCounts = new Map<string, { tagName: string; count: number }>();

  for (const post of filteredPosts) {
    for (const tagName of post.data.tags) {
      const tag = slugifyStr(tagName);
      const existing = tagCounts.get(tag);
      if (existing) {
        existing.count++;
      } else {
        tagCounts.set(tag, { tagName, count: 1 });
      }
    }
  }

  // Convert to array and sort
  const tags: Tag[] = Array.from(tagCounts.entries())
    .map(([tag, { tagName, count }]) => ({ tag, tagName, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));

  return tags;
};

export default getUniqueTags;
