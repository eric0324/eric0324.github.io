---
title: "MySQL 修改 root 用戶密碼"
description: "- 關閉 MySQL 服務。"
pubDate: 2017-11-09
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "資料庫"
tags:
  - SQL
  - MySQL
  - Database
---


- 關閉 MySQL 服務。

```
sudo /usr/local/mysql/support-files/mysql.server stop
```

- 安全模式啟動 MySQL

```
sudo /usr/local/mysql/bin/mysqld_safe --skip-grant-tables
```

- 修改 root 密碼

逐一輸入以下命令，修改 root 密碼並退出。

```
mysql -u rootUPDATE mysql.user SET
```

這裡要注意一下，5.7後的版本，mysql.user 表裡面的 password 改成了：authentication\_string

```
authentication_string=PASSWORD('my-new-password') WHERE User='root';FLUSH PRIVILEGES;
```

運行完以上命令後，root 的密碼就修改成你設置的密碼了。

- 測試  
    運行以下命令測試密碼是否修改成功。

```
mysql -u root -p
```

然後輸入你新設置的密碼。

如果輸入無誤，應該會出現 MySQL 命令行窗口，如下：

```
mysql>
```
