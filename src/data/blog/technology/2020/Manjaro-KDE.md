---
author: 游钓四方
draft: false
featured: false
category: technology
pubDatetime: 2020-04-09T11:24+08:00
title: Manjaro KDE 调教日记
slug: Manjaro-KDE
ogImage: https://cos.lhasa.icu/ArticlePictures/manjaro.jpg_81
tags:
  - Manjaro
  - KDE
  - Linux
  - 配置
  
description: Manjaro KDE 调教日记...
---

## 更换源

```bash
# 更新数据源
$ sudo pacman -Sy
# 选清华源 mirrors.tuna.tsinghua.edu.cn
$ sudo pacman-mirrors -i -c China -m rank
$ sudo pacman -Syu

# 添加Arch源
$ sudo vi /etc/pacman.conf
# 把下面这几行写进去
[archlinuxcn]
SigLevel = Optional TrustedOnly
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
$ sudo pacman -Syy && sudo pacman -S archlinuxcn-keyring
```

## 基础设置

```bash
$ sudo pacman -S vim git rpm yay unzip snapd you-get annie
$ sudo systemctl enable --now snapd.socket

# Git代理，需配合Qv2ray使用
$ git config --global https.proxy https://127.0.0.1:8888

# 主目录改为英文
$ sudo pacman -S xdg-user-dirs-gtk
$ export LANG=en_US &&  xdg-user-dirs-gtk-update

# 将时区设置为中国上海
$ timedatectl set-timezone Asia/Shanghai

# 细长的等宽字体
$ yay -S ttf-iosevka

export http_proxy="socks5://127.0.0.1:1080"
export ALL_PROXY=socks5://127.0.0.1:1080

# 禁用封锁
$ sudo vim /etc/security/faillock.conf
deny = 0

# 虚拟终端字体问题
$ sudo pacman -S terminus-font
$ sudo vim /etc/vconsole.conf
FONT=ter-132n
```

## 自动挂载NTFS硬盘

```bash
# 查看磁盘分区的UUID
$ sudo blkid -o list
# 5016CF88CCD20C21 就是我的UUID，同时要记录一下device和fs_type等会要用
device                   fs_type    label       mount point                  UUID
-------------------run----------------------------------------------------------------------------------------------
/dev/sdb1                ntfs       File        /run/media/achuan/File          5016CF88CCD20C21

# /dev/sdb1挂载点
$ mkdir ~/File
# 打开fastab文件，看到以下文件内容
$ sudo vim /etc/fstab
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a device; this may
# be used with UUID= as a more robust way to name devices that works even if
# disks are added and removed. See fstab(5).
#
# <file system>             <mount point>  <type>  <options>  <dump>  <pass>
UUID=8a9b74b7-c33a-413b-b654-80f3a16b5e12 /home          ext4    defaults,noatime,discard 0 2
UUID=b23b3470-26c1-4b39-9358-43278c73763e /              ext4    defaults,noatime,discard 0 1
UUID=ad103e33-78b7-4b33-8632-03c3fe6364fc /boot          ext4    defaults,noatime,discard 0 2
UUID=b0d5e88d-136a-4fa6-b164-5d70e5073b5d /opt           ext4    defaults,noatime,discard 0 2
tmpfs                                     /tmp           tmpfs   defaults,noatime,mode=1777 0 0

# 从这个文件内容可以看出文件有6列
 - 第一列file system选项是UUID
 - 第二列mount point选项是挂载点
 - 第三列type选项是所要挂载设备的文件系统或者文件系统类型
 - 第四列options选项是挂载选项，常见参数如下
 
|  配置选项    | 选项说明                                            
|-------------|-----------------------------------------------------
| async/sync  | 设置是否为同步方式运行，默认为async
| auto/noauto | 当下载mount -a命令时，此系统是否被主动挂载，默认为auto
| rw/ro       | 是否以只读或读写模式挂载
| exec/noexec | 限制此文件系统内是否能够进行“执行”操作
| user/nouser | 是否允许用户使用mount命令挂载
| suid/nosuid | 是否允许SUID的存在
| userquota   | 启动文件系统支持磁盘配额模式
| grpquota    | 启动文件系统对群组磁盘配额模式的支持
| defaults    | 同时具有rw、suid、suid、dev、exec、auto、nouser、async等默认参数的设置
 deepin-wine-wechat
 - 第五列dump选项是文件系统备份选项。0备份，1备份
 - 第六列pass选项是磁盘检查设置，其值是一个顺序，0不检查，１检查（根目录永远都为1）其它分区从2开始，数字越小越先检查，如果有两个分区的数字相同，同时检查

# 这是挂载/dev/sdb1的挂载配置，插入一行保存退出
UUID=5016CF88CCD20C21                     /home/achuan/File ntfs   defaults 0 0

# 如果/etc/fstab配置不对，会导致系统无法启动！一定要检查一下是否能正确挂载！如果改挂了，找个U盘改回来就行了。
$ sudo mount -a
```

