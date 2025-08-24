---
title: C 语言基础
date: 2024-11-01 20:41:47
excerpt: 介绍了 C 语言的基础知识
tags:
- C/C++
mathjax: true
---

{% notel blue fa-info " " %}
本文档用于 HDU-PHOENIX 战队视觉/算法组培训，用于速成 C 语言基础知识。

本文档仅包含最基础的内容，更多的知识需要自行学习。

推荐阅读：
+ 《C Primer Plus》
+ 学校发的 C 语言教材（谭浩强的除外）
{% endnotel %}

## 0. C 语言简介

C 语言是一种通用的高级编程语言，由美国计算机科学家丹尼斯·里奇（Dennis Ritchie）在 1972 年设计开发。C 语言是一种结构化语言，它的设计目标是提供一种能够以简单的方式编写复杂的程序的语言。

C 语言是一种**面向过程**的语言，它的语法结构简单、灵活，同时又具有很强的表达能力，可以直接访问计算机硬件，可以用来编写操作系统、编译器、数据库、网络等系统软件，也可以用来编写应用软件。

C 语言是一种**编译型**语言，编译型语言是指程序在运行之前需要先编译成机器码，然后再运行。C 语言的编译器有很多，比如 GCC、Clang、MSVC 等。

C 语言是一种**静态类型**语言，静态类型语言是指在编译时就确定了变量的数据类型，变量的数据类型在编译时就已经确定，不会发生变化。

一个简单的 C 语言程序如下：

```c
#include <stdio.h>  // 引入头文件，stdio.h 是标准输入输出头文件

int main() {    // 主函数，程序从这里开始执行，main 函数是程序的入口，程序必须有且仅有一个 main 函数
    printf("Hello, World!\n");  // 输出 Hello, World!，\n 表示换行
    return 0;   // 返回 0，表示程序正常结束
}
```

`printf` 是 C 语言的标准输出函数，用于输出内容到控制台，`\n` 表示换行。相对应地，`scanf` 是 C 语言的标准输入函数，用于从控制台输入内容：

```c
#include <stdio.h>  // 引入头文件，stdio.h 是标准输入输出头文件

int main() {    // 主函数，程序从这里开始执行，main 函数是程序的入口，程序必须有且仅有一个 main 函数
    int a;  // 定义一个整数变量 a
    printf("Please input a number: ");  // 输出提示信息
    scanf("%d", &a);  // 从控制台输入一个整数，存入变量 a，%d 表示以整型读入数据，&a 表示变量 a 的地址
    printf("The number you input is: %d\n", a); // 输出变量 a 的值，%d 表示以整型输出数据，\n 表示换行
    return 0;   // 返回 0，表示程序正常结束
}
```

这个程序会提示输入一个整数，然后输出这个整数。

## 1. C 语言基本数据类型

C 语言的基本数据类型有字符型、整型、浮点型和指针，以下是 C 语言的基本数据类型的长度和能表示的范围：

|       类型       |       关键字       | 格式化输出符 |     长度     |                             所示范围                             |
| :--------------: | :----------------: | :----------: | :-----------: | :---------------------------------------------------------------: |
|      字符型      |        char        |      %c      | 1 Byte, 8bit |                  $-128～127(-2^{7}～2^{7} -1)$                  |
|   无符号字符型   |   unsigned char   |      %c      | 1 Byte, 8bit |                      $0～255(0～2^{8} -1)$                      |
|      短整型      |       short       |      %d      | 2 Byte, 16bit |               $-32768～32767(-2^{15}～2^{15} -1)$               |
|   无符号短整型   |   unsigned short   |      %d      | 2 Byte, 16bit |                    $0～65535(0～2^{16} -1)$                    |
|       整型       |        int        |      %d      | 4 Byte, 32bit |          $-2147483648～2147483647(-2^{31}～2^{31} -1)$          |
|    无符号整型    |    unsigned int    |      %d      | 4 Byte, 32bit |                  $0～4294967295(0～2^{32} -1)$                  |
|      长整型      |        long        |     %ld     | 4 Byte, 32bit |          $-2147483648～2147483647(-2^{31}～2^{31} -1)$          |
|   无符号长整型   |   unsigned long   |     %ld     | 4 Byte, 32bit |                  $0～4294967295(0～2^{32} -1)$                  |
|     双长整型     |     long long     |     %lld     | 8 Byte, 64bit | $-9223372036854775808～9223372036854775807(-2^{63}～2^{63} -1)$ |
|  无符号双长整型  | unsigned long long |     %lld     | 8 Byte, 64bit |             $0～18446744073709551615(0～2^{64} -1)$             |
| （单精度）浮点型 |       float       |      %f      | 4 Byte, 32bit |          $\pm1.18\times10^{-38}～\pm3.4\times10^{38}$          |
|   双精度浮点型   |       double       |     %lf     | 8 Byte, 32bit |         $\pm2.23\times10^{-308}～\pm1.8\times10^{308}$         |

