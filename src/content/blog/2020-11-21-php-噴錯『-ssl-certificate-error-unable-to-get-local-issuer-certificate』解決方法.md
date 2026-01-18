---
title: "PHP 噴錯『 SSL certificate error: unable to get local issuer certificate』解決方法"
description: "在寫 Laravel 的時候，有時候會需要請求外部的 request ，如果請求的是 https ，就有可能會噴出 SSL certificate error: unable to get local issuer certificate"
pubDate: 2020-11-21
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


在寫 Laravel 的時候，有時候會需要請求外部的 request ，如果請求的是 https ，就有可能會噴出 `SSL certificate error: unable to get local issuer certificate`

<!--more-->

網路上大多都是 windows 的解法，今天來分享一下 mac 怎麼解。

我們可以先去 [http://curl.haxx.se/ca/cacert.pem](http://curl.haxx.se/ca/cacert.pem) 下載一份 cacert.pem

假設我的開發環境是 AMPPS 那就把剛剛的 cacert.pem 丟到 `/Applications/AMPPS/extra/etc/openssl/certs/`

然後去更新 \`php.ini\`

```
[curl]
; A default value for the CURLOPT_CAINFO option. This is required to be an
; absolute path.
curl.cainfo="/Applications/AMPPS/extra/etc/openssl/certs/cacert.pem"
openssl.cafile="/Applications/AMPPS/extra/etc/openssl/certs/cacert.pem"
```

這樣大致上就完成囉！
