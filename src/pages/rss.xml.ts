import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { getPath } from "@/utils/getPath";
import getSortedPosts from "@/utils/getSortedPosts";
import { SITE } from "@/config";

// 渲染 MDX/Markdown 内容为 HTML
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import { loadRenderers } from "astro:container";

export async function GET(context: any) {
  // 获取所有已发布的非草稿文章
  const posts = await getCollection("blog");
  const sortedPosts = getSortedPosts(posts);

  // 初始化 AstroContainer，支持 MDX 渲染
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  // 生成 RSS items，包含全文内容
  const items = [];
  for (const post of sortedPosts) {
    const { Content } = await render(post);
    const content = await container.renderToString(Content);
    items.push({
      title: post.data.title,
      link: SITE.website.replace(/\/$/, "") + getPath(post.id, post.filePath),
      description: post.data.description,
      pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
      ...(content ? { content } : {}),
    });
  }

  // Folo 认证
  const foloItem = `<generator>This message is used to verify that this feed (feedId:55149012216215602) belongs to me (userId:109876092687369216). Join me in enjoying the next generation information browser https://follow.is.</generator>`;

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
    customData: `<language>${SITE.lang || "zh-CN"}</language>\n${foloItem}`
  });
}