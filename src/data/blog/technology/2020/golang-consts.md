---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-12-19T11:26+08:00
title: 爱上Go语言：常量与枚举
slug: golang-consts
ogImage: https://cos.lhasa.icu/ArticlePictures/golang.jpg_81
tags:
  - Goland
  - 常亮
  - 枚举
  
description: 常量，一经定义不可改变的量...
---

## 常量

常量，一经定义不可改变的量，当出现不需要被更改的数据时，应该使用常量进行储存，从语法角度看，使用常量可以保证数据，在整个运行期间内，不会被更改

常量的值仅仅支持，基础类型，字符串，字符，整型，浮点，布尔

```go
package main

import (
	"fmt"
	"math"
)

func consts() {
	const (
        // 类型可以通过值推导出来，例如这个 filename 就是一个字符串
		filename = "abc.txt"
		a, b     = 3, 4
	)
	var c int
	// 常量没有定义类型的情况下，其数值可作为各种类型使用
	c = int(math.Sqrt(a*a + b*b))
	fmt.Println(filename, c)
}

func main() {
	consts()
}
```



## 枚举

其实Golang并没有enum，但是可以使用 const和iota 来模拟枚举

```go
package main

import (
	"fmt"
)

func enums() {
	const (
		// iota 初始化后会自动递增
		c = iota
		_
		java
		php
		javascript
	)

	const (
		b = 1 << (10 * iota)
		kb
		mb
		gb
		tb
		pb
	)

	// 0 2 4 3
	fmt.Println(c, java, javascript, php)

	// 1 1024 1048576 1073741824 1099511627776 1125899906842624
	fmt.Println(b, kb, mb, gb, tb, pb)
}


func main() {
	enums()
}
```

