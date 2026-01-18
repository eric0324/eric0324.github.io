---
title: "在 Laravel 中建立動態 navbar"
description: "我們網站常常會在上方會有一個 navbar ，有時候會需要去抓取資料庫動態的資料來顯示。"
pubDate: 2021-05-17
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


我們網站常常會在上方會有一個 navbar ，有時候會需要去抓取資料庫動態的資料來顯示。

但是我們又不可能在每個 Controller 去寫這段程式，然後在放到 blade ，這樣真的太暴力，而且往後也不好維護。所以我們可以利用 `AppServiceProvider` 來達成這件事情

<!--more-->

我們可以直接在 `AppServiceProvider.php` 中，加入程式碼：

```php
<?php

namespace App\Providers;
use App\User;
use View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Schema;
class AppServiceProvider extends ServiceProvider
{
   
    public function register()
    {
        //
    }

    
    public function boot()
    {
        Schema::defaultStringLength(191);
        View::composer('*', function($view)
        {
            $users= User::all(); // 假設我們要抓取資料庫的 users 表
            $view->with('users', $users); // 使用全域的 view 輔助函式回傳 Blade 視圖
        });
    }
}
```

最後，我們就在我們 navbar 需要使用的地方，可以拿到 `$users` 為我們帶來的資料。

```html
  @foreach ($users as $user)
         <p>{{$user->name}} </p>
   @endforeach
```

這樣，我們就完成了有關如何在 Laravel 中創建動態 navbar 的方法囉！
