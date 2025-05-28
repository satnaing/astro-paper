---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-09-30T12:57+08:00
title: Manjaro Linux 自动禁用触摸板
slug: DisableTouchpad
ogImage: https://cos.lhasa.icu/ArticlePictures/manjaro.jpg_81
tags:
  - Manjaro
  - Linux
  - 触摸板
  - 驱动
  - Bug
  
description: Linux和独显不可兼得...
---

## 安装

安装必要的函数库和驱动程序

```shell
$ sudo pacman -S libinput xf86-input-libinput xorg-xinput
```

## 编写Shell脚本

```shell
$ vim DisableTouchpad.sh

#!/bin/bash

declare -i ID
ID=`xinput list | grep -Eio '(touchpad|glidepoint)\s*id\=[0-9]{1,2}' | grep -Eo '[0-9]{1,2}'`
declare -i STATE
STATE=`xinput list-props $ID|grep 'Device Enabled'|awk '{print $4}'`
if [ $STATE -eq 1 ]
then
    xinput disable $ID
else
    xinput enable $ID
fi
```

赋予脚本读/写/执行权限

```shell
$ sudo chmod 0755 DisableTouchpad.sh
```

## Systemd 自启动

```shell
$ cd /usr/lib/systemd/system
# 创建Systemd服务
$ sudo vim touchpad.service

[Unit]
Description=Touchpad control service

[Service]
Type=oneshot
ExecStart=/File/Self-starting/DisableTouchpad.sh

[Install]
WantedBy=multi-user.target
```

配置`touchpad`服务自启动

```shell
$ systemctl enable touchpad
```

