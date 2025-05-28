---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-04-14T15:28+08:00
title: ThinkPHP 6.0 下载安装与配置
slug: ThinkPHP6.0-installation
ogImage: https://cos.lhasa.icu/ArticlePictures/ThinkPHP.jpg_81
tags:
  - ThinkPHP
  - PHP
  - 安装
  - 配置
  
description: ThinkPHP 6.0 要求 PHP >= 7.1.0，6.0版本开始，必须通过 Composer 方式安装和更新，否则无法使用 Git 下载安装...
---

- ThinkPHP `6.0` 要求 PHP >= `7.1.0`
- `6.0`版本开始，必须通过`Composer`方式安装和更新，无法使用Git下载安装。

## 安装Composer

```bash
$ curl -sS https://getcomposer.org/installer | php

# 全局调用
$ sudo mv composer.phar /usr/local/bin/composer

 /usr/src [09:22:13]
achuan$ composer
   ______
  / ____/___  ____ ___  ____  ____  ________  _____
 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
                    /_/
Composer version 1.10.5 2020-04-10 11:44:22

# 使用阿里云镜像
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

## 安装
```zsh
# 稳定版
$ composer create-project topthink/think tp6

# 开发版
$ composer create-project topthink/think=6.0.x-dev tp6

# 更新已安装的旧版本核心框架
$ composer update topthink/framework
```


## 配置

```bash
# apache配置
$ sudo vim /etc/httpd/conf/extra/httpd-vhosts.conf
<VirtualHost *:80>
    ServerName tp6.io
    DocumentRoot /home/achuan/language/php/tp6/public
    <Directory  "/home/achuan/language/php/tp6/">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

$ sudo vim /etc/hosts
127.0.0.1 tp6.io

# 不进行apache配置也可以测试运行 默认端口为：8000
$ php think run -p 1081

# 环境变量定义 可以更名为.env进行修改生效，该文件默认开启调试模式。
$ mv example.env .env

# 对外访问
$ sudo chmod -R 777 public

# 安装多应用模式扩展 think-multi-app
$ composer require topthink/think-multi-app
# 创建一个名为 index 的应用，返回Successed则成功
$ php think build index
# 多应用模式部署后，必须要删除controller目录，因为系统根据该目录作为判断是否为单应用
$ rm -rf controller
```


## 目录结构

### 单应用模式

```bash
www  WEB部署目录（或者子目录）
├─app           应用目录
│  ├─controller      控制器目录
│  ├─model           模型目录
│  ├─ ...            更多类库目录
│  │
│  ├─common.php         公共函数文件
│  └─event.php          事件定义文件
│
├─config                配置目录
│  ├─app.php            应用配置
│  ├─cache.php          缓存配置
│  ├─console.php        控制台配置
│  ├─cookie.php         Cookie配置
│  ├─database.php       数据库配置
│  ├─filesystem.php     文件磁盘配置
│  ├─lang.php           多语言配置
│  ├─log.php            日志配置
│  ├─middleware.php     中间件配置
│  ├─route.php          URL和路由配置
│  ├─session.php        Session配置
│  ├─trace.php          Trace配置
│  └─view.php           视图配置
│
├─view            视图目录
├─route                 路由定义目录
│  ├─route.php          路由定义文件
│  └─ ...   
│
├─public                WEB目录（对外访问目录）
│  ├─index.php          入口文件
│  ├─router.php         快速测试文件
│  └─.htaccess          用于apache的重写
│
├─extend                扩展类库目录
├─runtime               应用的运行时目录（可写，可定制）
├─vendor                Composer类库目录
├─.example.env          环境变量示例文件
├─composer.json         composer 定义文件
├─LICENSE.txt           授权说明文件
├─README.md             README 文件
├─think                 命令行入口文件
```

### 默认应用文件

```bash
├─app           应用目录
│  │
│  ├─BaseController.php    默认基础控制器类
│  ├─ExceptionHandle.php   应用异常定义文件
│  ├─common.php            全局公共函数文件
│  ├─middleware.php        全局中间件定义文件
│  ├─provider.php          服务提供定义文件
│  ├─Request.php           应用请求对象
│  └─event.php             全局事件定义文件
```

相关文档：

- [ThinkPHP6.0完全开发手册][1]
- [ThinkPHP6.0讲解教学][2]
- [ThinkPHP6.0核心框架包][3]

[1]: https://www.kancloud.cn/manual/thinkphp6_0/1037479
[2]: https://haha.tpsns.com/video2/index.php?video_id=i0867pch5zw
[3]: https://github.com/top-think/framework