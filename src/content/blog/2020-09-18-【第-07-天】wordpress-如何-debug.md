---
title: "【第 07 天】WordPress 如何 Debug?"
description: "前幾天，我們開始試著在 WordPress 埋了 hook ，用了自己的 hook ，也用了 WordPress 提供的幾個好用的 hook 。在這過程，應該有些人跟筆者有一樣的困擾，就是噴了狀態碼 500 ，也只能雙手一攤盲測（誤）"
pubDate: 2020-09-18
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


前幾天，我們開始試著在 WordPress 埋了 hook ，用了自己的 hook ，也用了 WordPress 提供的幾個好用的 hook 。在這過程，應該有些人跟筆者有一樣的困擾，就是噴了狀態碼 500 ，也只能雙手一攤盲測（誤）

其實，WordPress 也有提供 debug mode 可以使用，接著就來講講 WordPress 提供的 debug mode。

## 開啟 WordPress Debug

我們打開 WordPress 根目錄底下的 wp-config.php 檔案，裡面可以找到 `define(‘WP_DEBUG’, false)`，就如同字面上的意思，這是 WordPress debug mode 的開關，預設值是關閉的。

我們可以把 `false` 改成 `true` ，打開後可以協助我們縮小問題的範圍，快速的找到 bug。

## Debug Log

還有一個地方是 `define( 'WP_DEBUG_LOG', true );` ，我也會習慣把它打開，啟動後，錯誤日誌會被放在 / wp-content 目錄中，打開 `debug.log` 文件後，可以清楚地看到錯誤發生的紀錄。

## 儲存查詢

最後一個是， `define('SAVEQUERIES', true);` ，這我通常也會打開一起服用，他會同時會將 SQL 的查詢也記錄下來，方便我們除錯。開啟這些設定後，都會將資訊寫至 wp-content/debug.log 檔案中。

不過要注意 SAVEQUERIES 可能會比較耗系統資源，非必要的時候還是把它關掉會比較好！

## 自定義 Log file 位置

如果想要自己定義 log file 要放在哪，也可以自己定義：

```
define('WP_DEBUG', true); 
ini_set('log_errors', 'On');
define( 'WP_DEBUG_DISPLAY', false );
ini_set('error_log', 'path_you_want_to_put');
```

## 一定要 SSH 進去看 Log？

不一定，有些 WordPress 外掛 會提供一個 GUI 介面，不過我個人比較不習慣這樣用，我看了網路上推薦的是 `[WP Log Viewer](https://wordpress.org/plugins/wp-log-viewer/)`，裝好之後，就可以直接在 WordPress 介面上看到錯誤訊息。

但是，看起來好像很久沒有維護了，上次維護是三年前，所以大家就斟酌用:)

我之後會拉一天來聊聊好用的開發工具
