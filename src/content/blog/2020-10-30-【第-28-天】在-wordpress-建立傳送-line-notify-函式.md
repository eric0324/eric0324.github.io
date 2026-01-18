---
title: "【第 28 天】在 WordPress 建立傳送 LINE Notify 函式"
description: "今天我們要來開始試著寫 LINE notify 這段。我們建立一個 private function 叫做 line_send_notify ，這個函式傳入了一參數叫做 $text："
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


今天我們要來開始試著寫 LINE notify 這段。我們建立一個 private function 叫做 `line_send_notify` ，這個函式傳入了一參數叫做 `$text`：

<!--more-->

這個函式一開始我們先建立 `$request_params` ，裡面有我們的 `header` 和 `body`。其中 `header` 包含了我們在 [【第 27 天】取出 LINE Notify token](https://ithelp.ithome.com.tw/articles/10244947) ，所拿到的 token ，作為 Authorization 的 value。以及在 `body` 放入 一個 key 為 `message` ，value 為剛剛函式傳入的 `$text` 。

```
$request_params = <span class="hljs-keyword">array</span>(
    <span class="hljs-string">"headers"</span> =&gt; <span class="hljs-string">"Authorization: Bearer {$this-&gt;options['token']}"</span>,
    <span class="hljs-string">"body"</span>    =&gt; <span class="hljs-keyword">array</span>(
        <span class="hljs-string">"message"</span> =&gt; <span class="hljs-string">"{$text}"</span>
    )
);

```

還記得我們在 [【第 15 天】WordPress 的 HTTP API](https://ithelp.ithome.com.tw/articles/10236958) ，了解了 WordPress 提供了許多好用的 HTTP API 讓我們可以對第三方發送 HTTP 請求，這時候就可以派出用場了

LINE 官方文件提到要推送 notify 的位址是 `https://notify-api.line.me/api/notify` ，並且是 `POST` 方法，然後要傳入剛剛建立好的 `header` 和 `body`：

```
$response = wp_remote_post(<span class="hljs-string">'https://notify-api.line.me/api/notify'</span>, $request_params);

```

這樣我們的訊息應該就可以正常送出去了，完整的程式碼如下：

```
<span class="hljs-keyword">private</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">line_send_notify</span><span class="hljs-params">($text)</span> </span>{
        $request_params = <span class="hljs-keyword">array</span>(
            <span class="hljs-string">"headers"</span> =&gt; <span class="hljs-string">"Authorization: Bearer {$this-&gt;options['token']}"</span>,
            <span class="hljs-string">"body"</span>    =&gt; <span class="hljs-keyword">array</span>(
                <span class="hljs-string">"message"</span> =&gt; <span class="hljs-string">"{$text}"</span>
            )
        );

        $response = wp_remote_post(<span class="hljs-string">'https://notify-api.line.me/api/notify'</span>, $request_params);
    }

```

順帶一提，如果想要確認一下我們 API 是否有打成功，我們還可以加入：

```
$response_code = wp_remote_retrieve_response_code($response);

```

然後用 if...else... 去判斷狀態碼：

```
if( $response_code == '200' ){
    // Do something...
} else {
    // Do something...
}
```
