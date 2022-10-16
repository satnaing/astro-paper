import { slufigyAll } from "./slugify";
import type { MarkdownInstance } from "astro";
import type { Frontmatter } from "../types";

const getPostsByTag = (posts: MarkdownInstance<Frontmatter>[], tag: string) =>
  posts.filter(post => slufigyAll(post.frontmatter.tags).includes(tag));

export default getPostsByTag;
