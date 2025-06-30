import kebabcase from "lodash.kebabcase";

/**
 * 将字符串转换为 kebab-case 格式的 slug
 * 
 * @param str - 需要转换的字符串（如文章标题）
 * @returns 返回 kebab-case 格式的字符串，适用于URL路径
 * 
 * 功能说明：
 * - 移除特殊字符和空格
 * - 转换为小写
 * - 用连字符(-)连接单词
 * 
 * 示例：
 * "Hello World!" → "hello-world"
 * "文章标题 2024" → "文章标题-2024"
 */
export const slugifyStr = (str: string) => kebabcase(str);

/**
 * 批量将字符串数组转换为 slug 格式
 * 
 * @param arr - 字符串数组（如标签列表）
 * @returns 返回转换后的 slug 数组
 * 
 * 用途：主要用于处理文章标签，将标签转换为URL友好格式
 */
export const slugifyAll = (arr: string[]) => arr.map(str => slugifyStr(str));
