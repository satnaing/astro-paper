import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  return process.env.DRAFT_MODE === "true" || !data.draft;
};

export default postFilter;