{% notel green fa-lightbulb "指针" %}
指针是一个变量，其值为另一个变量的地址。
指针的长度取决于操作系统的位数，32 位操作系统的指针长度为 4 Byte，64 位操作系统的指针长度为 8 Byte。
举个例子， 32 位操作系统最多只能寻址 4GB 的内存空间。
{% endnotel %}


定义基本数据类型：

```c
    char c = 'a';           // 字符型
    unsigned char uc;       // 无符号字符型
    short s;                // 短整型
    unsigned short us;      // 无符号短整型
    int i = 1;              // 整型
    unsigned int ui;        // 无符号整型
    long l;                 // 长整型
    unsigned long ul;       // 无符号长整型
    long long ll;           // 双长整型
    unsigned long long ull; // 无符号双长整型
    float f = 3.14;         // 单精度浮点型
    double d;               // 双精度浮点型

    int *p = &i;            // 整型指针
```

## 2. C 语言运算符

C 语言的运算符包括算术运算符、关系运算符、逻辑运算符、位运算符、赋值运算符、三目运算符、逗号运算符、取地址运算符、取值运算符、自增自减运算符、sizeof 运算符、类型转换运算符等。

### 2.1 赋值运算符

赋值运算符用于给变量赋值，赋值运算符的优先级最低。

```c
    int a = 1;
    int b = 2;
    a = b; // a = 2
```

### 2.2 算术运算符

算术运算符用于进行基本的数学运算。

| 运算符 |      说明      |    示例    |
| :----: | :------------: | :---------: |
|   +   |      加法      | res = a + b |
|   -   |      减法      | res = a - b |
|   *   |      乘法      | res = a * b |
|   /   |      除法      | res = a / b |
|   %   | 取模（取余数） | res = a % b |
|   +=   | 加法赋值运算符 |   a += b   |
|   -=   | 减法赋值运算符 |   a -= b   |
|   *=   | 乘法赋值运算符 |   a *= b   |
|   /=   | 除法赋值运算符 |   a /= b   |
|   %=   | 取模赋值运算符 |   a %= b   |

其中加减法还有自增自减运算符：

| 运算符 | 说明 |   示例   |
| :----: | :--: | :------: |
|   ++   | 自增 | a++，++a |
|   \-\-   | 自减 | a\-\-, \-\-a |

例如：

```c
    int a = 1;
    int b = 2;
    int res = a + b; // res = 3
    res = a - b; // res = -1
    res = a * b; // res = 2
    res = a / b; // res = 0
    res = a % b; // res = 1
    res += a; // 等价于 res = res + a
    b++; // b = 3
    --b; // b = 2
    res = a++; // res = 1, a = 2
    res = ++a; // res = 3, a = 3
    res = a--; // res = 3, a = 2
    res = --a; // res = 1, a = 1
```
{% notel red fa-triangle-exclamation " " %}
使用自增自减运算符的时候需要注意，一条语句中最多使用一个自增或自减运算符，也不要出现 `a = a++` 或 `a = ++a` 这样的语句，例如：
```c
int i = 1;
i = i++ + ++i; // 未定义行为
```
以上代码**符合语法**但**是未定义行为**，不同编译器可能会有不同的结果。
{% endnotel %}

### 2.3 关系运算符

关系运算符用于比较两个值的大小，返回值为真（1）或假（0）。

| 运算符 |   说明   |     示例     |
| :----: | :------: | :----------: |
|   ==   |   等于   | res = a == b |
|   !=   |  不等于  | res = a != b |
|   >   |   大于   | res = a > b |
|   <   |   小于   | res = a < b |
|   >=   | 大于等于 | res = a >= b |
|   <=   | 小于等于 | res = a <= b |

### 2.4 逻辑运算符

逻辑运算符用于进行逻辑运算，返回值为真（1）或假（0）。

| 运算符 |  说明  |     示例     |
| :----: | :----: | :-----------: |
|   &&   | 逻辑与 | res = a && b |
|  \|\|  | 逻辑或 | res = a\|\| b |
|   !   | 逻辑非 |   res = !a   |

### 2.5 位运算符

位运算符用于对二进制数进行位运算。

