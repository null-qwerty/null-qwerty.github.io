---
title: Linux下基于UNIX域套接字的进程间通信
tags:
  - Linux
  - Socket
date: 2023-12-14 06:02:51
excerpt: 介绍了 UNIX 域套接字的使用方法，以及使用 UNIX 域套接字实现进程间通信的实例。
---


UNIX 域套接字（UDS）是一种常用的进程间通信（IPC）的方法，相较于 tcp/udp 套接字，它更适合同一台机器的进程间通信，也只能在同一台机器上实现通信。

## UNIX 域套接字地址

UNIX 域套接字使用 `struct sockaddr_un` 结构体来表示地址，它的定义如下：

```c
struct sockaddr_un
{
    sa_family_t sun_family;
    char sun_path[108];
}
```

其中 `sun_family` 域的值为 `AF_UNIX`，`sun_path` 域的值为套接字文件在文件系统中的路径，该路径的长度不能超过 `sizeof(sun_path)`，即 `108 - 1 = 107` 个半角字符。

## 创建 UNIX 域套接字

UNIX 域套接字的创建与 tcp/udp 套接字类似，只是在调用 `socket()` 函数时，第一个参数为 `AF_UNIX`，第二个参数为 `SOCK_STREAM` 或 `SOCK_DGRAM`。

```c
int unixfd_stream = socket(AF_UNIX, SOCK_STREAM, 0);   // 流 socket
int unixfd_dgram = socket(AF_UNIX, SOCK_DGRAM, 0);     // 数据报 socket
```

在查询这两种套接字的区别时，在 [stackoverflow](https://stackoverflow.com/questions/4688855/whats-the-difference-between-streams-and-datagrams-in-network-programming) 上找到这么一段解释：
> A stream socket is like a phone call -- one side places the call, the other answers, you say hello to each other (SYN/ACK in TCP), and then you exchange information. Once you are done, you say goodbye (FIN/ACK in TCP). If one side doesn't hear a goodbye, they will usually call the other back since this is an unexpected event; usually the client will reconnect to the server. There is a guarantee that data will not arrive in a different order than you sent it, and there is a reasonable guarantee that data will not be damaged.
>
> A datagram socket is like passing a note in class. Consider the case where you are not directly next to the person you are passing the note to; the note will travel from person to person. It may not reach its destination, and it may be modified by the time it gets there. If you pass two notes to the same person, they may arrive in an order you didn't intend, since the route the notes take through the classroom may not be the same, one person might not pass a note as fast as another, etc.

个人认为，stream socket 更适合做同步通信，而 datagram socket 更适合做异步通信。

## 绑定 UNIX 域套接字

使用 `bind` 函数将套接字与地址绑定。绑定时，`bind` 会在指定的路径下创建一个文件用于标识该套接字，文件与套接字是一一对应的关系。
```c
struct sockaddr_un addr;
addr.sun_family = AF_UNIX;  // 类型
strcpy(addr.sun_path, "/tmp/uds_socket");   // 地址
int unixfd = socket(AF_UNIX, SOCK_STREAM, 0);   // 创建套接字
if(bind(unixfd, (struct sockaddr*)&addr, sizeof(addr)) == -1)   // 绑定，发生错误时返回 -1
{
    perror("bind error");
    exit(1);
}
```
绑定后，可使用 `getsockname` 获取文件的路径。

若不再使用该套接字，可使用 `unlink` 删除该文件，但是在删除文件前，必须先关闭套接字，否则会导致文件无法删除。

## 使用流套接字进行进程间通信的实例

### 服务端

首先创建一个 UNIX 域套接字，使用 `bind` 绑定到一个路径上，调用 `listen` 监听该套接字，然后调用 `accept` 接收客户端的连接请求，最后使用 `read` 读取客户端发送的数据。

```c
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUF_SIZE 1024

int main()
{
    struct sockaddr_un addr;    // 地址
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path, "/tmp/uds_socket");
    int unixfd = socket(AF_UNIX, SOCK_STREAM, 0);   // 创建套接字
    if(bind(unixfd, (struct sockaddr*)&addr, sizeof(addr)) == -1)   // 绑定到地址
    {
        perror("bind error");
        exit(1);
    }
    if(listen(unixfd, 5) == -1) // 监听，最多允许 5 个连接
    {
        perror("listen error");
        exit(1);
    }
    int clientfd = accept(unixfd, NULL, NULL);  // 接收连接请求，返回客户端的文件描述符
    if(clientfd == -1)
    {
        perror("accept error");
        exit(1);
    }
    char buf[BUF_SIZE];
    int n;
    while((n = read(clientfd, buf, BUF_SIZE)) > 0)  // 读取客户端发送的数据
    {
        buf[n] = '\0';
        printf("receive: %s\n", buf);
    }
    // 关闭打开的文件
    close(clientfd);
    close(unixfd);
    unlink("/tmp/uds_socket");
    return 0;
}
```

### 客户端

客户端的代码比服务端简单，只需要创建一个 UNIX 域套接字，然后使用 `connect` 连接到服务端，最后使用 `write` 向服务端发送数据。

```c
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define BUF_SIZE 1024

int main()
{
    struct sockaddr_un addr;    // 地址
    addr.sun_family = AF_UNIX;
    strcpy(addr.sun_path, "/tmp/uds_socket");
    int unixfd = socket(AF_UNIX, SOCK_STREAM, 0);   // 创建套接字
    if(connect(unixfd, (struct sockaddr*)&addr, sizeof(addr)) == -1)   // 连接到服务端
    {
        perror("connect error");
        exit(1);
    }
    char buf[BUF_SIZE];
    while(fgets(buf, BUF_SIZE, stdin) != NULL) // 从标准输入读取数据
    {
        int n = strlen(buf);
        if(write(unixfd, buf, n) != n)  // 发送数据到服务端
        {
            perror("write error");
            exit(1);
        }
    }
    // 关闭打开的文件
    close(unixfd);
    return 0;
}
```
运行结果：
![result](https://images.null-qwerty.work/blog/result.png)

## 注意事项

运行程序时必须**先运行服务端**，再运行客户端，否则客户端会报错 `connect error: No such file or directory`。原因是客户端在连接时，会检查指定的路径是否存在，先运行服务端才能创建指定文件。

若不加其他方法，服务端只能处理一个客户端的连接请求，即一对一的通信，若要实现一对多，可使用 epoll 或 select 来实现，之后会介绍。