---
title: "GitHub 如何使用 token authentication"
description: "大家有在使用 GitHub 的，應該都有接收到消息，就是之後都需要用 token authentication 登入，也就是傳統的直接在 CLI 上面輸入帳號密碼去做 GitHub 操作都行不通了，接著這篇文章會來分享怎麼去設定 token authentication"
pubDate: 2021-08-15
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


大家有在使用 GitHub 的，應該都有接收到[消息](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/)，就是之後都需要用 token authentication 登入，也就是傳統的直接在 CLI 上面輸入帳號密碼去做 GitHub 操作都行不通了，接著這篇文章會來分享怎麼去設定 token authentication

<!--more-->

## 設定 SSH 金鑰

我們需要先設定 SSH 金鑰。我們可以透過這個金鑰，讓 GitHub 知道，拿著這個金鑰的是誰，他有沒有權限。所以我們先在自己的電腦產生這把鑰匙

```shell
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/eric/.ssh/id_rsa): # 金鑰存放路徑（直接按 Enter ，使用預設）
Created directory '/home/eric/.ssh'.
Enter passphrase (empty for no passphrase): # 密碼，要不要設定都可以
Enter same passphrase again: # 再輸入一次密碼
The key fingerprint is: # 完成 key 的產生
```

生成金鑰後，我們要複製金鑰 id\_rsa.pub 的內容到 GitHub，指令如下:

```shell
$ cat /home/eric/.ssh/id_rsa.pub # 讀取檔案內容
```

　　接著到 GitHub 的設定頁面，將剛剛複製的金鑰輸入進去

![](../../assets/blog-images/截圖-2021-08-15-下午5.14.39-508x1024.png)

點選 SSH and GPG keys

![](../../assets/blog-images/截圖-2021-08-15-下午5.14.47.png)

點選 New SSH Key

![](../../assets/blog-images/截圖-2021-08-15-下午5.14.53-1024x201.png)

為這把金鑰命名，並且把剛剛複製的金鑰貼上，按下 Add SSH Key 送出確認

假設你原有的專案已經在本地開發好一陣子，而且都是用帳號密碼在 push ，那該如何設定呢？很簡單，我們只需要改 remote

首先我們在我們要使用的 GitHub remote repository 上，點選 code ，改用 SSH ，就會取得一段 remote url

![](../../assets/blog-images/截圖-2021-08-15-下午5.25.00-1024x348.png)

到我們本地的專案下，使用這個指令

```shell
$ git remote set-url origin <剛剛複製的那段 remote url>
```

這樣就完成修改囉！
