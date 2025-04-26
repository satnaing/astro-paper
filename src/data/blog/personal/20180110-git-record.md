---
author: Barry Dong
pubDatetime: 2018-01-10T16:00:00+08:00
modDatetime: 2018-01-10T16:25:46.734+08:00
title: Git First Experience
slug: personal/20180110-git-record
featured: false
draft: false
tags:
  - blog
  - git
description:
  A record of a Git operation error.
---

事情是这样的，我在本地创建了一个 Git 库，并且进行了一次提交 A，同时在 Github 上面创建了一个库，产生了一次初始提交 B。

然后将 Github 库添加为本地的 remote，直接使用

```shell
$ git pull origin master
```

结果出错，提示 `refusing to merge unrelated histories`。

之前没注意这个问题，于是找到方法，处理如下

```shell
$ git pull origin master --allow-unrelated-histories
$ git merge origin origin/master
```

但是分支就变成了如下的形式

```
B
  \
A - C
```

然后强迫症犯了，感觉不爽，于是想要把提交历史变成  B - A 。

### 问题

想到的是先回滚，然后 rebase。

这里就又开始犯错了，使用了

```shell
$ git checkout A
```

然后 rebase，接着信心满满的 push，然后出错了。

### 解决

回想下犯的错误，主要是把回滚操作的命令，想当然的认为是 checkout，其实当时是有提示的：

```
Note: checking out '37ede6c'.
You are in 'detached HEAD' state. You can look around, make experimental
changes and commit them, and you can discard any commits you make in this
state without impacting any branches by performing another checkout.
If you want to create a new branch to retain commits you create, you may
do so (now or later) by using -b with the checkout command again. Example:
  git checkout -b <new-branch-name>
HEAD is now at 37ede6c... Initial commit
```

这里进入的这个状态，指的是 HEAD 指向了一个具体的 commit id，并不是一个分支。

正确的方式是使用

```shell
$ git reset --hard A
```

实现了回滚，接着再 rebase，这样才打到了想要的结果，push 也是没问题的。

### 反思

这次遇到的小问题还是反映出来一些问题，值得反思：

对 Git 命令不够熟悉，平时一个人开发习惯了，没遇到过什么冲突，常使用的命令也就局限于 pull、add、commit、push。

习惯不好，还是使用 fetch 的好，别直接使用 pull。