| 运算符 |            说明            |     示例     |
| :----: | :------------------------: | :----------: |
|   &   |            位与            | res = a & b |
|   \|   |            位或            | res = a\| b |
|   ^   |           位异或           | res = a ^ b |
|   ~   |           位取反           |   res = ~a   |
|   <<   | 位左移，第二个数表示位移量 | res = a << b |
|   >>   | 位右移，第二个数表示位移量 | res = a >> b |
|   &=   |       位与赋值运算符       |    a &= b    |
|  \|=  |       位或赋值运算符       |    a\|= b    |
|   ^=   |      位异或赋值运算符      |    a ^= b    |
|  <<=  |      位左移赋值运算符      |   a <<= b   |
|  >>=  |      位右移赋值运算符      |   a >>= b   |

例如：

```c
    int a = 3; // 0011_2
    int b = 2; // 0010_2
    int res;
    res = a & b; // 0011_2 & 0010_2 = 0010_2 = 2_10
    res = a | b; // 0011_2 | 0010_2 = 0011_2 = 3_10
    res = a ^ b; // 0011_2 ^ 0010_2 = 0001_2 = 1_10
    res = ~a;    // ~(00000000 00000000 00000000 00000011)_2
                 // = (11111111 11111111 11111111 11111100)_2
                 // = -4_10
    res = a << b; // 0011_2 << 2 = 1100_2 = 12_10
    res = a >> b; // 0011_2 >> 2 = 0000_2 = 0_10
```

### 2.6 三目运算符

三目运算符用于简化 if-else 语句，语法为 `条件表达式 ? 表达式 1 : 表达式 2`，如果条件表达式为真则返回表达式 1 的值，否则返回表达式 2 的值。

例如：

```c
    int a = 1;
    int b = 2;
    int res = a > b ? a : b; // res = 2，这是一个获取两个数中较大的数的方法
```

### 2.7 逗号运算符

逗号运算符用于连接两个表达式，返回值为最后一个表达式的值。

例如：

```c
    int a = 1;
    int b = 2;
    int res = (a++, b++, a + b); // res = 4，逗号运算符会先执行 a++ 和 b++，然后返回 a + b 的值
```

### 2.8 取地址运算符和取值运算符（解引用）

取地址运算符用于获取变量的地址。

例如：

```c
    int a = 1;
    int *p = &a;
```

取值运算符（解引用）用于获取指针指向的变量的值。

例如：

```c
    // 接上面的代码
    int b = *p; // b = 1
```

### 2.9 sizeof 运算符

sizeof 运算符用于获取变量或类型的长度，返回值为 size_t 类型。

例如：

```c
    int a = 1;
    int size = sizeof(a); // size = 4
    // 等价于
    // int size = sizeof(int); // size = 4
```

### 2.10 类型转换运算符

类型转换运算符（强制类型转换、显式类型转换）用于将一个数据类型转换为另一个数据类型。

强制类型转换的形式为 `(type)var`，例如：

```c
    int a = 1;
    double b = (double)a; // b = 1.0
```

当我们把两个不同类型的数据进行运算时，C 语言会自动进行类型转换（隐式类型转换），将较小的数据类型转换为较大的数据类型，顺序为 `char -> short -> int -> long -> long long -> double <- float`。而当两个同级别的数据类型进行运算时，C 语言不会将数据类型进行转换。例如：

```c
    int a = 1;
    double b = 2;
    double c = a + b; // c = 3.0
                      // 计算 a(int) + b(int) 时，结果为 int(3)
                      // a + b 结果(3)赋值给 c(double) 时，将 int(3) 隐式转换为 double(3.0)
  
    double d = a / b; // d = 0.0
                      // 计算 a(int) / b(int) 时，结果为 int，抹去小数结果为 0
                      // a + b 结果(0)赋值给 c(double) 时，将 int 隐式转换为 double(0.0)
  
    d = (double)a / b;  // d = 0.5
                        // 强制类型转换后 a(double) / b(int) 隐式转换为 a(double) / b(double) = 1.0 / 2.0 = 0.5
                        // 赋值时无转换

                        // 手动触发隐式类型转换：乘一个小数
    d = 1.0 * a / b;    // d = 0.5
                        // 1.0(double) * a(int) 转换为 1.0(double) * a(double) = 1.0 * 1.0 = 1.0，结果为 double(1.0)
```

注意，将一个较大的数据类型转换为较小的数据类型时，可能会造成**数据丢失**、**精度丢失**或者**溢出**。

> 例如：
>
> 1. 将一个浮点数转换为整数时，会将小数部分截断。
> 2. 将 double 转换为 float 时，会造成精度丢失。

### 2.11 运算符优先级

C 语言的运算符都具有优先级，高优先级先执行，低优先级后执行，同优先级按一定顺序执行，优先级如下表所示：

