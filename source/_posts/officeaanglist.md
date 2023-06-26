---
abbrlink: officeaanglist
categories:
- - 开源
date: '2023-06-13T21:25:28.983913+08:00'
description: null
excerpt: '## 1.1 officeaanglist  GitHub:https://github.com/Sincejunly/officeaanglist GitLab:https://gitlab.homura.top:86/homura/officeaanglist.git  onlyoffice+aria2+AriaNg+AList   可以在AList获得对onlyoffice的支持，含用户权限...'
mathjax: true
tags:
  - 开源
  - docker
  - liunx
title: officeaanglist
updated: 2023-6-13T21:28:2.448+8:0
---
## 1.1 officeaanglist

GitHub:https://github.com/Sincejunly/officeaanglist
GitLab:https://gitlab.homura.top:86/homura/officeaanglist.git

onlyoffice+aria2+AriaNg+AList
### 可以在AList获得对onlyoffice的支持，含用户权限，支持多人编辑
下载docker-compose.yml
更改其中的数据库密码，路径等等，
执行

```
sudo docker-compsoe up -d
```
启动后要等待很长时间，

```
ds:docservice: stoppedds:docservice: startedds:converter: stoppedds:converter: started

* Reloading nginx configuration nginx
  ...done.
```
出现以上内容代表成功，如果提示失败可以执行

```
sudo docker restart officeaanglist
```
删除映射目录app中的文件然后重启可以对容器达到重置效果，首次启动可能会失败重启一次就好了
然后访问，
AList: https://example.com/AList
AriaNg: https://example.com/AriaNg
aria2: https://example.com/aria2
AriaNg配置：https://example.com/aria2/jsonrpc
AList相同
虽然日志会输出AList密码，但未必能看到
获取AList密码：

```
sudo docker exec -it officeaanglist bash
/var/www/app/alist admin
```

已知在没有证书，且不准备外部反代的情况下，无法使用，暂不准备解决


