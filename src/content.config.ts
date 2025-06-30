// Astro 内容集合配置 - 定义博客内容的结构和验证规则
import { defineCollection, z } from "astro:content";    // Astro内容集合相关工具
import { glob } from "astro/loaders";                    // 文件加载器
import { SITE } from "@/config";                         // 站点配置

// 博客内容存放路径
export const BLOG_PATH = "src/data/blog";

// 定义博客内容集合
const blog = defineCollection({
  // 文件加载器配置
  loader: glob({ 
    pattern: "**/[^_]*.(md|mdx)",    // 匹配所有Markdown和MDX文件，排除以下划线开头的文件
    base: `./${BLOG_PATH}`           // 基础路径
  }),
  
  // 内容结构验证架构
  schema: ({ image }) =>
    z.object({
      // 文章作者（默认使用站点作者）
      author: z.string().default(SITE.author),
      
      // 发布时间（必填，自动转换为日期格式）
      pubDatetime: z.coerce.date(),
      
      // 修改时间（可选，允许null值）
      modDatetime: z.coerce.date().optional().nullable(),
      
      // 文章标题（必填）
      title: z.string(),
      
      // 是否为推荐文章（可选）
      featured: z.boolean().optional(),
      
      // 是否为草稿（可选）
      draft: z.boolean().optional(),
      
      // 文章分类（可选）
      category: z.string().optional(),
      
      // 文章标签数组（默认为["others"]）
      tags: z.array(z.string()).default(["others"]),
      
      // OG社交媒体图片（可以是图片对象或字符串URL）
      ogImage: image().or(z.string()).optional(),
      
      // 文章描述（必填，用于SEO和摘要）
      description: z.string(),
      
      // 规范URL（可选，用于SEO）
      canonicalURL: z.string().optional(),
      
      // 是否隐藏编辑文章按钮（可选）
      hideEditPost: z.boolean().optional(),
      
      // 时区设置（可选，IANA格式）
      timezone: z.string().optional(),
    }),
});

export const collections = { blog };
