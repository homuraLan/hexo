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
updated: 2023-12-28 01:38:52
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
# 链接
https://gitlab.homura.top:70/homura/qsign-onekey.git

# 更改版本方式
删除生成的`txlib_version.json`,重新生成你要的版本。

# MCL 
## 所需插件
[fix-protocol-version-1.13.0.mirai2](https://github.com/cssxsh/fix-protocol-version/releases)
## 启动方式
0. 先启动qsign-onekey再启动MCL
1. `git clone https://gitlab.homura.top:70/homura/qsign-onekey.git`
2. cd qsign-onekey
3. `./Start_Qsign.bat` 或者 `./Start_Qsign.sh`

<!-- ## 推荐配置
```json
#KFCFactory.json
    "8.9.88": {
        "base_url": "http://127.0.0.1:13579",
        "type": "fuqiuluo/unidbg-fetch-qsign",
        "key": "1145141919810"
    }
``` -->
<!-- ### 额外操作
将txlib/8.9.88内文件的*.json文件复制到MCL的根目录 -->
### 建议
Qsign8.9.58，其它默认即可
安卓手机,安卓平板协议测试通过，机器人登陆时不要使用其它设备登陆


# go-cqhttp
## 启动方式
0. 先启动go-cqhttp生成文件配置文件后再启动qsign-onekey
1. `git clone https://gitlab.homura.top:70/homura/qsign-onekey.git`
2. 使用最新版go-cqhttp deb包，直接在包的目录执行go-cqhttp
3. `./Start_Qsign.sh` 或者 `./Start_Qsign.bat`
### 建议
Qsign8.9.58，其它默认即可
安卓手机,安卓平板协议测试通过，机器人登陆时不要使用其它设备登陆
{% wow animate__heartBeat,,5s,,10 %}
{% note red 'fas fa-battery-half' modern%}
`go-cqhttp`已经被放弃维护，不能够并发大量消息，使用时请注意。
{% endnote %}
{% endwow %}