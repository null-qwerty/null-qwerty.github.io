---
title: 博客搭建（五）配置gitalk评论功能
date: 2024-01-09 15:00:48
tags: 
    - start
excerpt: 介绍如何配置gitalk评论功能
---

{% note success fa-lightbulb %}
**\[2024-10-24\] 更新：本站点评论系统已更换为 waline。**
{% endnote %}


{% note fa-info %}
适用于`hexo`博客，使用`hexo-theme-Redefine`主题。参阅[博客搭建（一）建站](/2023/10/05/%E5%8D%9A%E5%AE%A2%E6%90%AD%E5%BB%BA%EF%BC%88%E4%B8%80%EF%BC%89%E5%BB%BA%E7%AB%99/)。
{% endnote %}

## 1. 注册github应用

首先需要[注册一个github应用](https://github.com/settings/applications/new)：

![github App](https://images.null-qwerty.work/blog/githubApp.png)

其中`Homepage URL`和`Authorization callback URL`都填写博客的域名即可。

点击`Register application`后，会生成一个`Client ID`和一个`Client Secret`，没有`Client Secret`的话点击`Generate a new client secret`即可，这两个值在后面会用到。

## 2. 新建一个仓库

在github上新建一个 **public** 仓库，用于存放评论数据。随便发布一个 issue 用于开启 issues。

## 3. 修改配置

修改 `_config.redefine.yml` 文件的相关配置：

```yml
comment:
  # Whether to enable comment
  enable: true
  # Comment system
  system: gitalk # waline, gitalk, twikoo, giscus
  # System configuration
  config:
    # Gitalk comment system. See https://github.com/gitalk/gitalk
    gitalk:
      clientID: # GitHub Application Client ID
      clientSecret: # GitHub Application Client Secret
      repo:  # GitHub repository
      owner: # GitHub repository owner
      proxy: https://cors-anywhere.null-qwerty.top/?https://github.com/login/oauth/access_token # CORS Proxy
```

`clientID` 和 `clientSecret` 是第一步注册应用时生成的两个值，`repo` 是第二步新建的仓库的名称，`owner` 是仓库的拥有者，一般是自己的用户名。`proxy` 是一个代理，用于解决跨域问题，由于经常被墙，所以可能需要更换。可以在[gitalk的issues](https://github.com/gitalk/gitalk/issues)里找到可能可用的代理，上面配置中是我个人搭建的一个代理，可以试试。

## 4. 可能遇到的问题

- `未找到相关的 issues 进行评论，请联系 @xxx 初始化创建`：点一下下面的`使用 github 登录`按钮即可。如果在部署 gitalk 之前发布过文章，则需要登录后将每篇文章刷新一下，才能正常使用评论功能。
- `Error: Not Found`：没找到仓库，检查名称是否正确。
- `Error: Network Error`：网络错误，检查代理是否可用。