import GithubSlugger from "github-slugger";
import type { Frontmatter } from "src/types";

const slugger = GithubSlugger.slug;

export const slugifyStr = (str: string) => slugger(str);

const slugify = (frontmatter: Frontmatter) =>
  frontmatter.slug ? slugger(frontmatter.slug) : slugger(frontmatter.title);

export const slufigyAll = (arr: string[]) => arr.map(str => slugifyStr(str));

export default slugify;
