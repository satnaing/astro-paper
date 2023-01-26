import type { CollectionEntry } from "astro:content";
import { slug as slugger } from "github-slugger";

export const slugifyStr = (str: string) => slugger(str);

const slugify = (post: CollectionEntry<"blog">) =>
  post.data.slug ? slugger(post.data.slug) : post.slug;

export const slufigyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
