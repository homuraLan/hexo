---
abbrlink: f60aaf7b
categories:
  - 计算机基础
tags:
    - python
    - conda
    - powershell
    - windows
title: 禁止Conda自动加载base环境
date: 2023-5-23 23:44:26.21
updated: 2023-6-13 18:02:45
---

## 1.1 禁止Conda自动加载base环境
{% tabs 分栏 %}
<!-- tab PowerShell -->
```PowerShell
conda config --se auto_activate_base false
notepad $PROFILE
conda activate python3.8.15
```
<!-- endtab -->
<!-- tab bash -->
```shell
conda config --se auto_activate_base false
cd ~
vim /home/homura/.bashrc
conda activate python3.8.15
```
<!-- endtab -->
{% endtabs %}