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
    let content = await container.renderToString(Content);
    
    // 清理RSS中不需要的元素
    if (content) {
      // 移除图片caption（alt文本）
      content = content.replace(/<figcaption[^>]*class="[^"]*img-caption[^"]*"[^>]*>.*?<\/figcaption>/gs, '');
      // 移除EXIF tooltip（Loading EXIF data...）
      content = content.replace(/<div[^>]*class="[^"]*exif-tooltip[^"]*"[^>]*>.*?<\/div>/gs, '');
      // 移除可能残留的空白figure标签
      content = content.replace(/<figure[^>]*class="[^"]*img-container[^"]*"[^>]*>\s*<div[^>]*class="[^"]*img-wrapper[^"]*"[^>]*>\s*<img[^>]*>\s*<\/div>\s*<\/figure>/gs, 
        (match) => {
          // 提取img标签并保留
          const imgMatch = match.match(/<img[^>]*>/g);
          return imgMatch ? imgMatch[0] : '';
        });
    }
    
    items.push({
      title: post.data.title,
      link: SITE.website.replace(/\/$/, "") + getPath(post.id, post.filePath),
      description: post.data.description,
      pubDate: new Date(post.data.modDatetime ?? post.data.pubDatetime),
      ...(content ? { content } : {}),
    });
  }

  // Image
  const logo = `
  <image>
    <url>${SITE.logo}</url>
    <title>${SITE.title}</title>
    <link>${SITE.website}</link>
  </image>`;

  return rss({
    title: SITE.title,
    description: SITE.desc,
    site: SITE.website,
    items,
    customData: `<language>${SITE.lang || "zh-CN"}</language>\n${logo}`,
    stylesheet: "/style/rss.xsl"
  });
}