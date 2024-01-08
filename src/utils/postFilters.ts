import type { CollectionEntry } from "astro:content";

export const draftFilter = ({ data }: CollectionEntry<"blog">) =>
  import.meta.env.MODE === "development" ? true : !data.draft;
