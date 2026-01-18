---
title: "在 LINE LIFF 應用上 debug - vConsole"
description: "LIFF"
pubDate: 2018-10-01
heroImage: "https://i.imgur.com/Jco6SXf.png"
---


# LIFF

LINE Front-end Framework（LIFF）是在 LINE 中運行的Web應用程序的平台。

啟動 LIFF時，LIFF 應用程式可以從 LINE app 中獲取數據，例如: LINE 用戶 ID。 LIFF 應用程式也可以來為用戶發送消息的功能。

# 我自己的 LIFF 應用

像是在我的 MiKA 這隻 chatbot 中，活動和名片的創建，或者是 MiKA STORE就是用 LIFF 設計而成

![Imgur](https://i.imgur.com/Jco6SXf.png)

LIFF 本身的架構相當簡單，其實就是引入一個 JavaScript 文件，然後呼叫對應的函示就可以完成很多包裝好的功能，官方的文件跟範例程式碼都很詳細，可以自己參考看看：[官方文件](https://developers.line.biz/en/docs/liff/overview/)

# 開發的困難點

不過開發的過程很多時候需要在 LINE APP 上頭做操作，在電腦上開瀏覽器的開發人員工具是不會有效果的，例如說要取得 LINE user id ，在瀏覽器上就會取得空值。不過有些時候要 debug 又非得要這些開發人員工具的協助

# 使用 vConsole

[vConsole](https://github.com/Tencent/vConsole) 是騰訊所推出的一個開源專案，可以解決 LIFF 測試的問題，此一工具簡單來說就是將瀏覽器的開發者工具，透過前端的方式呈現出來，而且安裝非常之容易，只要將[程式碼](https://github.com/Tencent/vConsole/releases/latest)下載下來後，嵌入 LIFF 的頁面即可

```
<script src="path/to/vconsole.min.js"></script>
<script>
    // init vConsole
    var vConsole = new VConsole();
    console.log('Hello world');
</script>
```
