---
title: "Django 將所有的 app 放到統一的目錄下進行管理"
description: "Django 的 project 寫久了，app 會越來越多，然後就零散在整個專案下，很雜亂，所以研究了一下，能不能將 app 集中放在同個資料夾下面做管理"
pubDate: 2018-03-08
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


Django 的 project 寫久了，app 會越來越多，然後就零散在整個專案下，很雜亂，所以研究了一下，能不能將 app 集中放在同個資料夾下面做管理

看了一下網路上的文章後，方法很簡單

首先在專案資料夾底下新建一個資料夾 `apps`

接著，將設計的好的 app，拖放到 `apps` 中

記得最後要修改 `settings.py` 運行時的的搜尋路徑

```
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) # 在這行底下添加
sys.path.insert(0, os.path.join(BASE_DIR, 'apps'))
```

另外，不要忘記 `import sys`

最後，啟動伺服器 `runserver`，測試看看有沒有設置成功
