---
abbrlink: CrackingGitlab
categories:
  - 计算机基础
tags:
    - GitLab
    - web服务
    - linux

title: Gitlab&Pypi
date: 2023-12-10 02:51:38
updated: 2023-12-10 02:51:43
---

# 极狐gitlab python pypi packages 仓库使用

官方文档：[PyPI packages in the Package Registry | GitLab](https://docs.gitlab.com/ee/user/packages/pypi_repository/#using-gitlab-ci-with-pypi-packages)

使用到工具：
pip
twine
限制：

package 包大小最大 5GB
不能多次上传同一 version 的包，会收到 400 错误


1. 创建 package
1.1 创建 python 项目
添加文件


```bash
touch __init__.py
touch greet.py
```

```python
#greet.py 添加内容：

def SayHello():
    print("Hello from MyPyPiPackage")
    return

#__init__.py 添加内容:
from .greet import SayHello
```

1.2 创建 package
添加 setup.py：
```python
import setuptools

setuptools.setup(
    name="mypypipackage",
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="A small example package",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)
```

执行命令：
```bash
python3 setup.py sdist bdist_wheel

#完成后会在 dist 目录生成目标文件：

ls dist

mypypipackage-0.0.1-py3-none-any.whl mypypipackage-0.0.1.tar.gz
```

下一步就是把目标文件发布的 package 仓库

2. 上传到 package 仓库
上传前需要登陆到极狐gitlab package 仓库，登陆到 package 仓库有 3 种方式：

Personal access tokens 设置 api 权限

Deploy tokens 设置 read_package_registry、write_package_registry 权限

CI job token

2.1 使用 personal access token
创建配置文件 ~/.pypirc：
```pypirc
[distutils]
index-servers =
    gitlab

[gitlab]
repository = https://gitlab.example.com/api/v4/projects/<project_id>/packages/pypi
username = <your_personal_access_token_name>
password = <your_personal_access_token>
```
其中 <project_id> 是项目 url 编码路径，比如 group%2Fproject，也可以是项目 ID
上传到 package 仓库：
```bash
python3 -m twine upload --repository gitlab dist/*
```
2.2 使用 deploy token
创建配置文件 ~/.pypirc：
```
[distutils]
index-servers =
    gitlab

[gitlab]
repository = https://gitlab.example.com/api/v4/projects/<project_id>/packages/pypi
username = <deploy token username>
password = <deploy token>
```
其中 <project_id> 是项目 url 编码路径，比如 group%2Fproject，也可以是项目 ID
上传到 package 仓库：

```bash
python3 -m twine upload --repository gitlab dist/*
```

2.3 使用 ci job token
.gitlab-ci.yml 示例：
```yml
image: python:latest

variables:
  PIP_CACHE_DIR: "$CI_PROJECT_DIR/.cache/pip"

cache:
  paths:
    - .cache/pip/
  key: $CI_PROJECT_ID

run:
  script:
    - pip install twine
    - python setup.py sdist bdist_wheel
    - TWINE_PASSWORD=${CI_JOB_TOKEN} TWINE_USERNAME=gitlab-ci-token python -m twine upload --repository-url ${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/packages/pypi --verbose dist/*
```
当然也可以创建配置文件 ~/.pypirc：
```
[distutils]
index-servers =
    gitlab

[gitlab]
repository = https://gitlab.example.com/api/v4/projects/${env.CI_PROJECT_ID}/packages/pypi
username = gitlab-ci-token
password = ${env.CI_JOB_TOKEN}
```

2.4 查看上传的 package
项目 > Packages & Registries > Package Registry
![](https://lychee.homura.top/uploads/original/1b/1c/030b0008bb92ad4e82246466cfa4.png)

注意：上传到项目仓库时，组仓库也是可以看到并使用的
![](https://lychee.homura.top/uploads/original/24/cd/ca7010282424b911f57d0e3e947c.png)

3. 使用 package
从极狐gitlab v14.2 版本开始，如果在 package 未在 package 仓库中找到，则请求会重定向到 pypi.org

当然可以在系统设置中关闭重定向：admin > settings > CI/CD > Package Registry > Forward PyPI package requests to the PyPI Registry if the packages are not found in the GitLab Package Registry

3.1 从项目级别安装
```bash
pip install --index-url https://<personal_access_token_name>:<personal_access_token>@gitlab.example.com/api/v4/projects/<project_id>/packages/pypi/simple --no-deps #<package_name>
#<package_name> 包名称

#<personal_access_token_name> 个人 token 名称，权限 read_api

#<personal_access_token> 个人 token

#<project_id> 是项目 url 编码路径，比如 group%2Fproject，也可以是项目 ID

#安装 mypypipackage 命令为：

pip install mypypipackage --no-deps --index-url https://<personal_access_token_name>:<personal_access_token>@gitlab.example.com/api/v4/projects/<your_project_id>/packages/pypi/simple
```

3.2 从组级别安装

```bash
pip install --index-url https://<personal_access_token_name>:<personal_access_token>@gitlab.example.com/api/v4/groups/<group_id>/-/packages/pypi/simple --no-deps <package_name>
#<package_name> 包名称

#<personal_access_token_name> 个人 token 名称，权限 read_api

#<personal_access_token> 个人 token

#<group_id> 组 ID

#安装 mypypipackage 命令为：

pip install mypypipackage --no-deps --index-url https://<personal_access_token_name>:<personal_access_token>@gitlab.example.com/api/v4/groups/<your_group_id>/-/packages/pypi/simple
```