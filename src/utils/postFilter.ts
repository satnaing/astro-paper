import type { CollectionEntry } from "astro:content";
import config from "@/config";

const postFilter = ({ data }: CollectionEntry<"posts">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
};

export default postFilter;
