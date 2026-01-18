---
title: "LINE TAIWAN TECHPULSE 2019 參加心得"
description: "今年也是第三次參加 LINE TAIWAN TECHPULSE 了，這次很感謝 NiJia 和 Evan 的邀請，讓小弟我可以坐在前排搖滾區，更近距離的看到各項精彩的議程。今年的內容可以看到 LINE 在任何地方都有提到 ML ，看的出 LINE 的野心和佈局，看得我也想學習 ML 了（誤"
pubDate: 2019-12-05
heroImage: "https://i.imgur.com/YnK79VM.jpg"
category: "心得分享"
tags:
  - LINE
  - Conference
  - 技術分享
---


今年也是第三次參加 LINE TAIWAN TECHPULSE 了，這次很感謝 NiJia 和 Evan 的邀請，讓小弟我可以坐在前排搖滾區，更近距離的看到各項精彩的議程。今年的內容可以看到 LINE 在任何地方都有提到 ML ，看的出 LINE 的野心和佈局，看得我也想學習 ML 了（誤

## 活動資訊

LINE 台灣舉辦第四屆開發者大會「LINE TAIWAN TECHPULSE 2019」，藉此科技產業的年度盛事，為台灣開發者提供來自日本 DevDay 2019 的第一手訊息，實現「開發工程（Engineering）」、「產品開發（Production）」的願景，並為開發者介紹 AI 人工智慧、資訊安全、測試自動化、敏捷開發、新創團隊分享等眾多領域的最新趨勢。

演講嘉賓包含國際知名資安專家李丞鎮 (Beist)、NAVER Clova AI Chatbot AutoML 專家李在元 (Jaewon Lee)、 LINE Timeline Post 推薦系統負責人李知洪 (Jihong Lee)，以及眾多各領域專家，於現場傳授專業知識，回歸開發者本質，以實務觀點探究產品開發，並介紹 LINE 開放平台資源與創新應用，敬邀您蒞臨參加!

## 活動議程

| TIME | TOPIC | SPEAKER |
| --- | --- | --- |
| 09:30 - 09:35 | Opening | Roger Chen |
| 09:35 - 10:00 | Keynote | Marco Chen |
| 10:00 - 10:30 | LINE Platform API Update | Evan Lin |
| 10:30 - 10:40 | Break |  |
| 10:40 - 11:20 | AutoML in Clova Chatbot Builder Framework (English) | Jaewon Lee / Penny Sun |
| 11:20 - 12:00 | How LINE Does Enterprise Security (English) | Beist |
| 12:00 - 12:30 | Timeline Post Recommender System (English) | Jihong Lee |
| 12:30 - 13:30 | Lunch Break |
| 13:30 - 15:10 | Protostar Program Introduction & Startup Demo | Kevin Chen |
| 15:10 - 15:40 | LINE Pay - New Features of LINE Pay | Webber Su / Sabrina Lee |
| 15:40 - 15:50 | Break |  |
| 15:50 - 16:20 | LINE SPOT and How We Build It | Julian Shen |
| 16:20 - 16:50 | Lightning Talk - Data Pipeline and Data Processing | Yumei Chen / Jim Horng / Denny Tsai |
| 16:50 - 17:20 | Lightning Talk - Data Science and Analytics | Shawn Tsai / Liwen Liao / Johnson Wu |
| 17:20 - 17:50 | Lightning Talk - Client and Automation | Daniel Kao / JJ Lin / Winter Hung |
| 17:50 - 18:00 | Closing | Marco Chen |

## 場地與報到

這次的 LINE 官方帳號有比去年的順很多，我記得去年我開了藍牙弄了半天都收不到通知。今年的我才剛下車在去會場的半路上就收到座位通知。

