---
title: "關於『Node Sass version 6.0.0 is incompatible with^4.0.0』解法"
description: "之前在 Laravel 使用 sass 的時候，遇到錯誤訊息 Node Sass version 6.0.0 is incompatible with^4.0.0 ，查了一下，問題的原因，其實就是 node-sass 6.0.0版本和 ^4.0.0 不兼容"
pubDate: 2021-07-28
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


之前在 Laravel 使用 sass 的時候，遇到錯誤訊息 `Node Sass version 6.0.0 is incompatible with^4.0.0` ，查了一下，問題的原因，其實就是 node-sass 6.0.0版本和 ^4.0.0 不兼容

<!--more-->

解決方法很簡單，首先我們必須要先移除舊版本的 node-sass，下指令：

```shell
npm uninstall node-sass
```

接著安裝 4.0.0 版本

```shell
npm install node-sass@4.14.1
```

如此一來，就可以順利完成安裝囉！
