---
title: "【第 26 天】我們會用到哪些 WordPress Hooks？"
description: "今天我們來研究看看，WordPress 核心提供了哪些 hooks 可以拿來用？以及有些時候，我們想對其他外掛做點事情，該怎麼做？"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


今天我們來研究看看，WordPress 核心提供了哪些 hooks 可以拿來用？以及有些時候，我們想對其他外掛做點事情，該怎麼做？

## WordPress 核心提供的 hook

WordPress 提供了我們兩個清單，分別是 filter hooks 和 action hooks 了！接著，我們還是找到woocommerce\_checkout\_update\_order\_metas ：

[Filter Reference](https://codex.wordpress.org/Plugin_API/Filter_Reference)  
[Action Reference](https://codex.wordpress.org/Plugin_API/Action_Reference)

我們可以很輕易快速的直接來這兩個清單找到我們可以使用的 hook 。舉例來說，我希望每次發文的時候送出 notify 通知，那我可能可以找到一個 action hook 叫做 `save_post()`。

他的下面會附上一段簡介，簡介如下：

```
Runs whenever a post or page is created or updated, which could be from an import, post/page edit form, xmlrpc, or post by email. Action function arguments: post ID and post object. Runs after the data is saved to the database. Note that post ID may reference a post revision and not the last saved post. Use wp_is_post_revision() to get the ID of the real post.
```

簡單來說就是，每當創建或更新文章或頁面的時候會運行。太好了，這就是我想找的 hook 。那我們就可以在這個 hook 上面掛上我們的 callback function 。

## 其他外掛提供的 hook

當然了，有的外掛也會提供 hook 給我們使用，所以我們也可以透過這種方式去插入我們自定義的 callback function 。沒錯！WordPress 的世界就是這麼方便。

舉例來說，我今天想要在 woocommerce 上面做訂單通知。我們可以試著上去外掛的官網上面找文件，於是我們找到了這份文件：[Action and Filter Hook Reference](https://woocommerce.github.io/code-reference/hooks/hooks.html)，翻一翻可以找到 woocommerce\_checkout\_update\_order\_meta()，不過打開文件後，確實有點難理解要怎麼用它。

所以我這邊想分享一個網站： [hookr.io](http://hookr.io/)。

進去後，我們可以直接打開[外掛列表頁](http://hookr.io/plugins/#index=a)，這裡記錄了許許多多在 WordPress 上面提供的外掛，假設我們點了 [Woocommerce](http://hookr.io/plugins/woocommerce/#index=a)，裡面就會有這個外掛所提供的所有filter hooks 和 action hooks 了！接著，我們找到 [woocommerce\_checkout\_update\_order\_meta()](http://hookr.io/plugins/woocommerce/3.0.6/actions/woocommerce_checkout_update_order_meta/)。他就會告訴我們 description、他會用到哪些 parameters ，以及他的使用方法。整個很方便好用！

明天我們就要來把這個 hook 放上我們自己定義的 callback function 囉！

<!--more-->
