import { addAuthToUrl } from './auth.js';

/**
 * 处理文件内容，替换CDN链接
 * @param {string} content - 文件内容
 * @param {Object} config - 配置对象
 * @returns {Object} 包含处理后内容和处理数量的对象
 */
export function processFileContent(content, config) {
  let processedCount = 0;
  
  // 简化的正则表达式，更可靠地匹配CDN链接
  const cdnRegex = new RegExp(
    `https?://${config.CDN_DOMAIN.replace('.', '\\.')}/[^\\s"'\\)\\]>]*`,
    'gi'
  );
  
  const processedContent = content.replace(cdnRegex, (match, offset) => {
    // 检查是否在script标签内
    const beforeMatch = content.substring(0, offset);
    const afterMatch = content.substring(offset);
    
    // 查找最近的script开始和结束标签
    const lastScriptStart = beforeMatch.lastIndexOf('<script');
    const lastScriptEnd = beforeMatch.lastIndexOf('</script>');
    const nextScriptEnd = afterMatch.indexOf('</script>');
    
    // 如果在script标签内，跳过处理
    if (lastScriptStart > lastScriptEnd && nextScriptEnd !== -1) {
      return match;
    }
    
    // 检查是否在JSON数据属性中（保留原有逻辑）
    const contextBefore = content.substring(Math.max(0, offset - 100), offset);
    if (contextBefore.includes('data-json="') && !contextBefore.includes('">')) {
      return match;
    }
    
    const authUrl = addAuthToUrl(match, config);
    if (authUrl !== match) {
      processedCount++;
    }
    return authUrl;
  });
  
  return {
    content: processedContent,
    processedCount
  };
}