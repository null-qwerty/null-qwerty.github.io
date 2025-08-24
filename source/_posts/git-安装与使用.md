---
title: git 安装与使用
date: 2024-10-17 11:05:28
tags: 
- git
excerpt: git 的安装与基本操作
---
{% note info fa-info %}
本文中开发环境为 ubuntu 24.04，其他系统的安装可能会有所不同，仅供参考。
{% endnote %}

## 为什么使用 git

git 是一个分布式**版本控制系统**，可以有效的管理代码，方便团队协作，提高开发效率。在开发过程中，我们经常会遇到以下问题：

- 代码丢失
- 代码冲突
- 代码版本混乱
- 代码备份不及时
- 代码合并困难

等等，这些问题都可以通过 git 来解决。

## 安装 git

与大多数软件一样，我们可以使用 apt 来安装 git：

```bash
sudo apt install git -y
```

安装完成后，可以使用以下命令查看 git 的版本：

```bash
git --version
```

输出：
```bash
git version 2.43.0
```

## 配置 git

安装完成后，我们需要配置 git，配置的内容包括用户名和邮箱：

```bash
git config --global user.name "yourname"
git config --global user.email "email@example.com"
```

其中 `--global` 表示全局配置，如果只想对当前仓库配置，可以去掉 `--global`，这样**只对当前仓库生效**。一般情况下，我们都是全局配置。

## git 基本操作

