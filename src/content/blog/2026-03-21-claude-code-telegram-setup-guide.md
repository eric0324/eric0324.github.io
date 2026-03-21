---
title: "Claude Code Telegram Bot 設定教學"
description: "最近發現 Claude Code 可以透過 Telegram Plugin 直接用手機跟它互動，等於隨時隨地都能讓 Claude Code 幫你做事。這篇完整記錄從零開始的設定流程。"
pubDate: 2026-03-21
heroImage: "https://images.unsplash.com/photo-rNH2Pcgg888?w=1200&h=630&fit=crop"
category: "AI"
tags:
  - AI
  - Claude
  - Telegram
  - 開發工具
---


最近發現 Claude Code 可以透過 Telegram Plugin 直接用手機跟它互動，等於隨時隨地都能讓 Claude Code 幫你做事。這篇完整記錄從零開始的設定流程。

<!--more-->

我自己覺得這個功能蠻實用的，尤其是人不在電腦前面的時候，用手機傳個訊息就能讓 Claude Code 幫忙查東西或跑指令，體驗上就像在跟一個 Telegram 上的助理聊天一樣。

## 前置需求

- 已安裝 [Claude Code](https://claude.com/claude-code)
- 已安裝 [Bun](https://bun.sh)（MCP server 需要）：`curl -fsSL https://bun.sh/install | bash`
- Telegram 帳號

## 步驟 1：建立 Telegram Bot

首先我們要去 Telegram 建立一個 Bot，流程很簡單：

1. 在 Telegram 搜尋 **@BotFather** 並開啟對話
2. 傳送 `/newbot`
3. 依序輸入：
   - **Name**：Bot 的顯示名稱（可包含空格）
   - **Username**：唯一代號，必須以 `bot` 結尾（例如 `my_claude_bot`）
4. BotFather 會回傳一組 token，格式如 `123456789:AAHfiqksKZ8...`，完整複製下來

💡 這組 token 很重要，等等每一步都會用到，記得先存好。

## 步驟 2：安裝 Telegram Plugin

啟動 Claude Code session，執行：

```
/plugin install telegram@claude-plugins-official
```

安裝完成後，執行 `/reload-plugins` 載入 plugin。

## 步驟 3：設定 Bot Token

在 Claude Code session 中執行：

```
/telegram:configure <你的 token>
```

例如：

```
/telegram:configure 123456789:AAHfiqksKZ8xxxxxxx
```

這會將 token 寫入 `~/.claude/channels/telegram/.env`，權限自動設為 `600`。

## 步驟 4：用 Channel 模式啟動 Claude Code

退出目前的 session，用以下指令重新啟動：

```sh
claude --channels plugin:telegram@claude-plugins-official
```

成功的話會看到：

```
Listening for channel messages from: plugin:telegram@claude-plugins-official
```

看到這行就代表 Bot 已經在等你的訊息了。

## 步驟 5：配對你的 Telegram 帳號

1. 在 Telegram 私訊你的 Bot（隨便傳一則訊息就好）
2. Bot 會回覆一組 **6 碼配對碼**
3. 回到 Claude Code session，執行：

```
/telegram:access pair <配對碼>
```

例如：

```
/telegram:access pair f85c78
```

配對成功後，你的 Telegram 訊息就能直接送達 Claude Code session 了。

## 步驟 6：鎖定存取政策

配對完成後，強烈建議把政策從 `pairing` 切換為 `allowlist`，不然陌生人私訊你的 Bot 也會拿到配對碼，有點危險：

```
/telegram:access policy allowlist
```

| 政策 | 行為 |
|------|------|
| `pairing`（預設） | 未授權的人私訊會收到配對碼 |
| `allowlist` | 未授權的人私訊無任何回應 |
| `disabled` | 所有訊息都不處理，包含已授權的使用者 |

到這邊基本設定就完成了！
