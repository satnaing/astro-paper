import { BLOG_PATH } from "@/content.config";
import { slugifyStr } from "./slugify";

/**
 * 从文件路径中提取 slug（仅文件名，不包含目录结构）
 * 
 * @param id - 文章的 ID（也就是 slug）
 * @param filePath - 文章的完整文件路径（可选，当前未使用）
 * @returns 返回纯净的 slug（文件名）
 * 
 * 功能说明：
 * - 移除目录结构，只保留最后的文件名作为 slug
 * - 确保 ID 不包含目录分隔符
 */
export function getSlugFromPath(
  id: string,
  _filePath?: string | undefined
) {
  // 确保 `id` 不包含目录结构，只取最后一个部分作为 slug
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1)[0] : id;
  return slug;
}

/**
 * 获取文章的完整URL路径
 * 
 * @param id - 文章的 ID（也就是 slug）
 * @param filePath - 文章的完整文件路径
 * @param includeBase - 是否在返回值中包含 `/posts`（默认：true）
 * @param useSimpleUrl - 是否使用简单的URL结构（仅 slug）（默认：true）
 * @param customPrefix - 自定义前缀，用来替代 /posts（如 /sports）
 * @param addTrailingSlash - 是否添加尾部斜杠（默认：页面为true，静态资源为false）
 * @returns 返回文章的URL路径
 * 
 * URL生成策略：
 * 1. 简单URL结构：直接使用 slug，如 `/article-title/`
 * 2. 自定义前缀：如 `/sports/article-title/`
 * 3. 复杂路径：基于文件目录结构生成，如 `/posts/category/article-title/`
 */
export function getPath(
  id: string,
  filePath: string | undefined,
  includeBase = true,
  useSimpleUrl = true,
  customPrefix?: string,
  addTrailingSlash = true
) {
  // 策略1：使用简单URL结构处理主要博客文章，直接返回 slug
  if (useSimpleUrl && !customPrefix) {
    const slug = getSlugFromPath(id, filePath);
    return addTrailingSlash ? `/${slug}/` : `/${slug}`;
  }

  // 策略2：使用自定义前缀，采用简单结构：customPrefix/slug
  if (customPrefix) {
    const slug = getSlugFromPath(id, filePath);
    return addTrailingSlash ? `${customPrefix}/${slug}/` : `${customPrefix}/${slug}`;
  }

  // 策略3：原始复杂路径逻辑，为了向后兼容而保留
  const pathSegments = filePath
    ?.replace(BLOG_PATH, "")               // 移除博客根路径
    .split("/")                           // 按路径分隔符分割
    .filter(path => path !== "")          // 移除空字符串片段 ["", "other-path"] <- 空字符串将被移除
    .filter(path => !path.startsWith("_")) // 排除以下划线 "_" 开头的目录
    .slice(0, -1)                         // 移除最后一个片段（文件名），因为它不是必需的
    .map(segment => slugifyStr(segment)); // 将每个路径片段转换为 slug 格式

  // 确定基础路径
  const basePath = includeBase ? "/posts" : "";

  // 确保 `id` 不包含目录结构
  const blogId = id.split("/");
  const slug = blogId.length > 0 ? blogId.slice(-1) : blogId;

  // 如果不在子目录中，直接返回文件路径
  if (!pathSegments || pathSegments.length < 1) {
    const path = [basePath, slug].join("/");
    return addTrailingSlash ? path + "/" : path;
  }

  // 构建完整路径：基础路径 + 目录结构 + slug
  const path = [basePath, ...pathSegments, slug].join("/");
  return addTrailingSlash ? path + "/" : path;
}
