---
title: "【第 25 天】在 WordPress 後台取得 LINE Notify token"
description: "這幾天實在太忙了，所以文章有點沒時間寫。但是鐵人賽都快結束了，不可以輕易放棄啊！！！"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


這幾天實在太忙了，所以文章有點沒時間寫。但是鐵人賽都快結束了，不可以輕易放棄啊！！！

在取得 LINE Notify token 之前，還記得我們在第 22 天的時候說過，使用者的瀏覽器在登入授權後，會透過 `redirect_uri` 所設定的網址發出 HTTP POST 要求嗎？所以我們要先來搞定取得 LINE 的 POST method 。

這部分要感謝也在參加鐵人賽的 [Eric 桓桓](https://ithelp.ithome.com.tw/users/20129585/ironman/3172) 為我點通訣竅。

WordPress 接受 post method 的方法非常簡單，我們只需要在外掛的目錄下建立 `get_post.php` 就可以處理 post method 了，大概是這樣。

```PHP
<?php 
    require_once('wp-load.php'); // add wordpress functionality
    $post = $_POST;

    if ( $something ) // security check
    // do something...
?>
```

接著透過 `yourdomain.com/plugin_name/get_posts.php` ，就可以發送 post 請求。這也意味著我們要去 LINE Notify 修改一下我們的 `redirect_uri` 到 `https://yourdomain.com/plugin_name/get_posts.php`。如此一來我們就可以取得一組 `token` ，所以接著我們需要把它存下來。

如此一來，我們就會有一組 token 清單在資料庫中，以後要發送 Notify 的時候，就找這個清單就可以囉！

至於實作的部分呢，小弟我還在被追殺中．．．．我假日會補啦QQ

<!--more-->
