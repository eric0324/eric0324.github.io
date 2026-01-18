---
title: "【第 16 天】JavaScript、Ajax 和 jQuery 應用到 WordPress"
description: "不知不覺也玩了 WordPress 的各種 hook 和 function 半個月了，也差不多剩下幾個章節就要告一個段落了，接著就會開始實際開發一個外掛，並且記錄下來。"
pubDate: 2020-09-18
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


不知不覺也玩了 WordPress 的各種 hook 和 function 半個月了，也差不多剩下幾個章節就要告一個段落了，接著就會開始實際開發一個外掛，並且記錄下來。

那們我們今天就要來看看 JavaScript、Ajax 和 jQuery 如何應用到 WordPress 上面。至於 JavaScript、Ajax 和 jQuery 是什麼？不是我這次的重點，有興趣的朋友，可以自行去 Google 一下，會很多資料可以參考。

## PHP 後端和插入前端文件

我們目的是為了在伺服器端可以處理 Ajax 請求，我們來先想想邏輯。

我們需要在 PHP 中做兩個工作：

1. 把 jQuery 放到前端，並且轉換 PHP 變數成全局 JavaScript 變數再放入頁面。
2. 編寫處理 Ajax 請求的函式。

## 跟前端打交道

### 插入 JavaScript 腳本

我們需要以 `<meta>` 鏈接的形式顯示在頁面的 `<head>` 部分。

### 插入

