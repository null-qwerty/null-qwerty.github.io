---
title: 记录一次使用ros时产生的段错误
date: 2023-10-22 00:26:22
tags:
- ros
- C/C++
- 段错误
excerpt: 取消内存对齐引发的段错误
---
## 问题描述
最近在修改项目中与下位机的通信协议时，抛出了一个段错误。调试找到该错误出现在下面这行代码：
```cpp
ros::NodeHandle nh_;
```
显然这个错误是不正常的，因为所有的ros包中都需要这个对象，而且这个对象在其他地方都是正常的。
经过分析，发现问题出在`#pragma pack(1)`上面。
## 问题分析
为了保证通信协议结构体的长度等于内部成员的长度之和，我在通信协议结构体定义前加上了`#pragma pack(1)`：
```cpp
#pragma pack(1)     // 对齐长度 1 字节，即不对齐
typedef struct Protocol_s
{
    uint8_t start;
    uint8_t type;
    uint8_t buffer[29];
    uint8_t end;
}
```
防止内存对齐，保证结构体长度一定是32字节。

同时，我将包含通信协议的头文件放在了ros的头文件前面：
```cpp
#include "protocol.h"
// 省略其他头文件
#include <ros/ros.h>
```
在编译时，**编译器会将头文件中的内容拷贝到源文件中**，因此`#pragma pack(1)`也会被拷贝到源文件中，并且在`ros.h`的前面，对ros中的相关结构定义产生影响。猜测ros中为了保证速率，会直接对内存进行操作，而这些操作考虑了内存对齐的问题，因此在取消内存对齐后这些操作会出现非法访问，导致段错误。

## 解决方案
1. 将自定义的头文件放在ros的头文件后面，这样`#pragma pack(1)`就不会影响ros的结构体定义。
2. 在结构体定义后面加上`#pragma pack()`，还原内存对齐：
```cpp
#pragma pack(1)     // 对齐长度 1 字节，即不对齐
typedef struct Protocol_s
{
    uint8_t start;
    uint8_t type;
    uint8_t buffer[29];
    uint8_t end;
}
#pragma pack()    // 还原内存对齐
```