import rss from "@astrojs/rss";
import { getCollection,  } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import { SITE } from "@config";
import slugify from "@utils/slugify";

export async function get() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: sortedPosts
      .map(({ data }) => ({
        link: `posts/${slugify(data)}`,
        title: data.title,
        description: data.description,
        pubDate: new Date(data.pubDatetime),
      })),
  });
}
