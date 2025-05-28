---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2025-04-10T00:23+08:00
title: Strava Riding Api 上线
slug: StravaRidingApi
ogImage: https://cos.lhasa.icu/ArticlePictures/strava_logo.webp_81
tags:
  - API
  - STRAVA
  - JavaScript
  - 开源
  - 独立开发者

description: 该脚本基于 Strava API v3 获取指定用户当年的所有骑行活动数据，并将其保存为JSON格式
---

该脚本基于 Strava API v3 获取指定用户当年的所有骑行活动数据，并将其保存为JSON格式

## 功能特性

Strava Riding Api 只实现了 OAuth 2.0 授权流程的部分自动化，由于技术限制，目前无法实现完全自动化：

已实现部分

- 半自动 OAuth 2.0 授权流程，轻松访问您的 Strava 数据
- 自动获取任意年份的所有骑行记录
- 获取每个活动的完整运动数据
- 智能令牌管理：自动保存和刷新过期的访问令牌
- 数据自动转换：公里、时间、速度单位等数据格式化
- 内置多重容错机制，确保数据获取的可靠性

## 使用前设置

**重要：** 在使用此脚本前，请确保在Strava开发者平台上正确配置您的应用：

1. 访问 [Strava开发者设置](https://www.strava.com/settings/api)
2. 将以下URL添加到"授权回调域"：
   ```
   localhost
   ```
   注意：只需输入 `localhost` 而不是完整的 `http://localhost:8000`
3. 保存设置

## 使用方法

1. 安装依赖：

   ```
   yarn install
   ```

2. 获取并处理授权码：

   ```
   yarn auth
   ```

   获取授权后，您会收到一个授权码。将其粘贴到命令行中。

3. 获取骑行数据：
   ```
   yarn start
   ```
4. 查看输出的JSON文件，文件名格式为：`strava_data.json`

## 解决认证问题

如果您遇到API相关错误，请尝试以下解决方案：

1. **更新令牌**：

   ```
   yarn auth
   ```

   重新获取授权并更新令牌

2. **检查API状态**：

   访问 [Strava API状态](https://status.strava.com/) 确认服务是否正常

## 常见问题解决

1. **"protocol mismatch"错误**：

   - 此问题已在最新版本中解决，使用了原生HTTPS模块发送请求
   - 确保在Strava开发者设置中添加了`localhost`作为授权回调域
     <br/><br/>

2. **无法获取活动数据**：

   - 确认您的账户中确实有骑行活动
   - 检查筛选条件是否正确（默认只获取"Ride"类型活动）
     <br/><br/>

3. **API错误或限流**：
   - Strava API有使用限制(每15分钟100次，每天1000次)
   - 数据量大时，脚本已添加延迟以避免触发限流

## 许可证

本项目采用 Mozilla 公共许可证 2.0 版发布

Strava API v3：https://developers.strava.com/docs/reference

Strava Riding Api：https://github.com/achuanya/Strava-Riding-Api
