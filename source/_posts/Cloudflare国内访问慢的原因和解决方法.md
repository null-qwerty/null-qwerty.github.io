---
title: Cloudflare国内访问慢的原因和解决方法
date: 2024-01-31 22:16:13
tags:
    - Cloudflare
excerpt: 解决使用 Cloudflare CDN 在国内访问速度慢的问题
---
{% note info fa-info %}
笔者最终 [使用了 Cloudflare 的 SaaS 服务](#使用-Cloudflare-SaaS)。
{% endnote %}

## 减速 CDN

虽然 Cloudflare 提供全球 CDN 服务，但是在国内访问的速度非常慢，常被戏称为“减速 CDN”。原因在于，对来自中国大陆的访问，Cloudflare 会将其路由到位于美国的服务器，导致访问速度异常的慢。

至于为什么路由到美国而不是更近的新加坡、日本、中国香港等地，大概是因为亚洲的网络线路的费用更贵吧（）

实际上 Cloudflare 和百度云（后面好像换成了京东云）有合作，在中国有 CDN 服务器的，但这是一种定制服务，作为个人是无法使用的。

![Cloudflare中国网络访问](https://images.null-qwerty.work/blog/Cloudflare中国网络访问.png)

不过我们可以使用别的一些方法自选服务器地址使在中国大陆的访问更快。

## CloudflareSpeedTest

在查阅资料时笔者发现了 [CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest) 这个仓库，他可以返回当前网络连接下，延迟最低的 Cloudflare 服务器。

既然我已经有了 CDN 服务器的 IP，那么我就可以选择这个 CDN 服务器提供服务。

## 配置自选 IP

### 网上查到的方法

首先使用 `CloudflareSpeedTest` 测速，找到延迟最低的 Cloudflare CDN 服务器 IP。例如，笔者在`杭州移动`网络下测到的 IP 如下：

![cdn延迟](https://images.null-qwerty.work/blog/cdn延迟.png)

之后，将域名的 DNS 服务器改成非 Cloudflare 的 DNS 服务器，如笔者改回了阿里云分配的万网 DNS：

```txt
dns27.hichina.com
dns28.hichina.com
```

并在解析中添加 A 记录指向上面测出的低延迟服务器 IP 即可。

![阿里云dns记录](https://images.null-qwerty.work/blog/阿里云dns记录.png)

当然也可以只加一部分。

但是，一段时间过后会收到 Cloudflare 发送的邮件：

> xxx 的名称服务器不再指向 Cloudflare。它们现在指向：
>
> dns27.hichina.com  
> dns28.hichina.com  
> [not set]
>
> 此更改意味着 xxx 不再使用 Cloudflare......

也就是你没有使用 Cloudflare 的 DNS，需要把 DNS 服务器换到它给你的那两个重新开启 Cloudflare 服务。但这么做太麻烦了。  
笔者尝试过将 Cloudflare 的 DNS 和万网 DNS 同时设置，以及在 DNS 解析中添加 NS 记录指向 Cloudflare DNS，都无法解决这个问题。

### 修改后的方法

~~考虑到这个博客的访问几乎都来自国内，实际上不用考虑来自国外的访问。所以做出以下改动。~~

~~前两步与上面相同，测速并添加 A 记录，但是 DNS 不动，保持使用 Cloudflare DNS。~~

~~随后，在 Cloudflare 的 DNS 解析记录中添加 NS 记录：~~

![Cloudflare记录](https://images.null-qwerty.work/blog/Cloudflare记录.png)

对于普通的网站上面方法是可行的，但需要加非常多条 NS 记录，需要把所有子域名都添加 NS 记录指向万网 DNS。但由于笔者使用过 Cloudflare Worker，导致部分子域名无法指向万网 DNS，后续便换回前一种方法。

## 使用 Cloudflare SaaS

由于上述方法在使用过程中并未解决问题，笔者在网上找到了使用 Cloudflare SaaS 的方法。目前笔者正在使用这种方法，效果挺好。

### 准备工作

1. SaaS 虽然有免费方案，但仍然需要一个支付方式，如果没有海外银行卡可以使用 Paypel。
2. 准备第二个域名，用于解析到 Cloudflare SaaS 的 IP。

> 笔者这里使用原域名 `null-qwerty.top` 作为回退源，新域名 `null-qwerty.work` 使用阿里云 DNS 解析到 Cloudflare 的自定义主机名。

### 启用 SaaS

新建 DNS 记录 `cname.yourdomain.com` 指向需要回退的地址。这里笔者的网站和服务均部署在 `vercel` 上，所以指向 `vercel` 的 IP。

![SaaS cname](https://images.null-qwerty.work/blog/SaaS-cname.png)

注意这条记录需要开启 Cloudflare 的代理。

### 配置 SaaS

左侧打开 `SSL/TLS` -> `自定义主机名`，先将刚刚添加的 `cname.yourdomain.com` 填到回退源中，然后添加新的自定义主机名。

![SaaS 自定义主机名](https://images.null-qwerty.work/blog/SaaS-conf.png)
![SaaS 添加自定义主机名](https://images.null-qwerty.work/blog/SaaS-add.png)

添加自定义主机名需要在新域名的 DNS 中添加验证，添加一条 TXT 记录即可：

![SaaS 验证](https://images.null-qwerty.work/blog/SaaS验证.png)

添加完验证记录，再添加一条 CNAME 记录指向回退源：

![SaaS 验证](https://images.null-qwerty.work/blog/SaaS验证2.png)


配置完成。

![SaaS 验证](https://images.null-qwerty.work/blog/SaaS验证3.png)

### 解释

通过 CNAME 的方式指向 Cloudflare 而非固定 IP，这样可以利用 Cloudflare 的泛播自动找到最快的边缘服务器（虽然仍在海外），大大增加了访问速度。相比与上一种方法来说，这种方法更加稳定，而且步骤也更少。

{% note info fa-circle-info %}
笔者在测试的时候发现，移动网络下大概率会解析失败，但是联通和电信网络下都能正常解析。这个问题可能是由于移动网络中 Cloudflare 的泛播地址(1.1.1.1) 被占用导致的。仍需进一步测试。
{% endnote %}

