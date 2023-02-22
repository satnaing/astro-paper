import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "@config";
import slugify from "@utils/slugify";

export async function get() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: posts
      .sort((a, b) => new Date(b.data.pubDatetime).getTime() - new Date(a.data.pubDatetime).getTime())
      .map(({ data }) => ({
        link: `posts/${slugify(data)}`,
        title: data.title,
        description: data.description,
        pubDate: new Date(data.pubDatetime),
      })),
  });
}
