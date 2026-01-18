---
title: "在 github 滾回到某個特定的 commit"
description: "和朋友在協作的時候，朋友不小心 push 錯東西，導致需要滾回到先前正確的版本，感覺以後會常常用到，所以記錄下來。"
pubDate: 2016-04-28
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


和朋友在協作的時候，朋友不小心 push 錯東西，導致需要滾回到先前正確的版本，感覺以後會常常用到，所以記錄下來。

首先有先滾回你要的那個 commit id  
`git reset --hard <old-commit-id>`

這時候你會發現你已經退回到你要的那個版本了，再來再把它 push 上去你 GitHub 的 repository 就完成了。

`git push -f <remote-name> <branch-name>`

> 筆記: 這個操作，會複寫 commit id 之後的歷史，所以要謹慎使用。
