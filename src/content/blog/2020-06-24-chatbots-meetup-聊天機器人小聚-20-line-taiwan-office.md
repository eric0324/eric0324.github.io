---
title: "Chatbots meetup 聊天機器人小聚 #20 @ LINE Taiwan Office"
description: "台灣的疫情終於漸漸的穩定下來，各個社群的線下活動都開始陸續恢復運作了。Chatbot Taiwan 也迎來期待已久的第 20 場小聚！這次小聚選在熊大寶殿舉辦，很感謝場地方 LINE 提供場地和贊助美食、飲料，讓大家分享交流之餘，還能吃飽喝足，希望每個人都能滿載而歸！在心得開始前，先放上這次的活動資訊"
pubDate: 2020-06-24
heroImage: "https://i.imgur.com/qbUsN2z.png"
---


台灣的疫情終於漸漸的穩定下來，各個社群的線下活動都開始陸續恢復運作了。Chatbot Taiwan 也迎來期待已久的第 20 場小聚！這次小聚選在熊大寶殿舉辦，很感謝場地方 LINE 提供場地和贊助美食、飲料，讓大家分享交流之餘，還能吃飽喝足，希望每個人都能滿載而歸！在心得開始前，先放上這次的活動資訊

![](../../assets/blog-images/Image-from-iOS-7-300x225.jpg)

KKTIX：[https://chatbots.kktix.cc/events/meetup-020](https://chatbots.kktix.cc/events/meetup-020)

共筆：[https://hackmd.io/@chatbot-tw/meetups-020](https://hackmd.io/@chatbot-tw/meetups-020)

直播回顧：[https://youtu.be/VxcpDFHWOb8?t=2146](https://youtu.be/VxcpDFHWOb8?t=2146)

接下來就是這次活動的心得

第一個出場的是 Evan ，一樣為我們帶來這個月有**關於 LINE API 的更新**

![](../../assets/blog-images/Image-from-iOS-6-300x225.jpg)

<script async class="speakerdeck-embed" data-id="8517c0f0cbba4a18854c672827f71d86" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

總結一下，這個月的主要更新如下：

- Flex Message Simulator tutorial 的釋出
- Messaging API 的更新，這次更新和 group, chat room 有關，可以取得使用者的名稱圖片和狀態了
- Linked OA 的位置做了調整
- LIFF v2.2.0 released，加入了 LIFF 錯誤碼

Evan 還提供了一隻 Demo 機器人，示範了這次的 Messaging API 的更新中，如何取得 group, chat room 的更多資訊

![](https://i.imgur.com/qbUsN2z.png)

程式碼範例：[https://github.com/kkdai/linebot-group](https://github.com/kkdai/linebot-group)

這真是個不錯的一隻 API ，以往 group, chat room 沒有這隻 API 的話，很多互動都不能實現，有了這隻 API 的加持，以後應該會有更多有趣的應用出來！

第二場是由 煥杰 分享的『**專為高中生設計的管家型聊天機器人** 』。

![](../../assets/blog-images/Image-from-iOS-5-300x225.jpg)

當初設計這隻機器人是作者為了協助班上同學常常忘了帶考師準備的書籍，以及提醒同學未來幾天考試而誕生的一隻機器人。去年九月開始做這隻機器人，十二月就完成了第一階段開發

分享了一些開發過程遇到的問題，例如說：原本的架構是用 google sheet ，但是會有一些限制，就是每 100ms 只能有 100 requests，所以才需要搬移到 MySQL 上。以及分享暑假打算怎麼重構、Web Hosting 想搬到 Lamda、DB 想改用 NoSQL、Python 想改成 JavaScript

後來因為疫情的關係，還增加了體溫回報系統，未來還會添加人臉辨識結合體溫測量、網頁管理介面，以及推廣到全台灣高中。

是個很有想法的高中生，從生活中找到問題，捲起袖子解決問題，祝福這隻機器人可以順利完成後續的開發！

接著是 Richard 分享的 **LIFF & Firebase**

![](../../assets/blog-images/Image-from-iOS-4-300x225.jpg)

Firebase 對我而言一直是個有點陌生的東西，之前待在快速買早餐的時候，常常聽到，但是沒有實際去應用。聽完這次的分享，有點燃起我想去玩玩看的動力

其中有講到 Firebase hosting ，他有以下幾個特性：

- 可以放置 web page （很像是 S3）
- 幫助網頁開發的功能
- 分析工具(FCM）
- Firebase is a collection of mobile-related products
- CDN 機房就在台灣/香港
- No cold start（不像 heroku 會睡著）
- firebase cloud function (JS/TS)
- cloud fire store （很像 mongo DB，而且在前端就可以接上，不需要 server side 的 code）

Firebase 也提供了安全認證相關的機制，可以讓管理人員處理`新增`、`刪除`這類較危險的操作

透過淺顯易懂的說明，讓我更了解 Firebase ，之後找個時間可以來研究看看！

最後一場是卡米哥分享的『**對話式表單架構設計**』

![](../../assets/blog-images/Image-from-iOS-3-300x225.jpg)

這個議題一直是大家很有興趣的議題，我之前在開發快速買早餐 5breakfast 的 chatbot 也遇到這個問題。對話式表單常常遇到的就是，如何協助用戶完成目標？如何向用戶索取資訊？如何呈現一個好的對話介面？缺乏資訊要怎麼反問？多欄位填寫的處理？

卡米哥利用了點飲料的需求，清楚的帶大家認識整個對話的流程，還帶大家認識了 DialogFlow

不過遇到這種問題，我一律建議做成 LIFF 

最後是閃電秀的部分

![](../../assets/blog-images/Image-from-iOS-1-300x225.jpg)

首先出場的是佳新哥分享的 LIFF 圖片測試工具，這個工具可以減少設計師和工程師溝通障礙。

黃鈞亭分享了如何結合 LINE 和 Google Suite 來做定時回報系統 因為軍中使用 LINE 回報遇到的問題，而讓講者動身實作一隻機器人處理問題。（現在當兵都這麼輕鬆？）

最後一個是即時通智慧攝影機，攝影機在偵測的過程，如果發現有人經過時則會 push message 做通知。這隻機器人滿像我之前待在谷林運算的時候開發的機器人，我們也是結合一些 IOT 應用，監測到工廠產線出現異常的時候會主動推播通知

這次的分享依舊很有趣，也很精彩，學習到很多東西，也認識很多人。最後附上工作人員合照，這次又多了些新夥伴，希望聊天機器人社群越來越壯大！

![](../../assets/blog-images/Image-from-iOS-225x300.jpg)
