---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-05-06T08:34+08:00
title: ionic 笔记 (环境搭建与命令)
slug: ionic
ogImage: https://cos.lhasa.icu/ArticlePictures/ionic.jpg_81
tags:
  - ionic

description: 昨天下午项目经理让我学习 ionic，我就折腾了一下，经过一番折腾我挺喜欢 ionic 和 node.js，不过我也是在折腾的道路上越走越远...
---

昨天下午项目经理让我学习 ionic，我就折腾了一下，经过一番折腾我挺喜欢 ionic 和 node.js，不过我也是在折腾的道路上越走越远，别看这偏博客上就那么点东西，可我这小白操作，真的非常难受...中途遇到各种问题...哎...

## 在项目中用到的环境依赖：

- Node.js
- Android SDK
- Java JDK
- Gradle
- ionic

## 下载安装Node.js

安装的时候把环境变量默认勾选所以不用我们手动配置

```bash
# 查看的当前的Node版本
$ node -v 
v10.15.3 
```

### 更换源

```bash
# 临时
$ npm --registry https://registry.npm.taobao.org install express

# 永久
$ npm config set registry https://registry.npm.taobao.org

# 验证是否更换成功
$ npm config get registry
https://registry.npm.taobao.org/
```

## 第一个Node.js程序！
```bash
achuan@DESKTOP-CL4MMTQ MINGW64 /h/Node.js
$ vi HiNodeJs.js

    console.log("Hello World!");

achuan@DESKTOP-CL4MMTQ MINGW64 /h/Node.js
$ node HiNodeJs.js
Hello World!
```
### 交互模式
用终端 `node` 进入交互模式，可以直接执行遇见并显示结果
```bash
achuan@DESKTOP-CL4MMTQ MINGW64 /h/Node.js  
$ node  
> console.log("Hello World!");  
Hello World!  
undefined
```
## 下载安装 Android SDK
- 微云链接：[https://share.weiyun.com/5ybFh0k](https://share.weiyun.com/5ybFh0k '阿川的 Android SDK 微云下载链接')<br>
- 密码：`achuan`<br>

### 配置环境变量
```bash
ANDROID_HOME
ANDROID_SDK_ROOT
H:\environment\Android\android-sdk

我也不是很理解，明明一样还要声明俩？但是少一个就报错，说 ANDROID_HOME 已经弃用......

# 在用户变量找"PATH"并新建环境变量
%ANDROID_HOME%\tools

# android 命令帮助，出现内容即环境配置成功
$ android -h 
```

### 配置 Android SDK Manager
在`Android SDK Manager`找到下面这些勾选上，然后点击`Install packages`按钮进行下载
```
Tools
    # 工具包自带的Tools
    Aondroid SDK Tools

    # Android公用平台工具
    Aondroid SDK Plaform-tools
    
    # Android构建工具
    Aondroid SDK BUild-tools

# 必须安装，至少需要安装一个版本的API工具包！
Android 9 (API 28)
    # 开发app平台依赖和调试工具
    SDK Platform

    # 模拟器镜像
    Intel x86 Atom_64 System Image

    # API源码
    Sources for Android SDK

Extras
    # 安卓兼容库
    Android Support Repository

    # 加速 Intel 体系的安卓模拟器
    Intel x86 Emulator Accelerator (HAXM install)
```
### 创建、配置并运行 avd 模拟器
```bash
# 创建 avd 模拟器，执行后会有个对话框，右侧有创建按钮根据需要去配置模拟器配置
$ android avd

# 运行 avd 模拟器
$ emulator -avd [avdName]
```

## 下载安装 Java JDK
在官网下载真是死慢，我下载后放在微云了
- 微云链接：[https://share.weiyun.com/54nkkob](https://share.weiyun.com/54nkkob '阿川的 Java JDK 微云下载链接')<br>
- 密码：`achuan`<br>

### 配置环境变量
在安装 Java JDK 点被环境变量出现问题，需要自己手动配置一下

```
JAVA_HOME
H:\environment\Java\jdk1.8.0_211

# 在用户变量找"PATH"并新建环境变量
%JAVA_HOME%\bin
```

在系统环境变量"Path"里找下面这条删掉它<br>
`C:\Program Files (x86)\Common Files\Oracle\Java\javapath`

## 下载安装 Gradle
- 微云链接：[https://share.weiyun.com/5AuD53j](https://share.weiyun.com/5AuD53j '阿川的 Gradle 微云下载链接')<br>
- 密码：`achuan`<br>

安装完毕后查看一下版本，成功忽略下一步，我点背。<br>
```bash
$ gradle -v
```

### 配置环境变量
```
GRADLE_HOME
H:\environment\gradle-4.10.3

# 在用户变量找"PATH"并新建环境变量
%GRADLE_HOME%\bin
```

## 安装ionic
这下轮到我们的猪脚"ionic"登场!`npm install -g cordova ionic`
```bash
achuan@DESKTOP-CL4MMTQ MINGW64 /h/Node.js
$ npm install -g cordova ionic
C:\Users\achuan\AppData\Roaming\npm\cordova -> C:\Users\achuan\AppData\Roaming\npm\node_modules\cordov
a\bin\cordova
C:\Users\achuan\AppData\Roaming\npm\ionic -> C:\Users\achuan\AppData\Roaming\npm\node_modules\ionic\bi
n\ionic
+ ionic@4.12.0
+ cordova@9.0.0
added 718 packages from 390 contributors in 658.274s
```

## 第一个ionic应用！
```bash
# 创建一个空应用 myApp
$ ionic start myApp tabs

# 添加对 android 平台的支持 
$ ionic cordova platform add android

    # 参数可选
    [android] or [ios]

# 编译项目 apk
$ ionic cordova build android [可填选参数]

    # 压缩编译项目 apk
    --prod

    # 编译发行版 apk
    --release

    # 编译压缩发行版 apk
    --release --prod

生成的 apk 文件在  `[项目名]\platforms\android\app\build\outputs\apk\debug\`
```

## 运行项目进行调试
```bash
# 用默认浏览器运行调试，默认端口`8100`，`127.0.0.1:8100`。
$ ionic serve

# 在 AVD 模拟器中运行调试 [android] or [ios]
$ ionic cordova emulate android
```

### 遇到的问题
&emsp;看着终端依赖疯狂报错......心好累......忽然觉得我这辈子最让我难受的不是电脑卡、网速慢这都是死问题能搞好。而这软件框架在win运行真是各种奇葩环境依赖Bug......它能把我逼疯......
- **缺少 Android SDK**<br>


```
You have been opted out of telemetry. To change this, run: cordova telemetry on.
Failed to find 'ANDROID_HOME' environment variable. Try setting it manually.
Failed to find 'android' command in your 'PATH'. Try update your 'PATH' to include path to valid SDK directory.
[ERROR] An error occurred while running subprocess cordova.

        cordova build android exited with exit code 1.

        Re-running this command with the --verbose flag may provide more information.
```

- **Java JDK 版本过低**<br>
这玩意有个对 Java JDK 版本要求，`不能低于1.7`正好被我踩个准正好1.7.....

```
Checking Java JDK and Android SDK versions
Requirements check failed for JDK 8 ('1.8.*')! Detected version: 1.7.0
Check your ANDROID_SDK_ROOT / JAVA_HOME / PATH environment variables.
ANDROID_SDK_ROOT=undefined (recommended setting)
ANDROID_HOME=H:\environment\Android\android-sdk (DEPRECATED)
[ERROR] An error occurred while running subprocess cordova.

    cordova build android exited with exit code 1.

    Re-running this command with the --verbose flag may provide more information.
```

- **Gradle 版本过高导致不兼容**<br>
这玩意跟 Java JDK "搞双簧？"版本过高导致不兼容。
以前是我单独装的`Gradle 5.4.1 all`报错后不知道怎么了，自动修复给下载了`Gradle 4.10.3 all`

```
Using cordova-fetch for andrid
Failed to fetch platform andrid
Probably this is either a connection problem, or platform spec is incorrect.
Check your connection and platform name/version/URL.
Error: npm: Command failed with exit code 1 Error output:
npm ERR! code E404
npm ERR! 404 Not Found: andrid@latest

npm ERR! A complete log of this run can be found in:
npm ERR! C:\Users\achuan\AppData\Roaming\npm-cache\_logs\2019-05-07T05_31_11_192Z-debug.log
[ERROR] An error occurred while running subprocess cordova.

    cordova platform add andrid --save exited with exit code 1.

    Re-running this command with the --verbose flag may provide more information.
```

## 常用命令
```bash
# 查看 Node.js 版本
$ npm -v

# 安装 ionic
$ nmp install -g ionic

# 安装 Cordova 
$ nmp install -g cordova

# 更新 ionic cordova
$ nmp update -g ionic cordova

# 查看 ionic 版本
$ ionic -v

# 查看 ionic 环境信息
$ ionic info

# 查看 ionic 信息
$ ionic -info

# 移除 [android] or [ios] 平台的支持
$ ionic cordova platform remove android

# 用浏览器进行本地调试
$ ionic serve

# 在模拟器中运行调试 [android] or [ios]
$ ionic cordova emulate android

# 显示系统中全部 android 平台
$ android list targets

# 显示系统中全部 avd 模拟器
$ android list avd

# 删除 avd 模拟器
$ android delete avd -n [avdName]
```