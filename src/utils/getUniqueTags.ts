import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import postFilter from "./postFilter";

// 标签对象接口定义
interface Tag {
  tag: string;      // URL友好的标签名（slug格式）
  tagName: string;  // 原始标签名（用于显示）
}

/**
 * 从文章集合中提取所有唯一标签
 * 
 * @param posts - 文章集合数组
 * @returns 返回排序后的唯一标签数组
 * 
 * 处理流程：
 * 1. 使用 postFilter 过滤有效文章（排除草稿等）
 * 2. 提取所有文章的标签（扁平化处理）
 * 3. 为每个标签生成 slug 和保留原始名称
 * 4. 去重处理（基于 slug）
 * 5. 按字母顺序排序
 */
const getUniqueTags = (posts: CollectionEntry<"blog">[]) => {
  const tags: Tag[] = posts
    .filter(postFilter)                          // 过滤有效文章
    .flatMap(post => post.data.tags)            // 展开所有标签数组为单个数组
    .map(tag => ({ 
      tag: slugifyStr(tag),                      // 生成URL友好的slug
      tagName: tag                               // 保留原始标签名
    }))
    .filter(
      // 去重：保留每个唯一slug的第一次出现
      (value, index, self) =>
        self.findIndex(tag => tag.tag === value.tag) === index
    )
    .sort((tagA, tagB) => tagA.tag.localeCompare(tagB.tag)); // 按slug字母顺序排序
  return tags;
};

export default getUniqueTags;
