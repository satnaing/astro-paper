import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

type Series = {
  series: string;
  seriesTitle: string;
  count: number;
  complete: boolean;
  latestPubDatetime: Date;
  latestPostTitle: string;
};

/**
 * Builds a de-duplicated list of series from posts, sorted by each series'
 * most recent post (pubDatetime) descending.
 *
 * - Drafts and scheduled posts are excluded via `postFilter()`
 * - A post only counts as part of a series when `series`, `seriesTitle`, and
 *   `seriesOrder` are all present — the schema's `.refine()` already
 *   guarantees they're set together, but a post can still omit all three.
 * - A series is `complete` if ANY of its posts has `seriesComplete: true` —
 *   by convention this is set on the final post only, but the check itself
 *   doesn't care which post carries it.
 */
export function getSeries(posts: CollectionEntry<"posts">[]) {
  const seriesPosts = posts
    .filter(postFilter)
    .filter(
      ({ data }) =>
        data.series !== undefined &&
        data.seriesTitle !== undefined &&
        data.seriesOrder !== undefined
    );

  const bySeriesSlug = new Map<string, CollectionEntry<"posts">[]>();
  for (const post of seriesPosts) {
    const slug = post.data.series as string;
    const existing = bySeriesSlug.get(slug) ?? [];
    existing.push(post);
    bySeriesSlug.set(slug, existing);
  }

  const latestPost = (slug: string) =>
    (bySeriesSlug.get(slug) ?? []).reduce((latest, post) =>
      new Date(post.data.pubDatetime).getTime() >
      new Date(latest.data.pubDatetime).getTime()
        ? post
        : latest
    );

  const series: Series[] = Array.from(bySeriesSlug.entries()).map(
    ([slug, seriesPostList]) => {
      const latest = latestPost(slug);
      return {
        series: slug,
        seriesTitle: seriesPostList[0].data.seriesTitle as string,
        count: seriesPostList.length,
        complete: seriesPostList.some(
          post => post.data.seriesComplete === true
        ),
        latestPubDatetime: new Date(latest.data.pubDatetime),
        latestPostTitle: latest.data.title,
      };
    }
  );

  return series.sort(
    (a, b) => b.latestPubDatetime.getTime() - a.latestPubDatetime.getTime()
  );
}