| 优先级 |                   运算符                   | 结合顺序 |
| :----: | :-----------------------------------------: | :------: |
|   1   |                [], (), ., ->                | 从左到右 |
|   2   |    -, ~, ++, --, *, &, !, (type), sizeof    | 从右到左 |
|   3   |                   /, *, %                   | 从左到右 |
|   4   |                    +, -                    | 从左到右 |
|   5   |                   <<, >>                   | 从左到右 |
|   6   |                >, >=, <, <=                | 从左到右 |
|   7   |                   ==, !=                   | 从左到右 |
|   8   |                      &                      | 从左到右 |
|   9   |                      ^                      | 从左到右 |
|   10   |                     \|                     | 从左到右 |
|   11   |                     &&                     | 从左到右 |
|   12   |                    \|\|                    | 从左到右 |
|   13   |                     ?:                     | 从右到左 |
|   14   | =, /=, *=, %=, +=, -=, <<=, >>=, &=, ^=,\|= | 从右到左 |
|   15   |                      ,                      | 从左到右 |

## 3. C 语言保留字（关键字）

C 语言的保留字（关键字）是一些具有特殊含义的单词，不能用作变量名、函数名等标识符。除了之前提到的数据类型关键字（如 `int`、`char` 等）之外，C 语言还有一些其他的保留字，如下表所示：

|       关键字       |             说明             |         关键字         |      说明      |       关键字       |       说明       |
| :----------------: | :---------------------------: | :--------------------: | :------------: | :----------------: | :--------------: |
| **流程控制** |                              | **存储类说明符** |                |      typedef      |     定义类型     |
|         if         |           条件语句           |         extern         | 外部变量或函数 |      volatile      | 不对变量进行优化 |
|        else        | if 语句中条件为假时执行的分支 |         static         |    静态变量    | **长度计算** |                  |
|       switch       |        多分支条件语句        |        register        |   寄存器变量   |       sizeof       | 计算数据类型长度 |
|        case        |      switch 语句中的分支      |          auto          |    自动变量    |                    |                  |
|      default      |    switch 语句中的默认分支    |  **类型限定符**  |                |                    |                  |
|        for        |           for 循环           |          void          |     空类型     |                    |                  |
|         do         |     do-while 循环的循环体     |         signed         |    有符号数    |                    |                  |
|       while       |          while 循环          |        unsigned        |    无符号数    |                    |                  |
|      continue      |    跳过当前循环的剩余部分    |          enum          |    枚举类型    |                    |                  |
|       break       |      跳出当前循环或分支      |         struct         |   结构体类型   |                    |                  |
|        goto        |        跳转到指定标签        |         union         |   共用体类型   |                    |                  |
|       return       |          返回函数值          |         const         |      常量      |                    |                  |

加上之前提到的数据类型关键字，C 语言一共有 32 个关键字。

## 4. C 语言注释

C 语言的注释有两种形式，单行注释和多行注释（块注释）。

```c
    // 这是单行注释，注释内容在 // 后面，直到行尾
  
    /* 这是多行注释
       注释内容从 /* 开始
       可以跨越多行
       直到*\/结束
    */
```

## 5. 流程控制

C 语言的流程控制有顺序结构、选择结构和循环结构。

### 5.1 顺序结构

顺序结构是程序按照代码的顺序执行，没有分支和循环。正常情况下，C 语言的代码都是按照顺序结构执行的。

```c
    int a = 1;  // step 1
    int b = 2;  // step 2
    int c = a + b;  // step 3
```

### 5.2 选择结构

选择结构有 if 语句、switch 语句。

#### 5.2.1 if 语句

if 语句用于根据条件执行不同的代码块，语法如下：

```c
    if (condition) {
        // 如果 condition 为真，执行这里的代码
    } else {
        // 如果 condition 为假，执行这里的代码
    }
```

else 语句是可选的，可以省略，同时也可以有多个 else if 语句。

例如：

```c
    int a = 1;
    int b = 2;
    if (a > b) {
        printf("a > b\n");
    } else if (a < b) {
        printf("a < b\n");
    } else {
        printf("a = b\n");
    }
```

#### 5.2.2 switch 语句

switch 语句用于根据不同的条件执行不同的代码块，语法如下：

```c
    switch (expression) {
        case constant1:
            // 如果 expression == constant1，执行这里的代码
            break;
        case constant2:
            // 如果 expression == constant2，执行这里的代码
            break;
        ...
        default:
            // 如果 expression 不等于任何一个 constant，执行这里的代码
    }
```

switch 语句中的 expression 必须是整型或字符型，case 后面的 constant 必须是整型常量或字符常量。

例如：

