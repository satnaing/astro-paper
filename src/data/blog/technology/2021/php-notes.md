---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2021-02-12T12:44+08:00
title: PHP 笔记(长期更新)
slug: php-notes
ogImage: https://cos.lhasa.icu/ArticlePictures/php.jpg_81
tags:
  - PHP
  - OOP

description: 看到这张图的时候，我很震惊。这个CDN流量包是我昨天凌晨刚买的，直到此刻才发现我的CDN流量被恶意盗刷了
---

## 预定义变量
```bash
# 当前脚本所在的文档根目录(服务器VirtualHost定义)
DOCUMENBT_ROOT
# 获取当前域名
HTTP_HOST
# 获取当前页面地址 
PHP_SELF
# 获取完整url(包括?号后的参数)
REQUEST_URL
# 获得页面使用的请求方法
REQUEST_METHOD
# 当前php文件名
_FILE_
# 当前php文件中所在的行数
_LINE_
# PHP版本
PHP_VERSION
# 获得地址后的所有内容
REQUEST_URI
```

## 字符串函数
```bash
# 输出一个或多个字符串
echo
# 去除字符串首尾处的空白字符（或者其他字符）
trim
# 将一个字符串进行MD5算法加密
md5
# 将一个一维数组的值转化为字符串
implode
# 使用一个字符串分割另一个字符串
explode
# 将字符串解析成多.个变量
parse_str
# 使用另一个字符串填充字符串为指定长度
str_pad
# 重复一个字符串
str_repeat
# 子字符串替换
str_replace
# 随机打乱一个字符串
str_shuffle
# 将字符串转换为数组
str_split
# 获取字符串长度
strlen
# 从字符串中去除 HTML 和 PHP 标记
strip_tags
# 查找字符串首次出现的位置
strpos
# 查找指定字符在字符串中的最后一次出现
strrchr
# 计算指定字符串在目标字符串中最后一次出现的位置
strrpos
# 返回字符串的子串
substr
# 将字符串转化为小写
strtolower
# 将字符串转化为大写
strtoupper
# 反转字符串
strrev
# 指定文件进行MD5算法加密
md5_file
# 计算字符串的 sha1 散列值
sha1
# 以千位分隔符方式格式化一个数字
number_format
# 输出字符串
print
# 输出格式化字符串
printf
```

## 数组函数
```bash
# 新建一个数组
array
# 返回数组中所有的值
array_values
# 计算数组中的单元数目或对象中的属性个数
count
# 检查数组中是否存在某个值
in_array
# 将数组打乱
shuffle
# 将数组的内部指针指向第一个单元
reset
# 将数组的内部指针指向最后一个单元
end
# 将一个数组分割成多个
array_chunk
# 返回数组中指定的一列
array_column
# 创建一个数组，用一个数组的值作为其键名，另一个数组的值作为其值
array_combine
# 统计数组中所有的值出现的次数
array_count_values
# 用给定的值填充数组
array_fill
# 交换数组中的键和值
array_flip
# 检查给定的键名或索引是否存在于数组中
array_key_exists
# 返回数组中部分的或所有的键名
array_keys
# 合并一个或多个数组
array_merge
# 用值将数组填补到指定长度
array_pad
# 将数组最后一个单元弹出（出栈）
array_pop
# 从数组中随机取出一个或多个单元
array_rand
# 返回一个单元顺序相反的数组
array_reverse
# 在数组中搜索给定的值，如果成功则返回相应的键名
array_search
# 将数组开头的单元移出数组
array_shift
# 从数组中取出一段
array_slice
# 在数组开头插入一个或多个单元
array_unshift
# 对数组进行逆向排序并保持索引关系
arsort
# 对数组进行排序并保持索引关系
asort
```

## GET 与 POST 的区别
GET在浏览器回退时是无害的，而POST会再次提交请求

GET产生的URL地址可以被Bookmark，而POST不可以

GET请求会被浏览器主动cache，而POST不会，除非手动设置

GET请求只能进行url编码，而POST支持多种编码方式

GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留

GET请求在URL中传送的参数是有长度限制的，而POST么有

对参数的数据类型，GET只接受ASCII字符，而POST没有限制

GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

GET参数通过URL传递，POST放在Request body中