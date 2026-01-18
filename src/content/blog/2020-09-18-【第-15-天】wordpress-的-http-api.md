---
title: "【第 15 天】WordPress 的 HTTP API"
description: "HTTP 是一種用於分佈式、協作式和超媒體訊息系統的應用層協定，有興趣的可以參考維基百科對於 HTTP 的介紹，這裡就不贅述了"
pubDate: 2020-09-18
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


HTTP 是一種用於分佈式、協作式和超媒體訊息系統的應用層協定，有興趣的可以參考維基百科對於 [HTTP](https://zh.wikipedia.org/zh-tw/%E8%B6%85%E6%96%87%E6%9C%AC%E4%BC%A0%E8%BE%93%E5%8D%8F%E8%AE%AE) 的介紹，這裡就不贅述了

寫過 PHP 的朋友，應該知道有很多方法可以發送 HTTP 請求。而 WordPress 也提供了許多好用的 HTTP API 讓我們可以對第三方發送 HTTP 請求。

## 從 API 獲取數據

因為 GitHub 提供了一個很完整的 API ，所以我們就先從打 GitHub 的 API 開始做學習。我們先挑一隻不需要權限就能直接使用的 API 來打打看。

### GET Method

首先我們可以使用 [wp\_remote\_get()](https://developer.wordpress.org/reference/functions/wp_remote_get/) 函式來發送一個 GET 請求。

wp\_remote\_get()的參數如下：

1. $url – URL ，必須是使用標準的 HTTP URL 格式
2. $args – 選填，下面有 `$args` 參數的一些默認值，我們可以通過 `$args` 參數設置這些值。
3. method：HTTP 發送方法
4. timeout：等待時間
5. redirection：跳轉之前的等待時間
6. httpversion：HTTP 版本
7. blocking：頁面的其他部分是否需要等待此操作完成之前才能載入
8. headers：放 header 資訊，是的陣列
9. body：放 body 資訊，是的陣列
10. cookies：放 cookies 資訊，是的陣列

下面，讓我們打 GitHub 賬戶的 URL，看看可以得到什麼樣的信息。

```PHP
$response = wp_remote_get( 'https://api.github.com/users/eric0324' );
```

`$response` 將包含我們請求的資訊後回傳的，所有 headers 資訊、内容和 metadata。

#### 獲取 Body 信息

通常我們只需要使用回傳的 body，所以 WordPress 也提供我們一個很好用的函式 [wp\_remote\_retrieve\_body()](https://developer.wordpress.org/reference/functions/wp_remote_retrieve_body/)，我們可以使用 wp\_remote\_retrieve\_body() 來獲取這個信息。這個函數只需要一個參數，就是把剛剛的 `response` 丟進去就可以囉！

```PHP
$response = wp_remote_get( 'https://api.github.com/users/eric0324' );
$body = wp_remote_retrieve_body( $response );
```

這樣我們就可以得到 body

```
string(1246) "{"login":"eric0324","id":3984670,"node_id":"MDQ6VXNlcjM5ODQ2NzA=","avatar_url":"https://avatars0.githubusercontent.com/u/3984670?v=4","gravatar_id":"","url":"https://api.github.com/users/eric0324","html_url":"https://github.com/eric0324","followers_url":"https://api.github.com/users/eric0324/followers","following_url":"https://api.github.com/users/eric0324/following{/other_user}","gists_url":"https://api.github.com/users/eric0324/gists{/gist_id}","starred_url":"https://api.github.com/users/eric0324/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/eric0324/subscriptions","organizations_url":"https://api.github.com/users/eric0324/orgs","repos_url":"https://api.github.com/users/eric0324/repos","events_url":"https://api.github.com/users/eric0324/events{/privacy}","received_events_url":"https://api.github.com/users/eric0324/received_events","type":"User","site_admin":false,"name":"Eric Wu","company":"Sat. Knowledge","blog":"https://www.ericwu.asia/","location":"Taiwan","email":null,"hireable":true,"bio":"Web developer / Chatbot developer / ♥ PHP","twitter_username":null,"public_repos":32,"public_gists":2,"followers":22,"following":18,"created_at":"2013-03-27T12:06:21Z","updated_at":"2020-09-01T07:44:05Z"}"
```

#### 獲取回傳碼

為了確保我們的請求是成功的，我們有時候可能會想要檢查回傳碼，我們可以使用：[wp\_remote\_retrieve\_response\_code()](https://developer.wordpress.org/reference/functions/wp_remote_retrieve_response_code/) 來取得。

會回傳一個 int

```PHP
int(200)
```

#### 獲取特定的 Header 信息

有時候，我們需要拿到一個特定的 header ，我們可以使用 [wp\_remote\_retrieve\_header()](https://developer.wordpress.org/reference/functions/wp_remote_retrieve_header/) 函式來獲取，這個函式和上面幾個比較不一樣的是，他會需要兩個參數。

$response：來自請求的回應信息 $header：想要取得 header 哪個 key 的 value

舉個例子，例如我想拿到 header 中的 `最後修改時間`：

```PHP
$response = wp_remote_get( 'https://api.github.com/users/eric0324' );
$last_modified = wp_remote_retrieve_header( $response, 'last-modified' );
```

我們得到了

```
string(29) "Tue, 01 Sep 2020 07:44:05 GMT"
```

#### 使用 GET 進行基本身份驗證

有些 API 為了安全，會提供身份驗證的機制，這種情況非常的常見，所以我們也來看一下，怎麼把我們的授權資訊傳遞給 wp\_remote\_get() 函數，還記得剛剛說的第二個參數嗎？就是放進去即可，其他 HTTP 方法是也一樣的。

```PHP
$token = 'i_am_token'
$args = array(
   'headers' => array(
      'Authorization' => 'Bearer ' . $token
   )
);
wp_remote_get( $url, $args );
```

### POST Method

有些情況，我們會要送資料給第三方的 API ，我們就會用 POST Method 。WordPress 也提供了 [wp\_remote\_post()](https://developer.wordpress.org/reference/functions/wp_remote_post/) 函式讓我們輕鬆完成他。

該函式的參數和 wp\_remote\_get() 完全一樣。比較不一樣的是，我們可以把需要發送的所有資料放到第二個參數裡面。接著我們就來看看怎麼 POST 資料到第三方 API～

通常第三方 API POST 資料都需要憑證，所以我們只能先想像一下有隻 API 了。假設我們想像的這隻 API 讓我們可以提交一個表單，這表單包含 name, email, subject, comment 這幾個欄位。我們首先需要設置 POST 請求的 body ，建立一個名為 `body` 的陣列：

```PHP
$body = array(
   'name' => 'Eric',
   'email' => 'smart032410@gmail.com',
   'subject' => 'Hello World!',
   'comment' => 'Hello World!'
);
```

然後，把我們設置的 $body 陣列和其他可選的參數設置為 wp\_remote\_post() 的第二個參數。

```PHP
$args = array(
   'body' => $body,
   'timeout' => '5',
   'redirection' => '5',
   'httpversion' => '1.0',
   'blocking' => true,
   'headers' => array(),
   'cookies' => array()
);
```

然後發送 POST 請求：

```PHP
$response = wp_remote_post( 'http://ericwu.asia/hello', $args );
```

這樣就送出資料給表單囉！

### 其他 Method

大家可能會好奇，那如果今天用到其他 method 呢？別怕，WordPress 肯定也考慮到了這一點，所以提供了[wp\_remote\_request()](https://developer.wordpress.org/reference/functions/wp_remote_request/) 函式來幫助我們，這個函式的參數和 wp\_remote\_get() 一樣，差別在可以讓我們指定 HTTP 的方法。比如，我們需要發送一個 DELETE 方法的請求。

```PHP
$args = array(
   'method' => 'DELETE'
);
$response = wp_remote_request( 'https://ericwu.asia/hello/delete', $args);
```

## 快取

我們經常會把比較耗時、常用的資料保存起來，以便在以後的請求中快速取得。這樣可以避免服務器去浪費大量不必要的時間重新生成重複的資料。對於外部 API 的回應，我們也都可以做快取！因此有時候外部 API 太慢，會拖垮我們網站的速度，讓使用者體驗變差，所以我們也可以來做個快取。

### WordPress 的快取 API

WordPress 快取 API 為我們提供了一種方便的方式來存儲和使用快取。

#### 設置快取

我們使用 [set\_transient()](https://developer.wordpress.org/reference/functions/set_transient/) 函式來快取一個物件，該函數接受以下三個參數：

1. $transient – 快取的名稱
2. $value – 快取的值
3. $expiration – 快取的到期時間(單位是秒)

下面來試試看把我們剛剛從 Github API 中獲取的使用者資訊快取一個小時。

```PHP
$response = wp_remote_get( 'https://api.github.com/users/eric0324' );

set_transient( 'eric_github_userinfo', $response, 60*60 );
```

#### 取得快取

在取得快取之前，我們會需要先檢查快取是否已經過期？如果過期，我們需要從 API 拿到新的資訊，然後重新設置快取。所以通常都是 [set\_transient()](https://developer.wordpress.org/reference/functions/set_transient/) 和 [get\_transient()](https://developer.wordpress.org/reference/functions/get_transient/) 一起使用。繼續延續剛剛的例子：

```PHP
$github_userinfo = get_transient( 'eric_github_userinfo' );

if( !$github_userinfo ) {
   $response = wp_remote_get( 'https://api.github.com/users/eric' );
   set_transient( 'eric_github_userinfo', $response, 60*60 );
}
```

#### 刪除快取

刪除快取是最簡單的，只需要把快取的名稱傳給 [delete\_transient()](https://developer.wordpress.org/reference/functions/delete_transient/) 函式就可以了。繼續延續剛剛的例子：

```PHP
delete_transient( 'eric_github_userinfo' );
```