```c
    int a = 1;
    int b = 2;
    switch (a > b) {
        case 1:
            printf("a > b\n");
            break;
        case 0:
            printf("a <= b\n");
            break;
        default:
            break;
    }
```

### 5.3 循环结构

循环结构有 for 循环、while 循环、do-while 循环。

#### 5.3.1 for 循环

for 循环用于重复执行一段代码，一个完整的 for 语句包括初值、条件和增量三部分，语法如下：

```c
    for (initialization; condition; increment) {    // 第一次执行时执行 initialization
        // 如果 condition 为真，执行这里的代码
        // 执行完这里的代码后，执行 increment
    }
```

例如：

```c
    for (int i = 0; i < 10; i++) {
        printf("%d ", i);
    }
```

输出：

```
0 1 2 3 4 5 6 7 8 9
```

#### 5.3.2 while 循环

while 循环用于重复执行一段代码，语法如下：

```c
    while (condition) {
        // 如果 condition 为真，执行这里的代码
    }
```

例如：

```c
    int i = 0;
    while (i < 10) {
        printf("%d ", i);
        i++;
    }
```

输出：

```
0 1 2 3 4 5 6 7 8 9
```

#### 5.3.3 do-while 循环

do-while 循环用于重复执行一段代码，与 while 循环的区别是 do-while 循环会先执行一次循环体，然后判断条件是否为真，语法如下：

```c
    do {
        // 执行这里的代码
    } while (condition);
```

例如：

```c
    int i = 0;
    do {
        printf("%d ", i);
        i++;
    } while (i < 10);
```

输出：

```
0 1 2 3 4 5 6 7 8 9
```

### 5.4 跳转语句

C 语言的跳转语句有 break、continue、goto 和 return。

#### 5.4.1 break

break 语句用于跳出当前循环或 switch 语句，程序会继续执行循环或 switch 语句后面的代码。

例如：

```c
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            break;
        }
        printf("%d ", i);
    }
```

输出：

```
0 1 2 3 4
```

#### 5.4.2 continue

continue 语句用于跳过当前循环的剩余部分，继续执行下一次循环。

例如：

```c
    for (int i = 0; i < 10; i++) {
        if (i == 5) {
            continue;
        }
        printf("%d ", i);
    }
```

输出：

```
0 1 2 3 4 6 7 8 9
```

#### 5.4.3 goto

goto 语句用于跳转到指定标签，语法如下：

```c
    goto label;
    ...
    label: statement;
```

例如：

```c
    int i = 0;
    loop:
    if (i < 10) {
        printf("%d ", i);
        i++;
        goto loop;
    }
```

这个代码构成了一个循环。

#### 5.4.4 return

return 语句用于返回函数值，结束函数的执行。

例如：

```c
    int add(int a, int b) {
        return a + b;
    }
```

## 6. 数组与字符串、指针

### 6.1 数组

数组是一种存储多个相同类型数据的数据结构，数组的元素可以通过下标访问，**数组的下标从 0 开始**。

定义数组语法为 `type name[length]`，其中 `type` 是数组元素的类型，`name` 是数组的名字，`length` 是数组的长度。

例如：

```c
    int a[5]; // 定义一个长度为 5 的整型数组
    int b[] = {1, 2, 3, 4, 5}; // 定义一个长度为 5 的整型数组，并初始化
    int c[5] = {1, 2, 3, 4, 5}; // 定义一个长度为 5 的整型数组，并初始化
    float d[3] = {1.1, 2.2, 3.3};
    char e[5] = {'a', 'b', 'c', 'd', 'e'};

```

访问数组元素：

```c
    int a[5] = {1, 2, 3, 4, 5};
    int b = a[0]; // b = 1
    a[1] = 10; // a = {1, 10, 3, 4, 5}
```

数组长度是固定的，初始化完成后不能改变。可以通过 `sizeof` 运算符获取数组的长度。

```c
    int a[5] = {1, 2, 3, 4, 5};
    int len = sizeof(a) / sizeof(a[0]); // len = 5
```

遍历一个数组常常使用循环语句。

数组在内存中是连续存储的，数组变量名其实就是数组首元素的地址。

```c
    int a[5] = {1, 2, 3, 4, 5};
    int *p = a; // p 指向数组 a
    int *q = &a[0]; // q 指向数组 a 的首元素
    // p 和 q 指向的地址是相同的
```

> 数组元素的下标反应了元素相对于数组首元素的**偏移量**。

### 6.2 字符串

字符串是一种特殊的字符数组，字符串以 `'\0'` 结尾，`'\0'` 是字符串结束标志。

