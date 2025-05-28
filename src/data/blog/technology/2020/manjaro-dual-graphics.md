---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-10-15T16:41+08:00
title: Manjaro Linux 双显卡切换解决方案
slug: manjaro-dual-graphics
ogImage: https://cos.lhasa.icu/ArticlePictures/manjaro.jpg_81
tags:
  - Manjaro
  - Linux
  - 显卡
  - 驱动
  - Bug
  
description: Linux和独显不可兼得...
---

## 1.卸载原有开源驱动

```shell
# 查看安装了哪些显卡驱动，全部删除
$ mhwd -li
$ sudo mhwd -r pci video-nvidia
```

## 2.安装NVIDIA闭源驱动

具体这个驱动版本可以根据显卡型号去[NVIDIA官方查询](https://www.nvidia.com/Download/index.aspx?lang=en-us)，我的是GTX1060

```shell
$ sudo mhwd -i pci video-nvidia-450xx
```

## 3.安装依赖

```shell
# 查询Linux内核版本
$ uname -r
5.8.11-1-MANJARO

# inux58-headers这个内核头文件包名‘58’是内核版本缩写
$ sudo pacman -S linux58-headers acpi_call-dkms xorg-xrandr xf86-video-intel git
```

## 4.挂载acpi_call模块

```shell
$ sudo modprobe acpi_call
```

如果遇到`modprobe: FATAL: Module acpi_call not found in directory`报错，需要安装`acpi_call`

```shell
# 安装时注意选择相应的内核版本
$ sudo pacman -S acpi_call
```

## 5.清理文件

如果以下目录下有任何定义`video/gpu.conf`文件，请备份/删除。因为脚本会删除所有的文件。

```shell
/etc/X11/
/etc/X11/mhwd.d/
/etc/X11/xorg.conf.d/
/etc/modprobe.d/
/etc/modules-load.d/
```

## 6.安装切换脚本

```shell
$ git clone git@github.com:dglt1/optimus-switch-sddm.git
$ cd optimus-switch-sddm
$ chmod +x install.sh
$ sudo ./install.sh
```

## 7.切换命令

```shell
# 切换为Intel
$ sudo set-intel.sh
# 切换为NVIDIA
$ sudo set-nvidia.sh

# 切换后需要重启才能生效
$ reboot
```

## 相关文档

[脚本英文文档](https://github.com/dglt1/optimus-switch-sddm)

[GUI切换](https://github.com/linesma/Optimus-indicator)