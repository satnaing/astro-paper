import type { CollectionEntry } from "astro:content";
import getPostsWithRT from "./getPostsWithRT";

const getSortedPosts = async (posts: CollectionEntry<"blog">[]) => {
  // make sure that this func is async
  const postsWithRT = await getPostsWithRT(posts); // add reading time
  return postsWithRT
    .filter(({ data }) => !data.draft)
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