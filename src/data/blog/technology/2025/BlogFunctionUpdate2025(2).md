---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2025-02-06T13:03+08:00
title: Blog Function Update 2025 (2)
slug: BlogFunctionUpdate2025(2)
ogImage: https://cos.lhasa.icu/ArticlePictures/update.jpg_81
tags:
  - Update
  - Liquid
  - Sitemap
  - SEO

description: 之前我一直使用 sitemaps.com 手动生成 sitemap.xml，但每当 URL 新增或变更都需要手动提交。实在麻烦！所以，今日用 Liquid 实现自动生成，一劳永逸
---

## Update details

- **移除红灯笼**
- **新增 `sitemap.xml` 和 `sitemap.txt`，自动生成，不再手动更新！**

之前我一直使用 <a href="https://www.xml-sitemaps.com" target="_blank">xml-sitemaps</a> 
手动生成`sitemap.xml`，但每当 URL 新增或变更都需要手动提交。实在麻烦！所以，今日用 Liquid 实现自动生成，一劳永逸

## sitemap.xml 优化策略

- **首页优先级最高 (`1.0`)**，其他页面次之 (`0.8`)  
- **新文章优先级高**（30 天内 `0.9`，半年内 `0.8`，一年内 `0.6`），让新内容更容易被搜索引擎收录  
- **旧文章优先级降低**（1 年以上 `0.4`，2 年以上 `0.2`），减少搜索引擎对老旧内容的爬取
- **动态调整 `changefreq`**，确保新内容频繁爬取，而老文章爬取频率降低

```xml
---
layout: null
---
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  {% assign now = site.time | date: "%s" | plus: 0 %}
  
  {% for page in site.pages %}
    {% if page.url == "/" %}
    <!-- 首页优先级最高 -->
      {% assign page_priority = "1.0" %}
    {% else %}
      {% assign page_priority = "0.8" %}
    {% endif %}
    
    <url>
      <loc>{{ site.url }}{{ page.url | replace:'index.html','' }}</loc>
      <lastmod>{{ site.time | date_to_xmlschema }}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>{{ page_priority }}</priority>
    </url>
  {% endfor %}
  
  <!-- 根据发布时间动态调整 priority 和 changefreq -->
  {% for post in site.posts %}
    {% assign post_time = post.date | date: "%s" | plus: 0 %}
    {% assign diff = now | minus: post_time %}
    {% assign days_old = diff | divided_by: 86400 %}
    
    {% if days_old < 30 %}
      {% assign priority = "0.9" %}
      {% assign changefreq = "daily" %}
    {% elsif days_old < 180 %}
      {% assign priority = "0.8" %}
      {% assign changefreq = "weekly" %}
    {% elsif days_old < 365 %}
      {% assign priority = "0.6" %}
      {% assign changefreq = "monthly" %}
    {% elsif days_old < 730 %}
      {% assign priority = "0.4" %}
      {% assign changefreq = "yearly" %}
    {% else %}
      {% assign priority = "0.2" %}
      {% assign changefreq = "never" %}
    {% endif %}
    
    <url>
      <loc>{{ site.url }}{{ post.url }}</loc>
      <lastmod>{{ post.date | date_to_xmlschema }}</lastmod>
      <changefreq>{{ changefreq }}</changefreq>
      <priority>{{ priority }}</priority>
    </url>
  {% endfor %}
</urlset>
```

## sitemap.txt 兼容旧版爬虫

sitemap.txt 适用于不支持 XML 的搜索引擎（如某些旧版爬虫）

```xml
---
layout: null
permalink: /sitemap.txt
---
{% for page in site.pages %}
{{ site.url }}{{ page.url | replace:'index.html','' }}
{% endfor %}

{% for post in site.posts %}
{{ site.url }}{{ post.url }}
{% endfor %}
```

## 在 robots.txt 里声明 Sitemap

确保搜索引擎能找到 `Sitemap`，需要在 `robots.txt` 文件中声明 `sitemap.xml` 和 `sitemap.txt`

```txt
User-agent: *
Allow: /

User-agent: MJ12bot
Disallow: /
User-agent: AhrefsBot
Disallow: /
User-agent: SemrushBot
Disallow: /
User-agent: dotbot
Disallow: /

Sitemap: https://lhasa.icu/sitemap.xml
Sitemap: https://lhasa.icu/sitemap.txt
```