## 一个hexo镜像
github:https://github.com/Sincejunly/qexo-Fomal-docker
尝试：
    ```
    #docker-compose.yml
    version: '3'
    services:
        hexo:
            image: hexo-docker
            container_name: hexo
            environment:
                repo_url: https://xxxxxx/xxxxx/hexo.git
                email：example@example.com
                user: username
            volumes:
                - /hexo:/hexo
            ports:
                - "4000:4000"
                - "5103:5103"
            command："npm install hexo-hide-posts --save -g" #运行前希望安装的包
    ```
```
docker-compose up -d
```
容器在初始化时会自动从仓库同步一次hexo博客内容。
5103端口会在接收到weihook信号时同步仓库。