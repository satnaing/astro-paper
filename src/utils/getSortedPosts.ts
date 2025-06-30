// 文章排序工具函数 - 对文章集合按照时间倒序排列（最新的在前）
import type { CollectionEntry } from "astro:content";
import postFilter from "./postFilter";

/**
 * 获取排序后的文章列表
 * 
 * @param posts - 文章集合数组，来自 Astro 的内容集合
 * @returns 返回经过过滤和排序的文章数组，按修改时间或发布时间倒序排列
 * 
 * 功能说明：
 * 1. 使用 postFilter 过滤掉不应显示的文章（如草稿、未来发布的文章等）
 * 2. 按照文章的修改时间（如果有）或发布时间进行倒序排序
 * 3. 时间戳转换为秒级精度进行比较，确保排序的准确性
 */
const getSortedPosts = (posts: CollectionEntry<"blog">[]) => {
  return posts
    .filter(postFilter)  // 过滤文章：移除草稿、未来发布的文章等
    .sort(
      (a, b) =>
        // 将日期转换为时间戳（秒级），然后进行比较
        // 优先使用修改时间，如果没有则使用发布时间
        Math.floor(
          new Date(b.data.modDatetime ?? b.data.pubDatetime).getTime() / 1000
        ) -
        Math.floor(
          new Date(a.data.modDatetime ?? a.data.pubDatetime).getTime() / 1000
        )
        // 倒序排列：b - a 使得最新的文章排在前面
    );
};

export default getSortedPosts;
