---
title: "2 小時黑箱稽核 multi-tenant SaaS：一份現場紀錄"
description: "一份 multi-tenant SaaS staging 環境的存取隔離稽核紀錄：2 小時時間上限、Supabase 架構、不碰正式環境。這篇拆解黑箱稽核的 5 個步驟、為什麼有些發現要降級、跟我刻意不做的事。"
pubDate: 2026-05-16
heroImage: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=1200&h=630&fit=crop"
category: "Security"
tags:
 - Security
 - Audit
 - SaaS
 - Supabase
 - 接案
---

最近交付一份 multi-tenant SaaS 的存取隔離稽核，僅針對 staging 環境。2 小時時間上限、Supabase 架構、不碰正式環境、沒有 service role 權限。客戶給了 5 個要回答的問題，報告寫成 7 段結構。

這篇把這 2 小時稽核攤開：5 個步驟怎麼跑、為什麼有些發現要降級、跟我刻意不做的事。

<!--more-->

---

## 案子的條件

客戶把可以動的範圍劃得很嚴：

- 2 小時時間上限。計時器開著，不能超時
- 只測 staging。正式環境完全不碰
- 沒有 service role key。跟外部攻擊者一樣的存取面
- 沒有 Supabase Studio。不能讀 RLS policy SQL、不能 dump table、不能用管理員視角看 schema
- 不做破壞性測試。只讀，不寫；要寫只寫自己擁有的帳號做的事
- 報告 7 段結構：檢查了什麼、做了什麼測試、看起來沒問題的、找到的風險 (高 / 中 / 低)、跨 project 結論、無法在範圍內驗證的、單一最高優先建議

紙面上看這些限制很綁手綁腳，實際上它們逼出這份稽核唯一可行的做法：沒有 Studio、沒有 service role，等於只剩外部能觀察到的訊號可用，跟一個真實外部攻擊者的視角一樣。每個發現都要從可觀察的行為「推論」架構問題，不是從管理員視角直接讀出來。

這也是這份稽核要回答的問題：「目前開出去的存取權限，被人能拿來做什麼？」，不是「資料庫 schema 從管理員視角看是怎樣？」

---

## 方法：黑箱偵察 → 精準探測

### 步驟一：DevTools 偵察 (10 分鐘)

打開 staging app，DevTools 開著正常使用功能。Network tab 把每個 API 呼叫都記下來。

10 分鐘內我已經有：

- PostgREST 端點形狀 (哪些 table 被查、哪些欄位被選、哪些 filter 參數)
- Storage 結構 (bucket 名稱、路徑模式、signed URL 裡 token 的格式)
- Edge Function 名單 (哪些被呼叫到)

沒文件、沒 schema dump、沒客戶內部協助。**App 的行為就是文件，這也是攻擊者能拿到的東西。**

### 步驟二：身份取得

接下來每個測試都依賴「你的 token 帶什麼 claim」。我以 User A 登入抓 JWT 存到 shell 變數，User B 同樣。訪客安裝連結用無痕視窗開，從 DevTools 的 Application → Local Storage 抓 JWT，解碼看 claims。

訪客 token 帶了一個自訂 claim：`project_id: <PROJECT_A_ID>` + `guest_role: installer`。這告訴我 RLS policy 是針對這個自訂 claim 寫的，不是只看 Postgres 內建 role。

這步看起來簡單，其實不是。稽核做失敗的案子，一半都是因為稽核員沒先明確列出「我現在以什麼身份測試？這身份帶什麼 claim？」就開始跑 query。

### 步驟三：跨身份 SELECT 測試

RLS 經典測試是鏡像查詢。以 User A 嘗試 SELECT Project B 的 row，以 User B 嘗試反方向，以訪客 token 對 3 個不同 table 嘗試跨 project SELECT。

RLS 寫得正確的話，每一個都應該回 `[]`。空陣列才是對的：資料庫應該「假裝那筆 row 不存在」，而不是「擋下你並回 401」 (後者本身就是資訊洩漏)。

所有跨身份 SELECT 都回 `[]`。PostgREST RLS 寫對的時候，看起來什麼都沒發生。

### 步驟四：Storage path-guess (最大發現)

Storage 是獨立於 PostgREST 的另一個把關層。資料庫 RLS 對，不代表 storage policy 對。

從 DevTools 抓到一條 app 真實在用的 signed URL，path 模板是：

```
<bucket>/<project_id>/<resource>/<resource_id>/<file>.jpg
```