{% note tip fa-lightbulb %}
[git 练习网站](https://learngitbranching.js.org/)
{% endnote %}
### 创建仓库

在本地创建一个新的仓库，可以使用以下命令：

```bash
git init
```

这个命令会在当前目录下创建一个 `.git` 文件夹，这个文件夹是 git 用来管理版本的核心。

### 克隆仓库

如果我们想要克隆一个远程仓库到本地，可以使用以下命令：

```bash
git clone <url>
```

`url` 是远程仓库的地址，可以是 `https` 或者 `ssh` 协议。

例如：
```bash
git clone https://github.com/null-qwerty/null-qwerty.git
```

会将我的 github 主页克隆到本地。

### 添加文件

在 git 中，我们需要将**修改过的文件**添加到暂存区，然后再提交到仓库。添加文件到暂存区可以使用以下命令：

```bash
git add <filename>
```

如果想要添加所有文件，可以使用：

```bash
git add .
```

`filename` 可以是文件名，也可以是目录名，可以使用通配符。

### 提交文件

将暂存区的文件提交到仓库，可以使用以下命令：

```bash
git commit -m "message"
```

`message` 是提交的信息，可以是任意字符串，一般情况下，我们会写上这次提交的内容。如果不加 `-m` 参数，会进入一个编辑器，让我们输入提交信息。

提交规范请参考[commit 规范](#commit-规范)。

{% note warning fa-circle-exclamation %}
提交信息是必须的，如果不写提交信息，会提交失败。
{% endnote %}

### 撤销提交

如果我们提交了错误的代码，或者想要撤销提交，可以使用以下命令：

```bash
git reset --hard <commit>
```

`commit` 是提交的哈希值，可以使用 `git log` 查看，也可以填写分支名。

### 查看状态

查看当前仓库的状态，可以使用以下命令：

```bash
git status
```

这个命令会显示当前仓库的状态，包括**已修改的文件**，**已暂存的文件**，**未跟踪的文件**等。

查看单个文件的修改情况，可以使用：

```bash
git diff <commit> <filename>
```

`commit` 是提交的哈希值，可以使用 `git log` 查看，也可以填写分支名，`filename` 是文件名。

比较两个提交之间的差异，可以使用：

```bash
git diff <commit1> <commit2>
```

### 查看提交记录

查看提交记录，可以使用以下命令：

```bash
git log
```

这个命令会显示当前仓库的提交记录，包括**提交者**，**提交时间**，**提交信息**等。


### 分支操作

在 git 中，分支是一个非常重要的概念，我们可以使用分支来进行**并行开发**，**版本控制**等。

分支操作中有以下几个重要的概念：

- HEAD：指向当前分支的指针
- origin：远程仓库
- branch：分支

查看当前分支，可以使用：

```bash
git branch
```

这个命令会显示当前仓库的所有分支，当前分支会有一个 `*` 标记。

创建分支，可以使用：

```bash
git branch <branchname>
```

`branchname` 是分支名。

切换分支，可以使用：

```bash
git checkout <branchname>
```

合并分支，可以使用：

```bash
git merge <branchname>
```

会将 `branchname` 分支合并到当前分支。

删除分支，可以使用：

```bash
git branch -d <branchname>
```

### 远程操作

在 git 中，我们可以将本地仓库推送到远程仓库，也可以从远程仓库拉取代码。

推送代码到远程仓库，可以使用：

```bash
git push origin <branchname>
```

这条命令会将当前分支暂存的提交推送到远程仓库的 `branchname` 分支。
如果不填写 `branchname`，会将当前分支推送到远程仓库的当前分支，此时可以简写为`git push`;  
如果远程仓库没有当前分支，会自动创建。

{% note warning fa-circle-exclamation %}
请注意，推送代码到远程仓库是一个危险的操作，一定要谨慎操作。
{% endnote %}

{% note danger fa-triangle-exclamation %}
禁止使用 `git push -f`，这个命令会强制推送代码，会覆盖远程仓库的代码。
{% endnote %}

拉取代码，可以使用：

```bash
git pull origin <branchname>
```

这条命令会将远程仓库的 `branchname` 分支拉取到本地仓库。
如果不填写 `branchname`，会拉取远程仓库的当前分支，此时可以简写为`git pull`。

拉取代码时，本地暂存区不能有未提交的修改，否则会拉取失败。可以使用 `git stash` 命令将本地暂存区的修改暂存起来，合并之后再使用 `git stash pop` 恢复。

### tag 操作

在 git 中，我们可以使用 tag 来标记一些重要的提交，例如版本发布等。

创建 tag，可以使用：

```bash
git tag <tagname>
```

`tagname` 是 tag 的名字。git 会默认将 tag 标记在最新的提交上，并自动创建一个轻量标签。

如果想要在之前的提交上创建 tag，可以使用：

```bash
git tag <tagname> <commit>
```

`commit` 是提交的哈希值。

查看 tag，可以使用：

```bash
git tag
```

这个命令会显示当前仓库的所有 tag。

删除 tag，可以使用：

```bash
git tag -d <tagname>
```

## .gitignore 文件

在 git 中，我们可以使用 `.gitignore` 文件来忽略一些文件，这些文件不会被 git 管理。

例如，在项目根目录下创建一个 `.gitignore` 文件，在文件中写入：

```.gitignore
build/
*.log
```

这样，`build` 目录和所有的 `.log` 文件都不会被 git 管理，不会被提交到仓库。

我们建议将项目的构建目录、日志文件、临时文件、IDE 配置文件和大型文件等都加入到 `.gitignore` 文件中。

如果你在之前已经提交了这些文件，且已经提交到远端，可以使用以下命令修改提交：

```bash
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch <filename>' --prune-empty --tag-name-filter cat -- --all
```

命令解释：
`fliter-branch`：过滤分支，用于修改提交历史。
`--force`：强制执行。
`--index-filter`：修改索引，用于修改文件。
`'git rm --cached --ignore-unmatch <filename>'`：删除文件。
`--prune-empty`：删除空提交。
`--tag-name-filter cat`：修改 tag。
`-- --all`：修改所有分支。

其中 `filename` 是文件名或文件夹，可以使用通配符。

{% note danger fa-triangle-exclamation %}
该操作**极其危险**，会修改提交历史，若无必要请不要在多人协作的项目中使用。
{% endnote %}

## 使用 vscode 进行 git 操作

vscode 内置的 git 插件提供了图形化的界面，方便我们进行 git 操作。可对照上面的命令学习使用，这里不再赘述。

## 连接到 github

在使用 git 的过程中，我们经常会使用 github 来托管代码，这里简单介绍一下如何连接到 github。

由于目前 github 已经不再支持密码登录，有两种方式连接，下面一一介绍。

### 使用 ssh key 连接
首先，我们需要生成 ssh key：

```bash
ssh-keygen -t rsa -b 4096 -C "
```

这个命令会在 `~/.ssh` 目录下生成一个 `id_rsa` 和 `id_rsa.pub` 文件，`id_rsa` 是私钥，`id_rsa.pub` 是公钥。

然后，我们需要将公钥添加到 github 上，打开 github，点击右上角的头像，选择 `Settings`，然后选择 `SSH and GPG keys`，点击 `New SSH key`，将公钥粘贴到 `Key` 中，点击 `Add SSH key`。

接下来，我们需要测试一下是否连接成功：

```bash
ssh -T git@github.com
```

如果连接成功，会显示 `Hi username! You've successfully authenticated, but GitHub does not provide shell access.`。

之后在使用过程中，将远程仓库地址改为 ssh 协议即可。

### 使用 token 连接

首先，我们需要在 github 上生成一个 token，打开 github，点击右上角的头像，选择 `Settings`，然后选择 `Developer settings`，点击 `Personal access tokens`，点击 `Generate new token`，填写 `Note`，选择 `repo` 权限，为了方便也可以把权限全部勾选，点击 `Generate token`，将生成的 token 复制下来。

{% note warning fa-circle-exclamation %}
token 只有一次复制机会，请妥善保管 token，且不要泄露给他人。
{% endnote %}

然后，我们需要将 token 添加到 git 的凭证管理器中：

```bash
git config --global credential.helper store
```

然后在登录时使用 token 替换密码，提交到 https 协议的远程仓库。用户名和密钥会保存在 `~/.git-credentials` 文件中。

{% note warning fa-circle-exclamation %}
不推荐使用 token 连接，因为 token 有时效性，且泄露后会造成安全问题。
{% endnote %}

## commit 规范

在多人协作的项目中，commit 规范是非常重要的，可以提高代码的可读性，方便团队协作。规范的提交信息应该包括以下几个部分：

- type：提交的类型。
- scope：提交的范围，可以是文件名，模块名等。
- subject：提交的主题，简短描述这次提交的内容。
- body：提交的详细内容，可以包括修改的原因，解决的问题等。
- footer：提交的备注，可以包括关联的 issue，关闭的 issue 等。
- breaking change：提交的破坏性变更，可以包括 API 的变更，配置的变更等。

模板如下：

```
type(scope): subject

body

footer
```

{% notel green fa-lightbulb "type 的类型" %}

- feat：新功能，指新增了一个功能。
- fix：修复 bug，指修复了一个 bug。
- break: 破坏性变更，指修改了 API，配置等。
- docs：文档更新。
- style：格式化代码，不影响代码逻辑。
- refactor：重构代码，既不新增功能，也不修复 bug。
- test：测试，包括单元测试，集成测试等，不影响代码逻辑。
- chore：构建工具，依赖管理等，不影响代码逻辑。
- perf：性能优化，提高代码性能。
- revert：回滚，撤销之前的提交。
- merge：合并，合并分支。
- release：发布，发布新版本。
- deps：依赖更新，更新依赖包。

{% endnotel %}

每次提交尽量做到**单一功能**，不要将多个功能放在一个提交中，这样可以方便代码的维护和回滚。

例如：
```
feat(core): add new feature

add new feature to core module

close #123

BREAKING CHANGE: change the API of core module
```

建议仅将**源文件**提交到仓库，其他文件如**编译生成的文件**、**依赖库**等不要提交到仓库，用 `.gitignore` 文件来忽略这些文件或文件夹。