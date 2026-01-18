---
title: "初次串接 Open AI 提供的 Assistant API"
description: "Assistants API 允許我們在自己的應用程式裡面去建立一個 AI 助理。一個助理可以擁有自己的提示 ，而且還可以利用 model 、tool 和 匯入自己的資料來去回應用戶查詢。"
pubDate: 2023-11-21
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "AI"
tags:
  - AI
  - OpenAI
  - API
  - Assistant
---


Assistants API 允許我們在自己的應用程式裡面去建立一個 AI 助理。一個助理可以擁有自己的提示 ，而且還可以利用 model 、tool 和 匯入自己的資料來去回應用戶查詢。

我會在這篇文章中，逐步整合每隻會用到的 API ，然後來探索看看 Assistants API 的功能。

<!--more-->

## **Step 1: 建立 Assistant**

首先我們會需要先建立一個助理。下面是官方給的一個例子，我們會建立一個「數學老師助理」，並且加上了 code Interpreter 工具。

💡 記得將 $OPENAI\_API\_KEY 更換成你的 key 喔！至於如何取的 key 的方法，這邊就不說明了。

```powershell
curl "https://api.openai.com/v1/assistants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1" \
  -d '{
    "instructions": "You are a personal math tutor. Write and run code to answer math questions.",
    "name": "Math Tutor",
    "tools": [{"type": "code_interpreter"}],
    "model": "gpt-4"
  }'
```

**參數的說明如下：**

- instructions: 關於 assistant 和 model 應如何行為或回應的說明

- model: 你可以指定 `GPT-3.5` 或 `GPT-4` 模型。如果你要用 Retrieval 功能的話，需要使用 `gpt-3.5-turbo-1106` 和 `gpt-4-1106-preview` 模型。

- tools: 是否要用 Code Interpreter 或是 Retrieval。

這時候應該會回傳一個 assistant 的 id ，記得把它記下來，等等會用到。

## **Step 2: 建立 Thread**

這個步驟，我們要建立一個 thread 。什麼是 thread 呢？我們可以把 thread 理解成，一個 thread 代表一次「對話」。什麼意思？也就是在每個使用者發起對話時，就會為這個使用者創建一個 thread。之後的每則 message 都會加入 thread 之中，如此一來 AI 便可以透過上下文來去理解使用者想問什麼。

```powershell
curl <https://api.openai.com/v1/threads> \
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1" \
  -d ''

```

這時候應該會回傳一個 thread 的 id ，記得也要把它記下來，等等會用到。

## **Step 3: 加 Message 到 Thread**

一條 message 可以是文字，也可以是文件。不過目前 (2023/11/21) 這隻 API 還不支援在 GPT-4 裡面處理圖片喔 (不過，官方是說之後會支援就是了)。如果你還是需要用圖片的話，可以改用 tool 提供的 retrieval 來去處理，也是個辦法方法。

下面會示範如何將 message 加入 thread 。要記得將 {thread\_id} 換成剛剛建立的 thread 給的 id 。

```powershell
curl <https://api.openai.com/v1/threads/{thread_id}/messages> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1" \
  -d '{
      "role": "user",
      "content": "I need to solve the equation `3x + 11 = 14`. Can you help me?"
    }'

```

💡 Thread 沒有訊息數量的限制，所以我們可以放心的將 message 加到一個 thread 中。

現在，我們可以看到這條 message 已經被追加到剛剛建立的 thread 囉。

```jscript
{
  "object": "list",
  "data": [
    {
      "created_at": 1696995451,
      "id": "msg_abc123",
      "object": "thread.message",
      "thread_id": "thread_abc123",
      "role": "user",
      "content": [{
        "type": "text",
        "text": {
          "value": "I need to solve the equation `3x + 11 = 14`. Can you help me?",
          "annotations": []
        }
          }],
        ...

```

## **Step 4: 建立 Run**

為了讓 assistant 可以去回覆使用者的訊息，我們還需要建立一個 run 。隨著 run 被建立後，assistant 會以 「assistant」 這個角色加入。將 message 追加到 thread 中，可以讓 assistant 去讀取 thread 裡面的資料，並讓他自己去決定是要呼叫 tool ，還是使用我們選定的 model 來去回應使用者的查詢。

下面會示範如何建立一個 run。要記得將 {thread\_id} 換成剛剛建立的 thread 給的 id ，以及 assistant\_id 也要更換成剛剛建立的 assistant 提供的 id 。

```powershell
curl https://api.openai.com/v1/threads/{thread_id}/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v1" \
  -d '{
    "assistant_id": "{assistant_id}",
    "instructions": "Please address the user as Jane Doe. The user has a premium account."
  }'
```

  
💡 在建立 run 時，我們也可以針對 assistant 去傳遞額外的提示，這些提示會去覆蓋 assistant 的預設提示。

### **確認 Run 的狀態**

預設情況下，一個 run 進入排隊狀態後，我們可以定期去查詢他的運行狀態，以查看其進度。這代表著，在 run 被建立後，它會被丟入等待的隊伍中，然後當系統準備好處理我們的請求時，它將開始執行。而我們要透過這個 API 來檢查 run 的當前狀態，確認它是否還在排隊？或是正在處理？又或者已經完成？

```powershell
curl https://api.openai.com/v1/threads/{thread_id}/runs/run_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1"
```

## **Step 5: 取得 Assistant 的回應**

一旦 run 處理完成，我們可以去取得 thread 中的 message。

```powershell
curl https://api.openai.com/v1/threads/{thread_id}/messages \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1"
```

我們可以看到我們的對話，經過表格整理後，如下：

| ROLE | CONTENT |
| --- | --- |
| `user` | I need to solve the equation `3x + 11 = 14`. Can you help me? |
| `assistant` | Certainly, Jane Doe. To solve the equation `(3x + 11 = 14)` for `(x)`, you'll want to isolate `(x)` on one side of the equation. Here's how you can do that:Subtract 11 from both sides of the equation to get `(3x = 3)`.Then, divide both sides by 3 to solve for `(x)`.Let me calculate the value of `(x)` for you. |
| `assistant` | The solution to the equation `(3x + 11 = 14)` is `(x = 1)`. |
