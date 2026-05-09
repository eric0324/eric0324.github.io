---
title: "停止重寫 Prompt，開始設計 Skills"
description: "Karpathy 的 skills 專案、addyosmani 的 agent-skills 連續上 GitHub 熱門榜。Prompt 用完即丟、Skills 是版本化的工作流。這篇從我自己的 ~/.claude/skills vault 出發，談 Prompt 與 Skill 的差別、Memory 配對、3 個設計原則，與什麼時候不該寫 skill。"
pubDate: 2026-05-09
heroImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=630&fit=crop"
category: "AI"
tags:
  - AI
  - Claude
  - Skills
  - Prompt Engineering
  - 開發工具
---

近期 GitHub 熱門榜上連續出現兩個熱題：addyosmani 的 agent-skills 衝上 35K 顆星、Andrej Karpathy 的 skills 專案累積到 113K。Skills 不是新名詞，但這波討論把它從 prompt engineering 的延伸，變成 LLM 工作流可重複的基本單位。

這篇從我自己的 `~/.claude/skills/` vault 講起。寫了一年多，現在我幾乎不再寫長 prompt，該重複的都拆成 skill 了。

<!--more-->

---

## 為什麼 Prompt Engineering 不夠

Prompt 寫得好的時候，效果很驚人。但我跟 Claude / ChatGPT 對話幾年下來，有四件事一直在發生：

1. **拋棄式**：上週寫過一段很順手的 prompt，這週要做同件事，找不到、重寫
2. **脈絡跟任務混在一起**：同一段文字裡既描述任務、又夾帶背景偏好，下次想拆出來重用很痛苦
3. **不可分享、不可複製**：你的 prompt 在你腦子裡，沒有可給同事、也沒有可給未來自己的「怎麼跟它對話」標準
4. **同樣的事每次結果不同**：因為每次都是新的、隨機的、沒紀律的對話

這四件事的共通點是：prompt 是消耗品。寫一次、用一次、丟掉。

而 Skills 的核心主張是：**prompt engineering 是寫好的問題；skills design 是設計好的工作流**。一個是文字技巧，一個是系統設計。

---

## 我的 vault 怎麼運作

讓我直接展示幾個我每天在用的 skill，看它們各自解決什麼。

`/start-my-day` 每天早上自動跑：讀昨天日記、掃所有活躍專案的 commit、跑 AI 摘要、問我三個校準問題、產出今日筆記。它取代的不是「打開電腦」這個動作，是「我今天到底要做什麼」這種反覆出現的認知開銷。

`/scan-upwork` 是兩階段的接案信箱整理流程：第一階段透過 Gmail 篩選拉新通知、依客觀條件分三類（值得看、邊緣、跳過），只給我 URL 不評分。第二階段我貼回完整內文，它才評分、做筆記、列下一步。它取代的是「打開 50 封信、逐一讀摘要、決定要不要點進去」的疲憊。

`/ai-newsletters` 與 `/ai-products` 從 RSS、Product Hunt、GitHub 熱門榜多來源擷取 → 去重 → 結構化摘要 → 進到我的每週彙整。取代的是「逐一刷新聞、自己歸類」的時間黑洞。

每一個 skill 的本質非常簡單：

- 一個 `.md` 檔在 `~/.claude/skills/` 底下
- 開頭定義觸發詞、目的、輸出格式
- 中段是工作流程
- 結尾是規則跟例外情境

觸發方式有兩種：自然語言（「掃 Upwork」）或斜線指令（`/scan-upwork`）。Claude Code 看到觸發詞就把對應 skill 的內容載進脈絡，照著裡面的指示跑。

關鍵差別在於：這份 markdown 是**版本化的、可分享的、可演化的**。我寫完三個月後回去看，會去刪掉沒用的步驟、加上新發現的例外情境；prompt 不會這樣對待。

---

## Memory 系統是 Skills 的補集

如果 Skills 是「怎麼做」，Memory 就是「我 / 客戶 / 專案的脈絡」。

我把 memory 分成三類：

- `feedback_*`：從錯誤和對話學到的偏好。例如：「英文輸出用半形 hyphen 不用 em dash」、「mermaid 的 sequenceDiagram 不要用全形括號」
- `user_*`：我自己的個人檔案。接案的時薪底線、作品集內容、出版過的書
- `project_*` / `reference_*`：特定專案或外部資源連結。例如「Linear 上 INGEST 是資料流 bug 追蹤器」

