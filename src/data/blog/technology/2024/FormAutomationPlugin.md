---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2024-08-07T14:26+08:00
title: 写一个Chrome表单自动化插件
slug: FormAutomationPlugin
ogImage: https://cos.lhasa.icu/ArticlePictures/Form-automation-plugin.png_81
tags:
  - 扩展
  - JavaScript
  - 自动化

description: 在刷博客的时候，最麻烦的事情之一就是手动填写各种表单。为了提高我的冲浪体验，诞生了这款表单自动化插件
---

在刷博客的时候，最麻烦的事情之一就是手动填写各种表单。为了提高我的冲浪体验，诞生了这款表单自动化插件。经过爬虫上百次调教，兼容95%博客，另外5%的网站正常人写不出来，autocomplete小伎俩都上不了台面，各种防止逆向、防调试测试，心累。

## 项目结构
插件纯绿色，无隐私可言。除images外，全部资源和代码文件都经过Webpack打包，下面是项目的目录结构以及各部分的说明：
```
Form-automation-plugin
│  index.html
│  LICENSE
│  manifest.json
│  package-lock.json
│  package.json
│  README.md
│  webpack.config.js
│  
├─dist
│      33a80cb13f78b37acb39.woff2
│      8093dd36a9b1ec918992.ttf
│      8521c461ad88443142d9.woff
│      autoFill.min.js
│      eventHandler.min.js
│      formManager.min.js
│      main.min.css
│
└─src
    │  autoFill.js
    │  eventHandler.js
    │  formManager.js
    │  template.css
    │  template.html
    │
    ├─fonts
    │      iconfont.css
    │      iconfont.ttf
    │      iconfont.woff
    │      iconfont.woff2
    │
    └─images
            Appreciation-code.jpg
            icon128.png
            icon16.png
            icon48.png
```

## webpack.config.js
```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    autoFill: './src/autoFill.js',
    eventHandler: './src/eventHandler.js',
    formManager: './src/formManager.js',
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.min.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'template.html'),
      filename: '../index.html',
      inject: 'body',
    }),
  ],
  resolve: {
    extensions: ['.js', '.css'],
  },
};
```

## autoFill.js
```js
// autoFill.js文件是插件的最重要的核心模块，涉及到了插件的主要输出功能
// 遍历当前页面所有input，将autocomplete值设置为on，监听Textarea输入时触发
function handleAutocomplete() {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    const autocompleteAttr = input.getAttribute('autocomplete');
    if (autocompleteAttr) {
      input.setAttribute('autocomplete', 'on');
    } else {
      input.setAttribute('autocomplete', 'on');
    }
  });
}

// 这个函数有些臃肿，马上要去骑车，懒得搞了，现在的逻辑已经完善到9成了，大多数意外情况都卷了进去，但是一些防逆向防调试，我暂时无法解决，前端菜鸟，还望大哥指点一二
function fillInputFields() {
  chrome.storage.sync.get(["name", "email", "url"], (data) => {
    // console.log(data);

    const hasValidName = data.name !== undefined && data.name !== "";
    const hasValidEmail = data.email !== undefined && data.email !== "";
    const hasValidUrl = data.url !== undefined && data.url !== "";

    // 关键字
    const nameKeywords = [
      "name", "author", "display_name", "full-name", "username", "nick", "displayname", 
      "first-name", "last-name", "full name", "real-name", "given-name", 
      "family-name", "user-name", "pen-name", "alias", "name-field", "displayname"
    ];
    const emailKeywords = [
      "email", "mail", "contact", "emailaddress", "mailaddress", 
      "email-address", "mail-address", "email-addresses", "mail-addresses", 
      "emailaddresses", "mailaddresses", "contactemail", "useremail", 
      "contact-email", "user-mail"
    ];
    const urlKeywords = [
      "url", "link", "website", "homepage", "site", "web", "address", 
      "siteurl", "webaddress", "homepageurl", "profile", "homepage-link"
    ];

    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      const typeAttr = input.getAttribute("type")?.toLowerCase() || "";
      const nameAttr = input.getAttribute("name")?.toLowerCase() || "";
      let valueToSet = "";

      // 处理 URL
      if (urlKeywords.some(keyword => nameAttr.includes(keyword))) {
        if (hasValidUrl) {
          valueToSet = data.url;
        }
      }
      // 处理邮箱
      else if (emailKeywords.some(keyword => nameAttr.includes(keyword))) {
        if (hasValidEmail) {
          valueToSet = data.email;
        }
      }
      // 处理名称
      else if (nameKeywords.some(keyword => nameAttr.includes(keyword))) {
        if (hasValidName) {
          valueToSet = data.name;
        }
      }

      // 处理没有 type 属性或者 type 为 text 的情况
      if ((typeAttr === "" || typeAttr === "text") && valueToSet === "") {
        if (nameAttr && nameKeywords.some(keyword => nameAttr.includes(keyword))) {
          if (hasValidName) {
            valueToSet = data.name;
          }
        } else if (nameAttr && urlKeywords.some(keyword => nameAttr.includes(keyword))) {
          if (hasValidUrl) {
            valueToSet = data.url;
          }
        }
      }

      // 处理 type 为 email
      if (typeAttr === "email" && valueToSet === "") {
        if (nameAttr && emailKeywords.some(keyword => nameAttr.includes(keyword))) {
          if (hasValidEmail) {
            valueToSet = data.email;
          }
        }
      }

      // 处理 type 为 url
      if (typeAttr === "url" && valueToSet === "") {
        if (nameAttr && urlKeywords.some(keyword => nameAttr.includes(keyword))) {
          if (hasValidUrl) {
            valueToSet = data.url;
          }
        }
      }

      // 填充输入字段
      if (valueToSet !== "") {
        input.value = valueToSet;
      }
    });
  });
}

function clearInputFields() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    const typeAttr = input.getAttribute("type")?.toLowerCase();
    if (typeAttr === "text" || typeAttr === "email") {
      input.value = "";
    }
  });
}

// 监听 textarea 标签的输入事件
document.addEventListener("input", (event) => {
  if (event.target.tagName.toLowerCase() === "textarea") {
    handleAutocomplete();
    fillInputFields();
  }
});
```

