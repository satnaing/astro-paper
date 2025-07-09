#!/usr/bin/env node

/**
 * 腾讯云CDN Type A鉴权自动化脚本 - 模块化版本
 */

import { Worker, isMainThread } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeConfig } from './modules/config.js';
import { scanDirectory } from './modules/file-scanner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 主线程处理函数
 */
async function main() {
  console.log('=== 腾讯云CDN鉴权处理脚本（模块化版本）===');
  console.log('开始初始化...');
  
  // 初始化配置（从.env文件读取）
  const config = await initializeConfig();
  
  console.log('\n开始CDN鉴权处理...');
  console.log(`扫描目录: ${config.DIST_DIR}`);
  console.log(`处理文件类型: ${config.FILE_EXTENSIONS.join(', ')}`);
  
  const startTime = Date.now();
  
  try {
    // 扫描所有需要处理的文件
    const files = await scanDirectory(config.DIST_DIR, config);
    console.log(`\n发现 ${files.length} 个HTML文件需要处理`);
    
    if (files.length === 0) {
      console.log('没有找到需要处理的文件，脚本结束');
      return;
    }
    
    // 将文件分组给不同的Worker处理
    const chunkSize = Math.ceil(files.length / config.MAX_WORKERS);
    const fileChunks = [];
    
    for (let i = 0; i < files.length; i += chunkSize) {
      fileChunks.push(files.slice(i, i + chunkSize));
    }
    
    console.log(`使用 ${fileChunks.length} 个Worker线程并行处理`);
    
    // 创建Worker并行处理
    const workers = fileChunks.map(chunk => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(path.join(__dirname, 'modules/worker.js'), {
          workerData: { 
            files: chunk,
            config: {
              CDN_DOMAIN: config.CDN_DOMAIN,
              CDN_KEY: config.CDN_KEY,
              SIGN_PARAM: config.SIGN_PARAM,
              EXPIRE_TIME: config.EXPIRE_TIME,
              CDN_URL_REGEX: config.CDN_URL_REGEX,
              INCLUDE_EXTENSIONS: config.INCLUDE_EXTENSIONS,
              EXCLUDE_EXTENSIONS: config.EXCLUDE_EXTENSIONS
            }
          }
        });
        
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
          if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          }
        });
      });
    });
    
    // 等待所有Worker完成
    const allResults = await Promise.all(workers);
    const results = allResults.flat();
    
    // 统计处理结果
    const successCount = results.filter(r => r.success).length;
    const errorCount = results.filter(r => !r.success).length;
    const totalProcessed = results.reduce((sum, r) => sum + r.processedCount, 0);
    const totalSkipped = results.reduce((sum, r) => sum + (r.skippedCount || 0), 0);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    // 输出处理结果
    console.log('\n=== 处理完成统计 ===');
    console.log(`成功处理文件: ${successCount}`);
    console.log(`处理失败文件: ${errorCount}`);
    console.log(`添加鉴权链接: ${totalProcessed}`);
    if (totalSkipped > 0) {
      console.log(`跳过鉴权链接: ${totalSkipped}`);
    }
    console.log(`总耗时: ${duration}秒`);
    
    // 显示错误详情
    if (errorCount > 0) {
      console.log('\n=== 错误详情 ===');
      results.filter(r => !r.success).forEach(r => {
        console.log(`   ${r.filePath}: ${r.error}`);
      });
    }
    
    // 显示处理详情（仅显示有修改的文件）
    const modifiedFiles = results.filter(r => r.success && r.processedCount > 0);
    if (modifiedFiles.length > 0) {
      console.log('\n=== 修改的文件 ===');
      modifiedFiles.forEach(r => {
        console.log(`   ${path.relative(config.DIST_DIR, r.filePath)}: ${r.processedCount} 个链接`);
      });
    }
    
    console.log('\n=== CDN鉴权处理完成！ ===');
    
  } catch (error) {
    console.error('\n处理过程中发生错误:', error.message);
    process.exit(1);
  }
}

// 仅在主线程中执行
if (isMainThread) {
  main();
}