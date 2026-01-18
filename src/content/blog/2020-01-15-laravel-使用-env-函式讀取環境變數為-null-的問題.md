---
title: "Laravel 使用 env 函式讀取環境變數為 null 的問題"
description: "在 Laravel 專案中，如果執行了 php artisan config:cache 命令把配置檔案快取起來後，在使用 env 函式讀取環境變數的值，會變成 null，但是執行 php artisan config:clear，清除配置快取後，又可以讀取了，就覺得很奇怪"
pubDate: 2020-01-15
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


在 Laravel 專案中，如果執行了 `php artisan config:cache` 命令把配置檔案快取起來後，在使用 `env` 函式讀取環境變數的值，會變成 null，但是執行 `php artisan config:clear`，清除配置快取後，又可以讀取了，就覺得很奇怪

看了一下，得知在 Laravel 中，如果執行 `php aritisan config:cache` 命令後，Laravel 就會把 `app/config` 目錄下的所有配置檔案快取到 `bootstrap/cache/config.php` 裡面。正因為有了這個快取配置檔案，在其他地方使用 `env` 函式，就會讀取不到環境變數，所以返回 `null`.

接著看一下 `Illuminate/Foundation/Bootstrap/DetectEnvironment.php` 的這段程式碼：

```
public function bootstrap(Application $app) {
    if (! $app->configurationIsCached()) {
        $this->checkForSpecificEnvironmentFile($app);
        try {
            (new Dotenv($app->environmentPath(), $app->environmentFile()))->load();
        } catch (InvalidPathException $e) {
            //
        }
    }
}
```

這個方法在框架啟動後就會執行，這段程式碼說明了如果存在快取配置檔案，就不會去設定環境變數了

，配置都讀快取配置檔案，而不會再讀環境變數了。因此，如果做快取，一旦執行 `php artisan config:cache` 之後，`env` 函式就不起作用了
