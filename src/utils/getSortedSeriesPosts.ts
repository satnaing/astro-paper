import type { CollectionEntry } from "astro:content";
import { postFilter } from "./postFilter";

/**
 * Returns the posts belonging to one series, sorted by `seriesOrder`
 * ascending (part 1 first). Posts missing `series` or `seriesOrder` are
 * excluded. A duplicate `seriesOrder` value doesn't error — `Array.sort` is
 * stable, so ties keep their original relative order.
 */
export function getSortedSeriesPosts(
  posts: CollectionEntry<"posts">[],
  seriesSlug: string
) {
  return posts
    .filter(postFilter)
    .filter(
      ({ data }) => data.series === seriesSlug && data.seriesOrder !== undefined
    )
    .sort(
      (a, b) => (a.data.seriesOrder as number) - (b.data.seriesOrder as number)
    );
}
