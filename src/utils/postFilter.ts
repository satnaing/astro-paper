import type { CollectionEntry } from "astro:content";
import config from "@/config";
import { draftToggleState } from "@/integrations/draft-toggle/state";

/**
 * Determines whether a post is eligible to be listed/rendered.
 *
 * - Excludes drafts, unless the dev-toolbar "Show drafts" toggle is on (dev only)
 * - In production, excludes scheduled posts until `pubDatetime` minus the configured margin
 * - In dev, always shows non-draft posts to make authoring easier
 */
export function postFilter({ data }: CollectionEntry<"posts">) {
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - config.posts.scheduledPostMargin;
  const draftAllowed =
    !data.draft || (import.meta.env.DEV && draftToggleState.showDrafts);
  return draftAllowed && (import.meta.env.DEV || isPublishTimePassed);
}
