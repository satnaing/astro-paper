---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-09-19T18:44+08:00
title: 在 CentOS 下实现 MySQL 数据库定时自动备份
slug: Automatic-database-backup
ogImage: https://cos.lhasa.icu/ArticlePictures/centOS.jpg_81
tags:
  - MySQL
  - Linux
  - CentOS
  - Shell
  
description: 前几次系统数据老是出问题，前几天经理让我给写个数据库自动备份，Shell能力有限，周六日再改改...
---

前几次系统数据老是出问题，前几天经理让我给写个数据库自动备份，Shell能力有限，周六日再改改...

## 编写 Shell
```shell
# 查看磁盘空间
$ df -h

    Filesystem      Size  Used Avail Use% Mounted on
    /dev/vda1        79G   36G   40G  48% /
    devtmpfs        3.9G     0  3.9G   0% /dev
    tmpfs           3.9G  1.1M  3.9G   1% /dev/shm
    tmpfs           3.9G  592K  3.9G   1% /run
    tmpfs           3.9G     0  3.9G   0% /sys/fs/cgroup
    tmpfs           783M     0  783M   0% /run/user/0

# 进入根目录，创建 DatabaseBackup 文件夹并进入
$ cd /
$ mkdir DatabaseBackup
$ cd DatabaseBackup

# 创建 gupiaocl188.sh 文件并编辑
$ vim gupiaocl188.sh

    #!/bin/bash
    mysqldump -u project gupiaocl188 | gzip > /DatabaseBackup/gupiaocl188__$(date +%Y-%m-%d__%H:%M:%S).sql.gz

    #生成格式
    www_gupiaocl188__2019-09-17__12:00:01.sql.gz

# 赋值可执行权限
$ sudo chmod u+x gupiaocl188.sh
```

## 配置 MySQL
```bash
# 配置 MySQL [mysqldump]
$ my.ini

    [mysqldump]
    user     = project
    password = HiGirl0921

# 执行 Shell脚本测试
$ ./gupiaocl188.sh
```

## 安装 Crontab
```bash

# 安装 Crontab
$ yum install -y vixie-cron

# 设置 Crontab 开启启动
$ chkconfig –level 35 crond on

#　启动 Crontab 服务
$ service crond start

# 编辑计时器设置
$ crontab -e

    # 每俩小时自动备份 www_gupiaocl188_ 数据库
    */120 * * * * /DatabaseBackup/www_gupiaocl188_.sh

## Crontab 命令

# 启动服务
$ service crond start

# 关闭服务
$ service crond stop

# 重启服务
$ service crond restart

# 重载配置
$ service crond reload

# 查看状态
$ service crond status
```