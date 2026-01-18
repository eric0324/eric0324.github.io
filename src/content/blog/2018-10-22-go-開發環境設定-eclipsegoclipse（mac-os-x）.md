---
title: "Go 開發環境設定 Eclipse+GoClipse（Mac OS X）"
description: "因為工作上需要，所以最近開始摸 Go。加上研究所考試也差不多告一個段落，因此最近也可能會比較頻繁的更新 Go 相關的文章。"
pubDate: 2018-10-22
heroImage: "https://i.imgur.com/aR2bG4K.png"
category: "工具介紹"
tags:
  - Go
  - IDE
  - Development
---


因為工作上需要，所以最近開始摸 Go。加上研究所考試也差不多告一個段落，因此最近也可能會比較頻繁的更新 Go 相關的文章。

## 環境

- MacOS X 10.10.2
- Go 1.4.2
- Eclipse 4.4 (Eclipse IDE for Java EE Developers)
- GoClipse 0.9.1

本文建置時間在 2017 年 03 月左右，如果過太久本文可能會失效，若您使用環境不同，可能會有不同的結果，但基本上都可以按照此流程。然後，我以一個完全不懂的角度寫這篇文章，除了幫助自己記憶之外，希望能夠幫到跟我遇到同樣問題的人。

## 安裝和設定 Go

- 這邊我使用 [Homebrew](https://brew.sh/index_zh-tw.html) 去安裝 go

```
brew install go
```

- 下指令version\`\`\`確認一下有沒有成功裝進去。  
    
    ```
    $ go version
    go version go1.4.2 darwin/amd64 #有的話會出現 go 版本
    ```
    

## 環境變數設定

- 為了可以使用 go ，打開你的 bash\_profile ，加上下面幾行

![Imgur](https://i.imgur.com/aR2bG4K.png)

在 \`\`\`src \`\`\`目錄下，創建 go 文件。

```
```go
//src/hello/hello.go
package main

import "fmt"

func main() {
    fmt.Println("Hello world!")
}
```

來跑跑看吧！如果有正確輸出，那就是沒問題了！

![Imgur](https://i.imgur.com/ztpyQcv.png)

參考資料：

- [Goの開発環境 Eclipse+GoClipse（Mac OS X）](http://qiita.com/takanorig/items/13607eca4d13c00f084f)
- [Mac下go语言goclipse插件安装部署](http://www.cnblogs.com/yusenwu/p/5860189.html)
