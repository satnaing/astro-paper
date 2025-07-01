import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);
  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items: [
      {
        link: SITE.website,
        title: 'Feed Ownership Verification',
        description: 'This message is used to verify that this feed (feedId:55149012216215602) belongs to me (userId:109876092687369216). Join me in enjoying the next generation information browser https://follow.is.',
        pubDate: new Date(),
      },
      ...sortedPosts.map(({ data, id, filePath }) => ({
        link: getPath(id, filePath),
        title: data.title,
        description: data.description,
        pubDate: new Date(data.modDatetime ?? data.pubDatetime),
      })),
    ],
  });
}