## 常用软件

### Vim配置

```bash
# Lightline
$ git clone https://github.com/itchyny/lightline.vim ~/.vim/pack/plugins/start/lightline

# 更换 PaperColor_dark.vim
$ mv -f ~/.vim/pack/plugins/start/lightline/autoload/lightline/colorscheme/PaperColor_dark.vim ~/.vim/pack/plugins/start/lightline/plugin/lightline.vim

# 编辑全局配置并写入以下配置 # 用户个人配置 ~/.vimrc
$ sudo vim /etc/vimrc

" 语法高亮
syntax on
" 底部状态显示
set showmode
" 使用UTF-8编码
set encoding=utf-8  
" 启用256色
set t_Co=256
" 开启文件类型检查，并且载入与该类型对应的缩进规则
filetype indent on
" 按回车后，下一行缩进自动同上
set autoindent
" 按TAB，Vim显示的空格数量
set tabstop=4
" 在文本上按下>>（增加一级缩进）、<<（取消一级缩进）或者==（取消全部缩进）时，每一级的字符数
set shiftwidth=4
" 由于 TAB 键在不同的编辑器缩进不一致，该设置自动将 TAB 转为空格
set expandtab
" TAB转为多少个空格
set softtabstop=4
" 显示行号
set number
" 光标所在当前行高亮
set cursorline
" 设置行宽，即一行显示多少个字符
set textwidth=80
" 自动折行，即太长的行分成几行显示
set wrap
" 只有遇到指定的符号（比如空格、连词号和其他标点符号），才发生折行。也就是说，不会在单词内部折行
set linebreak
" 是否显示状态栏。0 表示不显示，1 表示只在多窗口时显示，2 表示显示
set laststatus=2
" 在状态栏显示光标的当前位置（位于哪一行哪一列）
set  ruler
" 搜索时，高亮显示匹配结果
set hlsearch
" 输入搜索模式时，每输入一个字符，就自动跳到第一个匹配的结果
set incsearch
" 搜索时忽略大小写
set ignorecase
" 如果有一个大写字母，则切换到大小写敏感查找
set smartcase 
" 保存撤销历史
set undofile
" 出错时，发出视觉提示
set visualbell
" 保存Vim历史操作次数
set history=1000
" 打开文件监视。如果在编辑过程中文件发生外部改变（比如被别的编辑器编辑了），就会发出提示
set autoread
" 如果行尾有多余的空格（包括 Tab 键），该配置将让这些空格显示成可见的小方块
set listchars=tab:»■,trail:■
set list
" 命令模式下，底部操作指令按下 Tab 键自动补全。第一次按下 Tab，会显示所有匹配的操作指令的清单；第二次按下 Tab，会依次选择各个指令
set wildmenu
set wildmode=longest:list,full
```

### Oh-My-Zsh

```bash
$ sudo pacman -S zsh
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
# 切换到zsh
$ chsh -s /bin/zsh
# 安装3den主题
$ sudo vim ~/.zshrc
ZSH_THEME="3den"
```

### 小狼毫输入法

```bash
# 搜狗装了十几回，它那个兼容性真让我抓狂，还是小狼毫香。 
$ sudo  pacman -S ibus ibus-rime
$ yay -S ibus-qt
```
#### 配置

```bash
# 默认是繁体，需要可以改为简体中文
$ vim ~/.config/ibus/rime/luna_pinyin.custom.yaml
# luna_pinyin.custom.yaml
patch:
  switches:                   # 注意缩进
    - name: ascii_mode
      reset: 0                # reset 0 的作用是当从其他输入法切换到本输入法重设为指定状态
      states: [ 中文, 西文 ]   # 选择输入方案后通常需要立即输入中文，故重设 ascii_mode = 0
    - name: full_shape
      states: [ 半角, 全角 ]   # 而全／半角则可沿用之前方案的用法。
    - name: simplification
      reset: 1                # 增加这一行：默认启用「繁→簡」转换。
      states: [ 漢字, 汉字 ]

# 编辑系统环境变量并写入以下配置
$ sudo vim /etc/profile
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
ibus-daemon -d -x
```

