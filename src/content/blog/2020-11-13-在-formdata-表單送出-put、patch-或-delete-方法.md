---
title: "在 formData 表單送出 PUT、PATCH 或 DELETE 方法"
description: "HTML 表單再送請求的時候，是沒有支援 PUT、PATCH 或 DELETE 這三種 method 的。所以在定義由 HTML 表單所呼叫的 PUT、PATCH 或 DELETE 路由時，會需要在表單中增加一個隱藏的欄位： _method"
pubDate: 2020-11-13
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "Web 開發"
tags:
  - FormData
  - HTTP
  - API
  - Frontend
---


HTML 表單再送請求的時候，是沒有支援 `PUT`、`PATCH` 或 `DELETE` 這三種 method 的。所以在定義由 HTML 表單所呼叫的 `PUT`、`PATCH` 或 `DELETE` 路由時，會需要在表單中增加一個隱藏的欄位： `_method` 

<!--more-->

## 表單欺騙方法

假設我今天想要使用 PUT 這個 method ，最簡單的方法就是在 request url 後面加上 ?\_method=PUT

如果在 axios 或是 fetch 等 ajax 方法中的話，我們可以：

```
const formData = new FormData()
formData.append('_method', 'PUT') // fake to put
formData.append('file', file.blob, file.name)
axios.post(url, formData)
```

身為一個 Laravel 使用者，也要附上 Laravel 的用法：

隨著 `_method` 欄位送出的值將被視為 HTTP 請求方法使用：

```
<form action="/foo/bar" method="POST">
    <input type="hidden" name="_method" value="PUT">
    <input type="hidden" name="_token" value="{{ csrf_token() }}">
</form>
```

也可以用 `method_field` 輔助函式來產生 `_method` 輸入欄位：

```
{{ method_field('PUT') }}
```
