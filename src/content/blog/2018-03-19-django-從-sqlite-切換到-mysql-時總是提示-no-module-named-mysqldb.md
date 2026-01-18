---
title: "Django 從 SQLite 切換到 MySQL 時總是提示 No module named 'MySQLdb'"
description: "初次使用 Django ，預設的資料庫是 SQLite ，想切換使用 MySQL，配置了資料庫之後，runserver 總是會出錯"
pubDate: 2018-03-19
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "Django"
tags:
  - Django
  - Python
  - MySQL
  - Database
---


初次使用 Django ，預設的資料庫是 `SQLite` ，想切換使用 `MySQL`，配置了資料庫之後，runserver 總是會出錯

```
'Did you install mysqlclient or MySQL-python?' % e
django.core.exceptions.ImproperlyConfigured: Error loading MySQLdb module: No module named 'MySQLdb'.
Did you install mysqlclient or MySQL-python?
```

後來查資料，看來是 python3 之後，原本的 python2 的 mysqldb 已經不能連接 mysql 了，要改成使用pymysql，來連接 mysql 。

於是我嘗試使用 pip 安裝了 PyMySQL，還是報錯，所以我再查了一下，原來還要在網站設定的 `__init__.py` 文件中再添加

```
import pymysql
pymysql.install_as_MySQLdb()
```

這樣就可以正常連接 `MySQL` 了，供大家參考
