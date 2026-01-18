---
title: "在 Raspberry pi 3 上面使用 waveshare 3.5 吋 TFT 螢幕"
description: "在 Raspberry pi 3 可以直接透過 HDMI 輸出畫面到螢幕上，目標是做出小型遊戲機，因此我們要使用 retropie 這個 O.S.。必較麻煩的是，要額外將 3.5 吋 TFT 螢幕接到 Raspberry pi 的 GPIO 腳位。"
pubDate: 2016-08-20
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "技術筆記"
tags:
  - Raspberry Pi
  - Hardware
  - Linux
---


在 Raspberry pi 3 可以直接透過 HDMI 輸出畫面到螢幕上，目標是做出小型遊戲機，因此我們要使用 retropie 這個 O.S.。必較麻煩的是，要額外將 3.5 吋 TFT 螢幕接到 Raspberry pi 的 GPIO 腳位。

我一開始撞牆滿多次，不過其實滿簡單的，所以就紀錄一下實作方法。

- 首先預備工作，要先下載三個檔案：
    - 下載 [TFT 螢幕驅動程式](http://www.waveshare.net/w/upload/7/73/LCD-show.tar.gz)
    - 下載 [fbcp 套件包](https://github.com/tasanakorn/rpi-fbcp/archive/master.zip)
    - 為了讓驅動程式可以在 retropie 上運行 下載[驅動程式的解決方法](https://drive.google.com/open?id=0B2MD7C4KUaERYXY5STdEWDdyQTg)
- 將上面三個檔案都丟到 `/home/pi` 路徑下。
- 要進行 SPI 設定
    - 在 terminal 上輸入 `sudo raspi-config`
    - 進入 `advances settings` ，開啟 `spi`
- 在 terminal 上執行 `tar xvf LCD-show.tar` ，來解壓縮檔案
- 編譯 fbcp
    - 執行 `cd fbcp` 進入 `fbcp` 資料夾
    - 執行 `sudo mkdir build` 創建資料夾
    - 執行 `cd ./build` 進入 `build` 資料夾
    - 執行 `sudo cmake ..`
    - 執行 `sudo make`
- 到這步已經差不多了，接著只要執行 `sudo bash /home/pi/driver_workaround.sh`，此時會看到螢幕由白變黑。
- 最後，執行 `sudo /home/pi/rpi-fbcp/build/fbcp &`，就會看到畫面了。

備註：這次我是採用 3.5 吋 LCD 螢幕, 所以無法確定其他尺寸的 GPIO LCD 螢幕，是否可以運作。
