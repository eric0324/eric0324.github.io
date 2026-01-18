---
title: "Nginx 和 Apache 如何域名配置 301 redirect www 到 non-www"
description: "以搜尋引擎來看網址，有 www 和沒有 www 的網址是不同的兩個的網址。因此，當它們同時都指向同一個網站時，儘管是可以的，但是這會讓搜尋引擎不知應該選擇哪一個 URL 作為主要的網址，所以會影響 SEO ，因為常常忘記要怎麼設定，所以這邊紀錄一下。"
pubDate: 2020-06-08
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


以搜尋引擎來看網址，有 www 和沒有 www 的網址是不同的兩個的網址。因此，當它們同時都指向同一個網站時，儘管是可以的，但是這會讓搜尋引擎不知應該選擇哪一個 URL 作為主要的網址，所以會影響 SEO ，因為常常忘記要怎麼設定，所以這邊紀錄一下。

<!--more-->

## Nginx

### 301 www 重定向 non-www

先在 DNS 設置好域名的 A 紀錄及 CNAME，至於怎麼設定不在這篇文章的範圍內，我這邊就先不多說了。假設，我要定義域名原本是 www.example.com 重定向為example.com 網址，然後原本在 nginx/sites-available/example.conf 文件配置應該會是如下：

```shell
server {
    listen 80;
    server_name example.com;
    root /var/www/example.com;
}
```

我們只需要在配置文件的最下面添加以下配置，

```shell
server {
    listen 80;
    server_name www.example.com;
    return 301 $scheme://example.com$request_uri;
}
```

或者是也可以這樣寫：

```
server {
    listen 80;
    server_name www.example.com example.com;
    if ($host != 'example.com' ) {
        rewrite ^/(.*)$ http://example.com/$1 permanent;
    }
    .....
}
```

最後，記得重新啟動 Nginx ，輸入：

```shell
nginx -t && service nginx restart
```

### 301 non-www 重定向 www

一樣都是在 nginx/sites-available/example.conf 文件配置下作修改，原先應該會是如下：

```shell
server {
    listen 80;
    server_name www.example.com;
    root /var/www/example.com;
}
```

我們只需要在配置文件的最下面添加以下配置，

```shell
server {
    listen 80;
    server_name example.com;
    return 301 $scheme://www.example.com$request_uri;
}
```

或者是也可以這樣寫：

```
server {
    listen 80;
    server_name www.example.com example.com;
    if ($host != 'www.example.com' ) {
        rewrite ^/(.*)$ http://www.example.com/$1 permanent;
    }
    .....
}
```

最後，也不要忘記重新啟動 Nginx 了！

## Apache

### 301 www 重定向 non-www

可以通過修改網站的 .htaccess 來達成這個目的，

```shell
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www.yourdomain.com [NC]
RewriteRule ^(.*)$ http://yourdomain.com/$1 [L,R=301]
```

### 301 non-www 重定向 www

也是可以直接通過修改網站的 .htaccess 文件達成目的，

```shell
RewriteEngine On
RewriteCond %{HTTP_HOST} ^yourdomain.com [NC]
RewriteRule ^(.*)$ http://www.yourdomain.com/$1 [L,R=301]
```
