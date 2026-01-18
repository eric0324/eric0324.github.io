---
title: "在 Weebly 上使用 Gandi 的域名"
description: "由於朋友最近正在研究 Weebly ，提到了『自定義域名』功能，所以我也來研究了一下，雖然我覺得我應該不會再用到，不過還是紀錄下來。"
pubDate: 2016-08-01
heroImage: "https://i.imgur.com/4T5KpCS.png"
category: "Web 開發"
tags:
  - Domain
  - Web Hosting
  - DNS
---


由於朋友最近正在研究 Weebly ，提到了『自定義域名』功能，所以我也來研究了一下，雖然我覺得我應該不會再用到，不過還是紀錄下來。

`自定義域名` 功能允許您設置您的 Weebly 網站綁上自己的域名。首先你必須先尋找、購買新的域名，並且在 weebly 設定好。

- 登錄 Gandi，選擇`我的帳戶` 。

![Imgur](https://i.imgur.com/4T5KpCS.png)

- 點選你要指向的域名，並單擊進去管理頁面。

![Imgur](https://i.imgur.com/Z94jnfd.png)

- 在最底下，會有個`區域檔`，選擇`編輯區域`。

![Imgur](https://i.imgur.com/zvU3zil.png)

- 你應該會看到一個警告訊息，這是 Gandi 為確保你的網域正常運作所做的機制。你只需要點選右邊的 `建立新版本`

![Imgur](https://i.imgur.com/J352s5y.png)

- 接著找一下 `Host` 欄位是 `@`的 ，點選他右邊的鉛筆。

![Imgur](https://i.imgur.com/Mpv5NsT.png)

- 在 `值` 欄位中，填寫上 weebly 提供的 IP 地址之一。Weebly 提供的的IP地址有 `199.34.228.55`，`199.34.228.56`，`199.34.228.57`，`199.34.228.58`，`199.34.228.59`，`199.34.228.100`。

上述選一個就好（如果你有使用到 SSL，那麼你就需要使用特定的IP地址）。如果你覺得這步驟很繁雜的話，你就直接填入 `199.34.228.59`。 填好後，點擊`送出`按鈕。

![Imgur](https://i.imgur.com/fqL6emw.png)

- 接下來，向下滾動頁面，以確保`www`的`CNAME`記錄指向`@`。如果沒有，記得要修改它。

這樣就完成了！

接著 Gandi 的可能需要長達 24 小時的時間來更新他們的記錄（通常很快，幾分鐘就會更新完畢了）。
