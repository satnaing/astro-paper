---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-04-08T10:28+08:00
title: _initialize() 和 __construct() 的区别
slug: initialize-construct
ogImage: https://cos.lhasa.icu/ArticlePictures/php.jpg_81
tags:
  - OOP
  - PHP

description: 今天项目经理让我做个一个功能页面，在查阅往常相同项目源码时遇到一个没有见过的函数...
---

今天项目经理让我做个一个功能页面，在查阅往常相同项目源码时遇到一个没有见过的函数 `_initialize()`Google一下知道了它是Thinkphp内置函数，查阅了一番资料写了几遍总结一下。  

_initialize()函数是在任何函数之前，都要执行的，当然也包括__construct()也就是构造函数。也就是说如果_initialize()函数存在，调用对象的任何方法都会导致_initialize()函数的自动调用，而_construct()函数仅仅在创建一次，跟其它方法调用没有关系。  

__construct()函数它是**双下划线**，而_initialize()函数是**单下划线**。  

如果父子类均有_initialize()函数，则子类覆盖父类，如果子类没有而父类有，则子类继承父类。  

默认情况下，子类的构造函数不会自动调用父类的构造函数。在调用子类对象的_initialize()函数时，也不会导致自动调用父类的_initialize()函数。
实际编写子类的构造函数时，一般都要加上父类构造函数的主动调用parent::__construct()，否则会导致子类对象空指针的异常，
如

    `Call to a menmber function assign() on anon-obiect`。