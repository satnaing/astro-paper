import type { CollectionEntry } from "astro:content";
import { draftFilter } from "./postFilters";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(draftFilter)
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
