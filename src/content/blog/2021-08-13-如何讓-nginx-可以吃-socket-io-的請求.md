---
title: "如何讓 NGINX 可以吃 Socket.io 的請求"
description: "一直以來，我的網站服務都用 NGINX 作為反向代理 (Reverse proxy) 伺服器。最近剛好有個專案要使用到 Socket.io ，問題來了，因為 Socket.io 要走 3000 port ，然後我前端有 CloudFlare。這會有什麼問題呢？"
pubDate: 2021-08-13
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


一直以來，我的網站服務都用 NGINX 作為反向代理 (Reverse proxy) 伺服器。最近剛好有個專案要使用到 Socket.io ，問題來了，因為 Socket.io 要走 3000 port ，然後我前端有 CloudFlare。這會有什麼問題呢？

<!--more-->

因為 Cloudflare 支持的 HTTPS port 僅有

- 443
- 2053
- 2083
- 2087
- 2096
- 8443

問題來了，他不支援 3000 ，所以我們得想辦法把它轉成可以用的 port ，那首選就是 443 ！這也意味著，我們得用 NGINX 去反向代理。

於是，上官方查[文件](https://socket.io/docs/v3/reverse-proxy/)，結果文件只有很簡短地告訴我們：

```
http {
  server {
    listen 80;
    server_name example.com;

    location / {
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header Host $host;

      proxy_pass http://localhost:3000;

      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection "upgrade";
    }
  }
}
```

這樣只要 socket.io 打到 ericwu.asia/ 的時候，就會被轉到 3000 port 這個應用。

不過我 ericwu.asia/ 是我網站的根目錄，所以我想要將請求 ericwu.asia/socket.io 才打到 3000 port 這個應用

所以，我 location / 就設定成 location /socket.io 。

然後我想說，改了路徑，我在程式碼的 socket.io 請求路徑也要修正，所以改成

```js
socket = io("https://erciwu.asia/socket.io")
```

這時候，打開網頁，就直接爆錯：Invalid namespace

原來是因為我沒有配置 path 參數，導致 NGINX 收到的連接，都是以預設值 `/socket.io` 開頭。所以我們可以直接呼叫 socket = io("https://erciwu.asia") 即可。