![Imgur](https://i.imgur.com/YnK79VM.jpg)

再走個幾步路就看到大大的 LINE TAIWAN TECHPULSE 2019 牌子 在歡迎大家了！

![Imgur](https://i.imgur.com/xxuzf34.jpg)

接著就拿著這個座位畫面，到前台去報到，前台工作人員會協助綁上手環，手環顏色作為場地位置的區分。這次的座位在前排水藍色搖滾區。

![Imgur](https://i.imgur.com/XRosWns.jpg)

今年活動會場有別於以往，弄的超有氣氛的，感覺很嗨！！

![Imgur](https://i.imgur.com/cSQZLJE.jpg)

## Opening & Keynote

前面兩場是 LINE 台灣總經理 Roger 和 Marco 的分享，大概就是 LINE 的企業目標

- LIFE on LINE ，反正就是希望生活的每個角落都有 LINE。
- LINE Brain：LINE 是一個致力於 AI 公司，將來會提供給開發者可以去運用 ML 相關的服務，這點我還滿有興趣的。

## LINE Platform API Update

這場提到了 LINE 更加注意 UX/DX ，不僅僅是注重使用者體驗，也很在意開發者在開發上的體驗，比如說文件有中文版了，LIFF 以往在開發的時候超克難，LIFF 2.0 改成能用瀏覽器登入，通訊協定從 `line://` 改成 `https://`，也就是說現在可以在電腦上面直接打開 debug （撒花

還有帶來的幾個新的 API ，其中我最開心的是終於可以批次更新 rich menu 了，以往要幫使用者更新 rich menu ，是一件超級崩潰的事情，要一個一個使用者去重新 link 起來，現在終於不用了（再次撒花  
![Imgur](https://i.imgur.com/5YW445X.jpg)

另外還推了下，Flex Message Simulator(Beta)：由別於以往 Flex Message Simulator(Alpha) ，新版的提供了圖像化介面，可以有效協非工程背景（看不懂 JSON）的去設計介面。順便廣告一下自己，如果在 Flex Message 開發上缺乏靈感，不妨來逛逛我的 [Flex Box](https://line-flex-box.herokuapp.com/)

另外，也介紹了 OA 2.0 所帶來的好處。

## AutoML in Clova Chatbot Builder Framework

這場介紹了 Clova Chatbot Builde，就是提供了一很棒的介面，可以去製作 Clova Chatbot，然後 CLOVA AutoML 還導入 NLP 模型，講者野解釋了，模型如何被建立、分類，提高 performance

## How LINE Does Enterprise Security

對資安的議題比較沒感覺，所以我這場我就沒有筆記了

![Imgur](https://i.imgur.com/pFi4Rwk.jpg)

## Timeline Post Recommender System

Timeline 要建立一個高度個人化的動態牆。這場講了些建立模型遇到的問題，還有怎麼做。

## Break

接著是午餐時間，這次沒有提供便當，可能是天氣冷的關係，餐點都涼掉了….我覺得有點美中不足  
![Imgur](https://i.imgur.com/0rXIVbz.jpg)

## Protostar Program Introduction & Startup Demo

因為之前在前公司 5breakfast ，負責推產品上 LINE Protostar ，所以這是我最關心的議程。這次有 10 家公司入選成為 Protostar。這次讓 10 家輪流上台介紹自己的 LINE chatBot。私心覺得這次醫療相關的真的很多，看來 LINE 很想進入醫療領域這塊

- 牙醫小幫手：這是前公司隔壁桌的好鄰居，當初的 chatbot 問題還滿多的，不過現在進步神速，流程改的很順暢
- 記帳雞：未來將會有點數機制，也和銀行在討論整合的可能。
- AlleyPin：也是牙醫相關的。
- 途你：給學生的旅遊平台，可以租車，然後也有自己的車。
- 肚肚：跟前公司 5breakfast 做的事情有點類似，但是更完善了，從購買餐卷到訂位，甚至於後面那段串接 POS ，相當完善。
- 通勤學：學習服務，這個滿有趣的，我聽完之後馬上就上去『聽』了幾堂有趣的課。
- MONTAGG：影片推薦系統。
- TikiPoki：一售票系統，算是 LINE 上面少數的販售票卷服務。
- DR.LINE：又是一間診所。
- U-Life+：提供慢性病處方籤服務。簡報滿滿的新細明體，很崩潰…

## LINE Pay - New Features of LINE Pay

LINE 要可以跨海交易了！以後去日本、韓國和泰國，也可以刷 LINE Pay 了。

LINE Pay 改變了舊框架 `Batch Processin`，但是遇到一個問題，就是說在第一階段交易階段，接著第二階段清算階段，在這過程效能會越來越慢，如何改成全新的框架 `Realtime Processing`，藉以提升效能。

另外，LINE Pay API v3 來了，這次在認證上做了改變，第三版使用新款電子簽證。以及為了滿足多產品綁在一起的需求，把產品欄位設計從 `single` 調整為 `multi`。

另外，以後真的可以不用帶錢包了（笑），現在連會員卡片都要整進 LINE Pay 囉

![imgur](https://i.imgur.com/sTHBQ3t.jpg)

## LINE SPOT and How We Build It

這場議程提供了 `micro services` 的整合範例，講解了 `micro services` 的好處，以及 `micro services` 怎麼去做，面對服務越來越肥大，流量越來越大的應用，這場是個很好的經驗分享，值得去效法

接著是 `Lightning Talk` ，但是也很想去外面的攤位晃晃，所以我就沒有參加到，這次有 LINE 的各個 team 的攤位，可以和他們直接面對面問問題，也有 LAE 的攤位，可以和 LAE 聊聊 LINE API 遇到的問題，雖然我都在聊 AWS 的東西（誤）

接著是，這次這一次的紀念品，側背包和衣服，我覺得側背包還不錯的，設計的很酷  
![imgur](https://i.imgur.com/qs8vcF6.jpg)

我覺得這次整體時間控制很差，整個時間一直往後延（一個小時有吧…）。另外場地雖然很炫，但是在講者登台時的燈光特效，都直接直射眼睛….非常的刺眼不舒服，相較起來，我比較喜歡去年和前年的場地。另外提供餐點都是涼的，午餐吃起來滿崩潰的，加上動線問題，搶食物超級艱難…

然後，這次議程內容相當紮實，可以說是收穫滿滿。只是聽議程需要十分專注，一整天下來，真的還滿吃力的！

總之，謝謝 LINE 提供這麼棒的活動。明年見！
