---
abbrlink: CertificateAttack
categories:
  - 计算机基础
tags:
    - nginx
    - ssl
    - https
    - 互联网安全
title: 如何防御证书攻击
date: 2023-11-24 11:46:05
updated: 
comments: true
---

## 什么是证书攻击，为什么要防御？
&emsp;证书攻击是指攻击者通过穷举IP地址的方式，获取证书信息来找寻需要攻击的网站。  
此举可以无视通常的源站隐藏手段，直接攻击网站的服务器。

## 如何防御？
&emsp;生成一个伪造的证书：
{% tabs 分栏 %}
<!-- tab bash -->
```bash
#!/bin/bash

# 获取脚本所在目录
SCRIPT_DIR=$(dirname "$0")

# 设置证书信息
COMMON_NAME="your_domain.com"
VALID_DAYS=365

# 生成私钥
openssl genpkey -algorithm RSA -out "$SCRIPT_DIR/private.key"

# 生成 CSR (证书签名请求)
openssl req -new -key "$SCRIPT_DIR/private.key" -out "$SCRIPT_DIR/certificate.csr" -config "$SCRIPT_DIR/openssl.cnf" -subj "/CN=$COMMON_NAME"

# 自签名证书
openssl x509 -req -days $VALID_DAYS -in "$SCRIPT_DIR/certificate.csr" -signkey "$SCRIPT_DIR/private.key" -out "$SCRIPT_DIR/certificate.crt"

# 合并私钥和证书为一个文件
cat "$SCRIPT_DIR/private.key" "$SCRIPT_DIR/certificate.crt" > "$SCRIPT_DIR/combined.pem"

# 设置证书和私钥的权限
chmod 600 "$SCRIPT_DIR/private.key" "$SCRIPT_DIR/certificate.crt" "$SCRIPT_DIR/combined.pem"

echo "Certificate and private key generated successfully."

```
<!-- endtab -->
<!-- tab PowerShell -->

```PowerShell
#ssl.ps1
# 获取脚本所在目录
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# 设置证书信息
$CommonName = "your_domain.com"
$ValidDays = 365

# 生成私钥
openssl genpkey -algorithm RSA -out "$ScriptDir/private.key"

# 生成 CSR (证书签名请求)
openssl req -new -key "$ScriptDir/private.key" -out "$ScriptDir/certificate.csr" -config "$ScriptDir/openssl.cnf" -subj "/CN=$CommonName"

# 自签名证书
openssl x509 -req -days $ValidDays -in "$ScriptDir/certificate.csr" -signkey "$ScriptDir/private.key" -out "$ScriptDir/certificate.crt"

# 合并私钥和证书为一个文件
Get-Content "$ScriptDir/private.key", "$ScriptDir/certificate.crt" | Out-File "$ScriptDir/combined.pem"

# 设置证书和私钥的权限
Get-Item "$ScriptDir/private.key", "$ScriptDir/certificate.crt", "$ScriptDir/combined.pem" | ForEach-Object { $_.Attributes = 'Archive' }

Write-Host "Certificate and private key generated successfully."

```
<!-- endtab -->
{% endtabs %}
&emsp;openssl.cnf文件
```cnf
[ req ]
distinguished_name = req_distinguished_name
x509_extensions = v3_ca
prompt = no

[ req_distinguished_name ]
C = CN
ST = BEIJING
L = Tongzhou
O = TEST
OU = IT
CN = YOUR_COMMON_NAME

[ v3_ca ]
basicConstraints = critical,CA:TRUE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid:always,issuer

```
&emsp;最后应用证书：

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    return 444;
}

server {
   listen 443 ssl default_server;
   listen [::]:443 ssl default_server;
   ssl_certificate /ssl/else/certificate.crt;
   ssl_certificate_key /ssl/else/private.key;
   return 444;
}
```
&emsp;最后效果：
![](https://lychee.homura.top/uploads/original/16/a9/19c56f2f1c30b81d8f16cb4d167c.png)
