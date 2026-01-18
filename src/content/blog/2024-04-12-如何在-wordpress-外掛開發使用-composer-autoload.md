---
title: "如何在 WordPress 外掛開發使用 composer autoload"
description: "當我們在開發 WordPress 的外掛程式或主題的時候，會有很多檔案和 class。通常我們會需要透過 require、require_once 或 include 來引入它們。但是隨著文件的增長，我們在 function.php 或主外掛檔案中獲得了大量檔案引入，如下所示："
pubDate: 2024-04-12
heroImage: "https://ericwu.asia/wp-content/uploads/2024/04/截圖-2024-04-12-13.07.12.png"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


當我們在開發 WordPress 的外掛程式或主題的時候，會有很多檔案和 class。通常我們會需要透過 require、require\_once 或 include 來引入它們。但是隨著文件的增長，我們在 function.php 或主外掛檔案中獲得了大量檔案引入，如下所示：

<!--more-->

[![](../../assets/blog-images/截圖-2024-04-12-13.07.12.png)](https://ericwu.asia/wp-content/uploads/2024/04/截圖-2024-04-12-13.07.12.png)

每次新增功能來連接另一個檔案的時候，非常不方便，你要跑回來這裡引入 (有時候還可能忘記)。還有就是，幾個月回來打開我們的專案時，如果您沒有在程式碼中留下註解，會很不好維護。

所以，我後來使用 Composer 來解決這個問題。

## 1\. 建立 Composer.json

我們在終端機運行指令 `composer init` 並回答幾個問題，Composer 本身會產生一個標準文件。

```as3
{
   "name": "user/name_project",
   "authors": [
     { 
      "name": "iWPdev",
      "email": "iwpdev@outlook.com"
     } 
  ], 
  "require": { } 
}
```

接下來，我們需要新增自動載入功能和類別的命名空間，以及一些用於標準化的參數。

```as3
{
  "name": "user/name_project",
  "description": "",
  "license": "GPL-2.0",
  "keywords": [],
  "homepage": "https://exemple.com/",
  "type": "wordpress-plugin", // 如果是佈景主題你可以換成 wordpress-themes
  "authors": [
        {
            "name": "ericwu",
            "email": "smart032410@gmail.com"
        }
    ],
  "support": {
    "issues": "https://exemple.com/"
  },
  "config": {
    "platform": {
      "php": "8.1.1"
    }
  },
  "minimum-stability": "dev",
  "prefer-stable": true,
  "require": {},
  "autoload": {
    "psr-4": {
      "plugin-name\\": "includes/"
    }
  }
}
```

順帶一提，我們的資料夾路徑長這樣

```
Root project
	| ---- composer.json
	| ---- includes
		| ---- nameClass.php
```

### 2\. 重新生成自動載入檔案  

在終端機中執行指令 `composer dump-autoload -o`，透過這個指令來更新 Composer 的自動載入機制，以便正確載入新的類別檔案。這個指令會根據專案的 `composer.json` 檔案中的 PSR 設定，去重生一個新的 `vendor/autoload.php` 檔案，而這個檔案則是負責自動載入專案中的類別檔案。

### 3\. 引入 autoload.php

上個步驟提到，我們已經產生了一個新的 `vendor/autoload.php` ，所以現在我們需要做的就是在 function.php 或是在我們外掛的主文件中引入他

```php
require_once __DIR__ .'/vendor/autoload.php';
```

現在，Composer 為我們做了所有事情，如果它在我們的程式碼中看到類別的初始化，它就會自動去引入所有文件了！
