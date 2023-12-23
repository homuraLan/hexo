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
```bash
.
├── bin
├── config.yml
├── data
├── go-cqhttp.bat
├── go-cqhttp.exe
├── java
├── jre
├── lib
├── logs
├── nohup.out
├── Start_Qsign.bat
├── Start_Qsign.sh
├── txlib
└── txlib_version.json
```
# MCL 
## 所需插件
[fix-protocol-version-1.13.0.mirai2](https://github.com/cssxsh/fix-protocol-version/releases)
## 推荐配置
```json
#KFCFactory.json
    "8.9.88": {
        "base_url": "http://127.0.0.1:13579",
        "type": "fuqiuluo/unidbg-fetch-qsign",
        "key": "1145141919810"
    }
```
### 额外操作
将txlib/8.9.88内文件的*.json文件复制到MCL的根目录
### 建议
Qsign8.9.88，其它默认即可
安卓手机,安卓平板协议测试通过，机器人登陆时不要使用其它设备登陆
## 链接
这种东西我不知道啦

# go-cqhttp
## 启动方式
1. 解压包
2. 使用最新版go-cqhttp deb包，直接在包的目录执行go-cqhttp
3. 启动Qsign进行配置，全部默认
### 建议
Qsign8.9.88，其它默认即可
安卓手机,安卓平板协议测试通过，机器人登陆时不要使用其它设备登陆