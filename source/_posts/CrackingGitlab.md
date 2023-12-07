---
abbrlink: CrackingGitlab
categories:
  - 计算机基础
tags:
    - GitLab
    - web服务
    - linux
hidden: true
title: 破解Gitlab
date: 2023-5-23 23:44:26.21
updated: 2023-6-13 18:02:45
---

## 破解Gitlab EE 15

1. 安装gitlab-ee
2. 环境说明
3. 安装必要软件
3.1. 安装ruby
3.2. 安装gitlab-license
4. 破解方法
5. 后记
6. 参考文档
1. 安装gitlab-ee
参考我的文章 鹏叔的技术博客空间 - gitlab安装升级及迁移

2. 环境说明
当前我的gitlab版本及环境如下:

gitlab-ee版本为: 15.8.1-ee

```
$gitlab-rake gitlab:env:info

output:
System information
System:
Proxy:          no
Current User:   git
Using RVM:      no
Ruby Version:   2.7.7p221
Gem Version:    3.1.6
Bundler Version:2.3.15
Rake Version:   13.0.6
Redis Version:  6.2.8
Sidekiq Version:6.5.7
Go Version:     unknown

GitLab information
Version:        15.8.1-ee
Revision:       c49deff6e37
DB Adapter:     PostgreSQL
DB Version:     13.8
URL:            http://gitlab.example.com
HTTP Clone URL: http://gitlab.example.com/some-group/some-project.git
SSH Clone URL:  git@gitlab.example.com:some-group/some-project.git
Elasticsearch:  no
Geo:            no
Using LDAP:     no
Using Omniauth: yes
Omniauth Providers:
```

3. 安装必要软件
3.1. 安装ruby

```bash
#安装ruby：
# 查看ruby版本
yum list ruby --showduplicates | sort -r
#在Centos7.3中，通过yum安装ruby的版本是2.0.0，但是本破解过程需要2.5或以上版本的ruby环境
#所以需要先添加yum源再安装ruby

yum install centos-release-scl-rh
# 会在/etc/yum.repos.d/目录下多出一个CentOS-SCLo-scl-rh.repo源

yum install -y rh-ruby25
# 直接yum安装即可　　

scl enable rh-ruby25 bash    # 必要的一步

# 如果遇到ruby找不到的情况, 修改以下两个环境变量
export PATH=$PATH:/opt/rh/rh-ruby25/root/bin
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/rh/rh-ruby25/root/lib64

ruby -v 
#查看安装版本
# ruby 2.5.9p229 (2021-04-05 revision 67939) [x86_64-linux]

gem -v 
#查看gem安装版本
2.7.6.3
```

3.2. 安装gitlab-license
gem install gitlab-license
4. 破解方法
创建一个rb文件
cd /var/opt/gitlab/backups
cat > license.rb
将如下内容拷贝到license.rb


```bash
    # license.rb
    require "openssl"
    require "gitlab/license"
    key_pair = OpenSSL::PKey::RSA.generate(2048)
    File.open("license_key", "w") { |f| f.write(key_pair.to_pem) }
    public_key = key_pair.public_key
    File.open("license_key.pub", "w") { |f| f.write(public_key.to_pem) }
    private_key = OpenSSL::PKey::RSA.new File.read("license_key")
    Gitlab::License.encryption_key = private_key
    license = Gitlab::License.new
    license.licensee = {
    "Name" => "none",
    "Company" => "none",
    "Email" => "example@test.com",
    }
    license.starts_at = Date.new(2021, 1, 1) # 开始时间
    license.expires_at = Date.new(2050, 1, 1) # 结束时间
    license.notify_admins_at = Date.new(2049, 12, 1)
    license.notify_users_at = Date.new(2049, 12, 1)
    license.block_changes_at = Date.new(2050, 1, 1)
    license.restrictions = {
    active_user_count: 10000,
    }
    puts "License:"
    puts license
    data = license.export
    puts "Exported license:"
    puts data
    File.open("GitLabBV.gitlab-license", "w") { |f| f.write(data) }
    public_key = OpenSSL::PKey::RSA.new File.read("license_key.pub")
    Gitlab::License.encryption_key = public_key
    data = File.read("GitLabBV.gitlab-license")
    $license = Gitlab::License.import(data)
    puts "Imported license:"
    puts $license
    unless $license
    raise "The license is invalid."
    end
    if $license.restricted?(:active_user_count)
    active_user_count = 10000
    if active_user_count > $license.restrictions[:active_user_count]
        raise "The active user count exceeds the allowed amount!"
    end
    end
    if $license.notify_admins?
    puts "The license is due to expire on #{$license.expires_at}."
    end
    if $license.notify_users?
    puts "The license is due to expire on #{$license.expires_at}."
    end
    module Gitlab
    class GitAccess
        def check(cmd, changes = nil)
        if $license.block_changes?
            return build_status_object(false, "License expired")
        end
        end
    end
    end
    puts "This instance of GitLab Enterprise Edition is licensed to:"
    $license.licensee.each do |key, value|
    puts "#{key}: #{value}"
    end
    if $license.expired?
    puts "The license expired on #{$license.expires_at}"
    elsif $license.will_expire?
    puts "The license will expire on #{$license.expires_at}"
    else
    puts "The license will never expire."
    end
```

```bash
#生成 GitLabBV.gitlab-license license_key license_key.pub 这三个文件。

cd /var/opt/gitlab/backups
ruby license.rb

#使用许可证

#首先备份 /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub
cp /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub.backup
#用 license_key.pub 文件替换 /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub 
cp /var/opt/gitlab/backups/license_key.pub /opt/gitlab/embedded/service/gitlab-rails/.license_encryption_key.pub
#修改等级

  --- /opt/gitlab/embedded/service/gitlab-rails/ee/app/models/license.rb
  +++ /opt/gitlab/embedded/service/gitlab-rails/ee/app/models/license.rb
  @@ -367,7 +367,7 @@
  end

  def plan
  -    restricted_attr(:plan).presence || STARTER_PLAN
  +    restricted_attr(:plan).presence || ULTIMATE_PLAN
  end

  def edition
#重启gitlab

 gitlab-ctl restart
```
刚刚ruby license.rb执行后生成的三个文件其中 GitLabBV.gitlab-license 即是许可证，浏览器打开gitlab管理页面 http://${your_gitlab_server_address}/admin/application_settings/general 例如:http://localhost:8080/admin/application_settings/general

展开 add license
勾选Enter license key, 填入license,
勾选terms of service 点击add license按钮,
当看到这段话, 表示成功。The license was successfully uploaded and is now active. You can see the details below.
5. 后记
本技术博客原创文章位于鹏叔的技术博客空间 - 破解Gitlab EE 15, 要获取最近更新请访问原文.

更多技术博客请访问: 鹏叔的技术博客空间

6. 参考文档
破解Gitlab EE
docker安装gitlab-ee并破解
