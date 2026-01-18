---
title: "新手問題：Fragment 中使用 button setonclicklistener"
description: "自己本身沒有系統的去學習 android，就是想到什麼做什麼的，今天在自學的過程中發現了一些問題。"
pubDate: 2016-04-26
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


自己本身沒有系統的去學習 android，就是想到什麼做什麼的，今天在自學的過程中發現了一些問題。

就是說用 fragment 按鈕點擊的時候碰到了問題。在寫完之後，AS 沒有任何報錯，但是啟動的時候就會 crash 掉。

```
cal = (Button) findViewById(R.id.submit);
cal.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        // do something ...
    }
});
```

此時我們的程式碼是正常的，但是運行後就會 crash，我們必須要在讓他 implements view.oncilcklisrener。

```
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {
    public static void main(String args[]) {

        // String to be scanned to find the pattern.
        String line = "This order was placed for QT3000! OK?";
        String pattern = "(.*)(\\d+)(.*)";

        // Create a Pattern object
        Pattern r = Pattern.compile(pattern);

        // Now create matcher object.
        Matcher m = r.matcher(line);
        if (m.find()) {
            System.out.println("Found value: " + m.group(0));
            System.out.println("Found value: " + m.group(1));
            System.out.println("Found value: " + m.group(2));
        } else {
            System.out.println("NO MATCH");
        }
    }
}
```
