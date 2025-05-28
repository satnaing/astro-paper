# Img 组件 EXIF 功能使用指南

## 概述

`Img.astro` 组件现在支持智能的 EXIF 数据显示功能，具有多重回退机制和灵活的控制选项。

## 参数说明

### `showExif?: boolean`
- **默认值**: `true`
- **说明**: 控制是否显示 EXIF 信息
- **用法**: 设置为 `false` 可完全禁用 EXIF 功能

### `exif?: string | false`
- **默认值**: `undefined`
- **说明**: EXIF 数据的 API 接口地址
- **用法**: 
  - 提供字符串 URL 作为 EXIF 数据接口
  - 设置为 `false` 可禁用 EXIF 功能
  - 不提供时会尝试使用图片 `src` 作为接口

## 使用示例

### 1. 默认行为（推荐）
```astro
<Img src="/images/photo.jpg" alt="风景照片" />
```
- ✅ 显示 EXIF：`true`
- 🔄 加载逻辑：使用 `src + "?exif"` 作为接口，失败后使用模拟数据

### 2. 指定 EXIF 接口
```astro
<Img 
  src="/images/photo.jpg" 
  alt="风景照片"
  exif="/api/exif/photo.jpg"
/>
```
- ✅ 显示 EXIF：`true`
- 🔄 加载逻辑：
  1. 优先使用指定的 EXIF 接口
  2. 失败后重试 1 次
  3. 再失败使用 `src + "?exif"` 作为接口
  4. 最终失败使用模拟数据

### 3. 禁用 EXIF 功能（方式一）
```astro
<Img 
  src="/images/photo.jpg" 
  alt="风景照片"
  showExif={false}
/>
```
- ❌ 显示 EXIF：`false`
- 🚫 不会加载任何 EXIF 数据，不会显示 EXIF 工具提示

### 4. 禁用 EXIF 功能（方式二）
```astro
<Img 
  src="/images/photo.jpg" 
  alt="风景照片"
  exif={false}
/>
```
- ❌ 显示 EXIF：`false`
- 🚫 不会加载任何 EXIF 数据，不会显示 EXIF 工具提示

## 加载逻辑流程图

```
开始
  ↓
检查 showExif && exif !== false
  ↓
是否显示 EXIF？
  ↓ 是                    ↓ 否
有 exif URL？           结束（不显示）
  ↓ 是        ↓ 否
使用 exif URL   使用 src + "?exif"
  ↓              ↓
加载成功？      加载成功？
  ↓ 是  ↓ 否      ↓ 是  ↓ 否
显示数据 重试1次   显示数据 重试1次
        ↓              ↓
      成功？          成功？
      ↓ 是  ↓ 否      ↓ 是  ↓ 否
    显示数据 尝试src   显示数据 使用模拟数据
            ↓
          成功？
          ↓ 是  ↓ 否
        显示数据 使用模拟数据
```

## 最佳实践

### 1. 性能优化
- 对于不需要 EXIF 的图片（如装饰性图片），使用 `showExif={false}`
- 对于有专门 EXIF 接口的图片，明确指定 `exif` 参数

### 2. 用户体验
- EXIF 数据会在鼠标悬停时显示
- 移动设备上点击图片会显示 3 秒后自动隐藏
- 加载失败时会自动使用模拟数据，确保用户体验一致

### 3. 开发调试
- 浏览器控制台会显示 EXIF 加载的详细日志
- 可以通过日志了解数据加载的具体流程

## 注意事项

1. **接口格式**: EXIF 接口应返回标准的 EXIF JSON 格式
2. **跨域问题**: 确保 EXIF 接口支持跨域访问
3. **性能考虑**: EXIF 数据会在首次悬停时加载并缓存
4. **回退机制**: 即使所有接口都失败，也会显示基于图片信息生成的模拟数据

## 示例场景

### 摄影博客
```astro
<!-- 重要照片，有专门的 EXIF 接口 -->
<Img 
  src="/photos/landscape.jpg" 
  alt="黄山日出"
  exif="/api/exif/landscape.jpg"
/>

<!-- 普通照片，使用默认逻辑 -->
<Img src="/photos/daily.jpg" alt="日常随拍" />

<!-- 装饰图片，不需要 EXIF -->
<Img 
  src="/icons/camera.svg" 
  alt="相机图标"
  showExif={false}
/>
```

### 技术文档
```astro
<!-- 截图等技术图片，通常不需要 EXIF -->
<Img 
  src="/screenshots/interface.png" 
  alt="用户界面截图"
  showExif={false}
/>
``` 