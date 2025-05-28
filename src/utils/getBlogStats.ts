import { getCollection } from "astro:content";

export interface BlogStats {
  runningDays: number;
  totalPosts: number;
  totalWords: number;
  totalWordsInWan: string; // 以万为单位的字数
}

export async function getBlogStats(): Promise<BlogStats> {
  // 博客开始日期：2018年8月31日
  const startDate = new Date('2018-08-31');
  const currentDate = new Date();
  
  // 计算运行天数
  const timeDiff = currentDate.getTime() - startDate.getTime();
  const runningDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  
  // 获取所有已发布的博文
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const totalPosts = posts.length;
  
  // 计算总字数（估算：每篇文章平均字数）
  // 这里我们可以通过文章内容长度来估算，或者使用一个固定的平均值
  let totalWords = 0;
  
  // 简单估算：根据description长度来估算文章字数
  // 通常description是文章的摘要，大约占文章的1/10到1/20
  posts.forEach(post => {
    const descriptionLength = post.data.description?.length || 0;
    // 假设description占文章的1/15，这样估算总字数
    const estimatedWords = descriptionLength * 15;
    totalWords += estimatedWords;
  });
  
  // 如果估算结果太小，使用一个更合理的基准
  // 假设每篇文章平均1500字
  if (totalWords < posts.length * 1000) {
    totalWords = posts.length * 1500;
  }
  
  // 转换为万字单位
  const totalWordsInWan = (totalWords / 10000).toFixed(1);
  
  return {
    runningDays,
    totalPosts,
    totalWords,
    totalWordsInWan
  };
} 