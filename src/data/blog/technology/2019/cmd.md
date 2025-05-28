---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-02-12T12:44+08:00
modDatetime: 2019-05-03T14:41+08:00
title: Cmd 笔记(长期更新)
slug: cmd
ogImage: https://cos.lhasa.icu/ArticlePictures/cmd.jpg_81
tags:
  - Cmd
  - Windows
  
description: 最近从 linux 换到 windows 真是一言难尽下次发表磁盘阵列的时候再说这个事吧...  
---

最近从 linux 换到 windows 真是一言难尽下次发表磁盘阵列的时候再说这个事吧...  
转到windows后安装mysql,又想起linux的终端了,但是windows没这玩意,cmd凑合一下吧,再温习一下cmd的一些命令...

## 查看

```bash
# 查看本地ip
ipconfig
# 检查Windows版本
winver
# 查看默认用户
net user
# 查看用户组
net localgroup
```

## 复粘删拷

```bash
# 复制文件
copy
# 移动文件
move
# 删除文件
del
# 拷贝文件
xcopy
```

## 创建文件与属性权限

```bash
# 创建文件
copy
# 创建共享文件夹
shrpubw

# 属性权限
attrib
    +r # 只读
    +h # 隐藏
    +a # 存档
    +s # 系统
```

## 重关注销

```bash
shutdown
    # 关机
    -s
    # 取消事件
    -a
    # 重启
    -r
    # 注销当前用户
    -i
    # [20] 定时设置默认值是20秒
    -t
```

## 网络安全

```bash
# 显示网络连接\路由表和网络接口信息
netstat - 
    netstat [选项]
        # 显示所有socket,包括正在的监听的
        -a
        # 每个一秒就重新显示一遍,直到用户中断它
        -c
        # 显示每个协议统计信息
        -s
        # 显示以太网统计信息,此选项可以与 -s 结合
        -e
        # 显示当前连接卸载状态
        -t
        # 显示 NetworkDirect 连接、侦听器和共享
        -x
        # 显示所有连接的TCP连接模板
        -y
        # 显示正在进行的工作
        -v

# 查看80端口占用情况
netstat -aon|findstr '80'
    TCP  0.0.0.0:80  0.0.0.0:0  LISTENING  6436
# 查找PID对应的进程
tasklist|findstr '6436'
    httpd.exe  6436 Services  0  12,040 K
# 结束名为 httpd.exe 的进程
taskkill /f /t im httpd.exe  

# 打开控制台
mmc
# DNS测试
ping []
# 注册表
regedit.exe
# 事件查看器
eventvwr
# 查看本地ip
ipconfig
# 任务管理器
taskmgr
# 系统组件服务
dcomcnfg
# 系统配置
msconfig.exe
# 设备管理器
devmgmt.msc
# 计算机管理
compmgmt.msc
# 本地服务设置
services.msc
```

## 系统维护

```bash
# 检查DirectX信息
dxdiag
# 垃圾整理
cleanmgr
```

## 功能

```bash
# 清除屏幕
cls
# 放大镜
magnify
# 启动计算器
calc
# 控制面板
control
# 鼠标属性
main.cpl
# 打开记事本
notepad
# 游戏控制器
joy.cpl
# 屏幕分辨率
desk.cpl
# 程序和功能
appwiz.cpl
# 打开资源管理器
explorer
# 共享文件夹管理器
fsmgmt.msc
# 木马捆绑工具，系统自带
iexpress
# 配置显示器和打印机中的色彩
colorcpl
# 远程桌面连接
mstsc
```

## 2019-06-03 更新
### tskill
```bash
## 重启资源管理器
tskill explorer
```