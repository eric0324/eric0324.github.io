---
title: "UNIX socket file don't exists"
description: "有一次有一台自己在用的 MySQL 主機跑到一半，突然整個死掉不動了，進去看 MySQL 的 Logs，他提示這樣的訊息。"
pubDate: 2022-02-21
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


有一次有一台自己在用的 MySQL 主機跑到一半，突然整個死掉不動了，進去看 MySQL 的 Logs，他提示這樣的訊息。

<!--more-->

```
mysqld_safe Directory '/var/run/mysqld' for UNIX socket file don't exists.
```

看了下網路上的資訊，基本上應該是會有這個檔案的，但是不知道為什麼遺失了。 有一種可能是，手動去更改了 my.cfg 的路徑，但是我也沒有去碰到

這邊就先暫時不討論為什麼不見了，先把 MySQL 啟起來比較重要。因此我嘗試手動去創建這個目錄，並重新啟動服務，方法如下：

```shell
mkdir -p /var/run/mysqld
chown mysql:mysql /var/run/mysqld
```

問題就被解決了。
