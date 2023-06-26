#!/bin/bash
# Check system distribution
OS='unknown'
if [ -f "/etc/apt/sources.list" ]; then
  # 如果存在 /etc/apt/sources.list 文件，则读取其内容
  sources_list=$(cat /etc/apt/sources.list)
  cp /etc/apt/sources.list /etc/apt/sources.list.bak
  # 判断是否包含 'ubuntu.com' 字符串
  if echo "$sources_list" | grep -q 'ubuntu.com'; then
    sed -i 's/archive.ubuntu.com/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
    apt-get update
    OS='Ubuntu'
  else
    sed -i 's/deb.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
    sed -i 's/security.debian.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apt/sources.list
    apt-get update
    OS='Debian'
  fi
else
  # 如果不存在 /etc/apt/sources.list 文件，则判断是否为 CentOS
  if [ -f "/etc/centos-release" ]; then
    cp /etc/yum.repos.d/*.repo /etc/yum.repos.d/*.repo.bak
    echo "This is a CentOS system."
    sed -i 's|^mirrorlist=|#mirrorlist=|g' /etc/yum.repos.d/*.repo
    sed -i 's|^#baseurl=http://mirror.centos.org|baseurl=https://mirrors.tuna.tsinghua.edu.cn|g' /etc/yum.repos.d/*.repo
    yum makecache
    OS='CentOS'
  else
    echo "Unknown system."
  fi
fi

if $(command -v python &>/dev/null); then
  echo "Python 3 is installed"
  # Set the pip source to Tsinghua University
  python3 -m pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
fi

# 判断是否存在npm环境
if $(command -v npm &> /dev/null); then
    # 判断系统版本并设置npm源
    if [[ "$OS" == "Ubuntu" || "$OS" == "Debian" ]]; then
        npm config set registry https://registry.npm.taobao.org
    elif [[ "$OS" == 'CentOS' ]]; then
        python -mplatform | grep -qi centos && npm config set registry https://registry.npm.taobao.org
    else
        echo "unknown system, please set npm source manually"
    fi
fi

