---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2025-06-02T23:27+08:00
title: EasyFill 重大更新，全面提升用户体验
slug: easyfill-1-1-1
ogImage: https://cos.lhasa.icu/ArticlePictures/EasyFill128.webp_81
tags:
  - EasyFill
  - 扩展
  - 开源
  - 独立开发者

description: 经过两个月的偷懒，EasyFill 迎来了 v1.1.1 版本的重大更新。这次更新主要在匹配算法上进行大幅度优化，全面提升匹配效率
---

> 版本：v1.1.1

经过两个月的偷懒，EasyFill 迎来了 v1.1.1 版本的重大更新。这次更新主要在匹配算法上进行大幅度优化，全面提升匹配效率

## 更新概览

- 支持动态 Shadow DOM 和三种全新识别方式
- 可自定义数据源，智能缓存机制
- Markdown 文本异步并行加载
- 自适应三级别日志，支持控制台调试
- 更新隐私政策

---

## 全新识别方式

### 1. 动态 Shadow DOM 支持

我发现有些评论系统通过 Shadow DOM 来实现封装，导致 v1.0 版本无法识别 Shadow DOM 生成的表单。在 v1.1.1 中，EasyFill 新增了对动态创建的 Shadow DOM 的完整支持。

```typescript
function traverseShadowDOM(root: Document | ShadowRoot | Element) {
  const inputs = root.querySelectorAll('input, textarea');
  elements.push(...Array.from(inputs));
  
  const allElements = root.querySelectorAll('*');
  allElements.forEach(element => {
    if (element.shadowRoot) {
      logger.info('发现 Shadow DOM，正在遍历', { 
        tagName: element.tagName, 
        shadowRootMode: element.shadowRoot.mode 
      });
      traverseShadowDOM(element.shadowRoot);
    }
  });
}
```

### 2. 三种识别方式全覆盖

在 v1.0 版本，EasyFill 只支持 name 字段识别。为了更加准确的匹配字段，引入了全新三种字段识别方式，确保在各种稀奇古怪的表单都可以识别：

#### Placeholder 识别
通过分析输入框的 `placeholder` 属性来识别字段类型：
```html
<input placeholder="请输入您的姓名" />
<input placeholder="邮箱地址" />
<input placeholder="个人网站" />
```

#### Type 识别
基于 HTML5 标准的 `type` 属性进行智能识别：
```html
<input type="email" />
<input type="url" />
<input type="text" name="username" />
```

#### ID 识别
通过元素的 `id` 属性进行精确匹配：
```html
<input id="author" />
<input id="email" />
<input id="website" />
```

**匹配策略：**
```typescript
inputs.forEach((input) => {
  const typeAttr = (input.getAttribute("type") || "").toLowerCase();
  const nameAttr = (input.getAttribute("name") || "").toLowerCase();
  const idAttr = (input.getAttribute("id") || "").toLowerCase();
  let valueToSet = ""; // 要填充的值
  let matchedBy = "";  // 匹配方式（id, name, type）
  let fieldType = "";  // 字段类型（name, email, url）

  // 匹配 URL 字段
  if (keywordSets.url.has(nameAttr) || keywordSets.url.has(`#${idAttr}`)) {
    valueToSet = url;
    matchedBy = keywordSets.url.has(`#${idAttr}`) ? "id" : "name";
    fieldType = "url";
  } else if (typeAttr === "url" && url) {
    valueToSet = url;
    matchedBy = "type";
    fieldType = "url";
  }

  // 匹配 Email 字段
  else if (keywordSets.email.has(nameAttr) || keywordSets.email.has(`#${idAttr}`)) {
    valueToSet = email;
    matchedBy = keywordSets.email.has(`#${idAttr}`) ? "id" : "name";
    fieldType = "email";
  } else if (typeAttr === "email" && email) {
    valueToSet = email;
    matchedBy = "type";
    fieldType = "email";
  }

  // 匹配 Name 字段
  else if ((keywordSets.name.has(nameAttr) || keywordSets.name.has(`#${idAttr}`)) && name) {
    valueToSet = name;
    matchedBy = keywordSets.name.has(`#${idAttr}`) ? "id" : "name";
    fieldType = "name";
  }

  // 没有匹配上就跳过
  if (!valueToSet) return;

  // 设置值并触发事件
  (input as HTMLInputElement).value = valueToSet;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));

  // 记录日志
  logger.info('填充表单字段', {
    name: nameAttr || "",
    id: idAttr || "",
    type: typeAttr || "",
    matchedBy,
    valueToSet,
    inShadowDOM: isInShadowDOM(input)
  });
});

