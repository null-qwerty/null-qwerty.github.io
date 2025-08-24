---
title: 交叉编译 OpenCV 踩坑记录
date: 2024-10-24 09:09:35
tags:
- OpenCV
- cmake
excerpt: 交叉编译 OpenCV 时遇到的问题及解决方法
---

最近准备一个比赛，用到了香橙派，需要在上面跑 OpenCV，并且需要高版本，只能编译安装。由于香橙派的性能有限，所以选择在自己电脑上交叉编译，然后把编译好的库拷贝到香橙派上。

> OS: Ubuntu 24.04
> OpenCV: 4.10.0
> toolchain: aaarch64-linux-gnu
> target: OrangePi Zero3

## 配置交叉编译

工具链直接使用 `apt` 安装：

```bash
sudo apt install gcc-aarch64-linux-gnu g++-aarch64-linux-gnu
```

从 github 上克隆 OpenCV 源码：

```bash
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git
cd opencv
```

创建一个 build 目录，进入 build 目录：

```bash
mkdir build && cd build
```

打开 cmake-gui，配置交叉编译：

```bash
cmake-gui ..
```

点击 `Configure`，选择 `Unix Makefiles` 和 `Specify toolchain file for cross-compiling`，然后 `Next`，如图：

![opencv_cmake_gui_open_and_configure](https://images.null-qwerty.work/blog/opencv_cmake_gui_open_and_configure.png)

第二页是编译选项。`Target System` 选择 `Linux`；`Compiler` 下 `C` 和 `C++` 中分别填入 `aarch64-linux-gnu-gcc` 和 `aarch64-linux-gnu-g++` 的路径；`Find Program/Library/Include` 下，`Target Root` 填入交叉编译工具链的路径 `/usr/aarch64-linux-gnu`，其他按图中篇配置：

![opencv_cmake_gui_configure](https://images.null-qwerty.work/blog/opencv_cmake_gui_configure.png)

解释一下 `Find Program/Library/Include` 中的配置：
+ `Target Root`：交叉编译工具链的路径，这个路径下应该有 `bin`、`lib`、`include` 等目录
+ 其他三个选项: `Search in Target Root`，表示在 `Target Root` 下搜索，`Search in native system` 表示在本地系统搜索

这里由于需要移植到一个新环境，所以选择了 `Search in Target Root`。

配置完成点击 `Finish`。

## 配置 OpenCV

上面步骤完成后，不要直接点击 `Generate`，还需要配置一些选项。

### 配置 OpenCV_contrib

搜索 `OPENCV_EXTRA_MODULES_PATH`，填入 `opencv_contrib` 的路径：

![opencv_cmake_gui_opencv_contrib](https://images.null-qwerty.work/blog/opencv_cmake_gui_opencv_contrib.png)

由于我是在 `opencv` 目录下创建的 `build` 目录，之前我们在上级目录中克隆的 `opencv` 和 `opencv_contrib`，所以这里填入 `../opencv_contrib/modules`。

### 关闭 dnn 模块

由于 [dnn 模块在编译 arm 版本时会出现问题](https://github.com/opencv/opencv/issues/25678), 所以需要关闭 dnn 模块。当然可以先尝试编译，如果编译失败，再关闭。

{% note info fa-info %}
2025-04-04 更新: 该 issue 已经关闭，根据最后一条回复该问题已经修复，但笔者并未尝试过。
{% endnote %}

搜索 `BUILD_opencv_dnn`，将其设置为 `OFF`：

![opencv_cmake_gui_dnn](https://images.null-qwerty.work/blog/opencv_cmake_gui_dnn.png)

配置完成后，点击 `Generate`。

## 交叉编译 OpenCV

命令行编译：
```bash
make -j$(nproc --ignore=2) # 留两个线程给系统
```
然后等待报错。

### libpng 报错

表现为找不到一些定义：

```bash
../../lib/libopencv_imgcodecs.so.4.10.0: undefined reference to 'png_do_expand_palette_rgb8_neon'
../../lib/libopencv_imgcodecs.so.4.10.0: undefined reference to 'png_init_filter_functions_neon'
../../lib/libopencv_imgcodecs.so.4.10.0: undefined reference to 'png_do_expand_palette_rgba8_neon'
../../lib/libopencv_imgcodecs.so.4.10.0: undefined reference to 'png_riffle_palette_neon'
```

**解决方法**

修改 OpenCV 根目录下 `3rdparty/libpng/pngpriv.h` 文件，将

```c
# if (defined(ARM_NEON) || defined(__ARM_NEON)) && */
```

修改为

```c
# if defined(PNG_ARM_NEON) && (defined(ARM_NEON) || defined(__ARM_NEON)) && \
```

然后重新编译。

### dnn 报错

上面已经给出了解决方法，[关闭 dnn 模块](#关闭-dnn-模块)。

## 安装 OpenCV

编译完成后，安装：

```bash
make install
```

会在 `build` 目录下生成 `install` 目录，里面包含了编译好的库。

```bash
install # 目录结构
├── bin # 可执行文件
├── include # 头文件
├── lib # 库文件
└── share # 其他文件
```

将 `install` 目录拷贝到目标设备上，这里我直接拷贝到项目目录下的 `3rd-party` 目录，然后配置 `CMakeLists.txt`：

```cmake
set(OPENCV_DIR ${CMAKE_SOURCE_DIR}/3rd-party/opencv)

find_package(OpenCV REQUIRED
PATHS ${OPENCV_DIR}
NO_DEFAULT_PATH
)
```

这样就可以在项目中使用交叉编译好的 OpenCV 了。

## 处理编译运行项目代码时报错

运行项目代码时可能会报错，比如：

```bash
error while loading shared libraries: libopencv_imgcodecs.so.410: cannot open shared object file: No such file or directory
```

通过 `ldd` 命令发现：

```bash
ldd main
# 输出
# ...
        libopencv_imgcodecs.so.410 => not found
        libopencv_video.so.410 => not found
        libopencv_calib3d.so.410 => not found
        libopencv_features2d.so.410 => not found
        libopencv_flann.so.410 => not found
# ...
```

这是由于系统找不到这些库，需要配置动态链接库路径。在 `etc/ld.so.conf` 中添加库路径：

```bash
sudo vim /etc/ld.so.conf
```

在文件中添加：

```bash
/path/to/opencv/install/lib
```

然后运行：

```bash
sudo ldconfig
```

再次运行项目代码，应该就不会报错了。
