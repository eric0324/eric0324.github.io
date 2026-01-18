---
title: "如何在 LaraDock 上使用 1+n 個 PHP 版本和專案"
description: "最近很多專案都使用了 PHP 8 以上的版本，但還是有些例外，需要處理些版本比較舊的 PHP 專案，因此需要讓我的本地開發環境需要有 PHP 7.1.x、7.2.x 和 7.4.x 這些版本"
pubDate: 2022-01-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


最近很多專案都使用了 PHP 8 以上的版本，但還是有些例外，需要處理些版本比較舊的 PHP 專案，因此需要讓我的本地開發環境需要有 PHP 7.1.x、7.2.x 和 7.4.x 這些版本

我的本地 PHP 開發環境是使用 Laradock。 不過有一個麻煩的地方是，它不支持多個 PHP 版本。

<!--more-->

## 修改 docker-compose.yml

首先我們需要先設定可以跑不同版本 php-fpm 服務。

預設下，我們會有一個 php-fpm 服務，版本是由 `.env` 文件中的 `PHP_VERSION` 去控制。

這是你的「主」 php-fpm 服務，應該運行最新的 PHP 版本。 在撰寫本文時，最新版本是 8.2，因此 PHP\_VERSION=8.2

接著我們要去新增我們要的 PHP 版本，所以要創建我們的「子」php-fpm 容器。 如前所述，我需要 PHP 7.1.x、7.2.x 和 7.4.x。

我們可以在 `docker-compose.yml` 中，複製 php-fpm 環境變數，並貼在他下面後，進行以下調整：

```powershell
### Key differences for PHP-FPM 7.2
php-fpm-7.2:
  args:
    - LARADOCK_PHP_VERSION=7.2
  volumes:
    - ./php- fpm/php7.2.ini:/usr/local/etc/php/php.ini
```

### 編譯和執行

```powershell
$ docker-compose up -d --build workspace nginx
```

如果你是第一次編譯，會需要一些時間

再來，我們先確認可以看到所有想要使用的 php-fpm 服務有被正確啟用。

```powershell
$ docker ps --filter "name=php" --format "{{.Names}}"
laradock_php-fpm_1
laradock_php-fpm-7.2_1
laradock_php-fpm-7.1_1
```

## 設定 NGINX sites

我們唯一需要更改的是 `fastcgi_pass` 設定，其他一切都是造著你原本的設定。

```powershell
# For .env PHP_VERSION
fastcgi_pass php-upstream;
# For PHP 7.2
fastcgi_pass php-fpm-7.2:9000;
# For PHP 7.1
fastcgi_pass php-fpm-7.1:9000;
```

為了進行快速測試，讓我們在 `/etc/hosts` 中創建 3 個 localhost

```powershell
127.0.0.1 php74.local
127.0.0.1 php72.local
127.0.0.1 php71.local
```

接著到 `./laradock/nginx/sites/` 建立 NGINX host files ，並且設定對應的 `fastcgi_pass` 

**php74.local**

```powershell
server_name php74.local;
root /var/www/php74.local/public;
fastcgi_pass php-upstream;
```

**php72.local**

```powershell
server_name php72.local;
root /var/www/php72.local/public;
fastcgi_pass php-fpm-7.2:9000;
```

**php71.local**

```powershell
server_name php71.local;
root /var/www/php71.local/public;
fastcgi_pass php-fpm-7.1:9000;
```

接著我們在所有主機文件的根目錄中創建 `index.php`，撰寫一行程式 `<?php phpinfo();` 來做個簡單的測試。

### 重新啟動 NGINX 容器

```powershell
$ docker-compose restart nginx
```

此時，你進去對應的網址，應該就會看到對應的 PHP 版本了。測試後沒問題得話，您應該也可以有 1+n 個版本的 PHP 了，以後只要把專案的 NGINX host files 指向對應的 php-fpm ，並且重新啟動 NGINX 容器即可。

最後，還是建議大家盡快把 PHP 升級到 8 以上，7.4 已經在 2022年11月28日結束支援囉！

參考文章：[1+n PHP versions and projects via LaraDock](https://msirius.medium.com/1-n-php-versions-and-projects-via-laradock-51938b337071)
