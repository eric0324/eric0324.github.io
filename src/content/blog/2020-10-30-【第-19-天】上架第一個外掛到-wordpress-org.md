---
title: "【第 19 天】上架第一個外掛到 WordPress.org"
description: "今天我們不寫任何的 code ，今天我們就很單純的聊聊如何上架一個外掛到 WordPress.org 。"
pubDate: 2020-10-30
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "WordPress"
tags:
  - WordPress
  - PHP
  - Backend
---


今天我們不寫任何的 code ，今天我們就很單純的聊聊如何上架一個外掛到 WordPress.org 。

WordPress.org 為每一個想要開發外掛的開發者免費提供託管的服務，通過這個服務，我們可以：

1. 監控外掛被下載的次數
2. 取得外掛各個版本的使用統計
3. 得到使用者的回饋和評價

WordPress.org 提供了一個 WordPress 外掛的 API，供開發者監控外掛的統計數據。

## 規劃外掛

1、盡可能多的測試 我們要確保外掛已經得到了盡可能多的測試，測試涵蓋了各種情況。

2、選擇一個好名稱 選擇名字的時候，確保沒有侵犯商標或與其他的產品名稱產生衝突。例如，如果你不在 Facebook 工作，你就不應該命名你的外掛為 `Facebook's Dancing Squirrels`，命名為 `Dancing Squirrels for Facebook` 會更好一點。

3、撰寫優秀的程式碼 README.text 文件是最好的開始，因為這個文件是所有外掛的標準參考點，要確保該文件中包含：

1. 簡要描述外掛的實際作用是什麼
2. 安裝說明

4、在 WordPress.org 上發布第一個版本 WordPress.org 外掛目錄是潛在使用者下載和安裝外掛最簡單的方式，把外掛發佈到 WordPress.org 外掛目錄後，你的外掛可以讓使用者通過點擊來下載或更新。

5、擁抱開源 開放程式碼是這個時代最偉大的想法之一，因為他可以跨越國界進行協作。通過鼓勵人們貢獻，你可以讓別人可以和你一樣熱愛你的代碼，下面是幾個開放你源代碼的好地方。

6、傾聽你的使用者 你經常會發現，使用者經常會在比你想像得多得情況下使用你的程式碼，因此這會是個非常有價值的回饋。

7、定期推送新版本 最好的外掛是隨著時間的推移不斷更顯迭代的外掛，每次更新都提供一些小改進，而不用讓用戶等得太辛苦。但是，不斷的更新也會導致用戶很煩！因此，保持一個合適的更新頻率很重要，不要太多，也不要太少。

8、堅持工作 和生活中其他方面一樣，最好的事情來自良好的耐心和努力的工作。

## 如何上架？

### 註冊

想要上傳外掛到 WordPress 官方，首先你要先在 [WordPress.org](https://developer.wordpress.org/) 註冊一個賬戶。點擊右上角的 `Register` 便可以開始註冊

![https://ithelp.ithome.com.tw/upload/images/20200919/20121194qoU7nL7Urw.png](/images/blog/20121194qoU7nL7Urw.png)

### 提交你的外掛

將外掛打包成為一個 zip 文件，[點擊這](https://wordpress.org/plugins/developers/add/)這裡打開頁面，登入後會看到：

![https://ithelp.ithome.com.tw/upload/images/20200919/20121194wr0nw1qKEv.png](/images/blog/20121194wr0nw1qKEv.png)

點擊 `Select File`，選擇剛剛打包的 zip 文件，再點下 `Upload` 按鈕，就可以將你的外掛添加到審核隊列了。

提交完成後，會收到一封來自 WordPress 的信件，提醒你外掛已經成功提交了！

### 修改外掛

在大部分情況下，第一次提交都會有一些問題，這個時候會收到來自審核團隊發送的信件，告訴你你的外掛有什麼問題，然後根據信件的內容去更新程式碼，並將新的程式碼以附件的形式直接回覆給審核團隊即可。

順利完成的話，應該會在新的回復中，得到一個 SVN 倉庫的位址，我們可以使用 SVN 管理軟件將這個倉庫 clone 一份到本地使用。

### 上傳外掛

將倉庫 clone 一份到本地後，會發現外掛備放在 `trunk` 目錄下，還有其他目錄，例如： assets、branches 、tags 目錄，而且底下都沒有文件。

沒錯，我們需要準備一些資料放進去。

#### Banner

我們需要準備一張標準大小的 Banner (772x250)，格式為 png/jpg。以及一張高清大小的 Banner(1544x500)，格式為 png/jpg。

Banner 要放在 `assets` 目錄下，並且 Banner 需要命名為 `banner-772x250.png`、`banner-1544x500.png`。

#### Icon

圖標也需要準備 2 個 png 格式的，或者一個 SVN 格式。

如果要使用 png 格式的，需要準備一個 128x128 的和一個 256x256 的，並且命名為 `icon-128x128.png`、`icon-256x256.png` ，放在 `assets` 目錄下。

如果是 svg 格式的，只需準備一個，文件命名為 `icon.svg` 即可，一樣放在 `assets` 目錄下。

#### Screenshots

截圖文件也同樣要放在 `assets` 目錄下，並將其命名為 `screenshot-1.png` 、`screenshot-2.png`。

### 使用 SVN 上傳

文件放置正確後，執行如下命令，就可以更新新的外掛資訊到官方倉庫了。

```
svn add .
svn commit -m 'upload assets'
```

上傳成功後，就可以在外掛頁面查看到外掛資訊囉。自此我們就順利的發佈第一個外掛了，後續就可以把外掛分享給別人、或者讓別人在 WordPress 後台外掛市集找到並且安裝。
