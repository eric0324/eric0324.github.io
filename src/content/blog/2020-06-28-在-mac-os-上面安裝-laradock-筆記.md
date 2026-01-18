---
title: "在 Mac OS 上面安裝 Laradock 筆記"
description: "之前在虛擬機上面開發 Laravel ，但是虛擬機得去要完整模擬一台主機，所以整個映像檔非常大，也因為這樣很多人都開始轉用 Docker。"
pubDate: 2020-06-28
heroImage: "https://i.imgur.com/docker-app-drag.png"
category: "DevOps"
tags:
  - Docker
  - DevOps
  - Container
---


之前在虛擬機上面開發 Laravel ，但是虛擬機得去要完整模擬一台主機，所以整個映像檔非常大，也因為這樣很多人都開始轉用 Docker。

在這篇文章中，我會紀錄如何使用 Docker 這項技術來建置 PHP/Laravel 的開發環境，未來要開發 Laravel 的時候，只要把 Laradock 運行起來就可以了。

<!--more-->

# 安裝 Docker

Mac 的開發者很輕鬆，可以直接使用 [Docker Desktop](https://docs.docker.com/docker-for-mac/install/) 來使用 docker。下載並且安裝完成後，打開就可以直接使用。

![](https://i.imgur.com/docker-app-drag.png)

![](https://i.imgur.com/docker-tutorial-mac.png)

# 安裝 Laradock

我們第一步，要先取得 Laradock 專案。我把 Laradock 專案放在家目錄底下，所以指令如下

```shell
cd ~/
git clone https://github.com/laradock/laradock.git Laradock
```

接著，我們要來設定 Laradock ，Laradock 很貼心的提供我們環境設定檔，讓我們可以依需求客製化調整。因此我們只需要先將設定檔從範例樣板複製出來：

```shell
cp .env-example .env
```

# 設定專案目錄

我們不會只有一個開發專案，所以我會在自己的家目錄底下開個資料夾去專們放專案 （例如：**`/home/eric/Projects`**）。為了讓 Laradock 知道專案目錄在哪裡？所以我們必須去打開 **`~/Laradock/.env`** 檔案，設定  **`APPLICATION`** 參數內為 **`~/Projects`**，存檔。

```shell
APPLICATION=~/Projects/
```

# 啟動 Laradock

因為我們運行一個最基本的 Laravel 專案，目前只需要 **nginx** 及 **mysql** 即可，所以我後面多了兩個參數，這樣就可以將最基本的 Laradock 提供的容器啟動囉！

```shell
docker-compose up -d nginx mysql
```

## 進入 workspace 容器

Laradock 已經幫我們把開發環境和工具都封裝在容器裡，也就是說本機不需要再去安裝什麼 PHP、Composer 之類的指令也可以快快樂樂的開發使用，也就是說我們只要下指令進入容器內就好

```shell
docker-compose exec workspace bash
```

登入後應該會發現工作目錄是在 **`/var/www`** 底下，而裡面的內容會和我們剛剛設定的 ****`/home/eric/Projects`**** 的內容同步。

也就是說我們可以在 **`/home/eric/Projects`** 底下放 Laravel 專案，你可以建立一個新的

```shell
composer create-project laravel/laravel --prefer-dist
```

或是，把你的舊專案移動到**`/home/eric/Projects`** 底下。

## 設定 Nginx sites

接著我們要來為 Nginx 設定成一個 Nginx site。Laradock 已經提供 Nginx 的 site example，我們直接複製一份即可：

```shell
cd ~/Laradock/nginx/sites
cp laravel.conf.example laravel.test.conf
```

記得將裡頭的 **server\_name** 及 **root** 依照自己的環境做設定。

**server\_name** 設定的是 site 的網址，我們直接用 Laradock 預設的 **laravel.test**

**root** 則是設定專案的 Document Root，我們也延用 Laradock 預設的 **/var/www/laravel/public**。

## 設定 hosts

我們剛剛設定了 **laravel.test** 為 site 的網址，但是這是一個不存在的網址。所以我們必需在本機上設定一下 DNS ，讓瀏覽器輸入這個網址時，會直接導到本機容器。所以我們需要用 去（記得用 root 權限） 編輯 **`/etc/hosts`** 這個檔案，在裡面新增一行：

```shell
127.0.0.1 laravel.test
```

完成、存檔。接著把容器重啟：

```shell
docker-compose down
docker-compose run -d nginx mysql
```

試著打開瀏覽器，並且進入 **laravel.test** ，就可以看到 Laravel 的專案啟動畫面囉

開始撰寫的你 Larvael 應用吧！
