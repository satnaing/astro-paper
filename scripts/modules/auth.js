import crypto from 'crypto';
import path from 'path';

/**
 * 生成随机字符串
 * @param {number} length - 字符串长度，默认10位
 * @returns {string} 随机字符串
 */
export function generateRandomString(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 生成腾讯云CDN Type A鉴权签名
 * @param {string} uri - 资源路径（以/开头）
 * @param {number} timestamp - Unix时间戳（过期时间）
 * @param {string} rand - 随机字符串（10位）
 * @param {string} uid - 用户ID（固定为0）
 * @param {string} pkey - 鉴权密钥
 * @returns {string} MD5签名
 */
export function generateMD5Hash(uri, timestamp, rand, uid, pkey) {
  // 拼接签名串：uri-timestamp-rand-uid-pkey
  const signString = `${uri}-${timestamp}-${rand}-${uid}-${pkey}`;
  
  // 计算MD5哈希值
  return crypto.createHash('md5').update(signString).digest('hex');
}

/**
 * 检查文件是否需要鉴权
 * @param {string} url - 文件URL
 * @param {Object} config - 配置对象
 * @returns {boolean} 是否需要鉴权
 */
export function shouldAuthenticateFile(url, config) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    // 获取文件扩展名
    const ext = path.extname(pathname).toLowerCase();
    
    // 如果没有扩展名，默认需要鉴权
    if (!ext) {
      return true;
    }
    
    // 优先检查排除列表
    if (config.EXCLUDE_EXTENSIONS.length > 0 && config.EXCLUDE_EXTENSIONS.includes(ext)) {
      return false;
    }
    
    // 如果包含列表为空，则除了排除列表中的文件，其他都需要鉴权
    if (config.INCLUDE_EXTENSIONS.length === 0) {
      return true;
    }
    
    // 检查是否在包含列表中
    return config.INCLUDE_EXTENSIONS.includes(ext);
  } catch (error) {
    // URL解析失败，默认需要鉴权
    return true;
  }
}

/**
 * 为CDN URL添加鉴权参数
 * @param {string} url - 原始CDN URL
 * @param {Object} config - 配置对象
 * @returns {string} 带鉴权参数的URL
 */
export function addAuthToUrl(url, config) {
  try {
    const urlObj = new URL(url);
    
    // 检查是否为目标CDN域名
    if (!urlObj.hostname.includes(config.CDN_DOMAIN)) {
      return url;
    }
    
    // 检查文件是否需要鉴权
    if (!shouldAuthenticateFile(url, config)) {
      return url;
    }
    
    // 检查是否已经包含鉴权参数（避免重复处理）
    if (urlObj.searchParams.has(config.SIGN_PARAM)) {
      return url;
    }
    
    // 生成鉴权参数
    const timestamp = Math.floor(Date.now() / 1000) + config.EXPIRE_TIME; // 当前时间 + 过期时间
    const rand = generateRandomString(10); // 10位随机字符串
    const uid = '0'; // 用户ID固定为0
    const uri = urlObj.pathname; // 资源路径
    
    // 计算MD5签名
    const md5hash = generateMD5Hash(uri, timestamp, rand, uid, config.CDN_KEY);
    
    // 构建签名参数：timestamp-rand-uid-md5hash
    const signValue = `${timestamp}-${rand}-${uid}-${md5hash}`;
    
    // 添加鉴权参数到URL
    urlObj.searchParams.set(config.SIGN_PARAM, signValue);
    
    return urlObj.toString();
  } catch (error) {
    console.warn(`处理URL时出错: ${url}`, error.message);
    return url; // 出错时返回原始URL
  }
}