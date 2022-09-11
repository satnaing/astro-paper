import slugify from "./slugify";
import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "./types";

const getUniqueTags = (posts: MarkdownInstance<Frontmatter>[]) => {
  let tags: string[] = [];
  posts.forEach((post) => {
    tags = [...tags, ...post.frontmatter.tags]
      .map((tag) => slugify(tag))
      .filter(
        (value: string, index: number, self: string[]) =>
          self.indexOf(value) === index
      );
  });
  return tags;
};

export default getUniqueTags;
