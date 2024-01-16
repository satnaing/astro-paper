import { SITE } from "@config";
import type { CollectionEntry } from "astro:content";

const postFilter = ({ data }: CollectionEntry<"blog">) => {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  // Is in draft mode OR is not a draft and is past the publish date
  return process.env.DRAFT_MODE === "true" || (!data.draft && isPublishTimePassed);
};

export default postFilter;
