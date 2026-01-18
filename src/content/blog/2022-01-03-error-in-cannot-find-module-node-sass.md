---
title: "ERROR in Cannot find module 'node-sass'"
description: "最近在專案上使用到 node-sass ，安裝的時候一直出錯，出現了 ERROR in Cannot find module 'node-sass'，所以紀錄一下。"
pubDate: 2022-01-03
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "JavaScript"
tags:
  - Node.js
  - Sass
  - Frontend
---


最近在專案上使用到 node-sass ，安裝的時候一直出錯，出現了 \`\``ERROR in Cannot find module 'node-sass'`，所以紀錄一下。

<!--more-->

只要執行的時候，加上一些參數，如下面

```
sudo npm install --save-dev  --unsafe-perm node-sass
```

就可以正常執行了。
