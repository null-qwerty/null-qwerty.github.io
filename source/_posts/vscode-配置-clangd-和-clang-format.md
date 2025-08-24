---
title: vscode 配置 clangd 和 clang-format
date: 2024-10-03 20:03:48
tags: 
- vscode
- clangd
- clang-format
excerpt: 配置 clangd 进行 C/C++ 代码的补全和静态分析， clang-format 格式化 C/C++ 代码
---

## clangd

`clangd` 是一个基于 `clang` 的 C/C++ 语言服务器，提供了代码补全、静态分析等功能。相较于 vscode 自带的 C/C++ 插件，`clangd` 不需要配置 `c_cpp_properties.json`，并且在大型项目中的性能表现更好。

{% note info fa-info %}
本文假设已经安装了 vscode 并安装了 `C/C++ Extension Pack` 插件。
{% endnote %}

### 安装 & 配置

1. 使用包管理器安装 `clangd`：

   ```bash
   sudo apt install clangd
   # 或者安装指定版本
   sudo apt install clangd-19
   ```
   安装完成后，确保 `clangd` 可执行文件在系统的 `PATH` 中，可以通过以下命令检查：
   ```bash
   clangd --version
   ```
2. 搜索 vscode 插件 `clangd`，在 vscode 中搜索 `clangd` 并安装;
{% note info fa-info %}
安装 `clangd` 插件时，会询问是否安装 `clangd`，可以比较一下包管理器安装的版本和插件安装的版本，选择较新的版本安装。 
{% endnote %}
3. 禁用 vscode 自带的 C/C++ 插件，避免冲突;
4. 勾选 `cmake tools` 插件设置中 `Export Compile Commands` 选项，以生成 `compile_commands.json` 文件;
5. 在 `clangd` 插件设置中 `Arguments` 选项中添加 `--compile-commands-dir=${workspaceFolder}/build`，指定 `compile_commands.json` 文件所在目录;
{% note info fa-info %}
`clangd` 插件会寻找系统中的 `clangd` 可执行文件，如果使用包管理器安装了指定版本的 `clangd`，需要在 `clangd` 插件设置中 `Path` 选项中指定带版本号的 `clangd` 可执行文件（如 `clangd-19`），或者创建一个符号链接 `clangd` 指向指定版本的 `clangd` 可执行文件。
{% endnote %}

