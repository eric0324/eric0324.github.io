---
title: "如何用 rendertron 處理前後端分離的 SEO 問題"
description: "最近在公司的產品終於從外包公司接回來，採用前後端分離架構。"
pubDate: 2020-06-17
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "Web 開發"
tags:
  - Rendertron
  - SEO
  - SSR
  - Frontend
---


最近在公司的產品終於從外包公司接回來，採用前後端分離架構。

傳統的架構就是讀取不同頁面就回傳一份不同的 HTML 檔案，意味著使用者的每個動作都要將整個畫面重繪，因為要一直重新 loading 整個頁面，體驗相對來說就變差了。

至於前後端分離也就是說讓前端全權負責把資料渲染在頁面上。舉個例子，今天有個用戶來開啟網頁，這樣讀取一個 web app 的過程就會經過以下步驟：

<!--more-->

1. 拿到 HTML 檔案
2. 載好 JavaScript
3. 運行 JavaScript
4. 呼叫後端 API
5. 根據後端 API 的回應結果，把資料渲染出來

這樣有什麼好處呢？在網頁頁面之間的切換就變快了，因為瀏覽器不需要重新渲染整個頁面，只需要一部分更新即可，這樣的話可以大大提升使用者的體驗，而且在一定程度上也減少了不少後端服務器的壓力，再來就是後端工程師只需要提供 API，職責上也切分的比較乾淨

看似一切美好，但是世界上總是沒有完美的事情！使用這種架構，伴隨的問題就是使用者第一次打開網頁，需要先下載 SPA 框架及 JavaScript，速度會很慢，再來因為 HTML 都是由 JavaScript 生成，所以 SEO 就變差了（因為 bot 可能不會去等待你 JavaScript 生成完），或者說是分享貼文到 facebook, Twitter 時，也會遇到無法被 bot 正確取得內容的問題，SMO 也會不好

因此很多人通常會都建議第一個頁面由 server side render，之後的操作才是由 client side render，用這種混合式架構，來確保 bot 也能爬到完整的 HTML

等等，所以你跟我說？我的程式碼都要打掉重練？

所以我找到了由 Google Chrome 團隊開發 Rendertron 專案，可以用他來解決 bot 爬蟲讀取前端網頁需要額外 render 或者需要透過 JavaScript 執行後才會產出的內容

簡單來說 Rendertron 是以獨立的 HTTP Server 方式去運作，並且是以 Headless Chrome 的方式，透過 auto-detecting 加載函式，從頁面的 onload 相關的事件來監控內容何時會載入完成，來 render 請求頁的內容

那就開始進入正題吧！

首先，我們需要使用 rendertron 的原始碼

```shell
git clone https://github.com/GoogleChrome/rendertron.git
```

進入 rendertron 的資料夾內

```shell
cd rendertron
```

安裝相依套件

```shell
npm install
```

這邊遇到一個小問題，他的 typescript 版本好像沒鎖住，所以會抓到最新的 typescript ，後面編譯過程會出問題，如果遇到這問題，可以直接抓 3.0.3 版本的

```shell
npm install typescript@3.0.3
```

你可以在 rendertron/ 目錄下新建文件 config.json,添加相關設定

```json
{
    "datastoreCache": false,
    "timeout": 10000,
    "port": "3000",
    "width": 1000,
    "height": 1000
}
```

每次修改配置後，都需要再次編譯。

編譯程式碼

```shell
npm run build
```

編譯成功後，可以測試運行一下：

```shell
npm run start
```

可看到輸出內容

Listening on port 3000

這樣我們就裝好了 rendertron

另外，在 啟動 的時候可能會出現少東西，類似下面的錯誤訊息

```
/home/user/ericwu/node_modules/puppeteer/.local-chromium/linux-555668/chrome-linux/chrome: error while loading shared libraries: libX11-xcb.so.1: cannot open shared object file: No such file or directory
```

就補安裝缺的東西，應該就能解決這問題

```
sudo apt install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

都沒問題得話，就停掉程式吧，接下來使用 npm下載 pm2 來管理 node 程式。

```shell
npm install pm2 -g
```

啟動 pm2

```shell
pm2 start build/rendertron.js
```

這個時候就部署的差不多了，如果需要測試一下是否部署成功，可以訪問

localhost:3000/render/\[網址，例如 https://ericwu.asia/\]

再來，我們要修改 nginx 配置，讓 nginx 根據爬蟲的 user agent 來進行重定向，我們先假設

rendertron 服務的地址為：http://ericwu.asia:3000/

門戶網站訪問的地址為：https://ericwu.asia/

那設定很簡單，

```
location / {
    try_files $uri @prerender;
}

location @prerender {
    set $prerender 0;

    if ($http_user_agent ~* "googlebot|yahoo|bingbot|baiduspider|yandex|yeti|yodaobot|gigabot|ia_archiver|facebookexternalhit|twitterbot|developers\.google\.com") {
        set $prerender 1;
    }

    if ($args ~ "_escaped_fragment_|prerender=1") {
        set $prerender 1;
    }

    if ($http_user_agent ~ "Prerender") {
        set $prerender 0;
    }

    if ($prerender = 1) {
        rewrite .* /render/$scheme://$host$request_uri? break;
        proxy_pass http://ericwu.asia:3000; #You can use our own hosted Rendertron
    }

    if ($prerender = 0) {
        rewrite .* /index.html break;
    }
}
```

修改完後，記得重新啟動 nginx，接著可以用 crul 模擬測試一下：

```shell
curl -I -A "googlebot" https://ericwu.asia
```

可看到輸出的信息中有：

```
Location: http://ericwu.asia:3000/render/https://ericwu.asia
```

如此一來，就完成囉！