在 WordPress 中，我們可以直接使用 [wp\_enqueue\_script()](https://developer.wordpress.org/reference/functions/wp_enqueue_script/) 函式在頁面的 `<head>` 中插入一個 meta js 連結，而不是在 `<head>` 中寫死這些連結。

然而 wp\_enqueue\_script() 函式可以接受 3 個參數

1. 其他函式中引用此 JavaScript 的名稱。
2. JavaScript 的 URL，我們可以使用 plugins\_url() 函式建立正確的 URL。
3. JavaScript 所依賴的其他 JavaScript 的名稱陣列。由於我們使用 jQuery 發送 Ajax 請求，因此，一定要在陣列中放上 `jquery`。

大概會是長這樣：

```
wp_enqueue_script( 'ajax-script',
   plugins_url( '/js/myjquery.js', __FILE__ ),
   array('jquery')
);
```

WordPress 載入後，我們必須從幾個 action hook 中把腳本插入頁面中，我們可以用下面幾個 hook 去插入。

1. 後台頁面，使用 admin\_enqueue\_scripts
2. 前台頁面，使用 wp\_enqueue\_scripts
3. 登入頁面，使用 login\_enqueue\_scripts

我們先拿 `admin_enqueue_scripts` hook 為例。我們會把當前頁面的文件名傳來遞給，我們可以使用這些資料在需要的頁面上插入我們的 JavaScript。範例如下：

```
add_action( 'admin_enqueue_scripts', 'my_enqueue' );
function my_enqueue( $hook ) {
   if( 'myplugin_settings.php' != $hook ) return;
   wp_enqueue_script( 'ajax-script',
      plugins_url( '/js/myjquery.js', __FILE__ ),
      array( 'jquery' )
   );
}
```

這樣我們就可以順利的插入我們自己設計的 JavaScript 了。

#### 驗證請求

順帶一提，為了可以驗證 jQuery Ajax 發送的請求是不是合法的，我們需要創建一個 nonce 隨機數。如此以來就只有我們的 PHP 和 jQuery 可以使用這個隨機數。收到請求後，我們可以驗證這個隨機數和我們創建的值是否一樣，確保請求是安全的！下面示範如何創建了一個隨機數：

```
$title_nonce = wp_create_nonce( 'title_example' );
```

參數 `title_example` 可以是任何字符串

#### 轉換 PHP 變數成為 JavaScript 全域變數

我們回想一下前面 jQuery 的部分，由 PHP 創建的供 jQuery 使用的資料被傳入名稱為 my\_ajax\_obj 的全局物件中。

在我們的例子中，這個數據是一個隨機數和 admin-ajax.php 的完整 URL。分配物件屬性和創建全局 JavaScript 物件的過程，我們會使用 wp\_localize\_script() 來處理：

```
wp_localize_script( 'ajax-script', 'my_ajax_obj', array(
   'ajax_url' => admin_url( 'admin-ajax.php' ),
   'nonce'    => $title_nonce, // It is common practice to comma after
) );
```

最後透過一個 hook 完成所有處理，代碼如下：

```
add_action( 'admin_enqueue_scripts', 'my_enqueue' );
function my_enqueue( $hook ) {
   if( 'myplugin_settings.php' != $hook ) return;
   wp_enqueue_script( 'ajax-script',
      plugins_url( '/js/myjquery.js', __FILE__ ),
      array( 'jquery' )
   );
   $title_nonce = wp_create_nonce( 'title_example' );
   wp_localize_script( 'ajax-script', 'my_ajax_obj', array(
      'ajax_url' => admin_url( 'admin-ajax.php' ),
      'nonce'    => $title_nonce,
   ) );
}
```

## 跟後端打交道

後端 PHP 代碼的另一個主要組成部分，是處理 Ajax 提交資料的程序。這個處理函式接收 POST 資料，執行某些操作，然後將處理的結果返回給瀏覽器。

函式掛載到哪個 hook 上決定了 Ajax 請求處理函式是否會要求用戶登錄，使用哪個程序處理 Ajax 請求取決於 jQuery 的 action 參數傳遞了什麼值。

因為我們的 Ajax 交互是在外掛的設置頁面使用的，所以必須要求用戶登錄才可以發送 Ajax 請求，範例如下。

```
add_action( 'wp_ajax_my_tag_count', 'my_ajax_handler' );
function my_ajax_handler() {
   // Handle the ajax request
   wp_die(); // All ajax handlers die when finished
}
```

我們的 Ajax 處理程序需要做的第一件事就是使用 check\_ajax\_referer() 函式去驗證 Ajax 請求發送的隨機數，就是我們上面創建的隨機數的值。

```
check_ajax_referer( 'title_example' );
```

上面函式的參數必須於前面 wp\_create\_nonce 的參數相同，如果 Nonce 不一致，該處理函式就會自動結束，如果這是一個真正的隨機數，這裡的驗證就通不過了。

### 資料

下一步，我們就需要處理 jQuery 發送過來的 $\_POST\[‘title’\] 數據了，我們可以使用 update\_user\_meta() 函式保存為用戶的元數據。

```
update_user_meta( get_current_user_id(), 'title_preference', $_POST['title']);
```

然後，我們創建一個查詢，取得標籤為所選標題的文章數。

```
$args = array(
   'tag' => $_POST['title'],
);
$the_query = new WP_Query( $args );
```

太棒了，我們終於可以將回應發回給 jQuery 腳本了，我們有幾種方法傳輸數據，我們先來看一下這幾種格式。

#### XML

WordPress 提供了 WP\_Ajax\_Response。WP\_Ajax\_Response 會生成一個 XML 格式的回應。

#### JSON

這種格式輕量且易用，WordPress 提供了 wp\_send\_json 函式來幫我們把數據轉換成 JSON ，發送給客戶端，然後結束。

## 總結

這裡是我們前面討論的所有程式碼總結，一個用於 jQuery ，一個用於 PHP 。

PHP 下面程式碼應該位於外掛的某個 PHP 文件中。

```
<?php add_action('admin_enqueue_scripts', 'my_enqueue');
function my_enqueue($hook) {
   if( 'myplugin_settings.php' != $hook) return;
   wp_enqueue_script( 'ajax-script',
      plugins_url( '/js/myjquery.js', __FILE__ ),
      array('jquery')
   );
   $title_nonce = wp_create_nonce('title_example');
   wp_localize_script('ajax-script', 'my_ajax_obj', array(
      'ajax_url' => admin_url( 'admin-ajax.php' ),
      'nonce'    => $title_nonce,
   ));
}

add_action('wp_ajax_my_tag_count', 'my_ajax_handler');
function my_ajax_handler() {
   check_ajax_referer('title_example');
   update_user_meta( get_current_user_id(), 'title_preference', $_POST['title']);
   $args = array(
      'tag' => $_POST['title'],
   );
   $the_query = new WP_Query( $args );
   echo $_POST['title'].' ('.$the_query->post_count.') ';
   wp_die(); // all ajax handlers should die when finished
}
```

### jQuery

下面的程式碼位於外掛文件夾下的文件 `js/myjquery.js` 中。

```
jQuery(document).ready(function($) {       //wrapper
    $(.pref).change(function() {         //event
        var this2 = this;                  //use in callback
        $.post(my_ajax_obj.ajax_url, {     //POST request
            _ajax_nonce: my_ajax_obj.nonce, //nonce
            action: my_tag_count,        //action
            title: this.value              //data
        }, function(data) {                //callback
            this2.nextSibling.remove();    //remove the current title
            $(this2).after(data);          //insert server response
        });
    });
});
```