`clangd` 的配置文件为 `.clangd`，可以参考 [官方文档](https://clangd.llvm.org/config.html) 进行配置，也可以不配置，使用默认配置即可。

### 使用

打开一个 C/C++ 项目，`clangd` 会自动读取 `compile_commands.json` 文件并进行代码补全和静态分析，若没有生成 `compile_commands.json` 文件，使用 `cmake` 生成即可。

{% note warning fa-warning %}
截至文档发布，`clangd` 仍不支持解析 `doxygen` 格式的注释。
{% endnote %}

## clang-format

`clang-format` 是一个代码格式化工具，可以根据预定义的风格对 C/C++ 代码进行格式化。`clang-format` 支持多种风格，包括 `LLVM`、`Google`、`Chromium`、`Mozilla` 和 `WebKit`，也可以自定义风格。

### 安装 & 配置

`clang-format` 的安装方式与 `clangd` 类似，直接通过包管理安装即可，vscode 安装 `clang-format` 插件后会自动检测系统中的 `clang-format` 可执行文件。

`clang-format` 的配置文件为 `.clang-format`，可以参考 [官方文档](https://clang.llvm.org/docs/ClangFormatStyleOptions.html) 进行配置。如果项目中没有 `.clang-format` 文件，会尝试使用用户目录下的 `.clang-format` 文件。

下面是笔者使用的 `.clang-format` 配置文件，注释是 ai 补的，可能需要中译中：

```yaml
AccessModifierOffset: -4  # 访问修饰符的偏移量，即子类的访问修饰符相对于父类的偏移量
AlignAfterOpenBracket: Align # 在左括号后对齐，即若左括号后有多行参数，参数对齐在左括号后
AlignConsecutiveAssignments: false  # 连续赋值对齐，当有多个连续赋值时，是否对齐
AlignConsecutiveDeclarations: false # 连续声明对齐，当有多个连续声明时，是否对齐
AlignEscapedNewlines: Left  # 转义换行符(\)对齐
AlignOperands: true # 操作数对齐
AlignTrailingComments: false  # 尾注释对齐
AllowAllParametersOfDeclarationOnNextLine: false  # 允许在下一行声明所有参数
AllowShortBlocksOnASingleLine: false  # 允许单行短块
AllowShortCaseLabelsOnASingleLine: false  # 允许单行短 case 标签
AllowShortFunctionsOnASingleLine: None # 允许单行短函数
AllowShortIfStatementsOnASingleLine: false # 允许单行短 if 语句
AllowShortLoopsOnASingleLine: false # 允许单行短循环
AlwaysBreakAfterDefinitionReturnType: None # 总是在定义后换行返回类型
AlwaysBreakAfterReturnType: None # 总是在返回类型后换行
AlwaysBreakBeforeMultilineStrings: false # 总是在多行字符串前换行
AlwaysBreakTemplateDeclarations: false # 总是在模板声明前换行
BinPackArguments: true  # 参数打包
BinPackParameters: true # 参数打包
BraceWrapping:  # 大括号包装
  AfterClass: false             # 类后
  AfterControlStatement: false  # 控制语句后
  AfterEnum: false              # 枚举后
  AfterFunction: true           # 函数后
  AfterNamespace: true          # 命名空间后
  AfterObjCDeclaration: false   # ObjC 声明后
  AfterStruct: false            # 结构体后
  AfterUnion: false             # 联合体后  
  AfterExternBlock: false       # 外部块后
  BeforeCatch: false            # catch 前
  BeforeElse: false             # else 前
  IndentBraces: false           # 缩进大括号
  SplitEmptyFunction: true      # 分割空函数
  SplitEmptyRecord: true        # 分割空记录
  SplitEmptyNamespace: true     # 分割空命名空间
BreakBeforeBinaryOperators: None  # 二元操作符前换行
BreakBeforeBraces: Custom # 大括号前换行
BreakBeforeInheritanceComma: false  # 继承逗号前换行
BreakBeforeTernaryOperators: false  # 三元操作符前换行
BreakConstructorInitializersBeforeComma: false  # 构造函数初始化器逗号前换行
BreakConstructorInitializers: BeforeComma # 构造函数初始化器前换行
BreakAfterJavaFieldAnnotations: false # Java 字段注解后换行
BreakStringLiterals: false  # 字符串字面量换行
CompactNamespaces: false  # 紧凑命名空间
ConstructorInitializerAllOnOneLineOrOnePerLine: false # 构造函数初始化器全部在一行或每行一个
ConstructorInitializerIndentWidth: 4  # 构造函数初始化器缩进宽度
ContinuationIndentWidth: 4  # 续行缩进宽度
Cpp11BracedListStyle: false # C++11 大括号列表样式
DerivePointerAlignment: false # 指针对齐
ExperimentalAutoDetectBinPacking: false # 实验性自动检测打包
FixNamespaceComments: false # 修复命名空间注释
IncludeBlocks: Preserve # 包含块
IncludeCategories:  # 包含类别
  - Regex: '.*' # 正则表达式
    Priority: 1 # 优先级
IndentCaseLabels: false # 缩进 case 标签
IndentGotoLabels: false # 缩进 goto 标签
IndentPPDirectives: None  # 缩进预处理指令
IndentWidth: 4  # 缩进宽度
IndentWrappedFunctionNames: false # 缩进包装函数名
JavaScriptQuotes: Leave # JavaScript 引号
JavaScriptWrapImports: true # JavaScript 包装导入
KeepEmptyLinesAtTheStartOfBlocks: false # 保留块开头的空行
MacroBlockBegin: '' # 宏块开始
MacroBlockEnd: '' # 宏块结束
MaxEmptyLinesToKeep: 1  # 保留的最大空行数
NamespaceIndentation: None  # 命名空间缩进
ObjCBinPackProtocolList: Auto # ObjC 打包协议列表
ObjCBlockIndentWidth: 4 # ObjC 块缩进宽度
ObjCSpaceAfterProperty: true  # ObjC 属性后空格
ObjCSpaceBeforeProtocolList: true # ObjC 协议列表前空格

# Taken from git's rules
PenaltyBreakAssignment: 10  # 换行赋值
PenaltyBreakBeforeFirstCallParameter: 30  # 第一个调用参数前换行
PenaltyBreakComment: 10 # 换行注释
PenaltyBreakFirstLessLess: 0  # 第一个左移换行
PenaltyBreakString: 10  # 换行字符串
PenaltyExcessCharacter: 100 # 多余字符
PenaltyReturnTypeOnItsOwnLine: 100 # 返回类型在自己的行上
PointerAlignment: Right # 指针对齐
ReflowComments: true # 重新流动注释
SortIncludes: false # 排序 include 文件
SortUsingDeclarations: false  # 排序使用声明
SpaceAfterCStyleCast: false # C 风格转换后空格
SpaceAfterTemplateKeyword: true # 模板关键字后空格
SpaceBeforeAssignmentOperators: true  # 赋值操作符前空格
SpaceBeforeCtorInitializerColon: true # 构造函数初始化器冒号前空格
SpaceBeforeInheritanceColon: true  # 继承冒号前空格
SpaceBeforeParens: ControlStatementsExceptForEachMacros   # 括号前空格
SpaceBeforeRangeBasedForLoopColon: true # 基于范围的 for 循环冒号前空格
SpaceInEmptyParentheses: false  # 空括号中空格
SpacesBeforeTrailingComments: 1 # 尾注释前空格
SpacesInAngles: false # 尖括号中空格
SpacesInContainerLiterals: false  # 容器文字中空格
SpacesInCStyleCastParentheses: false  # C 风格转换括号中空格
SpacesInParentheses: false  # 括号中空格
SpacesInSquareBrackets: false # 方括号中空格
TabWidth: 4 # 制表符宽度
UseTab: false # 使用制表符
```