---
title: "CloudFront 導致 Google 社群登入異常"
description: "我前端和後端分開，然後嘗試使用 Google 登入/註冊 ，後端認證後有順利跳轉至前端，此時會出現 521 的 error status code ，然後就卡住了。"
pubDate: 2024-02-13
heroImage: "https://ericwu.asia/wp-content/uploads/2024/02/截圖-2024-02-13-16.25.20.png"
---


我前端和後端分開，然後嘗試使用 Google 登入/註冊 ，後端認證後有順利跳轉至前端，此時會出現 521 的 error status code ，然後就卡住了。

<!--more-->

研究了一下，由於在 CloudFront 上僅會回應 500, 502, 503 和 504 的錯誤代碼，所以 521 應該是由原始伺服器直接回應的，所以應該是 Set-cookie 有關。

回去檢查一下我的 Cache Policy 是設定 CachingOptimized，在該 Policy 預設上不會將個別不同的 Cookie 進行快取，這可能會導致使用者因透過快取拿到舊的 Cookie 值向後端進行驗證，導致驗證失敗，才會回應相關錯誤。

為了進行驗證，我們需要設定自定義的 Cache Policy，並在 Cookie 填入相對應的 key-value

[![](../../assets/blog-images/截圖-2024-02-13-16.25.20-1024x112.png)](https://ericwu.asia/wp-content/uploads/2024/02/截圖-2024-02-13-16.25.20.png)

這樣應該就可以解決在社群網站登入/註冊後條轉自前端發生 521 錯誤的問題了。