### 搜狗输入法

2020-2-11 Update：现在已经有fcitx5包了，体验确实提升不少，ibus没有搜狗香了哈哈哈

```shell
$ sudo pacman -Sy fcitx fcitx-configtool 
$ yay -Sy fcitx-sogoupinyin

# 编辑系统环境变量并写入以下配置
$ sudo vim /etc/profile
export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```


### 微信 TIM 完美解决方案

```shell
# QQ
$ yay -S deepin-wine-qq
# 自动切换前确保 deepin-wine5 包的支持，完成后就可以启动使用了
$ /opt/apps/com.qq.im.deepin/files/run.sh -d
# 高分辨率屏幕支持
$ env WINEPREFIX="$HOME/.deepinwine/Deepin-QQ" deepin-wine5 winecfg
# 默认使用文泉驿微米黑(wqy-microhei)字体，可以使用其他字体替代，直接将字体文件或字体链接文件放置到字体文件夹就会生效，不会影响系统字体
$ cd ~/.deepinwine/Deepin-QQ/drive_c/windows/Fonts

# 新版TIM
$ yay -S com.qq.tim.spark
# 微信
$ yay -S com.qq.weixin.deepin
# 注意：如果是 N 卡用户，可能需要用安装 lib32-nvidia-libgl 才能使用
# 中文方块乱码：WINE_CMD="LC_ALL=zh_CN.UTF-8 deepin-wine5"
# KDE/Plasma桌面 需要安装 xsettingsd，然后设置到 /usr/bin/xsettingsd 自启动
$ ln -s /usr/bin/xsettingsd ~/.config/plasma-workspace/env/xsettingsd

# KDE字体设置 DPI 120
$ env WINEPREFIX=$HOME/.deepinwine/Deepin-WeChat deepin-wine5 winecfg

# 添加字体到Fonts目录
$ cp MicrosoftYaheiConfig.ttf ~/.deepinwine/Deepin-WeChat/drive_c/windows/Fonts

# 修改系统注册表且修改以下两行
$ vim ~/.deepinwine/Deepin-WeChat/system.reg
"MS Shell Dlg"="MicrosoftYahei"
"MS Shell Dlg 2"="MicrosoftYahei"

# 注册字体并添加一下代码
$ vim MicrosoftYaheiConfig.reg
REGEDIT4
[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontLink\SystemLink]
"Lucida Sans Unicode"="MicrosoftYahei.ttc"
"Microsoft Sans Serif"="MicrosoftYahei.ttc"
"MS Sans Serif"="MicrosoftYahei.ttc"
"Tahoma"="MicrosoftYahei.ttc"
"Tahoma Bold"="MicrosoftYahei.ttc"
"MicrosoftYahei"="MicrosoftYahei.ttc"
"Arial"="MicrosoftYahei.ttc"
"Arial Black"="MicrosoftYahei.ttc"

# 注册
$ WINEPREFIX=~/.deepinwine/Deepin-WeChat deepin-wine5 regedit MicrosoftYaheiConfig.reg
```

### 开发

