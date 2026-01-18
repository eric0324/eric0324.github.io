---
title: "在 AWS EC2 上安裝 vsftpd"
description: "Install on AWS EC2"
pubDate: 2021-08-10
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


## Install on AWS EC2

就有些原因，所以得在 EC2 上面安裝 FTP ，讓外部的可以透過 FTP 上傳檔案。

<!--more-->

首先，我們需要更新套件並安裝 vsftpd

```shell
$ sudo apt-get update
$ sudo apt-get install vsftpd -y
```

接著我們需要對 vsftpd 做一些設定

```shell
$ sudo vim /etc/vsftpd.conf
```

依序找到下面的 key ，將 value 修改，並且儲存檔案

```shell
listen=YES
listen_ipv6=NO
 
# 允許本地用戶登錄
local_enable=YES
 
# 允許上傳
write_enable=YES
 
# 讀寫執行權限
local_umask=022
 
# 允許家目錄變為根目錄
chroot_local_user=YES
chroot_list_enable=YES
 
# 允許家目錄變為根目錄後擁有寫入權限
chroot_list_file=/etc/vsftpd.chroot_list
allow_writeable_chroot=YES
```

接著，我們需要建立一個使用者，這邊我建立一個叫做 `eric`

```shell
$ sudo useradd -m -s /usr/sbin/nologin eric
```

接著，我們需要去更新 eric 這個使用者的密碼

```shell
$ sudo passwd eric
```

- 接著，我們需要將 nologin 加入 shells 最後

```shell
$ sudo vi /etc/shells
```

```shell
/usr/sbin/nologin
```

最後，如果我們想要讓使用者要可以看到所有目錄，必須新增帳號到這個檔案

（如果不需要也要建立一個沒有內容的檔案）

```shell
$ sudo vi /etc/vsftpd.chroot_list
```

都設定完成後，就可以`重新啟動 vsftpd`

```shell
sudo service vsftpd restart
```
