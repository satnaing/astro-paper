import type { CollectionEntry } from "astro:content";
import albumFilter from "./albumFilter";

const getSortedAlbums = (posts: CollectionEntry<"albums">[]) => {
  return posts
    .filter(albumFilter)
    .sort(
      (a, b) =>
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
    );
};

export default getSortedAlbums;
