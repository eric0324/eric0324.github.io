---
title: "Django admin CSS 遺失的問題"
description: "Django 嘗試使用 Nginx + uwsgi 去部署後，出現 admin 的 CSS, Javascript……等，都噴 404"
pubDate: 2018-09-20
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


Django 嘗試使用 Nginx + uwsgi 去部署後，出現 admin 的 CSS, Javascript……等，都噴 404

## 分析

在我的 Django 專案中，setting.py中配置是這樣

```
STATIC_URL ='/static/'
STATICFILES_DIRS =（
    os.path.join（BASE_DIR，“static”），
）
```

## 解決方案決之路

在 `setting.py` 中新增配置 `STATIC_ROOT` ，然後執行 `python manage.py collectstatic`

此時關於 `static` 的配置如下

```
STATIC_ROOT ='/opt/nginx/static/'
STATIC_URL ='/static/'
STATICFILES_DIRS =（
    os.path.join（BASE_DIR，“static”），
）
```

可以看出 `python manage.py collectstatic` 會收集 Django 中所有的靜態資源，並且放到 STATIC\_ROOT 管理訪問

此時，修改 Nginx 中關於 Django 項目的 static 配置為：

```
location /static {
    # alias /project/django/simpleblog/static;
    alias /opt/nginx/static;
}
```

最後 admin 就可以正常用 css 了！
