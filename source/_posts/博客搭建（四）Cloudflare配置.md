---
title: 博客搭建（四）Cloudflare配置
date: 2023-12-12 14:21:56
tags:
    - start
    - Cloudflare
excerpt: 配置 Cloudflare，加速国内访问速度
---

之前使用 Cloudflare 的免费 CDN 服务，但是效果不是很好，查阅资料发现可以通过配置一些选项来加速国内访问速度。

**配置的思路：尽可能让 CDN 保存多的文件。**

## 速度

打开 Cloudflare 仪表盘，左边选择**速度→优化→内容优化**

![内容优化](https://images.null-qwerty.work/blog/%E5%86%85%E5%AE%B9%E4%BC%98%E5%8C%96.png)

设置 `Rocket Loader` 为 `ON`，`Auto Minify` 勾选所有的文件类型

![RocketLoader](https://images.null-qwerty.work/blog/RocketLoader.png)
![AutoMinify](https://images.null-qwerty.work/blog/AutoMinify.png)

{% note info fa-info %}
后续发现 `Rocket Loader` 会导致页面的一些 JS 代码失效，故关闭该功能。
{% endnote %}

## 缓存

打开 Cloudflare 仪表盘，左边选择**缓存→配置**

![缓存配置](https://images.null-qwerty.work/blog/%E7%BC%93%E5%AD%98%E9%85%8D%E7%BD%AE.png)

设置 `Always Online` 为 `On`，`开发模式` 为 `OFF`

![AlwaysOnline](https://images.null-qwerty.work/blog/AlwaysOnline.png)

其他保持默认即可。

## 页面规则

打开 Cloudflare 仪表盘，左边选择**规则→页面规则**，免费版只能添加三条规则，不过对于个人博客来说足够了。

![页面规则](https://images.null-qwerty.work/blog/%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99.png)

页面规则的配置比较随意，可以根据自己的需求来设置，笔者的配置如下：

![创建页面规则](https://images.null-qwerty.work/blog/%E5%88%9B%E5%BB%BA%E9%A1%B5%E9%9D%A2%E8%A7%84%E5%88%99.png)

---
至此配置完成。通过测（乐）速（子）网站的测试，国内访问速度有了明显的提升。

![测速](https://images.null-qwerty.work/blog/%E6%B5%8B%E9%80%9F.png)