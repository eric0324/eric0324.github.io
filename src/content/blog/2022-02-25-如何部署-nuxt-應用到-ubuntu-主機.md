---
title: "如何部署 Nuxt 應用到 Ubuntu 主機"
description: "這篇文章，會教學如何部署 Nuxt 應用到 Ubuntu 主機上面。"
pubDate: 2022-02-25
heroImage: "https://i.imgur.com/1*ZvXZokzww1RN1GvOe1Q8MQ.png"
---


這篇文章，會教學如何部署 Nuxt 應用到 Ubuntu 主機上面。

<!--more-->

怎麼開設主機，這邊就不多做介紹了，我這先假設你有一台乾淨的主機，準備要來架設 Nuxt 應用。

先更新一下，我們的 Ubuntu ：

```
sudo apt-get update
```

## 安裝 Nginx

我們現在必須告訴我們的伺服器說『今天有人訪問 my-domain.com，你要告訴他 Nuxt.js 應用程式在哪裡喔』，所以我們會需要去使用 Nginx 服務器來執行這個操作。

執行安裝 Nginx 的指令：

```
sudo apt-get install nginx
```

為我們的應用程式建立 Nginx 設定（記住：下面的 your-domain.com 都要更改成您要用的真實域名喔）

```
sudo vi /etc/nginx/sites-available/your-domain.com
```

在此文件中放入以下內容：

```
server {
    listen 80;
    listen [::]:80;
    index index.html;
    server_name your-domain.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

現在，默認 http 80 埠上面，到 your-domain.com 的所有傳入流量，都會重導向 localhost:3000

我們要將我們剛剛配置的新文件建立連結到『可用網站目錄』

```
sudo ln -sf /etc/nginx/sites-available/your-domain.com /etc/nginx/sites-enabled/your-domain.com
```

接著，我們可以檢查一下 Nginx 的文件都沒問題，如果看到 success ，就可以重啟 Nginx 應用。

```
sudo nginx -t
sudo systemctl restart nginx
```

## 部署 Nuxt

接著，我們會需要 NodeJS 和 npm 來處理我們的 Nuxt 應用程式

```
apt-get install nodejs npm
```

最後我們進去 Nginx 的網站應用程式路徑

```
cd /var/www
```

你可能已經有 Nuxt 應用程式，你可以透過很多方式放在這。如果沒有的話，可以在這直接建立：

```
npx create-nuxt-app my-app
```

他會有很多選項，你就按照你的需求去做選擇。

接著，我們進去我們的應用程式，然後在裡面安裝需要的套件。

```
npm install
```

將我們的 Nuxt 應用跑起來

```
npm run start
```

這樣去 your-domain.com ，應該就會看到你的 Nuxt 應用程式跑起來囉

<figure>

![](https://i.imgur.com/1*ZvXZokzww1RN1GvOe1Q8MQ.png)

<figcaption>

Demo Nuxt app homepage.

</figcaption>

</figure>

## 使用 PM2

我們總不能開了 npm start ，然後電腦一直開著不關，所以我們必須讓他在背景去跑，所以我們要使用 PM2 來完成這個目的。

透過 NPM 安裝 PM2

```
npm install pm2 -g
```

進入剛剛的 Nuxt 應用程式資料夾，用以下指令：

```
pm2 start npm -- start
```

![](https://i.imgur.com/1*SWoNZcuO69uL7JzvCODs4g.png)

你就可以看到 Nuxt 應用在背景跑囉！

我也在這篇文章：[PM2 基礎筆記](https://ericwu.asia/2022/02/25/pm2-%e5%9f%ba%e7%a4%8e%e7%ad%86%e8%a8%98/) 中，簡單的分享了如何使用 PM2 、查看 PM2 Log、應用程式的 Log、配置應用程式設定，有興趣的話可以看一下
