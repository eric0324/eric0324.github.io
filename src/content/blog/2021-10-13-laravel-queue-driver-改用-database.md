---
title: "Laravel Queue Driver 改用 Database"
description: "Laravel 的隊列 (Queue) 提供了可以跨各種不同隊列驅動的統一 API，例如 File、Database 、Amazon SQS 或是 Redis 。"
pubDate: 2021-10-13
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "Laravel"
tags:
  - Laravel
  - PHP
  - Queue
  - Backend
---


Laravel 的隊列 (Queue) 提供了可以跨各種不同隊列驅動的統一 API，例如 File、Database 、Amazon SQS 或是 Redis 。

我們可以通過 queue，去執行一些耗時的 Job，延遲這些耗時的 job ，可以有效的去提升網頁請求速度，提升瀏覽體驗。

<!--more-->

queue 的設定文件放在 `config/queue.php` 中。 我們可以看到 Laravel 有支援的 Driver 很多，預設的是使用 `sync，這次主要是來介紹怎麼改用 database` 來執行 queue。

首先，我們需要將 `.env` 檔案的 `QUEUE_CONNECTION` 設定改為 `database` 。

接著我們要輸入以下指令來生成 jobs table 的 Migration 檔案：

```shell
php artisan queue:table
```

最後，輸入以下指令，來 migrate 檔案：

```shell
php artisan migrate
```

之後，我們只要有安排 job 給 queue ，都會存入 jobs table 去排隊。這時候可能會問，那我們要怎麼推送和處理這些 job 呢？

我們可以輸入以下指令去監聽：

```shell
php artisan queue:listen
```

但是，我們如果需要在背景下執行怎麼辦？這時候我們可以使用 `supervisor`

首先，我們需要安裝 supervisor

```shell
sudo apt-get install supervisor
```

編輯 supervisor 的設定檔案

```shell
sudo vi /etc/supervisor/supervisord.conf
```

在最底下加入（記得把 MY\_PROJECT 換成你的專案資料夾）：

```shell
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command= php /var/www/MY_PROJECT/artisan queue:work database --sleep=3 --tries=3
autostart=true
autorestart=true
user=root
numprocs=1
redirect_stderr=true
stdout_logfile=/var/www/MY_PROJECT/storage/logs/worker.log
```

接著重新啟動 suprevisor ，就會註冊這個程式到背景囉

```shell
sudo supervisorctl reread && sudo supervisorctl update
```
