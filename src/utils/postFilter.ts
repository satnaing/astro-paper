import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import config from "@/config";

dayjs.extend(utc);
dayjs.extend(timezone);

export function postFilter({ data }: CollectionEntry<"posts">) {
  const tz = data.timezone ?? config.site.timezone;
  // Interpret the date in the site's timezone instead of UTC, so that
  // pubDatetime: 2026-06-28 means "June 28 in Shanghai" not "June 28 UTC".
  const publishTime = dayjs.utc(data.pubDatetime).tz(tz, true);
  const isPublishTimePassed =
    Date.now() > publishTime.valueOf() - config.posts.scheduledPostMargin;
  return !data.draft && (import.meta.env.DEV || isPublishTimePassed);
}
