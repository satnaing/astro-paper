---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2021-02-12T12:44+08:00
title: Ubuntu Server部署日记
slug: Ubuntu-Deployment
ogImage: https://cos.lhasa.icu/ArticlePictures/ubuntu.jpg_81
tags:
  - Ubuntu
  - Linux
  - 部署
  
description: 出于挂一些签到软件的原因我一直在用Windows Server2012，因为服务器配置较低图形界面操作卡的要死...
---

import Img from "@/components/Img.astro";

出于挂一些签到软件的原因我一直在用Windows Server2012，因为服务器配置较低图形界面操作卡的要死，干脆直接上纯命令操作系统的linux

关于linux发行版我几乎都玩过。在选择linux服务器这块也没有太犹豫，我个人比较痴情Ubuntu，

我个人用户对于服务器要求没有那么高，所以选择了 Ubuntu Server 16.04.1 LTS。不过我第一次部署纯命令操作系统，部署的过程中还是遇到一些小麻烦，不过办法总比困难多嘛！

## root登录
首先，使用[ssh命令][1]在终端登录到远程主机

```bash
achuan@achuan-pc:~$ sudo ssh ubuntu@139.199.105.72
[sudo] achuan 的密码： 
ubuntu@139.199.105.72's password:
The authenticity of host '139.199.105.72 (139.199.105.72)' can't be established.
ECDSA Key fingerprint is SHA256:HNndgD6z/I2L8DzCA5nk9w9CEzHpW9WouGAmkMDR7LK.
Are you sure you want to continue connecting (yes/no)? yes
ubuntu@139.199.105.72's password:
Welcome to Ubuntu 16.04.1 LTS (GNU/Linux 4.4.0-130-generic x86_64)

* Documentation:    https://help.ubuntu.com
* Management:       https://landscape.canonical.com
* Support:          https://ubuntu.com/advantage
New release '18.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.

Last login: Mon Nov 5 16:38:39 2018 From 119.28.7.195
ubuntu@VM-22-96-ubuntu:~$
```

这时，登录时命令行出现了警告，它说这是一个新的地址，存在安全风险。简单了解一下之后，我选择面对风险　yes 顺利登入远程主机。  
对我来说登入后第一件事莫过于设置root密码

```bash
$ sudo passwd root
```

## 安装 vim

```bash
# 习惯性的更新源...
$ sudo apt-get update
# 安装vim
$ sudo apt-get install vim-gtk
......
Do you want to continue [Y/n]? Y
```

命令行敲入　vi ,Tab一下，不出问题已经有　viｍ

### 配置vim
强迫症的我，简单的配置一下...

```bash
$ sudo vim /etc/vim/vimrc
```

文件内容里有这么一句：`syntax on`它的意思是“语法高亮”，别注释它！为了提升体验我们需要set一下

```bash
set nu          # 在左侧显示行号
set tabstop=4   # tab长度设置为4
set cursorline  # 覆盖文件时不备份
set ruler       # 在右下角显示状态栏
set autoindent  # 自动锁紧
set showmatch   # 高亮显示匹配的括号
# 编码设置
set fencs=utf=uft-8,ucs-bom,shift-jis,gb18030,gbk,gb2312,cp936
# 语言设置
set langmenu=zh_CN.UTF-8
set helplang=cn
```

## 安装apache
我们使用源安装[apache][2]

```bash
$ sudo apt-get install apache2
```

### 配置apache
启动apache的两种姿势

```bash
$ sudo /etc/init.d/apache2 start
# 或
$ sudo service apache2 star
# [start] [restart] [stop] [status]
```

### 推送文件到网站根目录
在这里我遇到一个问题

```bash
root@achuan-pc:/home/achuan/视频/ubuntu# scp -r htdocs ubuntu@139.199.105.72:/var/www
ubuntu@139.199.105.72's password: 
scp: /var/www/htdocs: Permission denied
```

用 scp 推送文件夹的时候出现了`Permission denied`<br>
what the?　我被拒绝了？  

想了想原来是网站的根目录`/var/www`没有写入权限，让我们chmod一下？

```bash
$ ssh ubuntu@139.199.105.72
......
$ sudo chmod 777 -R /var/www
```

