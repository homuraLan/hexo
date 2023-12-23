---
abbrlink: Qsign
categories:
  - QQ机器人
tags:
    - go-cqhttp
    - java
    - bash
title: Qsign双端一键包
date: 2023-12-22 16:39:00
updated: 
---
# 目录示例
```tree
.
├── bin
├── config.yml
├── data
├── device.json
├── go-cqhttp
├── go-cqhttp.bat
├── go-cqhttp.exe
├── go-cqhttp.sh
├── java
├── jre
├── lib
├── logs
├── nohup.out
├── README.md
├── Start_Qsign.bat
├── Start_Qsign.sh
├── txlib
└── txlib_version.json
```
# MCL 
## 所需插件
[fix-protocol-version-1.13.0.mirai2](https://github.com/cssxsh/fix-protocol-version/releases)
[mirai-login-solver-sakura-0.0.12.mirai2](https://github.com/KasukuSakura/mirai-login-solver-sakura)
## 推荐配置
```json
#KFCFactory.json
    "8.9.58": {
        "base_url": "http://127.0.0.1:13579",
        "type": "fuqiuluo/unidbg-fetch-qsign",
        "key": "1145141919810"
    }
```
### 建议
Qsign8.9.58，其它默认即可
手机协议测试通过，机器人登陆时不要使用其它设备登陆
## 链接
这种东西我不知道啦

# go-cqhttp
## 推荐配置
```conf
  #config.yml
  sign-servers: 
    - url: 'http://127.0.0.1:13579'  # 主签名服务器地址， 必填
      key: '1145141919810'  # 签名服务器所需要的apikey, 如果签名服务器的版本在1.1.0及以下则此项无效
      authorization: '-'   # authorization 内容, 依服务端设置，如 'Bearer xxxx'
```
```bash
#!/bin/bash

# 启动go-cqhttp
./go-cqhttp -faststart

```