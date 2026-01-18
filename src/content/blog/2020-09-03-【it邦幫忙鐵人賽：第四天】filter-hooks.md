---
title: "【第 04 天】Filter Hooks"
description: "今天來介紹一下 Filter Hooks ，這是 WordPress 的另一種 hook，可以讓我們通過某個 Filter 鉤子上的呼叫函式來修改某些函式產生的數據。"
pubDate: 2020-09-03
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


今天來介紹一下 Filter Hooks ，這是 WordPress 的另一種 hook，可以讓我們通過某個 Filter 鉤子上的呼叫函式來修改某些函式產生的數據。

接著我們要來試看看 filter hook ！

我們可以通過兩個步驟新增一個函數到某個 filter  上面。

1. 創建一個自己定義的回呼函式(Callback function)
2. 使用 [add\_filter()](https://developer.wordpress.org/reference/functions/add_filter/) 函式，把這個函式增加到對應的 filter上面

[add\_filter()](https://developer.wordpress.org/reference/functions/add_filter/) 也一樣至少需要兩個參數，第一個是 hook 名稱（也就是你要去觸發哪個 hook ）和回呼函式（就是剛剛你創建的那個回呼函式）

接著做個示範，假設我們今天有一篇標題為『我愛 WordPres』的文章，透過下面的示範，會在顯示標題時把標題修改為新的標題 『文章：我愛 WordPress』

 

```
<?php
function eric_filter_title($title) {
    return '文章：' . $title;
}
add_filter('the_title', 'eric_filter_title');
```

add\_filter() 和 add\_action() 相同，也可以接受兩個額外的參數，分別是優先級，和 定義傳遞給回呼函式的參數數量。

以下是個範例，今天要在 <body> 滿足特定條件時，向標籤添加 CSS 類別：

```
<?php
function eric_css_body_class($classes) {
        $classes[] = 'eric-is-awesome';
    return $classes;
}
add_filter('body_class', 'eric_css_body_class');
```

明天再來介紹怎麼在自已的外掛字定義 hook 吧！
