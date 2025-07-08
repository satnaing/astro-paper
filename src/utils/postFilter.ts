// 文章过滤器工具函数 - 用于过滤掉不应显示的文章
import type { CollectionEntry } from "astro:content";
import { SITE } from "@/config";

/**
 * 文章过滤器 - 决定哪些文章应该在网站上显示
 * 
 * @param data - 文章数据对象，包含文章的元数据
 * @returns 返回布尔值，true表示文章应该显示，false表示应该隐藏
 * 
 * 过滤规则：
 * 1. 草稿文章（draft: true）不会显示
 * 2. 未来发布的文章在发布时间到达前不会显示（考虑定时发布边距时间）
 * 3. 开发环境下所有非草稿文章都会显示（便于预览）
 */
const postFilter = ({ data }: CollectionEntry<"blog">) => {
  // 检查文章的发布时间是否已经到达
  // 使用 scheduledPostMargin 提供缓冲时间，避免因为时间差导致的显示问题
  const isPublishTimePassed =
    Date.now() >
    new Date(data.pubDatetime).getTime() - SITE.scheduledPostMargin;
  
  // 开发环境下显示所有文章（包括草稿）
  if (import.meta.env.DEV) {
    return true;
  }
  
  // 生产环境下的过滤条件：
  // 1. 不是草稿 (!data.draft)
  // 2. 并且发布时间已到达
  return !data.draft && isPublishTimePassed;
};

export default postFilter;
