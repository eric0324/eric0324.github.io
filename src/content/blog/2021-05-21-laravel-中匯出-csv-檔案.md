---
title: "Laravel 中匯出 csv 檔案"
description: "在開發後台的時候，需要匯出會員資料，網路上很多匯出 xml 的方式，相對於 csv 的比較少，所以紀錄一下"
pubDate: 2021-05-21
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "Laravel"
tags:
  - Laravel
  - PHP
  - CSV
  - Backend
---


在開發後台的時候，需要匯出會員資料，網路上很多匯出 xml 的方式，相對於 csv 的比較少，所以紀錄一下

<!--more-->

我們需要在一個 controller 上面，寫一個 function 去處理檔案，並且利用 [fputcsv](https://www.php.net/fputcsv) ，去將行格式化為 csv 並且寫入文件指針中

```php
$members = Member::all();

$filename = "email_list_" . time() .".csv";
$handle = fopen($filename, 'w+');
fputcsv($handle, array('name', 'email'));

foreach($members as $member) {
    fputcsv($handle, array($member->name, $member->email));
}

fclose($handle);

$headers = array(
    'Content-Type' => 'text/csv',
);

return response->download($filename, $filename, $headers);

```

最後，我們用 [response->download()](https://laravel.com/docs/8.x/responses#file-downloads) 這個方法去下載檔案，就可以抓到我們要的 csv 囉！
