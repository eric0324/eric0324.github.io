---
title: "產生任何 Mock HTTP 回應的好工具 - Mocky.io"
description: "最近後端同事需要一個前端介面去偵錯，所以協助他開發前端，中間溝通的 JSON 都定義好了，但是後端遲遲還在開發的狀態。"
pubDate: 2019-05-01
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


最近後端同事需要一個前端介面去偵錯，所以協助他開發前端，中間溝通的 JSON 都定義好了，但是後端遲遲還在開發的狀態。

所以找到一個好用的線上工具叫做 #Mocky，可以產生 Mock (假的/模擬的) HTTP 回應，支援很多種 MIME Type 與自訂 Headers 回應標頭，可以讓前端程式進行任何類型的測試，也有一些好用的功能，比如說可以測試 HTTP 回應慢的時候的如何進行非同步多工處理，我覺得非常實用，所以紀錄一下！

[Mocky.io](https://www.mocky.io/)

## Jsonp Support

可以增加 `?callback=myfunction` 在 `mocky URL` 後面，去啟用 `jsonp`

## Response delay

可以增加 `?mocky-delay=100ms` 在 `mocky URL` 後面，去延遲反應時間

## Cors policy

遇到 `Cors policy` 的問題的話，在 `mocky URL` 前面增加 `https://cors.io/?` ，可以略過這問題
