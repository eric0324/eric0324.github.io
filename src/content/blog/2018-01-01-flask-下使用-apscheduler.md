---
title: "Flask 下使用 APscheduler"
description: "因為工作關係，目前執行的專案是採用 flask，因為要做工作的排程，所以用了 APscheduler 這個模組。"
pubDate: 2018-01-01
heroImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=630&fit=crop"
---


因為工作關係，目前執行的專案是採用 flask，因為要做工作的排程，所以用了 APscheduler 這個模組。

在 flask 下，如果要使用 APscheduler 可以考慮使用 flask 延伸模組 [flask-apsheduler](https://github.com/viniciuschiele/flask-apscheduler)

## 基本使用方法

```
  from flask import Flask
from flask_apscheduler import APScheduler

class Config(object):
    JOBS = [
        {
            'id': 'job1',
            'func': 'jobs:job1',
            'args': (1, 2),
            'trigger': 'interval',
            'seconds': 10
        }
    ]

    SCHEDULER_API_ENABLED = True

def job1(a, b):
    print(str(a) + ' ' + str(b))

if __name__ == '__main__':
    app = Flask(__name__)
    app.config.from_object(Config())

scheduler = APScheduler()
# it is also possible to enable the API directly
# scheduler.api_enabled = True
scheduler.init_app(app)
scheduler.start()
app.run()
```

## 一些心得

這個專案是跑在 ubuntu 加上 gunicorn，在使用 gunicorn 的時候，定時任務會重複啟動很多次，找了一下網路上的資源，問題在使用 gunicorn 對 flask 應用進行控制的時候如果設置了 gunicorn 的 `--worker` 參數大於 `1` 時，會出現一個定時任務執行多次的問題，此時要給 gunicorn 提供一個額外的 `--preload` 參數，這樣 flask 的 app 在 run 定時任務就只會執行一次。

```
env/bin/gunicorn module_containing_app:app -b 0.0.0.0:8080 --workers 3 --preload
```

還有，當 flask 在 debug 模式下使用 flask-apscheduler 定時任務時也會執行多次，問題與上面的問題類似，只要在 debug 模式下給 `app.run()` 添加一個參數 `use_reloader` 即可。

```
app.run(debug=True, use_reloader=False)
```
