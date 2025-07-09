import fs from 'fs/promises';
import path from 'path';
import { processFileContent } from './file-processor.js';

/**
 * 递归扫描目录，获取所有需要处理的文件
 * @param {string} dir - 目录路径
 * @param {Object} config - 配置对象
 * @returns {Promise<string[]>} 文件路径数组
 */
export async function scanDirectory(dir, config) {
  const files = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // 递归扫描子目录
        const subFiles = await scanDirectory(fullPath, config);
        files.push(...subFiles);
      } else if (entry.isFile()) {
        // 检查文件扩展名，只处理HTML文件
        const ext = path.extname(entry.name).toLowerCase();
        if (config.FILE_EXTENSIONS.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  } catch (error) {
    console.error(`扫描目录失败: ${dir}`, error.message);
  }
  
  return files;
}

/**
 * 处理单个文件
 * @param {string} filePath - 文件路径
 * @param {Object} config - 配置对象
 * @returns {Promise<Object>} 处理结果对象
 */
export async function processFile(filePath, config) {
  try {
    // 读取文件内容
    const content = await fs.readFile(filePath, 'utf-8');
    
    // 处理CDN链接
    const { content: processedContent, processedCount } = processFileContent(content, config);
    
    // 如果有修改，写回文件
    if (processedCount > 0) {
      await fs.writeFile(filePath, processedContent, 'utf-8');
    }
    
    return {
      filePath,
      processedCount,
      success: true
    };
  } catch (error) {
    return {
      filePath,
      processedCount: 0,
      success: false,
      error: error.message
    };
  }
}