```bash
# 谷歌浏览器
$ sudo pacman -S google-chrome
# 火狐浏览器并汉化
$ sudo pacman -S firefox firefox-i18n-zh-cn
# 在浏览器的地址栏输入
about:config
# 搜索
intl.locale.requested
# 将其值修改为
zh_CN
# 360安全浏览器
$ yay -S browser360
# Opera 自带梯子的浏览器
$ sudo pacman -Sy opera
# 博主感觉最好的Markdown编辑器
$ sudo pacman -S typora
# phpstorm
$ yay -S phpstorm
# GoLand
$ sudo pacman -S goland
# CLion
$ sudo pacman -S clion clion-cmake make clion-lldb
# idea
$ sudo pacman -S intellij-idea-ultimate-edition
# Visual Studio Code
$ sudo pacman -S visual-studio-code-bin
# Postman
$ sudo pacman -S postman-bin
# Mycli 具有自动完成和语法突出显示功能的MySQL / MariaDB / Percona客户端
$ sudo pacman -S mycli
# 具有自动完成功能和语法突出显示功能的Redis客户端
$ yay -S iredis
# 开源图形化的Redis客户端管理软件
$ sudo snap install redis-desktop-manager
# Java JDK
$ sudo pacman -S jdk8-openjdk java-14-openjdk
$ archlinux-java status
$ sudo archlinux-java set java-14-openjdk
# Navicat Premium 150.0.10
# 链接: https://pan.baidu.com/s/1ihWcDY2Vs9igWuDfKh5giA  密码: nnft
$ chmod +x navicat15-premium-cs.AppImage
$ ./navicat15-premium-cs.AppImage
# 后来发现的，对不起Navicat我投入了DataGrip的怀抱
$ yay -S datagrip

# Jekyll
$ sudo pacman -S ruby
# 缺包了就装 bundle add
$ sudo vim /etc/profile
# 把ruby写入到系统环境变量
export PATH="$PATH:/home/achuan/.gem/ruby/3.0.0/bin/"
$ source /etc/profile
$ sudo gem update
$ sudo gem install jekyll bundle bundler
```

### 办公

```bash
#　Thunderbird (邮件收发和RSS订阅，KDE预装)
$ sudo pacman -S thunderbird thunderbird-i18n-zh-cn
# XMind思维导图 (需要JAVA8+)
$ yay -S xmind
# KDE下最好用的PDF阅读器
$ sudo pacman -S okular
# WPS\字体\中文语言包
$ sudo pacman -S wps-office ttf-wps-fonts wps-office-mui-zh-cn
# 如果WPS不能输入中文
$ sudo vim /usr/bin/wps
# 写入以下配置
export GTK_IM_MODULE=ibus
export XMODIFIERS=@im=ibus
export QT_IM_MODULE=ibus
ibus-daemon -d -x
```

### 娱乐

```bash
# Spotify
$ sudo pacman -S spotify
# 网易云音乐
$ sudo pacman -S netease-cloud-music
# Telegram
$ sudo pacman -S telegram-desktop
# Asciinema 在云端记录并分享你的终端会话
$ sudo pacman -S asciinema
# 开源的游戏平台（可以打美服LOL）
$ sudo pacman -S lutris
```
### 工具

```bash
# 查看内核版本
$ uname -r
# 安装时对应注意Linux内核版本
$ sudo pacman -S virtualbox virtualbox-guest-dkms
# vboxusers扩展包
$ yay -S virtualbox-ext-oracle virtualbox-guest-iso
# 添加当前用户到virtualbox用户组
$ sudo gpasswd -a $USER vboxusers
# 激活内核模块
$ sudo modprobe vboxdrv
# 坚果云
$ sudo pacman -S nutstore
# 百度网盘
$ yay -S baidunetdisk
# 新一代网络工具包
$ sudo pacman -S iproute2
# Snap Store
$ sudo snap install snap-store
# 程序启动器
$ sudo pacman -S albert
# 桌面面板
$ sudo pacman -S latte-dock
# 迅雷
$ yay -S deepin-wine-thunderspeed
# Teamviewer
$ sudo pacman -S teamviewer
# 如果无法打开或不能联网执行
$ sudo teamviewer --daemon enable
# 支持快捷键下拉的终端模拟器 (KDE预装默认F12唤醒)
$ sudo pacman -S yakuake
# 深度取色器
$ sudo pacman -S deepin-picker
# 深度录屏
$ sudo pacman -S deepin-screen-recorder
# 截图工具
$ sudo pacman -S flameshot-git
# Motrix (支持下载 HTTP、FTP、BT、磁力链、百度网盘等资源)
$ sudo pacman -S motrix
$ git clone git@github.com:sbwtw/deepin-repair-tools.git
# 全平台多线程下载管理器，恢复断/死下载、安排和转换下载、内置视频转换器、支持各大流行浏览器插件
$ yay -S xdman
# 腾讯播放器
$ yay -S debtap
# 升级 debtap
$ sudo debtap -u
$ wget https://dldir1.qq.com/qqtv/linux/Tenvideo_universal_1.0.10_amd64.deb
# 将deb包转换成pkg包
$ sudo debtap Tenvideo_universal_1.0.10_amd64.deb
# 安装pkg包
$ sudo pacman -U sogoupinyin-2.3.1.0112-1-x86_64.pkg.tar.xz

# xDroid 安卓模拟器
https://www.linzhuotech.com/index.php/home/index/xdroid.html
$ tar xvf xDroidInstall-x86_64-v3.0007.tar.gz
$ cd xDroidInstall-x86_64/
$ sh install.sh

# SwitchHosts（hosts管理）
https://github.com/oldj/SwitchHosts/releases
$ chmod +x SwitchHosts._linux_x86_64_3.5.4.5517.AppImage
$ ./SwitchHosts._linux_x86_64_3.5.4.5517.AppImage
```

