---
title: "第一次在 Mac 安裝 Metabase 就上手"
description: "今天嘗試安裝 metabase 在自己的 Mac 上面（作業系統是 macOS Monterey），有兩種主要的方式可以去做安裝。可以透過官方打包好的 jar 檔案去跑在自己的電腦上，也可以透過 Cloud Platforms 的方式去安裝使用。"
pubDate: 2022-03-07
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


今天嘗試安裝 metabase 在自己的 Mac 上面（作業系統是 macOS Monterey），有兩種主要的方式可以去做安裝。可以透過官方打包好的 jar 檔案去跑在自己的電腦上，也可以透過 Cloud Platforms 的方式去安裝使用。

<!--more-->

因為只有要在本機測試，所以我直接拿官方打包好的 jar 檔案，加上有點不想去碰 docker ，所以我就直接在自己的電腦跑。

## 安裝 Brew

我們會用套件管理工具來安裝 temurin ，所以要先裝上 brew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## 安裝 temurin

接著我們要安裝 Eclipse 提供的 _Temurin_ OpenJDK，才可以跑 Jar 檔案

```shell
brew install temurin
```

## 安裝 metabase

首先，我們要先下載官方提供的 Jar 檔案：[下載連結](https://metabase.com/start/jar.html)

下載後，我們可以用 java 這個指令去初始化 Metabase

```shell
java -jar metabase.jar
```

順利跑起來之後，預設的 port 是 3000 ，所以我們可以透過瀏覽器打開 localhost:3000 ，進入 Metabase 的安裝畫面。

跟著安裝畫面，一步一步的安裝就可以完成設定囉！
