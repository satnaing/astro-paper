---
author: 爱上Go语言：终端命令
draft: false
featured: false
category: technology
pubDatetime: 2019-07-05T10:18+08:00
title: 爱上Go语言：终端命令
slug: Love-go
ogImage: https://cos.lhasa.icu/ArticlePictures/golang.jpg_81
tags:
  - Goland
  - Bash
  
description: 在前段时间我学习Docker的过程中和Go进行了我们的第一次约会，超级简单的环境配置搭建、简洁而清晰的语法...
---

## Hello Golang！
在前段时间我学习Docker的过程中和Go进行了我们的第一次约会，超级简单的环境配置搭建、简洁而清晰的语法，近期我已经完全沦陷于Go，已经到了如痴如醉的地步。

作为一个phper，我发现学习Go也是有优势的！PHP和Go都是C语系，上手难度不大，我在微服务、区块链专栏中也经常看到PHP\Go的需要。

至于发展前景也是一片光明。Go诞生于Google且开源，打造的王牌项目都是没的说：Docker、Kubernetes...

## build、run、clean
```go
// 这是测试编译命令，和其他静态类型语言一样，要执行 Go程序，需要先进行编译，然后在执行产生的可执行 .exe 文件，
// 如果我们在执行 go build 命令时不后跟任何代码包，那么命令将编译当前目录下的代码包。但不是所有的 Go 程序都可以编译成可执行文件的，它需要满足两个条件：
$ go build
    // 例如以下代码且取名 main.go 在第一行 package main 表示是一个可执行的程序，当然每个 Go应用程序都应当包含一个名为 main 的包。
    // 看到 import ("fmt") 这是指将 fmt 这个包导入 main.go，表示在 main.go 中可以使用 fmt 包中可见所有方法、类型等。

    package main
    import (
        "fmt"
    )
    func main() {
        fmt.Println("Hello Go!")
    }

// run 可以把编译源文件和运行对应的可执行文件，这两步化为一步（需要注意的是 run 不会产生文件）
$ go run

// 删除当前目录下的所有可执行文件（无参数）
$ go clean [alrtAFR]
    // 会删除对应的可执行文件
    sourcefile.go
```

## install、test
```bash
# install 用于编译并安装指定的代码包及依赖包。该命令分成两步操作，第一步是生成结果文件（.exe或.a），第二部把编译结果移到 $GOPATH/pkg 或 $GOPATH/bin
    # .exe：带 main 函数的Go文件产生的，有函数入口，所有可以直接运行
    # .a：应用包，不包含main函数的Go文件产生的，没有函数入口，只能被调用
$ go install

# 用来运行测试，这种测试是以包为单位的。需要遵循三个规则
    # 测试源码文件是名称以“_test.go”为后缀
    # 内涵若干测试函数的源文件
    # 测试函数一般是以“Test”为名称前缀并有一个类型为“testing.T”的参数声明的函数
$ go test
```

## get、doc
```bash
# 获取代码进行自动编译和安装
$ go get [-alrtAFR]
    # 显示操作流程日志及信息
    -v
    # 下载丢失的包，但不更新已经存在的包
    -u
    # 只下载，不自动安装
    -d
    # 允许使用 HTTP 方式进行下载操作
    -insecure

# 支持 package、func const、var这些代码生成文档，且只对 Public 变量自动生成，而 Private 变量不会
$ go doc
```

## 其他命令工具
```bash
# 查看Go当前的版本
$ go version

# 用来修复以前老版本的代码到新版本，列入go1之前老版本的代码转化到go1
$ go fix

# 查看当前go的环境变量
$ go env

# 列出当前全部安装的package
$ go list

# 格式化Go代码文件
$ go fmt
```
