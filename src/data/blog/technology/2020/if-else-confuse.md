---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-08-23T17:05+08:00
title: (转)一个关于if else容易迷惑的问题
slug: if-else-confuse
ogImage: https://cos.lhasa.icu/ArticlePictures/php.jpg_81
tags:
  - Bug
  - PHP
  - 逻辑
  
description: 看到这张图的时候，我很震惊。这个CDN流量包是我昨天凌晨刚买的，直到此刻才发现我的CDN流量被恶意盗刷了
---

本文转自[Laruence](https://www.laruence.com/2020/07/09/6015.html)

---

这个本来是之前在微博上有个同学说他经常用来面试别人，大概是说，对于如下代码，你觉得会输出啥:

```php
$a = true;if ($a) {  echo "true";} else label: {  echo "false";}
```

当时觉得有点偏，没想写，今天中午又有人问我，我想那就介绍下这个原因吧.

首先，上面的代码输出truefalse, 如果你知道原因，那就不用继续往下看了，如果不知道，那么:

这块让人比较迷惑的原因可能是因为，我们会很直观的认为:

```php
label : {  statement;}
```

应该是一个整体， 就好比类似:

```php
if ($a) {} else switch($a) {}
```

或者:

```php
if ($a) {} else do {} while (!$a);
```

因为在PHP的语法设计中，if else本质上是:

```php
if_stmt: if_stmt_without_else T_ELSE statement
```

也就是说，else后面可以接一切statement，如果条件不成立，执行流就跳到else后面的statement，而while, switch都可以归约为statement。

但label这块稍微有点特别（可以说是一个设计违反直觉的”缺陷”吧), 在zend_language_parser.y中:

```php
statement:  ...  | T_DO statement T_WHILE '(' expr ')' ';' {...}  | T_SWITCH '(' expr ')' switch_case_list {...}  | T_STRING ‘:’ { $$ = zend_ast_create(ZEND_AST_LABEL, $1); }
```

大家可以看到， do while, switch 都会联合他们的body归约为statement（语句），但标签（label）有点不同，”label :”本身会规约为一条statement， 这就导致了这个看起来比较迷惑的问题的出现，他本质上就变成了:

```php
$a = true;if ($a) { echo "true";} else { label: ;  //单独的一条语句}echo "false";
```

最后多说一句，我忘了之前在那看到的，说是这个世界上本无elseif，有的只不过是else (if statement)，本质上其实就跟这个意思是一样的。 就是，else后面可以接语句（statement）。

善用这个结合switch, for, do while等，有的时候可以让我们的代码更精简。
比如，我们要遍历处理一个数组，当数组的长度为零的时候，要做点其他事，那很多人可能会这么写:

```php
if (count($array)) {  for ($i = 0; $i < count($array); $i++) {  }} else {  //数组为空的逻辑}
```

但你也可以写成:

```php
if (count($array) == 0) {   //数组为空的逻辑} else for ($i = 0; $i < count($array); $i++) {}
```

至于这俩中写法孰好孰坏， 那就是萝卜白菜了。

最后，大家如果在实际中遇到类似让大家觉得迷惑的问题，可以留言，也许以后也可以单独成文。