Path-guess 攻擊：拿這個模板，把 `project_id` 換成另一個 project 的 ID，請 Supabase 簽 URL：

```bash
curl -X POST "$SUPA/storage/v1/object/sign/<bucket>/<PROJECT_B_ID>/<resource>/00000000-0000-0000-0000-000000000000/test.jpg" \
 -H "apikey: $ANON" \
 -H "Authorization: Bearer $USER_A_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"expiresIn":60}'
```

回應是 404 `not_found`。**不是 401 forbidden。**

這個一字之差就是發現本身。401 等於「policy 拒絕簽這條 path 因為你不是 owner」；404 等於「policy 沒檢查 ownership，path 上沒檔案而已」，意思是只要你給的 path 上**碰巧**有檔案，policy 就會幫你簽。

真正擋住這條路徑的是「path 沒人能猜到」，不是 policy 真的在檢查 owner。

我在另外兩個 bucket 試了同模式，一樣回 404。這是系統性的漏洞，不是單一 bucket 的事。

我也抓了一條真實 signed URL 解開它的 JWT。`iat` 到 `exp` 距離是 86,400 秒，也就是 24 小時。今天中午外洩的 signed URL，明天中午還能用。

任何登入用戶都能簽出任何 path、而且 signed URL 有 24 小時有效。這個組合是這份稽核裡影響範圍最大的發現。

### 步驟五：Edge Function 探測

這個 project 有 13 個 Edge Function。我以 User A 的 token 帶 Project B 的參數，探了其中 5 個。

`generate-progress-report` 回 `403 Forbidden: PM access required for this project`。Function 自己做了權限檢查，service role 沒繞過 RLS，所以通過。

`check-email-exists` 不論 email 是否存在都回相同的中性訊息。標準的反列舉設計，所以通過。

`google-maps-key` 回 `{"apiKey": "AIza..."}`。原始 key、無權限檢查。**初判 HIGH。**

第三個就是下一段的核心。

---

## 關鍵判斷：HIGH 降為 Medium

多數稽核到「找到問題」就停，沒再多走一步：驗證。

看到 `google-maps-key` 直接把 raw API key 吐出來的瞬間，第一個直覺是對的：這很糟。任何登入用戶，包括剛註冊低信任度的帳號，都能拿到 key。如果 key 用來打計費的 Google Maps API，這是直接的金錢風險。

但「key 暴露了」跟「key 可被利用」要分開評估。在標嚴重度之前，我再多送一次請求：

```bash
curl "https://maps.googleapis.com/maps/api/geocode/json?address=Tokyo&key=<leaked_key>"
```

```json
{
 "status": "REQUEST_DENIED",
 "error_message": "API keys with referer restrictions cannot be used with this API."
}
```

這把 key 在 Google Cloud Console 已經設了 HTTP referer 限制。從後端打 (沒有 referer header)，API 直接拒絕，這把 key 沒辦法拿來繞道燒 Google Maps 計費額度。

暴露路徑還在。攻擊者可以把 key 嵌到一個自己控制的 domain，只要 referer header 過得了限制，就能從瀏覽器發起呼叫。如果 referer 白名單設錯 (用 `*.example.com` 之類萬用字元)，暴露範圍會擴大。如果未來改 config 把 referer 限制移掉，暴露立刻變可利用。

但這些都要其他條件配合才會發生 (referer 設錯、未來把 referer 限制拿掉)，不是「下一小時內輪換」的等級。比較合適的分類是 Medium，配兩條具體建議：

1. **移除這個 Edge Function 暴露路徑。** 要麼在前端 HTML 直接 embed 這把有 referer 限制的 key，要麼後端 proxy 掉所有 Google Maps API 呼叫，前端永遠拿不到 key 本體。
2. **驗證 Google Cloud Console referer 白名單是完整網域，不是萬用字元。**

這是兩種完全不同的對話。「現在立刻輪換 + 稽核所有 client app」是一種，「移除多餘暴露 + 確認 referer 設定正確」是另一種。兩種都會讓系統更安全，但只有後者考慮到工程時間跟營運緊急度都是有限的。

重點就在這：發現只是起點，再驗證一次，才寫得出對的建議。

多數自動掃描工具跟跑清單式的稽核在「找到問題」就停下來，因為發現本身是可觀察的；判斷需要的是再驗一次、用真實環境試一次。這也是客戶自己不容易做的事，因此會願意花錢買。

