import { slugifyStr } from "./slugify";
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

interface Tag {
  tag: string;
  tagName: string;
  count: number;
}

const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const map = new Map<string, Tag>();
  posts.filter(postFilter).forEach(post => {
    post.data.tags.forEach(tagName => {
      const slug = slugifyStr(tagName);
      if (map.has(slug)) {
        const tag = map.get(slug) as Tag;
        tag.count++;
      } else {
        map.set(slug, {
          tag: slug,
          tagName: tagName,
          count: 1,
        });
      }
    });
  });

  return Array.from(map.values()).sort((tagA, tagB) =>
    tagA.tag.localeCompare(tagB.tag)
  );
};

export default getUniqueTags;
