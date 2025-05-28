---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-04-15T16:15+08:00
title: 快速定位 Apache 错误
slug: apache-error
ogImage: https://cos.lhasa.icu/ArticlePictures/apache.jpg_81
tags:
  - Linux
  - Apache
  - Bug
  
description: 今天给项目配置权限的时候又遇到了Apache错误，这种事情早习惯了，排错了...要说启动吧，您看这让人难受错误提示...
---

今天给项目配置权限的时候又遇到了Apache错误，这种事情早习惯了，排错了...要说启动吧，您看这让人难受错误提示...

    Windows 不能在 本地计算机 启动 apache24。有关更多信息，查阅系统事件日志。如果这是非 Microsoft 服务，请与服务厂商联系，并参考特定服务错误代码 1

这是啥？？？错误报告这么官方真的没意思。。。一般配置遇到问题我都是看日志，不过日志也是经常不靠谱，他描述的也是很扯淡...

这个时候就是还是启动apache启动程序好使，文件名叫“httpd.exe”位置在apache根目录“bin”目录下，通过命令行启动就好。

```bash
achuan@DESKTOP-CL4MMTQ MINGW64 /c/AppServ
$ cd Apache24/bin

achuan@DESKTOP-CL4MMTQ MINGW64 /c/AppServ/Apache24/bin
$ ./httpd.exe
AH00526: Syntax error on line 113 of C:/AppServ/Apache24/conf/extra/httpd-vhosts.conf:
<Directory "H:\\tp5\\public""> path is invalid.
```

这个错误大概说的意思是 `C:/AppServ/Apache24/conf/extra/httpd-vhosts.conf` 文件第113行语法错误，

`<Directory "H:\tp5\public"">路径无效。  
打开httpd-vhosts.conf`文件后，定位到113行发现路径多个“/”

来回找目录可能麻烦一些，不过创建一个软连接就可以了。  
不过若真的找不到错误或者错误找到解决不了也有办法，请点这个[万能链接][1]

好了开个玩笑，如果您有什么解决不了问题您可以在下方留言大家可以讨论一下。

[1]: https://www.google.com