定义字符串语法为 `char name[length]`，其中 `name` 是字符串的名字，`length` 是字符串的长度。使用双引号 `"` 来定义字符串常量，字符数组只能在初始化时可以被字符串赋值。在格式化输入输出时，用 `%s` 表示字符串。

例如：

```c
    char str1[6] = {'H', 'e', 'l', 'l', 'o', '\0'}; // 定义一个字符串，内容为 "Hello"
    // 等价于
    // char str1[6] = "Hello";
    // 等价于
    // char str1[] = "Hello";
    char str2[10];
    // str2 = "World"; // 错误，不能直接赋值
    scanf("%s", str2); // 从控制台输入一个字符串
    printf("%s %s\n", str1, str2); // 输出两个字符串
```

字符串有专门的处理函数，在 `string.h` 头文件中：

|          函数名          |                             说明                             |
| :-----------------------: | :----------------------------------------------------------: |
|        strlen(str)        |                获取字符串长度，不包括结束标志                |
|     strcpy(dest, src)     |                复制字符串，将 src 复制到 dest                |
|     strcat(dest, src)     |             连接字符串，将 src 连接到 dest 后面             |
|    strcmp(str1, str2)    | 比较字符串，比较 str1 和 str2 的大小，返回值为负数、0 或正数 |
|      strchr(str, c)      |      查找字符，返回字符串 str 中第一次出现字符 c 的位置      |
|    strstr(str1, str2)    |  查找字符串，查找字符串 str1 中第一次出现字符串 str2 的位置  |
|    strtok(str, delim)    |        分割字符串，将字符串 str 按照分隔符 delim 分割        |
| sprintf(str, format, ...) |     格式化输出到字符串，将格式化输出的结果存入字符串 str     |
| sscanf(str, format, ...) |    从字符串读取格式化输入，从字符串 str 中读取格式化输入    |

### 6.3 指针

指针是 C 语言的一个重要概念，也是 C 语言特有的东西。指针本质上是一个整型变量，存储的是一个内存地址。

定义指针语法为 `type *name`，其中 `type` 是指针指向的数据类型，`name` 是指针的名字。使用 `&` 运算符获取变量的地址，使用 `*` 运算符获取指针指向的变量的值。

例如：

```c
    int a = 1;
    int *p = &a; // 定义一个整型指针 p，指向变量 a
    int b = *p; // b = 1，获取指针 p 指向的变量的值

    int *q = NULL; // 定义一个空指针
                   // NULL 是一个宏定义，表示空指针, 其值是 0

    printf("%d\n", *p); // 输出指针 p 指向的变量的值
    printf("%p\n", p); // 输出指针 p 的值，十六进制表示
```

> 数组就是指针，指针就是数组。

使用指针我们可以做一些有趣的事情，例如：

```c
short arr[5] = {1, 2, 3, 4, 5};
short *p = arr;
char *q = (char *)p; // 将 short 指针转换为 char 指针

for (int i = 0; i < 5 * 2; i++) {
    printf("%d ", *(q + i));    // 输出 arr 中每个字节的值
}
```

由于 `short` 类型占 2 个字节，`char` 类型占 1 个字节，所以输出的结果是 `1 0 2 0 3 0 4 0 5 0`。

> linux 系统字节序为小端序（smalldian）。

我们来看另一个例子：

```c
float f = 1.5;
int *p = (int *)&f; // 用 int 指针指向 float 变量 f

printf("%f\n", f); // 输出 f 的值
printf("%d\n", *p);
```

这个例子中，我们将 `float` 类型的指针转换为 `int` 类型的指针，然后输出这两个变量的值，结果是 `1.500000` 和 `1069547520`。

{% notel green fa-lightbulb "结果解释" %}

我们来解释一下这个结果。
`int` 和 `float` 的长度都是 4 个字节，但他们的存储方式不同。
4 个字节一共 32 位，最高位是符号位(S)：

![](data:image/png;base64,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)

对于 `int` 类型，最高位是符号位，剩下的 31 位是数值位(V)，例如 `10` 的二进制表示是：

![](data:image/png;base64,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)

对于 `float` 类型，最高位是符号位；接下来的 8 位是指数位(E)；最后的 23 位是尾数位(M)，以二进制小数形式存储：

![](data:image/png;base64,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)

其计算方式为：
$$
Value = (-1)^S * 2^{E - 127} * (1 + M)
$$
并规定：
+ 当 E 全为 1 时，表示的是特殊数
  + 当 M 全为 0 时，表示的是无穷大；
  + 当 M 不全为 0 时，表示的是 NaN（Not a Number）；
+ 当 E 全为 0 时，表示的是非规格化数
  + 此时 $Value = (-1)^S * 2^{-126} * M$；
