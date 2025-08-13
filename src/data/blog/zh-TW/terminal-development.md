---
title: 如何使用 React 開發我的終端機作品集網站
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "範例文章：使用 ReactJS、TypeScript 和 Styled-Components 開發終端機風格的網站。
  包含自動完成、多主題、命令提示等功能。"
timezone: "Asia/Yangon"
lang: zh-tw
---

> 本文原載於我的 [部落格文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)。我將此文放在這裡來示範如何使用 AstroPaper 主題撰寫部落格文章。

使用 ReactJS、TypeScript 和 Styled-Components 開發終端機風格的網站。包含自動完成、多主題、命令提示等功能。

![Sat Naing 的終端機作品集](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目錄

## 介紹

最近，我開發並發布了我的作品集和部落格。我很高興收到了一些好評。今天，我想介紹我的新終端機風格作品集網站。它是使用 ReactJS 和 TypeScript 開發的。我從 CodePen 和 YouTube 得到了這個想法。

## 技術棧

這是一個沒有後端程式碼的前端專案。UI/UX 部分是在 Figma 中設計的。對於前端使用者介面，我選擇了 React 而不是純 JavaScript 和 NextJS。為什麼？

- 首先，我想寫宣告式程式碼。使用 JavaScript 命令式地管理 HTML DOM 真的很繁瑣。
- 其次，因為它是 React！！！它快速且可靠。
- 最後，我不需要 NextJS 提供的 SEO 功能、路由和圖片優化。

當然還有 TypeScript 用於型別檢查。

對於樣式，我採用了與平常不同的方法。我沒有選擇 Pure CSS、Sass 或像 TailwindCSS 這樣的實用 CSS 框架，而是選擇了 CSS-in-JS 方式（Styled-Components）。雖然我已經知道 Styled-Components 一段時間了，但我從未嘗試過。所以，這個專案中 Styled-Components 的寫作風格和結構可能不是很組織化或很好。

這個專案不需要非常複雜的狀態管理。我只在這個專案中使用 ContextAPI 來實現多主題並避免 prop drilling。

以下是技術棧的快速回顧。

- 前端：[ReactJS](https://reactjs.org/ "React 網站")、[TypeScript](https://www.typescriptlang.org/ "TypeScript 網站")
- 樣式：[Styled-Components](https://styled-components.com/ "Styled-Components 網站")
- UI/UX：[Figma](https://figma.com/ "Figma 網站")
- 狀態管理：[ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- 部署：[Netlify](https://www.netlify.com/ "Netlify 網站")

## 功能

以下是專案的一些功能。

### 多主題

使用者可以更改多個主題。在撰寫此文時，有 5 個主題；未來可能會添加更多主題。選定的主題會保存在本地儲存中，這樣頁面重新整理時主題就不會改變。

![設定不同主題](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令列自動完成

為了讓外觀和感覺盡可能接近實際的終端機，我加入了命令列自動完成功能，只需按 'Tab' 或 'Ctrl + i' 就能自動填入部分輸入的命令。

![示範命令列自動完成](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 先前命令

使用者可以按上箭頭和下箭頭回到先前的命令或導航先前輸入的命令。

![使用上箭頭回到先前命令](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看/清除命令歷史

先前輸入的命令可以通過在命令列中輸入 'history' 來查看。所有命令歷史和終端機螢幕都可以通過輸入 'clear' 或按 'Ctrl + l' 來清除。

![使用 'clear' 或 'Ctrl + L' 命令清除終端機](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 結語

這是一個非常有趣的專案，這個專案的一個特殊部分是，我必須專注於邏輯而不是使用者介面（即使這有點像前端專案）。

## 專案連結

- 網站：[https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- 儲存庫：[https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
