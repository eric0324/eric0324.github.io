---
title: "【第 29 天】在這些 WordPress Hooks 放在 LINE Notify"
description: "在昨天，我們建立了一個 private function 來發送 LINE Notify 訊息通知。"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


在昨天，我們建立了一個 private function 來發送 LINE Notify 訊息通知。

在[【第 26 天】我們會用到哪些 WordPress hooks？](https://ithelp.ithome.com.tw/articles/10244721%E4%BB%8A%E5%A4%A9%E6%88%91%E5%80%91%E8%A6%81%E4%BE%86%E5%9C%A8) ，我們也試著找出我們想要用、可能要用的 WordPress hooks。今天我們來試著為這些 hooks 掛上 LINE Notify 訊息通知。

<!--more-->

在這之前，先附上昨天寫好的 private function ，方便大家參考：

```
private function line_send_notify($text) {
    $request_params = array(
        "headers" => "Authorization: Bearer {$this->options['token']}",
        "body"    => array(
            "message" => "{$text}"
        )
    );

    $response = wp_remote_post('https://notify-api.line.me/api/notify', $request_params);
}

```

如果我們要在建立文章後發送通知，就這樣寫就可以了：

```
add_action('save_post', 'line_send_notify');

```

亦或者，我們可以透過外掛提供的 hooks 去做事情，比如說訂單通知：

```
add_action('woocommerce_checkout_update_order_meta', 'line_send_notify');

```

保險起見，我們還要來先檢查一下，是否存在這個外掛：

```
if(is_plugin_active('woocommerce/woocommerce.php')) 

```

會變成這樣：

```
if(is_plugin_active('woocommerce/woocommerce.php')) {
    add_action('woocommerce_checkout_update_order_meta', 'line_send_notify');
}

```

為了讓提高程式碼的可維護性，我們把這些 `add_action()` 放在 `__construct` 中，會變成這樣

```
public function __construct()
{
    ...
    add_action('save_post', 'line_send_notify');

    if(is_plugin_active('woocommerce/woocommerce.php')) {
        add_action('woocommerce_checkout_update_order_meta', 'line_send_notify');
    }
    ...    
}

```

這樣應該就會收到通知囉！
