---
title: vscode 配置 clangd
date: 2024-10-03 20:03:48
tags: 
- vscode
- clangd
excerpt: 配置 clangd 以支持 C/C++ 代码补全和静态分析
---

## clangd 介绍

`clangd` 是一个基于 `clang` 的 C/C++ 语言服务器，提供了代码补全、静态分析等功能。相较于 vscode 自带的 C/C++ 插件，`clangd` 不需要配置 `c_cpp_properties.json`，并且在大型项目中的性能表现更好。

{% note info  %}
本文假设已经安装了 vscode 并安装了 `C/C++ Extension Pack` 插件。
{% endnote %}

## 安装 & 配置

1. 搜索 vscode 插件 `clangd`，在 vscode 中搜索 `clangd` 并安装，安装时会询问是否安装 `clangd`，选择 `Yes` 即可;
2. 禁用 vscode 自带的 C/C++ 插件，避免冲突;
3. 勾选 `cmake tools` 插件设置中 `Export Compile Commands` 选项，以生成 `compile_commands.json` 文件;
4. 在 `clangd` 插件设置中 `Arguments` 选项中添加 `--compile-commands-dir=${workspaceFolder}/build`，指定 `compile_commands.json` 文件所在目录;

## 使用

打开一个 C/C++ 项目，`clangd` 会自动读取 `compile_commands.json` 文件并进行代码补全和静态分析，若没有生成 `compile_commands.json` 文件，使用 `cmake` 生成即可。

{% note warning  %}
截至文档发布，`clangd` 仍不支持解析 `doxygen` 格式的注释。
{% endnote %}