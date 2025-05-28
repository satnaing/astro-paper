# 字体使用说明文档

## 主要字体

### IBM Plex Sans SC
这是项目的主要字体，用于大部分界面文字显示。

- **字重**:
  - Regular (400): 用于常规文本
  - Bold (700): 用于标题和重点内容
- **字体文件**:
  - `public/fonts/IBMPlexSansSC-Regular.woff`
  - `public/fonts/IBMPlexSansSC-Bold.woff`
- **使用场景**:
  - OG 图片生成
  - 文章标题
  - UI 界面元素

## 系统默认字体

### system-ui
在一些特定组件中使用系统默认字体：

- **使用位置**:
  - 搜索结果链接 (`.pagefind-ui__result-nested .pagefind-ui__result-link:before`)
  - 部分 UI 组件

### Monospace 字体
代码相关显示使用等宽字体：

```css
font-family: source code pro, Consolas, Monaco, Menlo, sans-serif;
```

- **使用位置**:
  - 代码块
  - 内联代码
  - 终端输出

## 字体加载

### 本地字体加载
项目使用本地字体文件进行加载，避免网络依赖：

```typescript
// utils/loadGoogleFont.ts
async function loadLocalFont(fontPath: string): Promise<ArrayBuffer> {
  // 读取本地字体文件
  const fontBuffer = fs.readFileSync(fontPath);
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength
  );
}
```

### OG 图片字体配置
为 OG 图片生成配置专门的字体设置：

```typescript
const fontsConfig = [
  {
    name: "IBM Plex Sans SC",
    fontPath: "public/fonts/IBMPlexSansSC-Regular.woff",
    weight: 400,
    style: "normal",
  },
  {
    name: "IBM Plex Sans SC",
    fontPath: "public/fonts/IBMPlexSansSC-Bold.woff",
    weight: 700,
    style: "bold",
  },
];
```

## 响应式调整

项目中的字体大小会根据不同屏幕尺寸自动调整：

### 移动端适配
```css
@media (max-width: 768px) {
  .caption-bar .caption-text {
    font-size: 0.85rem;
    padding: 10px 12px;
  }
  
  .caption-tag .caption-text {
    font-size: 0.8rem;
    padding: 6px 10px;
  }
}

@media (max-width: 480px) {
  .caption-bar .caption-text {
    font-size: 0.8rem;
    padding: 8px 10px;
  }
  
  .caption-tag .caption-text {
    font-size: 0.75rem;
    padding: 5px 8px;
  }
}
```

## 特殊字体效果

### 文字阴影
在需要提高文字可读性的地方使用文字阴影效果：

```css
text-shadow: 0 1px 3px rgba(0, 0, 0, 0.8);
```

### 模糊效果
在一些 UI 元素中使用背景模糊效果来提升视觉体验：

```css
backdrop-filter: blur(12px) saturate(180%);
-webkit-backdrop-filter: blur(12px) saturate(180%);
```

## 最佳实践

1. **按需加载**: 仅加载必要的字重，避免过多资源
2. **本地优先**: 优先使用本地字体文件，避免网络依赖
3. **回退机制**: 始终提供合适的字体回退方案
4. **响应式设计**: 根据屏幕大小调整字体大小
5. **性能优化**: 使用 WOFF 格式提升加载性能

## 暗色模式适配

项目支持暗色模式下的字体颜色自动切换：

```css
:root,
html[data-theme="light"] {
  --foreground: #282728;
}

html[data-theme="dark"] {
  --foreground: #eaedf3;
}
```

## 使用建议

1. **保持一致性**: 在相同场景下使用相同的字体和字重
2. **注意对比度**: 确保文字在各种背景下都清晰可读
3. **合理粗细**: 根据内容重要性选择合适的字重
4. **优化性能**: 避免过多字体变体，控制字体文件大小
5. **可访问性**: 保证字体大小和行高符合可访问性标准