已经解决了让我们再 scp 一下！

### 解决ssh自动断连
这个自动断连就让我很是难受，不管是利用终端还是客户端工具都会出现这个问题，经过了解原来是正常的...  
使用ssh连接远程服务器隔段时间没有任何操作，客户端与服务器就会自动断连，解决办法如下：

```bash
$ sudo vim /etc/ssh/sshd_config
$ sudo service sshd reload
```

我们需要修改客户端或服务器端　`/etc/ssh/sshd_config`　配置文件，找到`ClientAliveInterval`，改成 60（分钟单位，默认0）意思的每一分钟向客户端发送一个消息，用于保持连接，

### VirtualHost配置
关于ubuntu serverd的apache配置文件在`/etc/apache2/apache.conf`当apache启动时会自动读取这个文件的配置信息，而其他的一些配置文件，则是通过Include指令引入。奇怪的是我找不到httpd.conf，算了自己动手丰衣足食

```bash
# 进入apache文件夹 > 创建 httpd.conf
$ cd /etc/apache2/ && sudo vi httpd.conf
# 并写入以下配置内容

# 如果你的服务器有多个IP、不同的虚拟用户时，你可以更改它
<VirtualHost [IP]:[端口]>
...
</VirtualHost>

<VirtualHost *:80>
	ServerAdmin achuan@achuan.io         # 网站管理员邮箱，可填可不填
	DocumentRoot "/var/www/chenbtpig"    # 网站根目录
	ServerName chenchen1112.cn           # 域名
	<Directory "/var/www/chenbtpig">	 # 网站根目录权限设置
		Options Indexes FollowSymLinks   # 禁止显示Apache目录
		AllowOverride All				 # 允许重写apache默认配置
		Order allow,deny				 # 允许所有
		Allow from all
	</Directory>
	Errorlog "logs/chenchen1112.cn-error.log"   # 网站错误日志
	CustomLog "logs/chenchen1112.cn-access.log" common   # 网站访问日志
</VirtualHost>

<VirtualHost *:80>
	ServerAdmin achuan@achuan.io
	DocumentRoot "/var/www/code_rain"
	ServerName lmissyou.club
	<Directory "/var/www/code_rain">
		Options Indexes FollowSymLinks
		AllowOverride All
		Order allow,deny
		Allow from all
	</Directory>
	Errorlog "logs/lmissyou.club-errpr.log"
	CustomLog "logs/lmissyou.club-access.log" common
</VirtualHost>

# 打开apache配置文件并写入“Include httpd.conf”
$sudo vim /etc/apache2/apache2.conf

# 修改hosts /etc/hosts
$ sudo vi /etc/hosts
# 写入　IP与域名
# 139.199.105.72 www.chenchen.1112.cn
```

#### 网站首页的优先级
	
```bash
#用于VirtualHost括号内，优先级从左往右依次降低
DirectoryIndex index.php index.html
```

#### 错误日志

```bash
# 用于VirtualHost括号内，在apache配置目录应有logs文件夹，没有自己创建
Errorlog "logs/chenchen1112.cn-error.log"
```

#### 访问日志

```bash
CustomLog "logs/chenchen1112.cn-access.log" common
```

#### 错误页面的显示

```bash
ErrorDocument 404/missing.html
```

## 安装php5.6

```bash
# 添加PPA源
$ sudo add-apt-repository ppa:ondrej/php
# 若报错或没有发现命令则执行　$ sudo apt-get install python-software-properties
# 习惯性的更新源...
$ sudo apt-get update
# 安装php5.6
$ sudo apt-get install php5.6
# 验证版本
$ sudo php -v
```

apache2.conf文件，这个文件通过包含其他配置文件涵盖了所
让我们写个试试？

```bash
# 进入www并创建新文件index.php
$ cd /var/www && sudo vi index.php
# 写入到index.php	
<?php
phpinfo();
?>
```

### 配置php
ubuntu serverd的php配置文件在`/etc/php/5.6/apache2/php.ini`<br>
近期发现php的时区是GMT（格林威治平时），而不是GMT+8（东八区）它们的显示时间会相差8个小时，这怎么行！
 
