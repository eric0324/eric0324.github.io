---
title: "查詢 cron / crontab 的 log"
description: "在寫 Laravel 的時候，我的排程不知道為什麼沒有順利執行（至於為什麼？這又是另一個故事了），所以我想檢查看看我的 crontab 是不是有順利的在運行？"
pubDate: 2021-08-11
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


在寫 Laravel 的時候，我的排程不知道為什麼沒有順利執行（至於為什麼？這又是另一個故事了），所以我想檢查看看我的 crontab 是不是有順利的在運行？

<!--more-->

Cron jobs 的 log 預設會記錄在 `/var/log/syslog`

不過這份檔案會放很多其他的系統資訊，所以閱讀上會很不方便，所以我們可以透過以下指令去濾出我們要看的就好：

```
 $ grep CRON /var/log/syslog
```
