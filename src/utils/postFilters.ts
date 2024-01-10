import type { CollectionEntry } from "astro:content";

export const draftFilter = ({ data }: CollectionEntry<"blog">) => {
  return process.env.DRAFT_MODE === "true" || !data.draft;
};
