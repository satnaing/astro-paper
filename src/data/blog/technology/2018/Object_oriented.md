---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2018-09-23T11:28+08:00
title:  面向对象(Object Oriented)学习笔记(一)
slug: Object_oriented
ogImage: https://cos.lhasa.icu/ArticlePictures/oop.jpg_81
tags:
  - OOP
  - PHP
  
description: 面向对象技术最早是在编程语言Simual中提出，1967年2月20日，在挪威奥斯陆郊外的小镇莉沙布举行的IFIP TC-2 工作会议上...
---

## 一. 面向对象(OOP)的发展历程
### 1. OOP的诞生
[**Simulaq**][1]面向对象技术最早是在编程语言Simual中提出，1967年2月20日，在挪威奥斯陆郊外的小镇莉沙布举行的IFIP TC-2 工作会议上，

挪威科学家 Ole-Johan Dahl 和 Kristen Nygaard 正式发布了Simula 67语言。Simula 67，是面向对象的开山祖师，

它引入了所有后来面向对象程序设计语言所遵循的基础概念：对象、类、继承，但它的实现并不是很完整。后来[**Smalltalk**][2]的诞生，

第二个面向对象的程序语言的出现，而且是第一个完整实现了面向对象技术的语言，和第一个真正的集成开发环境(IED)。

## 二. 面向对象(OOP)的概念  
OOP达到了软件工程的三个目标  
* **重用性**、**灵活性**、**扩展性**

## 三. OOP三大特征  

* 封装(Encapsulation)：对外部不可见
* 继承(Inheritance)：扩展类的功能  
* 多态(Polymorphism)：对象的重载、对象的多态性  

## 四. 类与对象

* 类是对某一类事物的描述，是抽象的、概念上实际存在的该类事物的每个个体，因而也称实例(instance)，

换种方法解释类就像一个具体的事物，一个对象，用编程代码来描述出来，

* 对象，简单的来说对象是可以使用的，而类只是对这件事物进行描述，它不能使用。

## 五. 类与对象的关系

这个我表达能力不太好哈...这样说吧，类就好比工厂车间的模具，而对象就是模具所产生的事物，一个模具是可以产生很多对象!
也就是说对象是类的实例化

## 六. 类的声明与对象的创建及使用
好了我们来了解一下怎么找对象，...不..创建对象..  

### 1. 类的声明  

```php
class 类名称{
    // 这里成员属性修饰还有好几种下次一次详解
    // 声明成员变量(属性)
    数据类型 属性...

    // public 表示公有
    public 返回值的数据类型 方法名称 (参数1，参数2){  // 定义方法
        // 程序语句..
        // return 等表达式
    }
}
```

### 2. 对象的创建及使用:

// 实例化对象,有参数别忘了加括号!<br>
`$定义对象名称 = new 类名([参数列表]);`

* 对象中成员的访问:
// 输出对象的属性<br>
`$对象名 -> 成员属性 = 赋值;`

// 调用对象的方法:<br>
`$对象名 -> 成员方法(参数);`<br>
// 成员属性中还分有静态属性, 它是不能实例化的,往后我会补充

```php
<?php
/*---------------------------------*\
    对象实例化
    //实例化指OOP编程中，类创建对象的过程
\*---------------------------------*/
class phone{
    # 成员属性
    public $width;
    public $height;
    public $size;

    # 成员方法
    public function call($name){
        echo "正在给{$name}打电话";}

    public function message($name){
        echo "正在给{$name}发短信";}
    public function play(){
        echo "正在玩游戏!";}

    public function info(){
        $this -> play();
        return "<br> 手机的宽度；{$this -> width},<br> 手机的高度；{$this -> height}";}
}

# 实例化对象
$phone = new phone();
$phone -> width = "5CM";
$phone -> height = "10CM";

//$phone -> width = "5CM"; //对象对成员属性的赋值(引用变量时 $ 符可以不写)
//echo $phone -> width; //与对象取得成员属性存的值
//$phone1 = new phone();
//$phone1 -> height = "10CM";
//$height = $phone1 -> height;
//echo $height; 
//echo $phone1 -> height;

//$phone1 -> aaaa = "AAAA";font
//var_dump("<br>",$phone1);
$phone -> call("!list");
$phone -> call("<br> tom");
echo "<br>";
$phone -> play();
echo $phone -> info();

?>
```

呼～ 第一章写完了，我也是近期刚学OOP，可能哪个方面写的并不是很好 嘿嘿，如有写的不足之处，还请您在下方留言!

[1]: https://zh.wikipedia.org/wiki/Simula
[2]: https://zh.wikipedia.org/wiki/Smalltalk
