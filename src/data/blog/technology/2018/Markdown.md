---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2018-09-03T12:44+08:00
title: 致简写作神器 —— Markdown
slug: Markdown
ogImage: https://cos.lhasa.icu/ArticlePictures/markdown.jpg_81
tags:
  - Markdown
  
description: Markdown 是由 John Gruber 在2004年创建的「轻量级标记语言」，至今它已经有14岁了！
---

## 1. Markdown？

[Markdown][1]是什么？  
Markdown 是由 John Gruber 在2004年创建的「轻量级标记语言」，至今它已经有14岁了！ 

Markdown最初的定义**纯文本语法**。  
设计理念就是易写、易读。
它那么的纯洁、致简、美妙感觉词汇已经不能形容Markdown的美。试着写一写，你也会爱上它。

## 2. Markdown 它有哪些优点？

前文说了它的定义与设计理念，易写、易读，无非就是Markdown最大的特点。

### 一. 所谓易写？

这里说的易写，是指写作的过程。因为它语法的原因且编辑器实时预览的情况下，差不多全程键盘，基本脱离对鼠标的依赖。这样就可以集中精力放在文章上。因为它语法简单，所以书写错误易发现。

### 二. 所谓易读？

所谓易读，可不要理解为**排版之后呈现出来的结果**，这里的**易读**是指**源代码文件**（也就是以 **.md**;**.markdown**;**.mdown** 后缀名的文件）它不会像写Html时那样，满屏幕都是密密麻麻的<标签>与选择器...

## 3. Markdown的优势与局限

我们知道Markdown只是一个<轻量级标记语言>，相比xml、html或Word、Pages这类，Markdown在排版的功能上显的弱一点。

### 一.  Markdown无法对段落进行灵活处理

在word中，像文本框，图片你可以随意调整它的位置。但Markdown不行，相比Markdown只能线性的对文字进行排版。

### 二. Markdown对非纯文本元素的排版能力很差

一篇文章，如果只有文字的话，总有感觉有点枯燥枯燥，但是Markdown限于纯文本格式，Markdown几乎做不到像Word那样对图片灵活的调整位置。

### 三. Markdown专注你的文字内容，而不是排版

Markdown不像Word那样花哨，应为语法的缘故吧，感觉它是那么的纯洁，做纯文字处理很棒的，我每次使用Markdown写文章时，有种很美妙的感觉...
## 4. Markdown语法与编辑器

Markdown语法的目标是：**成为一种使用网络的书写语言**。  
毕竟我们的易写、易读是有目共睹的，立志做书写语言我们是认真的！  
### Retext的安装
日常我都是用Ubuntu18.04LTS，Markdown编辑器我用的是[ReText][2]，不过windows、Mac也有很多优秀支持Markdown的编辑器，如MarkdownPad、Sublime Text3、Marxico等等...在这里我就不一一介绍了。

#### 1. 安装

```bash
$ sudo apt-get install retext

# 也可以到官网下载，有deb包。
```

#### 2. 配置

```bash
# 添加数学公式的支持
$ sudo apt-get install libjs-mathjax
```

然后在"**extensions.txt**"中添加"**mathjax**"（没有这个文件创建一个）  `

```bash
# 添加：mathjax
$ vim .config/markdown-extensions.txt
```

ok!  如果需要网页在线编辑器[MaHua 在线markdown编辑器][3]

语法比较简单，就不一一说了

[1]: https://en.wikipedia.org/wiki/Markdown
[2]: https://pypi.org/project/ReText
[3]: https://www.zybuluo.com/mdeditor