+ 当 E 不全为 0 且不全为 1 时，表示的是规格化数，此时 E 取值范围为 1 ~ 254
也因此 `float` 最大取值的绝对值为
$$
2^{127} * (1 + 1 - 2^{-23}) = 3.4028234663852886 \times 10^{38}
$$
最小取值（规格化数）的绝对值为
$$
2^{-126} = 1.1754943508222875 \times 10^{-38}
$$
所以 `1.5` 的二进制表示为：

![](data:image/png;base64,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)

这个二进制数转换为十进制数为 `1069547520`。

{% endnotel %}

## 7. 函数

函数表示了一段特定的功能，可以重复调用。函数的定义包括函数名、返回值类型、参数列表和函数体。

### 7.1 定义一个函数

> 不能在函数内部定义函数，函数的定义必须在函数外部。

```c
return_type function_name(parameter_list) {
    // 函数体
}
```

其中 `return_type` 是返回值类型，`function_name` 是函数名，`parameter_list` 是参数列表，`{}` 中是函数体。

例如：

```c
int add(int a, int b) {
    return a + b;
}
```

函数的声明和定义可以分开，声明函数时只需要写函数的返回值类型、函数名和参数列表，不需要写函数体：

```c
int add(int a, int b); // 函数声明

int main() {
    int a = 1;
    int b = 2;
    int c = add(a, b); // 调用函数
    return 0;
}

int add(int a, int b) { // 函数定义
    return a + b;
}
```

编写 C 语言函数要注意以下几点：

+ 函数需要先声明再调用；
+ 函数不能重名；
+ 函数的参数个数是任意的；
+ 函数的参数可以有默认值，有默认值的参数必顫放在参数列表的最后；
+ 函数可以没有返回值，此时返回值类型为 `void`，但不建议这样做。

### 7.2 函数的参数传递

函数的参数有两种传递方式：传值和传址。这与函数的调用过程有关。

#### 7.2.1 传值调用

C 语言的函数参数传递是传值的，即将实参的值**复制一份**给形参，函数内部对形参的修改不会影响实参。

例如，假设我希望输出函数 `y = x + 1`，但是我不希望修改 `x`的值：

```c
#include <stdio.h>

int func(int x) {
    // x 是形参，接收实参的值
    x = x + 1;  // 修改形参的值
    return x;   // 返回修改后的值
}

int main() {
    for(int i = 0; i < 100; i++)
        printf("%d ", func(i)); // 将 i 的值传递给 x，接收返回值并输出
                                // i 的值不会被修改
        // 输出：1 2 3 4 5 6 ...
    return 0;
}
```

不仅仅传入参数是传值的，函数的返回值也是传值的。函数的返回值是一个临时变量，函数返回后这个临时变量就会被销毁。

### 7.2.2 传址调用

但是某些情况下，我们希望函数内部对形参的修改能够影响实参，例如下面这个例子：

```c
#include <stdio.h>

int swap(int a, int b) {
    // 调用函数时，实参 a 和 b 的值会被复制给形参 a 和 b
    // 函数内部交换的是形参 a 和 b 的值
    int temp = a;
    a = b;
    b = temp;
    return 0;
}

int main() {
    int a = 1;
    int b = 2;
    swap(a, b); // a 和 b 作为实参传递给 swap 函数
                // 我们希望 a 和 b 的值被交换
    printf("a = %d, b = %d\n", a, b); // 输出 a = 1, b = 2
    return 0;
}
```

发现输出结果并不是我们期望的 `a = 2, b = 1`，这是因为函数参数传递是传值的，函数内部对形参的修改不会影响实参。

为了解决这个问题，我们可以使用指针来传递参数，这样函数内部对形参的修改就会影响实参。

```c
#include <stdio.h>

int swap(int *a, int *b) {
    // a 和 b 是指针，指向实参 a 和 b
    // 函数内部交换的是 a 和 b 指向的变量的值
    int temp = *a;
    *a = *b;
    *b = temp;
    return 0;
}

int main() {
    int a = 1;
    int b = 2;
    swap(&a, &b); // a 和 b 的地址作为实参传递给 swap 函数
                  // 我们希望 a 和 b 的值被交换
    printf("a = %d, b = %d\n", a, b); // 输出 a = 2, b = 1
    return 0;
}
```

严格意义上来说，这个函数依然是传值调用，只不过传递的是指针的值，而不是变量的值。由于指针指向了变量的地址，所以函数内部对指针所指的目标的修改会影响到外部变量。

### 7.3 递归函数

递归函数是指在函数内部调用自身的函数。递归函数有两个要素：递归边界和递归式。

例如，计算阶乘的递归函数：