## 开发环境

### Apache

```bash
$ sudo pacman -S apache
# 设置Apache开机启动服务
$ sudo systemctl enable httpd
# 启动apache服务
$ sudo systemctl start httpd
```

#### 配置参数

```bash
$ cd /etc/httpd/conf
# 备份源文件
$ sudo cp httpd.conf httpd.conf.backup
$ sudo vim httpd.conf 
# 开启重写
LoadModule rewrite_module modules/mod_rewrite.so

</IfModule>
    ServerAdmin achuan@achuan.io
    ServerName io:80
<Directory />
DocumentRoot "/home/achuan/www"
<Directory />
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
<Directory "/home/achuan/www">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

$ sudo systemctl restart httpd
# 报错
[Sat Apr 25 00:36:21.725913 2020] [core:error] [pid 106186:tid 140238307444480] (13)Permission denied: [client 127.0.0.1:53420] AH00035: access to / denied (filesystem path '/home/achuan/www') because search permissions are missing on a component of the path

# 很常见的权限问题
$ sudo chmod +x /home/achuan

<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>

$ sudo systemctl restart httpd
# 让apache支持php
Include conf/extra/php7_module.conf
LoadModule php7_module modules/libphp7.so
Include conf/extra/httpd-vhosts.conf

$ sudo systemctl restart httpd
# 重启后直接无法启动了，查看httpd状态看看
$ sudo systemctl startus httpd
[pid 113670:tid 140226396240832] Apache is running a threaded MPM, but your PHP Module is not compiled to be threadsafe.  You need to recompile PHP.

# Arch Wiki上说Apache 2.4.7不支持非线程安全版PHP。php-apache中包含的libphp7.so不支持mod_mpm_event，仅支持mod_mpm_prefork。需要在/etc/httpd/conf/httpd.conf中注释掉。
$ sudo vim httpd.conf
# 取消以下行的注释：
# LoadModule mpm_event_module modules/mod_mpm_event.so
# 取消以下行的注释：
LoadModule mpm_prefork_module modules/mod_mpm_prefork.so
$ sudo systemctl restart httpd

# 配置hosts
$ sudo vim /etc/hosts
# Virtual hosts
127.0.0.1  io
127.0.0.1  phpmyadmin.io
127.0.0.1  acphp.io
127.0.0.1  tp.io

# 配置虚拟主机
$ sudo vim extra/httpd-vhosts.conf
# Virtual Hosts
<VirtualHost _default_:80>
    DocumentRoot "/home/achuan/www/"
    ServerName io
</VirtualHost>

# phpMyAdmin.io
<VirtualHost *:80>
    ServerName phpmyadmin.io
    DocumentRoot /home/achuan/Carry/phpMyAdmin/
    <Directory  "/home/achuan/Carry/phpMyAdmin/">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

# tp.io
<VirtualHost *:80>
    ServerName tp.io
    DocumentRoot /home/achuan/language/php/tp/public
    <Directory  "/home/achuan/language/php/tp/">
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

$ sudo systemctl restart httpd
```

### PHP
```bash
$ sudo pacman -S php php-apache
$ php -v
PHP 7.4.5 (cli) (built: Apr 15 2020 17:14:40) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
```
####  安装Redis并编译扩展
```bash
$ sudo pacman -S redis
# 设置Redis开机启动服务
$ sudo systemctl enable redis
$ sudo systemctl start redis

# 编译Redis扩展
$ git clone https://github.com/phpredis/phpredis.git
$ cd phpredis
# 下载下来后默认这develop分支，需要手动切换到主分支
$ git checkout master
$ /usr/bin/phpize
$ sudo ./configure --with-php-config=/usr/bin/php-config
$ sudo make && sudo make install
```
#### 配置参数

