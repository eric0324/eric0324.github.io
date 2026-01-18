---
title: "SQL: ALTER TABLE 紀錄"
description: "假設現在我們已經建立好一個 customers 資料表：   | ——| —— | —— | —— |   | C_Id | Name | Address | Phone |   | ——| —— | —— | —— |"
pubDate: 2017-02-01
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


假設現在我們已經建立好一個 `customers` 資料表：  
| ——| —— | —— | —— |  
| C\_Id | Name | Address | Phone |  
| ——| —— | —— | —— |

接著，我們可以用這指令去:

- 增加欄位 (ADD COLUMN)

```
ALTER TABLE table_name ADD column_name datatype;
```

例如，如果我們想增加一個 `Discount` 欄位：

```
ALTER TABLE customers ADD Discount VARCHAR(10);
```

- 更改欄位資料型別 (ALTER COUMN TYPE)

```
ALTER TABLE table_name ALTER COLUMN column_name datatype;
```

例如，更改 `Discount` 欄位的資料型別：

```
ALTER TABLE customers ALTER COLUMN Discount DECIMAL(18, 2);
```

- 刪除欄位 (DROP COLUMN)

```
ALTER TABLE table_name DROP COLUMN column_name;
```

例如，刪除 `Discount` 欄位：

```
ALTER TABLE customers DROP COLUMN Discount;
```

- 參考資料：[Fooish 網頁技術教學](http://www.fooish.com/sql/alter-table.html)
