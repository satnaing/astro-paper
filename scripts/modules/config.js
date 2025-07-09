import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * 从.env文件读取CDN鉴权配置
 * @returns {Promise<Object>} CDN鉴权配置对象
 */
export async function loadCdnConfig() {
  try {
    // 加载.env文件
    const envPath = path.resolve(__dirname, '../../.env');
    dotenv.config({ path: envPath });
    
    // 检查必要的环境变量
    const requiredVars = ['CDN_AUTH_ENABLED', 'CDN_AUTH_DOMAIN', 'CDN_AUTH_KEY', 'CDN_AUTH_SIGN_PARAM', 'CDN_AUTH_EXPIRE_TIME'];
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      throw new Error(`缺少必要的环境变量: ${missingVars.join(', ')}`);
    }
    
    const enabled = process.env.CDN_AUTH_ENABLED === 'true';
    if (!enabled) {
      throw new Error('CDN鉴权未启用');
    }
    
    // 解析文件后缀配置
    const includeExtensions = process.env.CDN_AUTH_INCLUDE_EXTENSIONS 
      ? process.env.CDN_AUTH_INCLUDE_EXTENSIONS.split(',').map(ext => ext.trim().toLowerCase())
      : [];
    
    const excludeExtensions = process.env.CDN_AUTH_EXCLUDE_EXTENSIONS 
      ? process.env.CDN_AUTH_EXCLUDE_EXTENSIONS.split(',').map(ext => ext.trim().toLowerCase())
      : [];
    
    return {
      enabled,
      domain: process.env.CDN_AUTH_DOMAIN,
      key: process.env.CDN_AUTH_KEY,
      signParam: process.env.CDN_AUTH_SIGN_PARAM,
      expireTime: parseInt(process.env.CDN_AUTH_EXPIRE_TIME, 10),
      algorithm: process.env.CDN_AUTH_ALGORITHM || 'md5',
      includeExtensions,
      excludeExtensions
    };
  } catch (error) {
    console.error('读取CDN配置失败:', error.message);
    console.error('请确保根目录.env文件存在且包含正确的CDN鉴权配置');
    process.exit(1);
  }
}

/**
 * 创建默认配置对象
 * @returns {Object} 默认配置
 */
export function createDefaultConfig() {
  return {
    // 处理配置
    DIST_DIR: path.resolve(__dirname, '../../dist'),
    FILE_EXTENSIONS: ['.html'], // 只处理HTML文件
    MAX_WORKERS: 4, // 最大并发工作线程数
    
    // CDN配置（从.env文件动态加载）
    CDN_DOMAIN: '',
    CDN_KEY: '',
    SIGN_PARAM: '',
    EXPIRE_TIME: 0,
    CDN_URL_REGEX: null,
    
    // 文件后缀过滤配置
    INCLUDE_EXTENSIONS: [], // 需要鉴权的文件后缀
    EXCLUDE_EXTENSIONS: []  // 不需要鉴权的文件后缀
  };
}

/**
 * 初始化配置
 * @returns {Promise<Object>} 完整的配置对象
 */
export async function initializeConfig() {
  const config = createDefaultConfig();
  const cdnConfig = await loadCdnConfig();
  
  // 更新配置对象
  config.CDN_DOMAIN = cdnConfig.domain;
  config.CDN_KEY = cdnConfig.key;
  config.SIGN_PARAM = cdnConfig.signParam;
  config.EXPIRE_TIME = cdnConfig.expireTime;
  config.INCLUDE_EXTENSIONS = cdnConfig.includeExtensions;
  config.EXCLUDE_EXTENSIONS = cdnConfig.excludeExtensions;
  
  // 创建CDN URL匹配正则表达式
  config.CDN_URL_REGEX = new RegExp(
    `https?://${config.CDN_DOMAIN.replace('.', '\\.')}/[^\\s"'\\)\\]>]*`,
    'gi'
  );
  
  console.log('CDN配置加载成功:');
  console.log(`- 域名: ${config.CDN_DOMAIN}`);
  console.log(`- 签名参数: ${config.SIGN_PARAM}`);
  console.log(`- 过期时间: ${config.EXPIRE_TIME}秒`);
  
  if (config.INCLUDE_EXTENSIONS.length > 0) {
    console.log(`- 需要鉴权的文件后缀: ${config.INCLUDE_EXTENSIONS.join(', ')}`);
  } else {
    console.log('- 需要鉴权的文件后缀: 所有文件');
  }
  
  if (config.EXCLUDE_EXTENSIONS.length > 0) {
    console.log(`- 不需要鉴权的文件后缀: ${config.EXCLUDE_EXTENSIONS.join(', ')}`);
  }
  
  return config;
}