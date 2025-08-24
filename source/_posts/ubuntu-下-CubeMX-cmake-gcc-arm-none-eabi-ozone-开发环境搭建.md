---
title: ubuntu 下 CubeMX + cmake + gcc-arm-none-eabi + ozone 开发环境搭建
date: 2024-10-03 20:31:38
tags:
- stm32
- vscode
- cmake
excerpt: ubuntu 下 stm32 开发环境搭建
---

{% note info  %}
本文使用的开发板为 RoboMaster 开发板 C 型，其芯片为 STM32F407IG，开发环境为 ubuntu 24.04。
{% endnote %}

## J-Link 驱动安装

### 安装 J-Link 驱动

首先下载 J-Link 驱动的依赖 libreadline 库：
```bash
sudo apt-get install libreadline-dev
```

在 [SEGGER 官网](https://www.segger.com/downloads/jlink/)下载 J-Link 驱动，选择 Linux 版本的 deb 安装包

![J-Link 驱动下载](https://images.null-qwerty.work/blog/jlink驱动下载.png)

会有一些跳转，根据引导走就行了。下载完成后，使用 dpkg 安装：
```bash
sudo dpkg -i JLink_Linux_Vxxx_x86_64.deb
```

驱动程序将被安装到 `/opt/SEGGER/JLink` 目录下，同时会在 `/etc/udev/rules.d` 目录下生成一个 `99-jlink.rules` 文件，用于配置 J-Link 的权限。将 `JLink` 目录添加到环境变量中：

```bash
echo 'export PATH=$PATH:/opt/SEGGER/JLink' >> ~/.bashrc
source ~/.bashrc
```
如果使用的是 zsh，将 `~/.bashrc` 替换为 `~/.zshrc` 即可。

### 验证 J-Link 驱动

使用如下命令验证 J-Link 驱动是否安装成功：
```bash
jlink --version
```
如果安装成功，会显示 J-Link 的版本信息。

J-Link 接 C 板，插入 J-Link

![jlinkconnect](https://images.null-qwerty.work/blog/jlinkconnect.png)

然后执行以下命令：
```bash
JLinkExe
```
![jlinkexe](https://images.null-qwerty.work/blog/jlinkexe.png)

提示输入 connect，并输入芯片型号，这里输入 `STM32F407IG`，然后选择 `SWD`，speed 可以使用默认的 4000kHz,如下图所示则连接成功。

![jlinkexe2](https://images.null-qwerty.work/blog/jlinkexe2.png)

## CubeMX 安装

在 [ST 官网](https://www.st.com/zh/development-tools/stm32cubemx.html)下载 CubeMX，选择 Linux 版本的安装包，下载完成后解压。

![CubeMX 下载](https://images.null-qwerty.work/blog/cubemx下载.png)

{% note danger  %}
笔者在使用 6.12.1 版本时，JxBrowser Engine 在刚打开 CubeMX 的时候直接报 crash 导致窗口无法正常打开，切换至 6.11.1 版本后问题解决。
{% endnote %}
{% note success  %}
2025.3.3 更新：更新至 6.14.0 版本后问题解决。
{% endnote %}

解压后进入文件夹，执行 `./SetupSTM32CubeMX-x.xx.x` 安装 CubeMX，根据提示安装即可。

打开 CubeMX，登录账号，登录后点击 `INSTALL/REMOVE` 安装 STM32F4 芯片包。

![CubeMX 芯片包下载](https://images.null-qwerty.work/blog/cubemx芯片包下载.png)


## 新建工程

先安装 `gcc-arm-none-eabi` 工具链：
```bash
sudo apt install gcc-arm-none-eabi
```

打开 CubeMX，新建工程，选择芯片型号，这里选择 `STM32F407IGHx`，点击 `Start Project`，打开 `Project Manager`，选择 `Toolchain/IDE` 为 `CMake`，点击 `Generate Code`。

![CubeMX 工程配置](https://images.null-qwerty.work/blog/cubemx工程配置.png)

在项目根目录打开 vscode，`Core/Src/main.c` 就是主函数所在的文件:

![vscode 打开CubeMX 工程](https://images.null-qwerty.work/blog/vscode打开cubemx工程.png)

发现静态分析崩了，原因是使用了 clangd 进行了静态分析，在没有编译过的情况下，clangd 无法找到头文件，所以会报错。这里 cmake 一下就好了。
```bash
mkdir build
cd build
cmake ..
```

![CubeMX 工程静态分析](https://images.null-qwerty.work/blog/cubemx工程静态分析.png)

clangd 的配置可以看{% post_link 'vscode-配置-clangd-和-clang-format' '这里' %}。

在根目录创建 `.JLinkScripts` 文件，内容如下：
```
speed 4000
device STM32F407IG
r
loadfile ./JLink-test.elf
q
```
其中 `JLink-test.elf` 为编译生成的 elf 文件，路径相对于 `Makefile` 文件。

在 `CMakelists.txt` 中添加如下内容：
```cmake
add_custom_command(OUTPUT flash
    COMMAND JLinkExe -if SWD -CommanderScript ${CMAKE_SOURCE_DIR}/.JLinkScripts
)
add_custom_target(Flash DEPENDS flash)
```
这样在执行 `make Flash` 的时候就会自动烧录。
```bash
cd build
cmake ..
make -j
make Flash
```

![make Flash](https://images.null-qwerty.work/blog/makeflash.png)

## ozone 安装及使用

在 [SEGGER 官网](https://www.segger.com/products/development-tools/ozone-j-link-debugger/)下载 ozone，选择 Linux 版本的安装包，下载完成后使用 `dpkg` 安装。

![ozone 下载](https://images.null-qwerty.work/blog/ozone下载.png)

安装完成后，使用如下命令启动 ozone：
```bash
ozone
```

这里使用一个蜂鸣器工程为例。

插上 J-Link,连接 C 板，打开 ozone,选择 `STM32F407IG`, `svd` 文件在如图所示的路径下：

![ozone 配置](https://images.null-qwerty.work/blog/ozoneconf1.png)

`Target Interface` 选择 `SWD`，然后选择底下识别到的 J-Link:
![ozone 配置](https://images.null-qwerty.work/blog/ozoneconf2.png)

选择需要调试的 elf 文件：
![ozone 配置](https://images.null-qwerty.work/blog/ozoneconf3.png)

第四页可以保持默认，然后点击 `Finish`，就可以开始调试了：
![ozone 配置](https://images.null-qwerty.work/blog/ozoneconf4.png)
![ozone 调试页面](https://images.null-qwerty.work/blog/ozonedbg.png)

点击左上角的绿色图标开始调试，再点击右边的继续按钮，程序就会开始运行，直到遇到断点。

在 `watch data` 中可以添加需要监视的变量，如下图所示，并绘制出变量的变化曲线。

![ozone 监视变量](https://images.null-qwerty.work/blog/ozonewatch.png)

其他功能可以自行探索。

## 效果

<video id="video" controls loop="false" width="100%"></video>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>
<script data-swup-reload-script type="text/javascript">
  var video = document.getElementById('video');
  if(Hls.isSupported()) {
  var hls = new Hls();
  hls.loadSource('https://videos.null-qwerty.work/stm32haruhikage/index.m3u8');
  hls.attachMedia(video);
} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
  video.src = 'https://videos.null-qwerty.work/stm32haruhikage/index.m3u8';
}
</script>
