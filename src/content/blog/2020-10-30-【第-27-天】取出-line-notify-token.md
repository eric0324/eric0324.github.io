---
title: "【第 27 天】取出 LINE Notify token"
description: "現在 要給 LINE 的 token 也存好了，想要發送 notify 的地方大概也都有想法了，再來我們要試著取出 token 來做使用。"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


現在 要給 LINE 的 `token` 也存好了，想要發送 notify 的地方大概也都有想法了，再來我們要試著取出 `token` 來做使用。

<!--more-->

在前面，我們如果把 `token` 用成 options 的方式去儲存的話。我們可以複習一下 [【第 10 天】如何修改 WordPress 的後台設置選項](https://ithelp.ithome.com.tw/articles/10235331) 裡面我們聊到，我們如何用 [get\_option()](https://developer.wordpress.org/reference/functions/get_option/) 函式來取得值。

所以說，我們要取得 token ，可以直接

```
get_option('token');

```

為了讓 PHP 代碼可以更簡潔，我們試著改寫成 `__construct` ：

```
public function __construct()
{
    $this->options = get_option('notify-for-line');
}

```

這樣我們可以用 `$this->options` 去取得屬性。換言之，要取用 token 會變成：

```
$this->options['token']

```

在這之前，我們還會檢查一下，是真的有 token 可以使用，我們還會多一個 if 邏輯去判斷，如下：

```
if (isset($this->options['token']) && $this->options['token'] !== '') {
    // do someting(e.g. get token)
}

```

兩個條件：

1. token 不為 null
2. token 不為空字串

再來，我們需要將取得的 token 組成一個字串：

```
"Authorization: Bearer {$this->options['token']}"

```

Bearer 是一種 token 方法，有興趣的話可以參考 OAuth 2.0 ([RFC 6749](http://tools.ietf.org/html/rfc6749)) 裡頭清楚的定義了 client 如何去取得 access token 的方法，我這邊就不贅述了。

太好了，我們取得到之前存好的 token 了，接著我們明天要來送出通知了！