```

---

## 数据同步

### 1. 自定义数据源功能

v1.1.1 版本允许用户完全自定义关键字数据源。

该源来自我的腾讯云 COS，且由腾讯云境内 CDN 加速，基本上无延迟：

```
https://cos.lhasa.icu/EasyFill/keywords.json
```

**自定义数据源格式示例：**
```json
{
  "name": ["name", "author", "username", "昵称", "姓名"],
  "email": ["email", "mail", "邮箱", "电子邮件"],
  "url": ["url", "website", "blog", "网站", "博客"]
}
```

### 2. 缓存机制

实现了基于 HTTP 标准的智能缓存系统，大幅减少不必要的网络请求：

- 304 Not Modified 响应处理
- 自动缓存有效期管理（24小时）
- 网络失败时自动回退到缓存
- 支持强制刷新机制

**ETag 和 Last-Modified 支持：**
```typescript
if (etag && !forceSync) {
  headers['If-None-Match'] = etag;
}
if (lastModified && !forceSync) {
  headers['If-Modified-Since'] = lastModified;
}
```

---

## 性能优化

### 1. localStorage 持久化存储

实现 Markdown 内容的持久化机制：

```typescript
const fetchMarkdown = async (url: string) => {
  try {
    // 检查 localStorage 是否已有缓存
    const cachedMarkdown = localStorage.getItem(url);
    if (cachedMarkdown) {
      logger.info(`从缓存加载 Markdown 文件: ${url}`);
      return cachedMarkdown;
    }

    // 如果没有缓存，从网络加载
    const response = await fetch(url);
    const markdown = await response.text();

    // 将加载的内容存入 localStorage
    localStorage.setItem(url, markdown);
    return marked(markdown);
  } catch (error) {
    logger.error(`加载 Markdown 文件失败: ${url}`, error);
  }
};
```

### 2. 异步并行加载优化

实现 Markdown 内容的异步并行加载：

```typescript
const loadContent = async () => {
  const [aboutAuthor, recommendedPlugins, updateLog, privacyPolicy] = await Promise.all([
    fetchMarkdown('/markdowns/about-author.md'),
    fetchMarkdown('/markdowns/recommended-plugins.md'),
    fetchMarkdown('/markdowns/UpdateLog.md'),
    fetchMarkdown('/markdowns/privacy-policy.md'),
  ]);

  setAboutAuthorContent(aboutAuthor);
  setRecommendedPluginsContent(recommendedPlugins);
  setUpdateLogContent(updateLog);
  setPrivacyPolicyContent(privacyPolicy);
};
```

---

## 日志系统

### 1. 三级别日志架构

EasyFill v1.1.1 实现了单例日志系统，支持 INFO、WARN、ERROR 三个级别：

```typescript
export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}
```

### 2. 智能环境适配

日志系统能够根据运行环境自动调整输出策略：

```typescript
public configureByEnvironment(): Logger {
  const isProd = typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production';
  
  if (isProd) {
    // 生产环境：只显示警告和错误
    this.setLevel(LogLevel.WARN);
  } else {
    // 开发环境：显示所有日志，并启用彩色和时间戳
    this.setLevel(LogLevel.INFO)
        .useColors(true)
        .showTimestamp(true);
  }
  
  return this;
}
```

### 3. 控制台命令

生产状态下，日志默认关闭。所以，增加了命令调试：

```javascript
// 启用日志系统
EasyFillLogger.enable()

// 关闭日志系统
EasyFillLogger.disable()

// 查看当前状态
EasyFillLogger.status()
```

命令绑定在全局 window 对象上，重启浏览器仍有效。

在浏览器扩展环境中，使用 chrome.storage.local 来存储，在普通网页环境中，使用 localStorage。

一样的是都用 easyfill_logger_enabled 这个键来存储

### 4. 链式配置接口

支持灵活的链式配置：

```typescript
logger
  .setLevel(LogLevel.INFO)
  .useColors(true)
  .showTimestamp(true)
  .setPrefix('[EasyFill]')
  .setPrefixColor('color: #4CAF50; font-weight: bold');
```

**配置选项：**
- 自定义日志前缀和颜色
- 时间戳显示控制
- 彩色输出开关
- 级别过滤设置

---

## 隐私权政策

v1.1.1 版本对隐私权政策进行了全面更新：

**主要更新内容：**
- 明确了关键字数据同步的目的和方式
- 增加了用户控制权的说明

---

## 界面改进

### 1. 同步设置

新增了直观的同步设置界面，轻松管理数据同步：

- **同步开关**：一键启用/禁用自动同步
- **同步频率**：支持 1 小时到 1 周的灵活设置
- **网络条件**：可选择任何网络或仅 WiFi
- **数据源管理**：支持自定义 URL 和一键重置

### 2. 状态反馈优化

- 实时显示同步状态和下次同步时间
- 提供详细的操作成功/失败反馈
- 使用 Snackbar 组件统一消息提示风格

---

## 短期计划
- 实现黑白名单机制，控制填充权限
- 支持多身份设置，满足不同用户需求
- 完成在 Edge 和 Firefox 浏览器上的上架与兼容

## 长远计划
 - 使用 TensorFlow 训练机器学习模型，实现自动识别和评论补全功能
 - 在无性能开销的情况下，实现移动端跨平台支持（iOS 与 Android）
 - 依托 EasyFill 建立独立博客生态社区，面向计算机学生及爱好者提供系统性新手指南

---

## 致谢与支持

EasyFill 的每一次进步都离不开用户的支持和反馈。特别感谢：**Mainbranch** 的反馈与支持

如果您觉得 EasyFill 对您有帮助，欢迎：
- 在 [GitHub](https://github.com/achuanya/EasyFill) 上给项目点星
- 在 [Chrome 应用商店](https://chromewebstore.google.com/detail/eamchegekphehbmebccbapnihegngobm) 留下评价
- 在我的[博客](https://lhasa.icu)上留言交流
- 通过赞赏码支持项目发展

<details>
  <summary>请我喝一杯咖啡</summary>
  <img src="https://cos.lhasa.icu/StylePictures/Appreciation-code.webp"/>
</details>

---

## 立即体验

EasyFill v1.1.1 现已在 Chrome 应用商店正式发布，您可以：

1. **新用户**：直接在 Chrome 应用商店搜索 "EasyFill" 安装
2. **现有用户**：通过梯子 Chrome 扩展将自动更新到最新版本
3. **开发者**：访问 [GitHub 仓库](https://github.com/achuanya/EasyFill) 查看源代码

---

**EasyFill - 简易填充，让每一次评论更自然，与你的博友互动无缝连接**