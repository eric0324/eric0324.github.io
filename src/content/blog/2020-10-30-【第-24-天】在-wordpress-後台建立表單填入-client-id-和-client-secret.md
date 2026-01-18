---
title: "【第 24 天】在 WordPress 後台建立表單填入 Client ID 和 Client Secret"
description: "在 【第 22 天】開一個 LINE OA 這篇文章中，我提到，我們必須先拿著 Client ID 和 Client Secret 去取得 code ，再拿這個 code 去換 token 。"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


在 [【第 22 天】開一個 LINE OA](https://ithelp.ithome.com.tw/articles/10241763) 這篇文章中，我提到，我們必須先拿著 `Client ID` 和 `Client Secret` 去取得 `code` ，再拿這個 `code` 去換 `token` 。

所以這個流程看來，我們的第一個步驟，應該先提供一個表單給後台使用者，可以去填入他的 `Client ID` 和 `Client Secret` 按下去後會進入 LINE 提供的授權頁面，然後會換回一個 `code` ，然後我們再拿著這個 `code` 去存在 WordPress 中。

然後這邊開始我們要開始寫 code 了

然後我被叫去修 bug 了...晚上再來補文QQ
