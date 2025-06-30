// Astro 中间件 - 处理URL重定向和静态资源路由
import { defineMiddleware } from "astro:middleware";

/**
 * 请求处理中间件
 * 
 * 功能：
 * 1. 为非静态资源的URL自动添加尾部斜杠
 * 2. 对静态资源文件跳过处理
 * 3. 实现SEO友好的URL结构
 */
export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  
  // 静态资源文件扩展名列表
  // 这些文件不需要添加尾部斜杠
  const staticExtensions = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',  // 图片文件
    '.css', '.js', '.json', '.xml', '.txt', '.pdf',            // 文档和脚本文件
    '.woff', '.woff2', '.ttf', '.eot', '.otf'                  // 字体文件
  ];
  
  // 检查当前请求是否为静态资源
  // 通过文件扩展名来判断
  const isStaticResource = staticExtensions.some(ext => 
    pathname.toLowerCase().endsWith(ext)
  );
  
  // 如果是静态资源，跳过URL处理，直接继续下一个中间件
  if (isStaticResource) {
    return next();
  }
  
  // 对于非静态资源：
  // 如果URL不以斜杠结尾且不是根路径，则重定向到带斜杠的版本
  // 这确保了URL的一致性，有利于SEO
  if (pathname !== "/" && !pathname.endsWith("/")) {
    // 构建新的URL，保留查询参数和锚点
    const newUrl = new URL(pathname + "/" + url.search + url.hash, url.origin);
    // 返回301永久重定向
    return Response.redirect(newUrl.toString(), 301);
  }
  
  // 如果URL已经符合要求，继续处理请求
  return next();
}); 