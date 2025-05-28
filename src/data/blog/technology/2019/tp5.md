---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-02-28T16:25+08:00
title: ThinkPHP 笔记(路由实现与操作方法)
slug: tp5
ogImage: https://cos.lhasa.icu/ArticlePictures/ThinkPHP.jpg_81
tags:
  - ThinkPHP
  - PHP
  - 路由
  
description: 前段时间一直在学习ThinkPHP，不过比较忙没有同步博客，今天发表一下...
---

前段时间一直在学习ThinkPHP，不过比较忙没有同步博客，今天发表一下。

## 路由文件
- H:\tp5\thinkphp\library\think

## 生成一个控制器文件
控制器文件命名规范，大写字母开头的驼峰命名。  
- php think make:controller index/Sql --plain

## 浏览器访问控制器（sql.php）
- tp5.io/index/Sql
- 域名/模块/控制器  

ThinkPHP的控制器操作方法支持不同的响应输出，对于不同的响应输出会调用不同的Response子类 ，例如‘json’，‘xml’等，可以直接return一个数组或者对象数据，然后交给‘Response’对象。还有一种情况是，你可以统一使用系统提供的钩子输出进行额外的处理，而如果你使用了‘echo’直接输出，将无法享受这些功能特性。

### 更简短的url
路由定义前URL：tp5.io/index/Sql
- Route::get('sql','Sql/index');  

路由定义后URL：tp5.io/Sql

## 添加操作方法
操作方法命名规范，小写字母开头的驼峰命名。  
如果定义路由并且**没有开启强制开路由**的话，那么系统会根据下面的默认规则解析URL  
- 域名/<入口文件>/模块名/控制器/操作器名/参数1/值//参数2/...  

对于操作方法的必要参数，我们使用了方法的参数定义。对于方法的参数，通常包含两种类型：对象类型和普通类型。所有的参数都是来自于当前的请求，对象类型参数比较特殊一些，通常是通过依赖注入自动完成。
- 注意：并不是所有的URL地址中的变量都是‘$GET’变量。  

在ThinkPHP中URL中属于pathinfo地址，这个地址的的解析过程是由框架内部实现的，并且会自动解析成一个URL变量（但却不是GET变量，证据就是你用原生的‘$_GET['id']’是获取不到‘id’的值的），一个真正的GET变量应该是下面的请求URL。
- index/sql/read?id=123  

这个时候id变量才是一个真正的‘$_GET’变量，因为我们可以通过原生的‘$_GET['id']获取到‘id’值。
不过框架封装看一个‘param’变量，可以让你不管当前的请求类型是‘GET’还是‘POST’，都能无差别的统一获取当前的请求变量。  
所以，上面两种URL地址，我们都可以统一使用‘input('id')’（这是一个助手函数，其实是调用‘Request’对象的‘param’方法）来获取当前请求的‘id’变量，当然‘$_GET’和'$_POST'
ThinkPHP定义操作名时不能用‘php’关键词，如果php版本低于5.6+，如果你担心你的应用可能存在此类问题，那么可以尝试使用方法后缀功能，代价就是你在定义方法的时候可能要多写几个字符了。
- // 操作方法后缀
- 'action_suffix' => 'Action',  

也是就说每个操作方法名都要加‘Action’的后缀，不过访问操作名的时候‘不需要加Action’  
如果使用的是‘PHP7.0+’版本的话，基本不用担心这个问题，但可能会受到来自IDE自动格式化的困惑。