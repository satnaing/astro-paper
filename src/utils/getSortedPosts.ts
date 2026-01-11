import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.data.date_created).getTime() / 1000) -
        Math.floor(new Date(a.data.date_created).getTime() / 1000)
    );
};

export default getSortedPosts;