## formManager.js
该文件负责向Chrome本地存储和修改，就CURD，没啥含量

```js
import './fonts/iconfont.css';
import './template.css';

document.getElementById("save").addEventListener("click", () => {
  const saveButton = document.getElementById("save");
  if (saveButton.textContent === "更改") {
    unlockInputFields();
    changeButtonText("保存");
    return;
  }

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const url = document.getElementById("url").value.trim();

  // 验证邮箱格式的正则表达式
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (name === "" || email === "") {
    alert("请填写必填字段：姓名和邮箱!");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("请输入有效的邮箱地址!");
    return;
  }

  // 从 Chrome 存储中读取当前的值
  chrome.storage.sync.get(["name", "email", "url"], (data) => {
    const isNameAndEmailChanged = name !== data.name || email !== data.email;
    const isUrlChanged = url !== data.url;

    if (isNameAndEmailChanged || isUrlChanged) {
      chrome.storage.sync.set({ name, email, url }, () => {
        lockInputFields();
        changeButtonText("更改");
      });
    } else {
      lockInputFields();
      changeButtonText("更改");
    }
  });
});

// 页面加载完成时执行
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.sync.get(["name", "email", "url"], (data) => {
    document.getElementById("name").value = data.name || "";
    document.getElementById("email").value = data.email || "";
    document.getElementById("url").value = data.url || "";

    if (data.name || data.email || data.url) {
      lockInputFields();
      changeButtonText("更改");
    }
  });

  const menuItems = document.querySelectorAll('.dl-menu li a');
  const tabContents = document.querySelectorAll('.tab-content');

  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', (event) => {
      event.preventDefault();
      tabContents.forEach(tab => tab.classList.remove('active'));
      const targetId = menuItem.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.add('active');
      menuItems.forEach(item => item.parentElement.classList.remove('active'));
      menuItem.parentElement.classList.add('active');
    });
  });
});

// 锁定输入框
function lockInputFields() {
  document.getElementById("name").setAttribute("disabled", "true");
  document.getElementById("email").setAttribute("disabled", "true");
  document.getElementById("url").setAttribute("disabled", "true");
}

// 解锁输入框
function unlockInputFields() {
  document.getElementById("name").removeAttribute("disabled");
  document.getElementById("email").removeAttribute("disabled");
  document.getElementById("url").removeAttribute("disabled");
}

// 更改按钮文本
function changeButtonText(text) {
  document.getElementById("save").textContent = text;
}
```

## 使用方法
git clone到本地，浏览器打开：chrome://extensions/，加载已解压的扩展程序

由于我没有注册Chrome应用商店开发者，目前只能本地运行，过几天上线应用商店，Tampermonkey等骑车回来再做

## Github
Form-automation-plugin：<a href="https://github.com/achuanya/Form-automation-plugin" target="_blank">https://github.com/achuanya/Form-automation-plugin</a>