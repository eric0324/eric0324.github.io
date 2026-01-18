---
title: "如何解決 PHP cURL error code 60"
description: "最近在開發的時候用到 AWS 的 PHP SDK ，然後就會踢到這個錯誤："
pubDate: 2020-01-01
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "PHP"
tags:
  - PHP
  - cURL
  - SSL
  - Backend
---


最近在開發的時候用到 AWS 的 PHP SDK ，然後就會踢到這個錯誤：

| 1 | Fatal error: Uncaught exception 'cURL\_Exception' with message 'cURL resource: Resource id #10; cURL error: SSL certificate problem: unable to get local issuer certificate (cURL error code 60). |
| --- | --- |

其實就是 SSL 憑證出了點問題，所以沒辦法 cURL，大概爬了一下文，其實解決的方法其實很簡單，這邊簡單的紀錄一下：

1. 先下載這份使用證書：

https://curl.haxx.se/ca/cacert.pem

2. 然後去 `php.ini` 設定

| 1 | curl.cainfo = "path\_to\_cert\\cacert.pem" // 剛剛那份證書的路徑 |
| --- | --- |

這樣就可以正常使用了
