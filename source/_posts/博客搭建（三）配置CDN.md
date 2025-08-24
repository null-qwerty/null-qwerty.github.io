---
title: 博客搭建（三）配置CDN
tags:
  - start
  - Cloudflare
excerpt: 给博客配置 CDN，方便国内访问
date: 2023-10-06 19:35:01
---

github pages 的服务器在国外，国内访问速度较慢。笔者尝试过免费的 CDN，如 staticfile、cdnjs，但是效果不是很好。 
之后看到了 [cloudflare](https://www.cloudflare.com/)，有免费的CDN，准备上手尝试。

> 需要的工具：
> - 一个域名
> - 一个 github pages 的博客
> - 一个 cloudflare 的账号

## cloudflare 的配置
注册 cloudflare 账号，添加域名
![cloudflare](https://images.null-qwerty.work/blog/cloudflare.jpg)
![设置域名](https://images.null-qwerty.work/blog/%E8%AE%BE%E7%BD%AE%E5%9F%9F%E5%90%8D.jpg)
cloudflare 会自动扫描域名的 DNS 记录，添加 A 记录和 CNAME 记录，如果没有，手动添加 
### 手动添加 DNS 记录
边栏里选择 DNS->记录->添加记录 
A 记录指向 github pages 的服务器 ipv4 地址，地址如下：
```bash
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```
个人博客具体的服务器地址可通过 `ping username.github.io` 获取
CNAME 记录指向 github pages 的域名，即 `username.github.io`

## 更改域名的 DNS 服务器
更改域名的 DNS 服务器为 cloudflare 的 DNS 服务器。笔者的域名在阿里云上购买注册，其它域名注册商的操作应该类似。
![更改DNS](https://images.null-qwerty.work/blog/%E5%90%8D%E7%A7%B0%E6%9C%8D%E5%8A%A1%E5%99%A8.jpg)
![更改DNS 2](https://images.null-qwerty.work/blog/%E5%90%8D%E7%A7%B0%E6%9C%8D%E5%8A%A1%E5%99%A82.jpg)

## github pages 的配置
在 github pages 的仓库中添加 CNAME 文件，内容为自己的域名，如 `www.example.com`，然后在仓库的设置中添加自定义域名，如下图：
![github pages](https://images.null-qwerty.work/blog/github.jpg)
等待出现图上提示的`DNS check successful`，即可访问自己的域名了。
{% note default fa-info %}
若出现 ERROR 提示，检查 cloudflare 是否添加记录，如果已添加可能是 DNS 服务器还没有更新，等待一段时间再试。
{% endnote %}

## enforce https
在 cloudflare 的 SSL/TLS 中设置 `Always Use HTTPS` 为 `On`，这样就可以强制使用 https 了。