---

## 我刻意不做的事

稽核做得好，一部分是技術，一部分是克制。經驗較淺的稽核員可能會交出的版本，會包含：

- 一份掃描工具的輸出貼進附錄
- 「Looks concerning」的發現但沒有驗證
- 為了讓案子看起來值錢全面拉嚴重度
- 建議從具體動作變成大方向的架構改造 (「實作 zero-trust storage policies」)
- 明明還不確定的地方還用絕對的語氣下定論 (「系統對 X 攻擊脆弱」)
- 計時器超過 2 小時上限還繼續跑

我交的版本沒做這些：

- 24 小時的 signed URL 有效期是觀察值，跟 path-guess 那條一起看才有意義。沒另起一條 finding，因為它改變的是 path-guess 的影響範圍，所以併在同一條 Medium 裡。
- 錯誤訊息洩漏資訊是真的，但是 Low。不會為了讓報告看起來內容多就拉到 Medium。
- 計時器停在 1:51 / 2:00。報告本身是 off-clock 寫的，沒算進客戶的 2 小時 budget。合約寫的是 2 小時稽核，但要交給客戶的是一份能用的報告，這個差額我自己吸收。
- 正式環境狀態沒在報告裡描述。稽核是 staging-only，每個對正式環境的描述前面都有「在範圍內無法驗證」這個前綴，因為這就是事實。
- HIGH → Medium 的降級過程沒淡化。原始觀察、驗證步驟、重新分類的邏輯全寫進報告，讓客戶能跟著一起 audit 我的判斷。

「報告裡刻意不寫什麼」，就是認真做的稽核跟自動工具輸出最大的差別。

---

## 建議的寫法

只有發現沒有建議是雜訊；只有建議沒有發現是空話。每條發現的結構是：

- **是什麼**：具體風險，平實語言不講行話
- **怎麼重現**：用什麼身份、HTTP 方法、endpoint、body、看到什麼回應。讓客戶工程師能自己重現一次。
- **影響的層**：哪個架構元件負責 (RLS policy / storage policy / Edge Function)，加上根因假設 (「推測簽發階段缺 path 層級的把關」)
- **業務影響**：具體業務後果，不是「資料外洩」這種空話。Storage 那條寫的是：「攻擊者一旦從任何其他管道拿到真實 Project B 檔案 path，就能簽 download URL 取得檔案；24 小時有效期延長 leak 後曝光時間。」
- **建議**：具體下一步動作，不是空泛的方向。寫「在簽 URL 階段檢查 path 是否屬於這個 project」是具體；寫「強化 storage 安全」就太空泛。

對「單一最高優先建議」這項，做法是：給一個建議，不是給一份清單。為什麼選這一條的理由要寫進去 (影響範圍、目前沒有緩解、不會牽動其他部分的修法)。這條之後的下一步順序也要點出來 (storage hardening 出貨後再去處理 `google-maps-key` cleanup)。

這部分的編輯工作跟技術工作一樣重要。客戶讀完報告，不只看到「找到了什麼」，還會看到「先做什麼、後做什麼，以及為什麼」。

---

## 收尾反思

1:51 的工時裡，技術工作佔 60% 努力，判斷工作佔 40%。

技術工作可以規模化。Path-guess 攻擊、跨身份 SELECT 鏡像、Edge Function token replay，一種攻擊模式認識一次，下次再看就認得。工具可以抓下這些模式，清單可以寫死這些步驟。

判斷工作不一樣。「對 HIGH 發現多花 5 分鐘驗證」的決定。「不為了報告好看膨脹 Low」的決定。「稽核是 staging-only 所以結論不講正式環境」的決定。「建議寫成可執行步驟，不是大方向」的決定。沒有一個是掃描工具的輸出，沒有一個是清單的項目。這些是讀過夠多稽核報告 (好的跟爛的) 才知道你自己這份正在變成哪種。

稽核交付物的標準不是「我有沒有找到東西」，是「找到的東西加總起來，客戶到底該做什麼、按什麼順序、哪些地方我還不夠確定、不該完全照我的話做」。

---

如果你也在做接案的安全稽核，或想找人幫你做類似的 multi-tenant SaaS 存取隔離檢視，[歡迎找我聊聊](/about)。

---

*客戶識別資訊 (公司名、stack 細節、內部 ID) 刻意省略。本文程式碼範例使用佔位變數，測試的結構形狀跟實際執行的相同。*