```bash
# 打开php.ini配置文件
$ sudo vi /etc/php/5.6/apache2/php.ini
# 找到 date.timezone 并赋值 PRC（中华人民共和国英文缩写） date.timezone = PRC
```

输入我的公网ip查看一下  
![Alt text]({{ site.ARTICLEPICTURES_PATH }}/phpinfo.png "php5.6安装成功！Cheers!") 


## 安装mysql

```bash
# 习惯性的更新源...
$ sudo apt-get update
# 安装mysql服务器与客户端，安装时会有两次交互，关于mysql密码的设置
$ sudo apt-get install mysql-server mysql-client

# 查看安装是否成功
$ sudo netstat -tap | grep mysql

root@VM-22-96-ubuntu:/etc/mysql/mysql.conf.d# sudo netstat -tap | grep mysql
tcp6       0      0 [::]:mysql              [::]:*                  LISTEN      7818/mysqld   
```

### 配置mysql
启动mysql的两种姿势

```bash
$ sudo /etc/init.d/mysql start
# 或
$ sudo service mysql star
# [start] [restart] [stop] [status]
```

#### 远程连接mysql
ubuntu serverd的mysql配置文件在`/etc/mysql/mysql.conf.d/mysqld.cnf`

```sql
# 修改配置文件的端口绑定	
$ sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf
# 注释掉 bind-adress = 127.0.0.1
# 进入数据库
$ mysql -u root -p
# 选择使用的数据库
mysql> use mysql;
# 修改host值（以通配符 % 增加主机/IP地址）当然你可以可以直接增加IP
mysql> update user set host = '%' where user = 'root';
# 让权限立即生效
mysql> flush privileges;
# 查看修改是否成功　**%         | root**说明远程连接已经开启 
mysql> select host, user from user;
+-----------+------------------+
| host      | user             |
+-----------+------------------+
| %         | root             |
| localhost | debian-sys-maint |
| localhost | mysql.session    |
| localhost | mysql.sys        |
| localhost | root             |
+-----------+------------------+


# 如下连接成功！

achuan@achuan-pc:/etc/apache2$ mysql -h 139.199.105.72 -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 6
Server version: 5.7.24-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```


#### 修改数据库编码
由于mysql默认编码为`latin`如果不修改的话中文会导致数据库乱码报错，所以我们要修改为`utf8`

```sql
# 打开my.cnf配置文件
$ sudo vi /etc/mysql/my.cnf
# 写入以下代码

[mysqld]
character-set-server = utf8
[client]
default-character-set = utf8
[mysql]
default-character-set = utf8

# 查看数据库编码
mysql> show variables like '%char%';
+--------------------------+----------------------------+
| Variable_name            | Value                      |
+--------------------------+----------------------------+
| character_set_client     | utf8                       |
| character_set_connection | utf8                       |
| character_set_database   | utf8                       |
| character_set_filesystem | binary                     |
| character_set_results    | utf8                       |
| character_set_server     | utf8                       |
| character_set_system     | utf8                       |
| character_sets_dir       | /usr/share/mysql/charsets/ |
+--------------------------+----------------------------+
8 rows in set (0.01 sec)
```

### 安装phpmyadmin
不必要的情况下我还是喜欢可视化的操作mysql，开源的phpmyadmin就很不错！

```bash
# 习惯性的更新源...
$ sudo apt-get update
# 安装phpmyadmin
$ sudo apt-get install phpmyadmin
# 虽然我们安装好了，但是phpmyadmin基于php环境开发的，所以我们需要把它放到网站的根目录/var/www，我这里在网站的根目录下放了一个软连接。
$ sudo ln -s /usr/share/phpmyadmin /var/www
```

输入网址即可： https://localhost/phpmyadmin

这次部署Ubuntu Server体会不少，我真是越来越喜欢linux了，它真是一个非常有魅力的系统！哈哈哈，到这里吧，太晚了要回寝室睡觉了--  
本篇文章如有写的不足之处，还请您多多指教！88！

[1]: https://linux.51yip.com/search/ssh
[2]: https://zh.wikipedia.org/wiki/Apache_HTTP_Server