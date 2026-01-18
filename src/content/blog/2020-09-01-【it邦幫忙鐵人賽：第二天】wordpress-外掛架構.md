---
title: "【第 02 天】什麼是 WordPress 外掛？為什麼開發自己的 WordPress 外掛？"
description: "在最開始，我們先來了解什麼是外掛？以及為什麼開發自己的 WordPress 外掛？"
pubDate: 2020-09-01
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


在最開始，我們先來了解什麼是外掛？以及為什麼開發自己的 WordPress 外掛？

## WordPress 外掛

在 WordPress 的世界中，我們會用外掛用來擴展 WordPress 的核心功能，所謂的外掛就是由許多 PHP 程式碼和其他相關資源組成（可能是圖片、JavaScript、CSS 這類的資源），而我們只需要遵循WordPress 開發規範，就可以把一些想法在 WordPress 上面輕鬆的實現！

這也讓我們可以更容易的站在 WordPress 基礎上，添加自己需要的附加功能。舉一個在 WordPress 的世界中，不得不知道、也是最簡單的外掛『Hello Dolly 』，這個外掛只包含了 DocBlock（晚點會提到這是什麼）、一些 PHP function，和一些 Hooks（晚點也會提到這是什麼），我們就可以在 WordPress 的控制台首頁顯示著名歌曲的歌詞！

## 改 WordPress Core 不就好了？

再來，大家會很好奇，為什麼開發自己的 WordPress 外掛？為什麼不直接去改網站的程式碼就好了呢？

在 WordPress 的世界中，有一個基本準則，那就是：『不要改變 WordPress 核心』（原文：Don’t touch WordPress core.），也就是說，我們不可以通過修改 WordPress 核心文件來達成某些功能，怎麼說呢？舉例說， WordPress 在更新的時候，會直接覆蓋掉所有 WordPress 核心文件，因此之前修改的東西都會因為覆蓋而消失。

所以說，我們要在 WordPress 網站上面添加任何功能都應該去使用 WordPress 所提供的 API，以外掛或是主題的方式去做添加。

也正是在這個基本準則下， 我們可以很輕鬆的為 WordPress 添加很多我們『額外』需要的功能。最酷的是，外掛開發者可以在外掛完成後，免費將這些外掛放到 WordPress.org，而 WordPress 網站主可以在後台很輕鬆的安裝和升級這些外掛，這使得 WordPress 生態圈提供了很大的便利性