```bash
$ cd /etc/php
# 备份源文件
$ sudo cp php.ini php.ini.backup
$ sudo vim php.ini

error_reporting = E_ALL
display_errors = On
short_open_tag = On
display_startup_errors = On
memory_limit = 128M
post_max_size = 32M
date.timezone = Asia/Shanghai

extension=curl
extension=ftp
extension=imap
extension=mysqli
extension=pdo_mysql
extension=sockets
extension=zip
extension=redis
```

### Composer

```bash
$ curl -sS https://getcomposer.org/installer | php
# 全局调用
$ sudo mv composer.phar /usr/local/bin/composer
# 使用阿里云镜像
$ composer config -g repo.packagist composer https://mirrors.aliyun.com/composer/
```

### MySQL

```bash
$ sudo pacman -S mysql
# 初始化
$ sudo mysqld --initialize --user=mysql --basedir=/usr --datadir=/var/lib/mysql
# 我遇到了问题，初始化没有提供密码，不管它直接改。
$ sudo vim /etc/mysql/my.cnf
在[mysqld]中写入
skip-grant-tables
$ sudo systemctl restart mysqld
$ mysql -uroot -p
# 设置MySQL开机启动服务
$ sudo systemctl enable mysqld
# 改密码
# 在这我遇到个问题，如果不先刷新权限，SQL语句就会报错
ERROR 1290 (HY000): The MySQL server is running with the --skip-grant-tables option so it cannot execute this statement

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

mysql> ALTER user 'root'@'localhost' IDENTIFIED BY 'achuan.io';
Query OK, 0 rows affected (0.02 sec)

mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.01 sec)

> QUIT
Bye
```

### GoLand

#### 安装

```bash
$ sudo pacman -S go
```

#### 配置

```bash
# 配置环境变量
$ sudo vim /etc/profile
export GOPATH=$HOME/Important/go
$ source /etc/profile
```

## Qv2ray 科学上网

- [搬瓦工方案库存监控页面][1]
- 我的VPS配置：CN2  1核  1GB  20GB  1TB  1Gbps  洛杉矶  $49.99
- 要求：Ubuntu 16+ / Debian 8+ / CentOS 7+ 系统
- 推荐使用 Debian 9 系统，脚本会自动启用 BBR 优化

### v2ray安装

```bash
$ yum install curl -y
$ bash <(curl -s -L https://git.io/v2ray.sh)
```

#### 快速管理

```bash
# 查看 V2Ray 配置信息
$ v2ray info
# 修改 V2Ray 配置
$ v2ray config
# 生成 V2Ray 配置文件链接
$ v2ray link
# 生成 V2Ray 配置信息链接
$ v2ray infolink
# 生成 V2Ray 配置二维码链接
$ v2ray qr
# 修改 Shadowsocks 配置
$ v2ray ss
# 查看 Shadowsocks 配置信息
$ v2ray ssinfo
# 生成 Shadowsocks 配置二维码链接
$ v2ray ssqr
# 查看 V2Ray 运行状态
$ v2ray status
# 启动 V2Ray
$ v2ray start
# 停止 V2Ray
$ v2ray stop
# 重启 V2Ray
$ v2ray restart 
# 查看 V2Ray 运行日志
$ v2ray log
# 更新 V2Ray
$ v2ray update
# 更新 V2Ray 管理脚本
$ v2ray update.sh
# 卸载 V2Ray
$ v2ray uninstall
```

#### 配置文件路径

```bash
# V2Ray 配置文件路径
/etc/v2ray/config.json
# Caddy 配置文件路径
/etc/caddy/Caddyfile
# 脚本配置文件路径
/etc/v2ray/233blog_v2ray_backup.conf
```

### v2ray客户端

#### 推荐俩v2ray客户端

- [Qv2ray][2]

  三大平台GUI客户端，使用C++17/Qt5、支持订阅、扫描二维码、自定义路由编辑

- [v2rayL][3]

  linux GUI客户端，支持订阅、vemss、ss等协议，自动更新订阅、透明代理

```bash
# AppImage版本
$ wget https://github.com/Qv2ray/Qv2ray/releases/download/v2.5.0/Qv2ray.v2.5.0.linux-x64.AppImage

# 因为政策原因Qv2ray并不自带v2ray核心
$ sudo pacman -S qv2ray v2ray

# 代理扩展
SwitchyOmega
# SwitchyOmega配置
https://raw.githubusercontent.com/wiki/FelisCatus/SwitchyOmega/GFWList.bak

# GoFW
# 境外网站加速器，Github一个项目，利用BootCDN加载境外网站某些静态资源
https://github.com/xmcp/GoFW
```

