---
title: "在 TinyMCE 的 Link 增加 nofollow 設定"
description: "自己在寫 Laravel 的時候，有時候後台會選用 Laravel Nova ，來完成。使用 Laravel nova 的時候，總會有些情況下需要 rich text editor ，也就是所見即所得編輯器，我個人慣用的是 TinyMCE 。"
pubDate: 2021-08-03
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "工具介紹"
tags:
  - TinyMCE
  - Editor
  - Frontend
---


自己在寫 Laravel 的時候，有時候後台會選用 Laravel Nova ，來完成。使用 Laravel nova 的時候，總會有些情況下需要 rich text editor ，也就是所見即所得編輯器，我個人慣用的是 TinyMCE 。

<!--more-->

最近遇到一個需求是，因為行銷的需要在文章上面，建立超連結，但是超連結又像要設定 nofollow ，所以需要在 TinyMCE 上方 toolbar 的 link ，可以增加一個 nofollow 的選項。

首先，先來看看什麼是 nofollow ？以下是維基百科的定義：

> nofollow 是 HTML 中的一個屬性，用於告訴搜尋引擎不要追蹤特定的網頁連結。可以用於阻止在 PR 值高的網站上以留言等方式添加連結從而提高自身網站排名的行為，以改善搜索結果的質量，防止垃圾連結的蔓延。網站站長也可對其網頁中的付費連結使用 nofollow 來防止該連結降低搜索排名。對一些重要度低的網頁內容使用 nofollow ，還可以使搜尋引擎以不同的優先級別來抓取網頁內容。

接著，看了以下 TinyMCE 的文件，找不到打開 nofollow 的選項，所以我們只能自己設定。

我們可以在 TinyMCE 的 `options` 新增以下：

```php
'rel_list'=> [
    [
        'title' => 'follow',
        'value' => 'follow'
    ],
    [
        'title' => 'nofollow',
        'value' => 'nofollow'
    ]
]
```

如此一來就會多了 nofollow 的選項了！
