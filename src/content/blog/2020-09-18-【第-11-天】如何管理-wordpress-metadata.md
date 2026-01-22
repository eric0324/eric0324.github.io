---
title: "【第 11 天】如何管理 WordPress metadata"
description: "metadata 就是關於資料的資料。簡單來說就是我們創建了類型為商品的自定義文章類型，其中價格就是 metadata 的一種，這個字串就會被存儲在 postmeta 文章 metadata 中。"
pubDate: 2020-09-18
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


metadata 就是關於資料的資料。簡單來說就是我們創建了類型為`商品`的自定義文章類型，其中`價格`就是 metadata 的一種，這個字串就會被存儲在 postmeta 文章 metadata 中。

WordPress 的主要資料（文章、評論、用戶、分類）和他們 metadata 的關係是一對多，也就是一個主要資料可以有很多 metadata 。所以，我們可以在 metadata 中存儲很多附加資訊。

## 管理文章 metadata

### 新增 metadata

我們可以使用 [add\_post\_meta()](https://developer.wordpress.org/reference/functions/add_post_meta/) 函式添加 metadata ，該函式接受一個 post\_id、一個 meta\_key、一個 meta\_value 和一個 unique 布林值。

```php
add_post_meta(
    int $post_id,
    string $meta_key,
    mixed $meta_value,
    bool $unique = false
)
```

我們來依序看每個參數的用途：

meta\_key：是外掛在其他地方引用 `meta_value` 的依據，我們可以使用任意字符串作為名稱，但是為了避免衝突，通常會建議在名稱前面加上前綴，並以下劃線分隔名稱中的單詞，如 eric\_featured\_menu。

還有一種比較特別的命名方式，就是以底線 `_` 開頭的 meta\_key 。如果用了這個的話，WordPress 將不會在自定義字串編輯介面顯示。

meta\_value：可以是一個字串、一個整數、一個陣列或是一個物件。

unique：可以讓我們聲明某條 metadata 是否為唯一的。什麼意思？比如 `price` 這個 `meta_key`，一個產品應該只能有一個價格（對，是唯一的！）。所以我們應該為這條 metadata 的 unique 設定為 true（預設是 false) ，來確保一個產品只有一個價格。

### 更新 metadata

如果需要更新一個已經存在的 metadata ，我們可以使用 [update\_post\_meta()](https://developer.wordpress.org/reference/functions/update_post_meta/)，用法和 add\_post\_meta() 差不多。

順帶一提，如果我們使用這個函式更新了一個不存在的 metadata ，該函式將會自動呼叫 add\_post\_meta() 來新增這個不存在的 metadata 。

### 刪除 metadata

如果我們需要刪除一個 metadata ，可以使用 [delete\_post\_meta()](https://developer.wordpress.org/reference/functions/delete_post_meta/) 函式。

#### 字串轉換

這裡有一個小小的坑，WordPress 在儲存文章的 metadata 的時候，會使用 `stripslashes()` 轉換資料中的某些字串，比如一個 JSON 串 {key:value with \\escaped quotes}：，之後就可能出現無法解析的問題！

因此，我們可以通過使用在 WordPress 3.6 中引入的函式 [wp\_slash()](https://developer.wordpress.org/reference/functions/wp_slash/) ()，用來修正 stripslashes() 的轉換。使用方法如下：

```
$escaped_json = '{key:value with \escaped quotes\}';
update_post_meta($id, 'double_escaped_json', wp_slash($escaped_json));
```

## 自定義 metadata box

### 什麼是 metadata box

用戶在編輯文章的時候，編輯界面是由許多個 box 組成：編輯器、發布、分類目錄、標籤等，這些都是 metadata box。因此，我們的外掛理所當然也可以新增自定義的 metadata box 到任何一個文章類型編輯界面。

那麼 WordPress 是怎麼做到的？在顯示文章編輯介面的時候，WordPress 就會自動調用 [do\_meta\_boxes()](https://developer.wordpress.org/reference/functions/do_meta_boxes/) 函式來掃過一遍所有的 metadata box，並調用 metadata box 中的 callback 參數指定的函式來顯示表單。

### 為什麼要使用 metadata box？

metadata box 是方便、靈活的模組化文章資料編輯元素，可以讓用戶很方便的編輯當前文章的相關信息。

如果用戶不需要某個 metadata box，他們也可以很方便的將其隱藏，或者是根據需要，也可以對 metadata box 排序，把自己經常使用的 metadata box 放在合適的位置。

### 新增 metadata box

如果我們需要創建一個 metadata box，必須呼叫 [add\_meta\_box()](https://developer.wordpress.org/reference/functions/add_meta_box/) 函式。下面示範如何在文章編輯界面上添加了一個 metadata box。

```

function eric_add_custom_box() {
   $screens = ['post', 'eric_cpt'];
   foreach ($screens as $screen) {
      add_meta_box(
         'eric_box_id',           // Unique ID
         'Custom Meta Box Title',  // Box title
         'eric_custom_box_html',  // Content callback, must be of type callable
         $screen                   // Post type
      );
   }
}
add_action('add_meta_boxes', 'eric_add_custom_box');
```

上面用到了一個 eric\_custom\_box\_html ，這個 callback function 是用來顯示 metadata box 需要的 HTML 表單，程式碼如下：

```
function eric_custom_box_html($post) {
   ?>
   <label for=eric_field>Description for this field</label>
   <select name=eric_field id=eric_field class=postbox>
      <option value=>Select something...</option>
      <option value=something>Something</option>
   </select>
   <?php
}

```

這樣我們的文章編輯器下面就多了一個我們自己定義的表單可以給使用者選擇了！

![https://ithelp.ithome.com.tw/upload/images/20200911/20121194Er0Aqu23Os.png](/images/blog/20121194Er0Aqu23Os.png)

上面的範例只包一個下拉列表字段，可能沒什麼意義，所以我們在實際開發時，可以根據需要放上任意類型的表單。

### 保存自定字段值

我們可以根據需要，在任何一個 action 被觸發的時候，來去保存自定義欄位中輸入的值。在這個例子中，我們使用 `save_post` action hook。

我們可以把輸入的資料保存在任何地方，甚者 WordPress 之外，由於我們處理的是與 WordPress 文章相關的資料，所以我就很理所當然地把他保存到 post\_meta 中。

這個例子，我把保存文章時題傳遞過來的 eric\_field 資料存儲到了 \_eric\_meta\_key 這個隱藏 post\_meta 中。

```
function eric_save_postdata($post_id) {
   if (array_key_exists('eric_field', $_POST)) {
      update_post_meta(
         $post_id,
         '_eric_meta_key',
         $_POST['eric_field']
      );
   }
}
add_action('save_post', 'eric_save_postdata');
```

### 移除 metadata box

我們也可以從編輯界面移除現有 metadata box，可以使用 [remove\_meta\_box()](https://developer.wordpress.org/reference/functions/remove_meta_box/) 函式，這裡有一點要注意的是，傳遞的參數需要和新增 metadata box時候的對應的參數完全一致。
