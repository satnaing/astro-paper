---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2019-02-22T13:44+08:00
title: Redis 笔记(安装与数据类型)
slug: redis
ogImage: https://cos.lhasa.icu/ArticlePictures/redis.jpg_81
tags:
  - Redis
  - 数据库
  - 缓存
  
description: 我用的系统是Ubuntu 16.04.1 LTS, 关于windows的安装就不说了...
---

## Redis的安装
我用的系统是Ubuntu 16.04.1 LTS, 关于windows的安装就不说了

```bash
# 更新源
$ sudo apt-get update
# 安装
$ sudo apt-get install redis-server

# 启动
$ redis-server

# 启动之后再打开一个终端,连接redis服务
$ redis-cli

# 127.0.0.1是客户端ip, 6379是服务端口
# 我们发送一个 ping,如果返回PONG表示服务器正常
127.0.0.1:6379> ping
PONG
```

## Redis的数据类型
Redis支持五种数据类型：String（字符串），Hash（哈希），List（列表），Set（集合）及Zset(Sorted Set：有序集合)  
关于这五中数据类型的操作，因为很多我都用不到，所以不是很内容不是很全面还请见谅，下面我们从字符串开始一一说  

### String（字符串）
这个String(字符串)是Redis五中数据类型中最基本的数据类型，也是最简单的一个，它是二进制安全的，它可以包含任何数据，

如jpg、序列化的数据......不过它的容量也是有限度的，String的Value值最大可以存储512MB

```bash
Redis的set是string类型的无需集合
集合通过哈希表表现的， 所以添加、删除、查找复杂度都是0（1）

# 添加一个string元素到key对应的set集合中，
SET key value

# 输出一个set集合
GET key

# 自增+1
INCY key

# 自减-1
DECY key

# 自定义自增+5
INCYBY key 5

# 自定义自减-5
DECYBY key 5

# 批量增加 set 
MSET key value [key value]...
```

### List（列表）
&emsp;List它是链表而不是数组，这意味着list的插入和删除操作会非常的话，时间复杂度为0（1）但是索引定位很慢，时间复杂度为0（n）

```bash
# 向列表的左边插入
LPUSH books value

# 输出 lpush（value）
LPOP key

# 向列表的右边插入
RPUSH key key key

# 输出 rpush（value）
RPOP key

# 输出 rpush（value）值的数量（不是具体值）
LLEN key

# 输出列表内容(status/stop 可以理解为 0 -1索引)
LRANGE key status/stop

# 清除列表内容
LTRIM key status/stop
```

### Hash（哈希）
Hash是一个string类型的fieid和value的映射表，Hash特别适合存储对象，Hash结构用户信息，不同于字符串一次性需要全部序列化整个对象，Hash可以对用户结构中的每个字段单独存储。  

这样我们需要获取用户信息时，可以进行部分获取。如果以字符串形势保存用户信息的话，就只能一次性全部读取这样就会失效浪费流量。

```bash
# 创建一个 Haet值
HAST key fieid value

# 获取一个 Hest
HGET key fieid

# 更改 Hast值（也就是在创建的基础上重新赋值）
HAST key fieid value

# 批量添加
HMSET drinks milk 'value' tea 'value'

# 输出 Hast
HGETALL drinks

# 自增+5
HINCRBY drinks amount 5

# 自减-5
HINCRBY drinks amount -5

# 删除多个 Hash字段
HDEL drinks [fieid] [fieid]
```

### Set（集合）
&emsp;Set它的内部的键值对无序的唯一的，它的内部实现相当于一个特殊的字典，字典中所有的value都是一个值Null。  
&emsp;Set结构可以用来存储活动中奖的用户ID，因为有去除功能，可以保证同一个用户不会中两次！

```bash
# 添加两个集合
SADD key meber meber

# 输出一个集合
SMEMBERS key

# 查询集合中，如果存在返回 1，否则返回 0
SISMEMBER key meber

# 在key集合中删除指定的元素或多个元素
SREM key meber

# 返回一个集合与给定集合的差集元素
SDIFF key key

# 移除集合中的指定 key 的一个或多个随机元素，并返回移除的元素
SPOP kecy count

# 交集，返回给定所有定集合的交集
SINTER key key

# 并集，返回一个集合的全部成员，该集合是所有给定集合的并集
SUNION key key
```

### Sorted Set（有序集合）（重点！）
Zset保证了内部的唯一性，另一方面它可以给每个value赋予一个score，代表value的排序权重。  

Zset可以用来存粉丝列表，value值是粉丝的用户ID，score是关注事件，我们可以对粉丝列表按照关注时间进行排序。

Zset也可以用来存储学生成绩，value是学生ID，score是学生考试成绩，我们可以对成绩按分数进行排序就可以得到它们的名字。

```bash
# 添加一个有序集合，30是数量，person是人数(添加也可以用于修改)
ZADD key 30 person

# 查看有序集合成员数量
ZCARD items

# 查看有序集合成员值（0 和 1 是索引）
ZRANGE key 0 1

# 查看有序集合成员值和名字，默认从小到大排序显示
ZRANGE key 0 -1 withscores

# 查看有序集合，成员值和名字，从大到小排序
ZREVRANGE key 0 -1 withsores

# 查看 member的值
ZSCORE key member

# 查看最小值和最大值之间的 member值
ZRANGEBYSCORE key min max

# 查看负无穷 - 2000之间的 member值
ZRANGEBYSOORE key -inf 2000

# 查看正无穷 - 2000之间的 member值
ZEANGEBYSOORE key inf 2000

# 批量删除有序集合
ZREM key member member
```

## Redis通用操作

### 过期时间

Redis所有的数据结构都可以设置过期时间，时间到了，Redis会自动删除相应的对象。需要注意的是过期是以对象为单位，比如一个Hash结构的过期，而不是其中的某个key。

```bash
# 设置 5 秒后数据过期，成功返回 1，否则 0
#（不会删除 key，只会删除 vlaue值）
EXPIRE key 5

# 查看过期时间
TTL key

# 失效过期时间
SETEX key secods value
```

### 事务

```bash
# 事务，当事务开启时，所有的命令都会延迟执行
MULTI

# 执行所有延迟命令
EXEC
```

### 回滚

```bash
# 回滚，回滚上一个操作前的状态（事务期间不支持回滚）
DISCARD
```

这些都是这段时间记的笔记，全打出来了好累...不过辛苦的劳动得到了心理上的满足，很舒服，这五个Redis有序集合中我觉得 Sorted Set（有序集合）比较重要，

需要多加练习，而Set（集合）是我的弱项也是需要多加练习。  

年后一直没发过什么博客，一直在忙着练习面向对象的项目，同时也在学习封装自己的MVC框架！本篇文章就到这里吧！Bai！