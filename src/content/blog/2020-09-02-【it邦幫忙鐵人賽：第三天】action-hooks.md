---
title: "【第 03 天】第一個 WordPress 外掛"
description: "接著，我們要開始來建立第一個 WordPress 外掛囉！"
pubDate: 2020-09-02
heroImage: "https://i.imgur.com/%E6%88%AA%E5%9C%96-2020-08-23-%E4%B8%8B%E5%8D%886.53.14.png"
---


接著，我們要開始來建立第一個 WordPress 外掛囉！

在這之前，我們先來快速地檢視看看，WordPress 怎麼去知道我們的一個外掛。就是 WordPress 會搜索 wp-content/plugins 目錄（及其子目錄，也就是插件自己的目錄），來查找帶有 WordPress 外掛 header comments 的PHP 文件。

## 建立第一個外掛

整個流程大概是這樣的，因此我們第一步就先到 WordPress 的 wp-content/plugins 路徑下創建一個全新的資料夾吧，資料夾命名為這個外掛的名稱，接著切換到這個資料夾中，創建一個 PHP 檔案（我個人習慣和資料夾同名稱，你也可以自己隨意命名）。

如果你是 CLI 介面下，就是依序輸入這些指令：

$ cd wp-content/plugins $ mkdir eric-plugin $ cd eric-plugin $ vim eric-plugin.php

打開剛剛建立好的的 PHP 檔案之後，我們就可以開始開發 WordPress 外掛了喔！

## 定義外掛

首先，為了剛剛提到的要讓 WordPress 去查找外掛 header comments 的 PHP 文件，我們需要為外掛添加一個昨天我們提到的 DocBlock，這是一個特殊格式的 PHP 註解，來定義外掛的基本資料。

```PHP
<?php
/*
Plugin Name: YOUR PLUGIN NAME
*/
```

這份註解呢，至少需要包含外掛名稱，也可以選擇性的包含以下幾個部分：

Plugin Name：外掛的名稱。 Plugin URI：外掛的網站。 Description：外掛的簡短描述。（不要超過 140 個字） Version：外掛的當前版本。 Author：外掛作者名字。 Author URI：外掛作者網站或其他網站上的個人資料。 License：外掛授權方式（例如GPL2）。 License URI：外掛授權方式的全文網址連結（例如 [https://www.gnu.org/licenses/gpl-2.0.html）。](https://www.gnu.org/licenses/gpl-2.0.html%EF%BC%89%E3%80%82) Text Domain：外掛的 Gettext 。 Domain Path：告訴 WordPress 在哪裡可以找到翻譯。 儲存檔案後，打開 WordPress 後台的外掛列表，就可以看到我們剛剛建立的外掛囉！

![](https://i.imgur.com/%E6%88%AA%E5%9C%96-2020-08-23-%E4%B8%8B%E5%8D%886.53.14.png)

## Hook

要寫 WordPress 外掛，最重要的就是 hook 了，接著我們要來介紹一下 hook！

還記得前一章說過的嗎？『Don’t touch WordPress core.』，也就是我們不應該去動到 WordPress 的核心程式碼，那這樣怎麼辦呢？正因此，WordPress 提供了許多好用的 hook，讓我們可以在各式各樣的時機和場合，去達成我們想要的目的！

WordPress 的程式中埋了許多 hook ，當程式執行到有放 hook 的地方時，WordPress 就會去找出所有對應到自己的 hook function ，然後去執行他們。至於 hook function ，我們會在裡會放有我們想實作的功能，可能是存取資料庫、修改網頁程式邏輯。所以也就是說，我們在 hook function 裡寫好我們所需的功能後，就可以利用「加入至對應 hook」的語法，把寫好的 hook function鈎到該 hook 上，使得該 hook 被執行到時，也會連帶執行我們想實作的功能。

在 WordPress 世界中 hook 又分為兩種，分別是「Action Hook」及「Filter Hook」。

至於要怎麼分這兩個 hook 呢？ 使用 action hook 的時候，就是 WordPress 核心做它該做的事，而你做你想做的事，各自做各自的事情。

而使用 filter hook 的時候，WordPress 核心會期望你拿它提供的參數，拿著這個參數去做完你想做的事後，回傳一個值給WordPress 核心，來接著完成它該做的事。

明天我們再來討論如何埋 actoin hook ，以及如何使用 action hook
