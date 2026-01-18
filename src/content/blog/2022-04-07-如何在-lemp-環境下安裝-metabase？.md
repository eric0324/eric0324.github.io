---
title: "如何在 LEMP 環境下安裝 Metabase？"
description: "Metabase 是一款 **免費開源** 的 BI (Business Intelligence) 工具，它可以幫助使用者將資料庫中的資料用視覺化的方式呈現。使用者只需要通過建立一個問題來分析數據，轉換成有意義的格式來洞悉資料。"
pubDate: 2022-04-07
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


Metabase 是一款 **免費開源** 的 BI (Business Intelligence) 工具，它可以幫助使用者將資料庫中的資料用視覺化的方式呈現。使用者只需要通過建立一個問題來分析數據，轉換成有意義的格式來洞悉資料。

<!--more-->

Metabase 支持連接到不同類型的數據源，包括 MySQL、PostgreSQL、MongoDB、Amazon Redshift、Google BigQuery 等雲數據庫服務，甚至你要連接到 Google Analytics 也可以。至於要怎麼連結，我後續的教學會撰寫。

在這篇文章中，我會一步一步帶大家在 Ubuntu 20.04 上安裝 Metabase，並使用 Nginx 進行 Web 訪問。

## 必須環境

你必須要有一台 Ubuntu 20.04 的環境，並且要有 root 權限。

你要有一個 SQL 資料庫，你可以是 MySQL 也可以是 PostgreSQL 。

## 步驟一、安裝 Java

我們先更新 apt 清單

```bash
$sudo apt update
```

要運行 Metabase 編譯出來的 jar 文件，我們必須需要在服務器上安裝 Java。 目前，Metabase 需要 Java 8 或更高版本，並且可以在 OpenJDK 或 Oracle JRE 上運行。

所以我們要來先安裝 Java

```bash
$sudo apt install openjdk-11-jdk openjdk-11-jre
```

安裝完成後，我們可以使用以下指令來檢查 java 的版本：

```bash
$java --version
```

應該會輸出類似以下的指令，那就是沒問題了！

```bash
openjdk 11.0.8 2020-07-14
OpenJDK Runtime Environment (build 11.0.8+10-post-Ubuntu-0ubuntu120.04)
OpenJDK 64-Bit Server VM (build 11.0.8+10-post-Ubuntu-0ubuntu120.04, mixed mode, sharing)
```

## 步驟二、Metabase 安裝前置作業

我們要下載安裝 metabase 的 jar 檔案，並將其放在我們選擇的安裝目錄中，例如：`/home/metabase`

```bash
$sudo mkdir /home/metabase
$cd /home/metabase
```

我在撰寫這篇文章的時候，最新版本是 0.42.3 ，你可以透過這個[連結](https://www.metabase.com/start/oss/jar)，知道目前最新的 Meatabae 版本是多少

```bash
$wget https://downloads.metabase.com/v0.42.3/metabase.jar
```

出於安全原因，我們希望 Metabase 不要用 root 身份去運行。 我們來創建一個用戶叫做 metabase，並且授權給他使用。

```bash
$sudo groupadd -r metabase
$sudo useradd -r -s /bin/false -g metabase metabase
$sudo chown -R metabase:metabase /home/metabase
$sudo touch /var/log/metabase.log
$sudo chown metabase:metabase /var/log/metabase.log
$sudo touch /etc/default/metabase
$sudo chmod 640 /etc/default/metabase
```

接著，我們需要在 systemd 中創建服務，以便之後可以控制 metabase 服務的啟動、停止。

```bash
$sudo vi /etc/systemd/system/metabase.service
```

貼上下面的內容，並且儲存：

```bash
[Unit]
Description=Metabase server
After=syslog.target
After=network.target

[Service]
WorkingDirectory=/home/metabase/
ExecStart=/usr/bin/java -jar /home/metabase/metabase.jar
EnvironmentFile=/etc/default/metabase
User=metabase
Type=simple
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=metabase
SuccessExitStatus=143
TimeoutStopSec=120
Restart=always

[Install]
WantedBy=multi-user.target
```

接下來，我們需要創建一個 Syslog 設定，來確保 systemd 可以正確處理紀錄。

```bash
$sudo vi /etc/rsyslog.d/metabase.conf
```

我們也是複製下面的內容貼上、儲存。

```bash
if $programname == 'metabase' then /var/log/metabase.log & stop
```

我們要重新讀取我們的新設定，所以要重啟服務。

```bash
$sudo systemctl restart rsyslog.service
```

### Metabase 設定檔案

我們要在 /etc/default/metabase 中設定環境變數

```bash
$sudo vi /etc/default/metabase
```

後面的 value ，不能跟我一樣喔，要看你當初資料庫怎麼設定的，記得改！

```bash
MB_DB_TYPE=mysql
MB_DB_DBNAME=metabase
MB_DB_PORT=3306
MB_DB_USER=metabase_user
MB_DB_PASS=Strong_Password
MB_DB_HOST=localhost
```

現在，我們可以使用以下命令來打開 Metabase 服務

```bash
$sudo systemctl daemon-reload
$sudo systemctl start metabase
```

要確認服務是否有正常運作，可以運行以下命令進行驗證

```bash
$sudo systemctl status metabase
```

確認一切正常後，我們可以設定讓他在服務器啟動時啟用啟動。

```bash
$sudo systemctl enable metabase
```

Metabase 服務已經在標準端口 3000 上運行，接著我們將來設定 Nginx 來做反向代理。

## 步驟三、設定 Nginx

使用以下指令創建一個新的 Nginx 設定文件

```bash
$sudo vi /etc/nginx/sites-available/metabase
```

然後將下面的內容複製到文件中並儲存。 不要忘記修改您的域名 example.com

```bash
server {
  listen 80;
  listen [::]:80;
  server_name example.com;
  location / {
    proxy_pass http://127.0.0.1:3000;
  }
}
```

接著，我們要將此配置連結到已啟用的 Nginx 設定。

```bash
$sudo ln -s /etc/nginx/sites-available/metabase /etc/nginx/sites-enabled/metabase
```

接下來，我們可以使用以下指令來測試 Nginx 設置是否無誤

```bash
$sudo nginx -t
```

你應該可以看到類似這樣的輸出，那就是沒問題了

```bash
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

然後重啟我們的 Nginx

```bash
$sudo systemctl restart nginx
```

## 步驟四、安裝 Metabase

在這一步中，我們將對 Metabase 進行安裝。 打開瀏覽器並輸入 http://example.com （剛剛你設定的域名）。應該就會進入安裝導覽精靈，一步一步跟著安裝，基本上就完成了！
