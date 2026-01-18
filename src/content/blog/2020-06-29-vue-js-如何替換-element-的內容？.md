---
title: "Vue.js 如何替換 element 的內容？"
description: "今天想要透過 Vue.js 將 HTML  中的一部分 HTML 內容替換掉，所以找了一下網路上的資料"
pubDate: 2020-06-29
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
category: "JavaScript"
tags:
  - Vue.js
  - JavaScript
  - Frontend
---


今天想要透過 Vue.js 將 HTML  中的一部分 HTML 內容替換掉，所以找了一下網路上的資料

Vue 是 MVVM 架構，所以可以將資料保存起來供 view 使用。 要為 HTML 中的 element 替換內容，得先將該區塊使用 v-html

```
<div id="app">
  <span v-html="message"></span>
  <button v-on:click="newHtml">Change HTML</button>
</div>
```

JavaScript 的部分

```
new Vue({
  el: "#app",
  methods: {
    newHtml() {
      this.message = '<p style="color:red;">New Message</p>';
    }
  },
  data: {
    message: "<p>Message</p>"
  }
});
```

但是 html 必須存儲在 vm 中，網路上好像不建議這樣做，所以就先將這問題擱在這裡囉....
