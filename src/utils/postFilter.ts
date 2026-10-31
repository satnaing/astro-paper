import type { CollectionEntry } from "astro:content";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import config from "@/config";
import { resolveTimezone } from "./resolveTimezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - Excludes drafts always
 * - In production, excludes posts whose `pubDatetime` falls on a later calendar
 *   day than the build date, both read in the site (or per-post) timezone
 * - In dev, always shows non-draft posts to make authoring easier
 *
 * Publishing is day-granular by design: a post becomes visible on the day its
 * byline shows, not at a time of day. `Datetime.astro` renders the same instant
 * through the same timezone, so the two can never disagree.
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  const tz = resolveTimezone(data.timezone ?? config.site.timezone);
  const publishDay = dayjs(data.pubDatetime).tz(tz).startOf("day");
  const buildDay = dayjs().tz(tz).startOf("day");
  const isPublishDayReached = !publishDay.isAfter(buildDay);

  return !data.draft && (import.meta.env.DEV || isPublishDayReached);
}
