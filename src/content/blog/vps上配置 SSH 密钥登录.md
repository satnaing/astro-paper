---
author: xxxu
pubDatetime: 2025-01-01T10:20:35Z
modDatetime: 2025-01-01T10:20:35Z
title: vps上配置 SSH 密钥登录
slug:  vps上配置 SSH 密钥登录-blog
featured: false
draft: false
tags:
  - 教程
description:
  vps上配置 SSH 密钥登录
---

# vps上配置 SSH 密钥登录

## 1. 生成 SSH 密钥对（如果没有现成的密钥）

首先，需要在本地机器上生成 SSH 密钥对。如果您已经有了密钥，可以跳过此步骤。

打开终端并运行以下命令：

```
ssh-keygen -t ed25519
```

按照提示操作，可以选择保存密钥文件的路径，通常默认路径是 `~/.ssh/id_rsa`，并设置一个密码（如果需要的话）。

## 2. 将公钥复制到目标服务器

登录到目标服务器，将公钥添加到 `~/.ssh/authorized_keys` 文件中。假设您已经通过 SSH 登录到目标服务器：

```
mkdir -p ~/.ssh
echo "your-public-key-content" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
chmod 700 ~/.ssh
```

或者直接复制`公钥.pub`里面的内容粘贴到`~/.ssh/authorized_keys`文件内，如果vps上没有`authorized_keys`文件可先创建。

## 3. 确保 SSH 服务配置正确

编辑目标服务器上的 SSH 配置文件 `/etc/ssh/sshd_config`，确保以下选项设置正确：

```
PermitRootLogin prohibit-password   # 禁止root用户通过密码登录
PasswordAuthentication no          # 禁用密码登录
PubkeyAuthentication yes           # 启用公钥认证
AuthorizedKeysFile     .ssh/authorized_keys  # 公钥存储位置
```

保存文件后，重启 SSH 服务以应用配置：

```
sudo systemctl restart ssh
```

## 4. 禁用密码登录（可选）

为了进一步提高安全性，您可以选择禁用 SSH 的密码登录，只允许通过密钥登录。编辑 `/etc/ssh/sshd_config` 文件，将 `PasswordAuthentication` 设置为 `no`：

```
PasswordAuthentication no
```

然后重启 SSH 服务：

```
sudo systemctl restart ssh
```

现在，服务器只允许通过 SSH 密钥进行登录，禁用了密码登录。

## 5.常见问题

```
root@vm:~# sudo systemctl restart ssh
sudo: unable to resolve host vm: Name or service not known
root@vm:~#
```

出现 `sudo: unable to resolve host vm: Name or service not known` 错误，通常是因为服务器的主机名（hostname）与 `/etc/hosts` 文件中的设置不一致，或者系统无法解析主机名。

### 解决步骤：

**检查主机名** ：

执行以下命令，查看当前系统的主机名：

```
hostname
```

**检查 `/etc/hosts` 文件** ：
确保 `/etc/hosts` 文件中的主机名与 `hostname` 命令返回的主机名一致。编辑 `/etc/hosts` 文件：

```
sudo nano /etc/hosts
```

**重启系统** ：
完成上述步骤后，重启系统，或者至少重启网络服务：

```
sudo systemctl restart networking
```

* `chmod 600 ~/.ssh/authorized_keys`：让只有文件所有者可以读写 `authorized_keys` 文件。
* `chmod 700 ~/.ssh`：让只有文件所有者能够访问和修改 `~/.ssh` 目录，其他人没有权限。

# 简单版：
本地生成密钥对，设置一个密码![image](https://image.xxxu.me/rest/sB7XQMK.png)
生成的公钥文件粘贴进这里![image](https://image.xxxu.me/rest/nyHXQMK.png)
禁止密码登录，开启密钥登录![image](https://img.xxxu.com.cn/img/0GmXQMK.png)
![image](https://image.xxxu.me/rest/6EQXQMK.png)
最后重启ssh：
```
sudo systemctl restart ssh
```
