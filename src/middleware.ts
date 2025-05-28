import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware((context, next) => {
  const url = context.url;
  const pathname = url.pathname;
  
  // 静态资源文件扩展名列表
  const staticExtensions = [
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
    '.css', '.js', '.json', '.xml', '.txt', '.pdf',
    '.woff', '.woff2', '.ttf', '.eot', '.otf'
  ];
  
  // 检查是否是静态资源
  const isStaticResource = staticExtensions.some(ext => 
    pathname.toLowerCase().endsWith(ext)
  );
  
  // 如果是静态资源，不处理尾部斜杠
  if (isStaticResource) {
    return next();
  }
  
  // 如果URL不以斜杠结尾且不是根路径，则重定向到带斜杠的版本
  if (pathname !== "/" && !pathname.endsWith("/")) {
    const newUrl = new URL(pathname + "/" + url.search + url.hash, url.origin);
    return Response.redirect(newUrl.toString(), 301);
  }
  
  return next();
}); 