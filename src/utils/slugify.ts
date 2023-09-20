import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

const slugify = (post: CollectionEntry<"blog">["data"]) =>
  post.postSlug ? slugger(post.postSlug) : slugger(post.title);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
