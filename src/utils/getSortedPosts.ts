import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types";

const getSortedPosts = (posts: MarkdownInstance<Frontmatter>[]) =>
  posts
    .filter(({ frontmatter }) => !frontmatter.draft)
    .sort(
      (a, b) =>
        Math.floor(new Date(b.frontmatter.datetime).getTime() / 1000) -
        Math.floor(new Date(a.frontmatter.datetime).getTime() / 1000)
    );

export default getSortedPosts;
