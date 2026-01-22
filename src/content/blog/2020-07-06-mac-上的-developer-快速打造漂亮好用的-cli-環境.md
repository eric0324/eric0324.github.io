---
title: "MAC 上的 developer 快速打造漂亮好用的 CLI 環境"
description: "身為程式開發者，很多時間會需要和 CLI 打交道，如果能把環境弄得漂亮又好用，不只是效率可以大大提升，工作起來也比較舒服～這篇文章主要就是紀錄如何用簡單快速的的設定一個漂亮好用的 CLI 環境"
pubDate: 2020-07-06
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "工具介紹"
tags:
  - CLI
  - Terminal
  - Developer Tools
---


身為程式開發者，很多時間會需要和 CLI 打交道，如果能把環境弄得漂亮又好用，不只是效率可以大大提升，工作起來也比較舒服～這篇文章主要就是紀錄如何用簡單快速的的設定一個漂亮好用的 CLI 環境

<!--more-->

總共有以下步驟：

1. 安裝 iTerm2
2. 修改 iTerm2 的 color scheme
3. 安裝 powerline font
4. 安裝 zsh
5. 安裝 oh-my-zsh
6. 安裝 zsh theme: powerlevel9k
7. 設定 powerlevel9k

首先先來**安裝 iTerm2**，先打開 終端機，輸入以下指令

```shell
brew tap caskroom/cask # 如果你從來沒有用過 brew cask 的話需要先跑這行

brew cask instal iterm2 # 安裝 iTerm2
```

安裝好以後，打開 iTerm2 的設定，來修改 Report Terminal Type ：

1. Preferences > Profiles > Terminal > Report Terminal Type
2. 設為 **xterm-256color**

![](/images/blog/截圖-2020-07-06-上午9.53.22-300x200.png)

接著來修改 iTerm2 的 **color scheme**

1. 先 git clone https://github.com/mbadolato/iTerm2-Color-Schemes
2. Preferences > Profiles > Colors > Color Presets... > import
3. 進入剛剛 clone 下來的 iTerm2-Color-Schemes 裡面的 schemes 資料夾裡面，點選一個喜歡的 color scheme

（對了，如果點選了檔案 import 以後是不會立即生效的喔！還要再去 color preset... 再次點選剛剛 import 的 scheme 才會生效）

接著，我們來安裝 **powerline font**

因為我們要用的 theme 會用到很多的特殊 icon，所以 iTerm2 選用的字型必需要支援這種特殊 icon font。這類型的字體統稱為 powerline font，如果沒有安裝的話，之後會有很多 icon 會變框框問號

支援 powerline 的字型很多，我個人喜歡 font-fira-code-nerd-font  
安裝的方法也是推薦直接用 brew 安裝比較快又好管理，安裝指令如下

```shell
brew tap homebrew/cask-fonts
brew cask install font-fira-code-nerd-font
```

如果想要裝別的字型，brew 上面也有很可以挑，可以透過關鍵字 nerd 搜尋

```shell
brew cask list nerd
```

裝完後，也不會自動生效，所以也要記得修改 iTerm2 字型設定

1. Preferences > Profiles > Text > Change Font

再來，我們要**安裝 zsh**，他是一個可以取代 bash 的，很強大的 shell，比 bash 好用幾百倍，一樣用 homebrew 安裝：

```shell
brew install zsh
```

並把 zsh 設定為你的預設 shell：

```shell
sudo sh -c "echo $(which zsh) >> /etc/shells"
chsh -s $(which zsh)
```

安裝 oh-my-zsh

上一步裝完 zsh 後，就可以開始調整我們想要的 command line 外觀設定了，但是原始的 zsh 因為設定太難搞，所以多年前剛出現的時候沒有受到太多關注，直到有人寫了一套叫 oh-my-zsh 的 framework 來幫助大家使用 zsh，zsh 才火了起來。所以我們也來安裝 oh-my-zsh 吧！安裝指令如下

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

執行完以後如果沒有出現什麼錯誤訊息就代表成功了

最後安裝上我很喜歡的一個 theme ，他叫做 powerlevel9k！先把他 clone 下來

```shell
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```

2\. 編輯檔案 ~/.zshrc ，把 ZSH\_THEME 設為 powerlevel9k，並設定要顯示哪些東西在 command line 上：

```
ZSH_THEME="powerlevel9k/powerlevel9k"# command line 左邊想顯示的內容
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir) # <= left prompt 設了 "dir"# command line 右邊想顯示的內容
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(time) # <= right prompt 設了 "time"
```

上面的例子我們把左邊設了一個 dir，右邊設了 time，代表左邊想顯示當前資料夾路徑，右邊顯示時間

任何的 zsh 設定修改過後，還要執行以下指令才會生效

```
exec $SHELL
```

左邊顯示當前資料夾路徑，右邊顯示時間

假設，我們想要有版本控制的資訊，就可以在 POWERLEVEL9K\_LEFT\_PROMPT\_ELEMENTS 加上 vcs

```
# 編輯 ~/.zshrc
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs) # 加上 "vcs"
```

command line 會多了 git branch 以及 git status 資訊，是不是很方便呢～

大概就是這樣，如此一來就可以把自己的 CLI 替換成好用 zsh，並且搭配上厲害的 powerlevel9k theme 美化介面，工作起來可以說是舒服多了，所以記錄一下！
