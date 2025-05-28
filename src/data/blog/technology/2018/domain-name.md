---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2018-10-21T15:44+08:00
title: 更换了域名、邮箱并修复了移动端 Bug
slug: domain-name
ogImage: https://cos.lhasa.icu/ArticlePictures/update.jpg_81
tags:
  - Update
  - Bug
  - 移动端
  - 域名

description: 更换域名这件事我想了好久，原使用 Github 的三级域名但它太长，本来想换 achuan.com 不过早就被注册了...
---

更换域名这件事我想了好久，原使用[Github][1]的三级域名但它太长，本来想换achuan[.com][2]不过早就被注册了，

卖方叫价太高了，没有5000谈判都碰不着。ahuan[.cn][3]也是早已注册，人家买了域名都不解析挂着玩，也联系过人家，不过人家不回消息。[.net][4] [.me][5] 都没了。

偶然我了解到“[.io][6]”，它是一个[国别域名][7]，同时，它还可被理解为[inputoutput]即“输入输出接口”之意。“io”看着是是不是有点像二进制的“0 与 1”！感觉很有技术内涵，

而且近几年.io在[区块链][8]方面比较火，我感觉用来搭建技术博客也是不错的选择。  

在选择域名商我也是非常纠结，.io后缀国内域名商几乎是没有的，主要是不能备案，毕竟这是国别后域名，估计不会开放备案。国内不行那就国外吧，

怎么要有免费的隐私保护、网站访问速度正常、支付方式、域[dynadot][9]是我一个想到的，这家伙有大量的骚东西，特殊后缀域名[.love][10] [.blog][11] [.wiki][12] 等...说一下它的一些服务吧，

购买域名即送终身隐私保护，但我也不是什么明星大腕，隐私保护自然用不到，[dynadot][9]所有域名都赠送终身免费的隐私保护，[dynadot][9]网站自带各国域名很多种，自然有中文，而且在北京设立有分公司，国内网站速度打开正常并且支持支付宝，解析稳定这都不用说，虽然这家口碑不是理想中的那么好，但是跑路估计是不存在的，至于转出暂时我没试过不知道，唯一就是感觉这家[.io][6]价格有点高 $29。  

[Namesilo][13]也不错，号称全球最便宜，收费透明且支付支付宝，不过国内访问注册都过不了，翻墙就不至于了，不多考虑。[Namecheap][14]呢价格上不算便宜，但是各方面做的不错，不限于速度、稳定性、免费的[SSL][15]、客服响应等等、但是它不支持支付宝。至于[GoDaddy][16]，虽然最为业界的NO 1，

但是在网上查看那些相关新闻评论，看我的我不想买了都，虽然它有中文、支持支付宝、国内访问还算凑合。但是pass。  
考虑了半天想想还是用“挑兵挑将”来选择吧 天选之商 [dynadot][9] 胜出....下了订单$29，吃土吧，快乐并痛苦着...买后即用，

不用备案是真爽，进去NDS设置一下，ping achuanya.github.io获取IP，然后添加主域名[A记录][17] 185.199.109.153，

子域名 www [A记录][17]随主域名。更换了域名，邮箱也改一下吧，[网易企业邮箱][18]免费，添加 [MX记录][19] mx.ym.163.com 

优先级10（邮箱：<achuan@achuan.io>），访问 achuan.io 完全ojbk。  

除了域名\邮箱也没闲着，修改了博客移动端的一些bug：  

 * 输入域名后自动进入主页且不能退回到文章栏。  

移动端增加了一项功能：
 * 增加返回菜单栏按钮。

[1]: https://zh.wikipedia.org/wiki/GitHub
[2]: https://zh.wikipedia.org/wiki/.com
[3]: https://zh.wikipedia.org/wiki/.cn
[4]: https://zh.wikipedia.org/wiki/.net
[5]: https://zh.wikipedia.org/wiki/.me
[6]: https://zh.wikipedia.org/wiki/.io
[7]: https://zh.wikipedia.org/wiki/%E5%9C%8B%E5%AE%B6%E5%9C%B0%E5%8D%80%E4%BB%A3%E7%A2%BC
[8]: https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9D%97%E9%93%BE
[9]: https://en.wikipedia.org/wiki/Dynadot
[10]: https://www.dynadot.com/zh/domain/love.html
[11]: https://zh.wikipedia.org/wiki/.io
[12]: https://zh.wikipedia.org/wiki/.io
[13]: https://zh.wikipedia.org/wiki/.io
[14]: https://www.namecheap.com
[15]: https://zh.wikipedia.org/wiki/%E5%82%B3%E8%BC%B8%E5%B1%A4%E5%AE%89%E5%85%A8%E6%80%A7%E5%8D%94%E5%AE%9A
[16]: https://zh.wikipedia.org/wiki/GoDaddy
[17]: https://zh.wikipedia.org/wiki/%E5%9F%9F%E5%90%8D%E4%BC%BA%E6%9C%8D%E5%99%A8%E8%A8%98%E9%8C%84%E9%A1%9E%E5%9E%8B%E5%88%97%E8%A1%A8
[18]: https://ym.163.com
[19]: https://zh.wikipedia.org/wiki/MX%E8%AE%B0%E5%BD%95