```c
#include <stdio.h>

int factorial(int n) {
    if (n == 0) {
        return 1; // 递归边界，0! = 1
    } else {
        return n * factorial(n - 1); // 递归式
    }
}

int main() {
    int n = 5;
    int result = factorial(n);
    printf("%d! = %d\n", n, result);
    return 0;
}
```

递归函数的调用过程如下：

```
factorial(5)
5 * factorial(4)
5 * 4 * factorial(3)
5 * 4 * 3 * factorial(2)
5 * 4 * 3 * 2 * factorial(1)
5 * 4 * 3 * 2 * 1 * factorial(0)
5 * 4 * 3 * 2 * 1 * 1
5 * 4 * 3 * 2 * 1
5 * 4 * 3 * 2
5 * 4 * 6
5 * 24
120
```

递归函数的优点是代码简洁，但是递归函数的缺点是递归深度过深时会导致栈溢出。

### 7.4 函数指针

与数据类型一样，函数也具有指针。函数指针是指向函数的指针，函数指针的声明和定义如下：

```c
return_type (*function_pointer)(parameter_list);
```

其中 `return_type` 是函数的返回值类型，`parameter_list` 是参数列表。

例如：

```c
#include <stdio.h>

int add(int a, int b) {
    return a + b;
}
int sub(int a, int b) {
    return a - b;
}
int mul(int a, int b) {
    return a * b;
}
int div(int a, int b) {
    return a / b;
}

int main() {
    int (*func[4])(int, int) = {add, sub, mul, div}; // 定义一个函数指钋数组
    int a = 10;
    int b = 5;
    for (int i = 0; i < 4; i++) {
        printf("%d\n", func[i](a, b)); // 通过函数指针调用函数
    }
    return 0;
}
```

## 8. 结构体、联合体和枚举

除了基本数据类型，C 语言还提供了结构体、联合体和枚举这三种自定义数据类型。自定义数据类型可以更好地组织数据，提高代码的可读性。

> 定义自定义数据类型必须在函数外部定义，不能在函数内部定义。

### 8.1 结构体

结构体是一种自定义的数据类型，可以包含多个不同类型的数据。其大小是内部所有成员大小相加。

结构体的定义如下：

```c
struct struct_name {
    type1 member1;
    type2 member2;
    ...
};
```

其中 `struct_name` 是结构体的名字，`member1`、`member2` 是结构体的成员，`type1`、`type2` 是成员的数据类型。

例如，定义一个学生结构体：

```c
struct student {
    char name[20];
    int age;
    float score;
};
```

结构体的成员通过 `.` 运算符访问：

```c
struct student s;
strcpy(s.name, "Neri");
s.age = 14;
s.score = 90.5;
```

如果结构体的成员是指针，则通过 `->` 运算符访问：

```c
struct student *p = &s;
strcpy(p->name, "Neri");
p->age = 14;
p->score = 90.5;
// 等价于
strcpy((*p).name, "Neri");
(*p).age = 14;
(*p).score = 90.5;
```

### 8.2 联合体

联合体是一种特殊的结构体，联合体的所有成员**共用同一块内存**，联合体的大小等于**最大的成员的大小**。联合体的定义如下：

```c
union union_name {
    type1 member1;
    type2 member2;
    ...
};
```

例如，定义一个共用体：

```c
union data {
    int i;
    float f;
};
```

联合体的访问与结构体类似，通过 `.` 或 `->` 运算符访问。

```c
union data d;
union data *p = &d;
d.f = 1.5;
printf("%d\n", d.i); // 输出 1069547520
printf("%f\n", p->d); // 输出 1.500000
```

### 8.3 枚举

枚举是一种自定义的数据类型，枚举的成员是常量，枚举的定义如下：

```c
enum enum_name {
    member1,
    member2,
    ...
};
```

例如，定义一个颜色枚举：

```c
enum color {
    RED,
    GREEN,
    BLUE
};
```

此时 `RED`、`GREEN`、`BLUE` 是常量，其值分别为 `0`、`1`、`2`。

规定后一个枚举成员的值比前一个枚举成员的值大 1，如果需要指定枚举成员的值，可以在定义时赋值：

```c
enum color {
    RED = 2,    // RED = 2
    GREEN = 5,  // GREEN = 5
    BLUE        // BLUE = 6
};
```

```c
enum color {
    RED = 1,
    GREEN = 2,
    BLUE = 4
};
```

枚举的成员可以通过枚举名访问：

```c
enum color {
    RED,
    GREEN,
    BLUE
};
// ...省略部分代码...
enum color c = RED;
printf("%d\n", c); // 输出 0
// ...省略部分代码...
```