## Pacman

### 更新

```bash
# 全面更新
$ pacman -Syyu
# 更新所有包
$ pacman -Syu
# 更新包数据源
$ pacman -Sy
# 更新已安装的包
$ pacman -Su
```

### 搜索安装

```bash
# 安装
$ pacman -S
# 搜索含关键字的包
$ pacman -Ss
# 同步包后再执行安装
$ pacman -Sy
# 安装本地包 (扩展名：pkg.tar.gz)
$ pacman -U
# 搜索已安装的包
$ pacman -Qs
# 升级全部包
$ pacman -Syu
# 只下载，不安装
$ pacman -Sw
```

### 显示删除

```bash
# 删除包，不会删除其依赖
$ pacman -R
# 删除包，及其所有没有被其它包使用的依赖
$ pacman -Rs
# 删除一个包，包括所有依赖
$ pacman -Rsc
# 清理未安装的包 (包文件目录：/var/cache/pacman/pkg/)
$ pacman -Sc
# 清理所有缓存文件
$ pacman -Scc
# 显示包信息
$ pacman -Si
# 查询本地包的详情信息
$ pacman -Qi
# 列出所有不再作为依赖的包
$ pacman -Qdt
# 列出所有明确安装而且不被其他包依赖的包
$ pacman -Qet
```

## Snap

```bash
# 查看版本信息
$ snap --version
# 找出所有snap应用
$ snap find
# 安装应用
$ snap install
# 重启应用
$ snap restart
# 升级应用
$ snap refresh
# 查看安装的应用
$ snap list
# 卸载应用
$ snap remove
```

## you-get

- Github：https://github.com/soimort/you-get

- 命令行程序，提供便利的方式来下载网络上的媒体信息

```bash
# 下载视频
$ you-get -i
# 使用 --http-proxy/-x为you-get设置HTTP代理:
$ you-get -x 127.0.0.1:8888
# 加载okie，目前支持两种cookie格式：Mozilla cookies.sqlite 和 Netscape cookies.txt.
$ you-get -c
# 获得页面所有可下载URL列表，支持JSON格式
$ you-get -u
```

## annie

- Github：https://github.com/iawia002/annie
- 这是个国产的命令行下载器，用GO构建，目前支持的网站有

```bash
# 下载，如果URL包含特殊字符，需要用引号引起来
$ annie [URL]
# 显示视频质量等信息
$ annie -i https://www.bilibili.com/video/BV1FV411d7u7
 Site:      哔哩哔哩 bilibili.com
 Title:     bilibili献给新一代的演讲《后浪》 P1 bilibili献给新一代的演讲《后浪》
 Type:      video
 Streams:   # All available quality
     [80]  -------------------
     Quality:         高清 1080P
     Size:            65.55 MiB (68738121 Bytes)
     # download with: annie -f 80 ...
# 下载1080P列表所有视频，若只下载第一个去掉 -p
$ annie -f 80 -p https://www.bilibili.com/video/BV1FV411d7u7
```

最后再来一张图啊哈哈哈～

![我的桌面]({{ site.ARTICLEPICTURES_PATH }}/My desktop.png "我的桌面")


## 后续报错
### JetBrains DataGrip的JavaFx报错
- tried to use preview panel provider (javafx webview), but it is unavailable. reverting to default.

打开Markdown文件就会报错，为在Medium上找到的一个解决方案，重装一下PHPSTORM JRE

```bash
$ yay -S phpstorm-jre
```

### Increasing the amount of inotify watchers

- /home/achuan/.gem/ruby/2.7.0/gems/rb-inotify-0.10.1/lib/rb-inotify/watcher.rb:74:in `initialize': No space left on device - Failed to watch "/home/achuan/github/achuanya.github.io/.jekyll-cache/Jekyll/Cache/Jekyll--Converters--Markdown/e6": The user limit on the total number of inotify watches was reached or the kernel failed to allocate a needed resource. (Errno::ENOSPC)

使用`$ jekyll server`提示被限额了，增加限额永久化：

```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
$ sudo sysctl -p
```

[1]:https://kucun.banwagong.org
[2]:https://github.com/Qv2ray/Qv2ray
[3]:https://github.com/jiangxufeng/v2rayL