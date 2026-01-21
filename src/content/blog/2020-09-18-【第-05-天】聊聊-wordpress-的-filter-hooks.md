---
title: "【第 05 天】聊聊 WordPress 的 Filter Hooks"
description: "今天來介紹一下 Filter Hooks ，這是 WordPress 的另一種 hook，可以讓我們通過某個 Filter 鉤子上的呼叫函式來修改某些函式產生的數據。"
pubDate: 2020-09-18
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


今天來介紹一下 Filter Hooks ，這是 WordPress 的另一種 hook，可以讓我們通過某個 Filter 鉤子上的呼叫函式來修改某些函式產生的數據。

如同昨天，在使用 filter hook 之前，我們來看看怎麼埋的。

WordPress 同樣的，提供了一個好用的函式讓我們可以埋 filter hook ，叫做 [apply\_filters()](https://developer.wordpress.org/reference/functions/apply_filters/)。

```php
$c = apply_filters('do_something',$a, $b); // 埋下一個名叫 do_something 的 filter hook
```

這邊跟昨天的 action hook 有點不同，就是它會有回傳值。

接著，我們可以通過兩個步驟新增一個函數到剛剛埋的 filter hook 上面。

1. 創建一個自己定義的回呼函式(Callback function)
2. 使用 [add\_filter()](https://developer.wordpress.org/reference/functions/add_filter/) 函式，把這個函式增加到對應的 filter上面

add\_filter() 也一樣至少需要兩個參數，第一個是 hook 名稱（也就是你要去觸發哪個 hook ）和回呼函式（就是剛剛你創建的那個回呼函式）

下面示範一個在剛剛埋的 action hook （do\_something）上，插入我的自定義 love\_wp 回呼函式：

```php
<?php
function love_wp($love) {
    return $love;
}

add_filter('do_something', 'love_wp');
```

這裡可以看到和昨天的 action hook 有點不同，那就是， love\_wp 需要 return 。

最後Ｍadd\_filter() 和 add\_action() 相同，也可以接受兩個額外的參數，分別是優先級，和 定義傳遞給回呼函式的參數數量。
