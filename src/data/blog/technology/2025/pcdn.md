---
author: 游钓四方
draft: true
featured: false
category: technology
pubDatetime: 2025-07-09T00:10+08:00
title: 实战防范 PCDN
slug: pcdn
ogImage: https://cos.lhasa.icu/ArticlePictures/EasyFill128.webp_81
tags:
  - EasyFill
  - JavaScript
  - 扩展
  - 开源
  - 独立开发者

description: 就在刚刚 EasyFill 终于通过了 Chrome Web Store 的审核，正式发布了！
---
从 curl 测试结果来看:

```bash
$ curl -I https://cos.lhasa.icu/ArticlePictures/dragon-boat-cycling-beiyuxian/20250531195440.jpg

HTTP/1.1 403 Forbidden
Content-Length: 0
X-NWS-LOG-UUID: 5373587360915772873
Connection: keep-alive
Server: SLT
Date: Tue, 08 Jul 2025 16:11:55 GMT
X-Cache-Lookup: Return Directly
```
不带 Referer 请求返回 403，说明腾讯云 CDN 已经成功拦截了空 Referer 的请求

```bash
$ curl -I https://cos.lhasa.icu/ArticlePictures/dragon-boat-cycling-beiyuxian/20250531195440.jpg -H "Referer: https://lh
asa.icu/"

HTTP/1.1 200 OK
Content-Type: image/jpeg
Date: Tue, 08 Jul 2025 16:12:10 GMT
Server: tencent-ci
Size: 1
Timing-Allow-Origin: *
Vary: Origin, Access-Control-Request-Headers, Access-Control-Request-Method
X-DataSrc: 1
X-Delay: 425487 us
X-Info: real data
X-OriSize: 4417607
X-RtFlag: 1
X-SlimFlag: 1
x-ci-request-id: VF82ODZkNDM1YV8xNF9mMjNlMTkxNV9iM2Y0
x-cos-request-id: Njg2ZDQzNWFfMWViNTAzMDlfMWE0Ml9jNDdiYjdi
X-Cache-Lookup: Cache Miss
Last-Modified: Wed, 09 Jul 2025 00:12:10 GMT
Age: 0
Content-Length: 2075798
Accept-Ranges: bytes
X-NWS-LOG-UUID: 2045849450116647137
Connection: keep-alive
X-Cache-Lookup: Cache Miss
Access-Control-Allow-Origin: *
Strict-Transport-Security: max-age=31536000;
Cache-Control: max-age=2592000
```
这次伪造 Referer，请求返回 200，且命中缓存，说明防盗链基于 Referer 白名单生效，且允许来自`https://lhasa.icu`站点的访问，直接绕过防盗链