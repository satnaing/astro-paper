import type { MarkdownInstance } from "astro";

interface Frontmatter {
  title: string;
  description: string;
  author: string;
  datetime: string;
  slug: string;
  featured: boolean;
  tags: string[];
}

const getSortedPosts = (posts: MarkdownInstance<Frontmatter>[]) =>
  posts.sort(
    (a, b) =>
      Math.floor(new Date(b.frontmatter.datetime).getTime() / 1000) -
      Math.floor(new Date(a.frontmatter.datetime).getTime() / 1000)
  );

export default getSortedPosts;
