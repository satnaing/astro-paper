import type { MarkdownInstance } from "astro";
import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";

export const getReadingTime = async () => {
  // Get all posts using glob. This is to get the updated frontmatter
  const globPosts = import.meta.glob("../content/blog/*.md") as Promise<
    CollectionEntry<"blog">["data"][]
  >;

  // Then, set those frontmatter value in a JS Map with key value pair
  const mapFrontmatter = new Map();
  const globPostsValues = Object.values(globPosts);
  await Promise.all(
    globPostsValues.map(async globPost => {
      const { frontmatter } = await globPost();
      mapFrontmatter.set(
        slugifyStr(frontmatter.title),
        frontmatter.readingTime
      );
    })
  );

  return mapFrontmatter;
};

const getPostsWithRT = async (posts: CollectionEntry<"blog">[]) => {
  const mapFrontmatter = await getReadingTime();
  return posts.map(post => {
    post.data.readingTime = mapFrontmatter.get(slugifyStr(post.data.title));
    return post;
  });
};

export default getPostsWithRT;