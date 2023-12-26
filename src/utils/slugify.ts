import { slug as slugger } from "github-slugger";
import type { CollectionEntry } from "astro:content";

export const slugifyStr = (str: string) => slugger(str);

export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