Memory 跨對話持續。下次開新對話，這些脈絡會自動載入，不用重新交代「我是誰、我在做什麼」。

Skills 跟 Memory 配對的力量在這裡：

- Skill 規定「掃 Upwork 兩階段流程」
- Memory 記住「我時薪底線 $25」、「Elementor 自動降分」、「預算寫法含糊的客戶我會跳」

結果是：每次掃 Upwork 不只是跑一個流程，是跑**帶有我的紀律的流程**。流程是公版、紀律是私有，兩個拼起來才完整。

---

## 我學到的 3 個設計原則

寫 skill 寫了一年多，踩過的坑遠比寫對的多。下面三個原則是我目前覺得最穩健的。

### 原則一：Skills 越短越好

詳細指令是脆弱的（規格變了就壞）；原則是穩健的（規格變了還適用）。

`/scan-upwork` 早期版本寫了「跳過時薪 < $25」、「跳過 Fixed < $500」、「跳過 50+ proposals」十幾條硬規則。三個月後這些規則大半要改，因為市場變了、因為我自己的判準變了。

現在版本只寫三件事：「依客觀條件分三類」、「列出跳過理由」、「兩階段才評分」。**具體規則交給 memory，skill 只留結構**。skill 是食譜，memory 是食材。食譜不太動、食材常常換。

### 原則二：Memory 要保守存

錯的 memory 比沒 memory 更糟。

我曾經把「客戶 X 不喜歡用 Zoom」存成 memory，結果下個新客戶來了，Claude 也假設不要 Zoom，提了一個鬼鬼祟祟的「我們改用 Google Meet 吧」開場。完全沒道理。

寫 memory 前我現在都會問自己一句：這件事是**反覆出現的模式**，還是**一次性個案**？只有模式寫進 memory，個案就讓它留在那次對話。

### 原則三：兩階段流程是預設做法

凡是有判斷成分的 skill，不要一次跑完。

`/scan-upwork` 是兩階段：

- 階段一：客觀條件分類，只列 URL 給我
- 階段二：我貼回完整內文，它才評分建筆記

這個結構是用來防 skill「拍腦袋」的。LLM 在信件摘要上面評分接案值不值得，幾乎一定錯，因為它沒有足夠脈絡。**讓人類在 LLM 資訊不足時介入**，是 skill 設計的核心紀律。

凡是 skill 要做判斷，先問：它現在拿到的資訊夠不夠？不夠就停下來、回手給人類。

---

## 何時 skill 不該寫

反原則小段。負空間很重要。

不是每件事都該變成 skill。下面三種情境我會直接寫 prompt：

- **一次性的事**：寫 skill 不划算，丟個 prompt 就好
- **還在摸索要做什麼**：你自己都不知道想要什麼輸出，寫死的 skill 只會把你綁住
- **每次情境都不一樣**：例如給朋友寫生日祝福，每次的人不同、關係不同、想表達的也不同。這種事 skill 會寫得通用而不真誠

Skills 是模式已經穩定後的累積；prompt 是模式還在摸索階段的工具。兩個都需要、兩個用在對的地方。

---

## 收尾：skill 是不起眼的基礎建設

Skills 把 prompt engineering 從一次性消耗，變成可累積的資產。

像寫程式一樣寫 prompt：版本化、模組化、有文件、人工跑過幾遍就是測試。它不是炫技，是不起眼的基礎建設。真正讓人變強的，很少是新工具或新模型，多半是這種一點一點累積的底層。

跟 [上一篇關於 cognitive-ai-memory](/blog/2026-04-29-ai-的記憶不是儲存-是該忘什麼/) 接得起來：那篇講「AI 怎麼記住該記的」，這篇講「我怎麼把自己的工作流記住、沉澱、重用」。一個是系統內部的記憶層，一個是使用者端的 skills 層，本質都是同一件事，把 prompt 從消耗品變成資產。

---

如果你也用 Claude / ChatGPT 但覺得「每次跟它對話像是從頭來過」，從寫一個 skill 開始：選一個你每週做三次以上的事，把它寫成五段 markdown，丟進 `~/.claude/skills/`。第一次用時你會直覺地想再改它。改完那次，你就已經在做 skills design 了。

如果你正在打造自己的 LLM 工作流、或想討論 Claude Code skills 怎麼導入團隊，[歡迎找我聊聊](/about)。
