---
title: ubuntu18.04下使用php+mysql+apache的网站搭建
date: 2023-10-12 14:46:48
tags:
- php
- MySQL
- 网站搭建
excerpt: LAMP 环境搭建
---
{% note info %}
如果我做错了什么，请让法律来制裁我，**而不是让我用php写项目**
{% endnote %}
最近在给社团网站做服务器迁移，遇到了一些问题，记录一下。

> 系统环境
>
> + ubuntu18.04

## 安装|配置 MySQL

### 安装

使用 `apt-get` 安装

```bash
sudo apt-get update
sudo apt-get install mysql-server   # 安装 mysql 服务端
```

### 配置

MySQL初始化安全脚本

```bash
sudo mysql_secure_installation
```

`mysql_secure_installation`中会有设置root密码，删除匿名用户，禁止root远程登录，删除test数据库，刷新权限表等操作，可以全都选择yes。root密码看情况更改。

配置完成后，可以使用以下命令查看MySQL服务状态

```bash
sudo systemctl status mysql.service
```

会产生类似如下输出（此处的输出并非在配置结束后运行产生的，仅作参考）

```bash
● mysql.service - MySQL Community Server
   Loaded: loaded (/lib/systemd/system/mysql.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2023-10-12 00:26:53 CST; 13h ago
 Main PID: 657 (mysqld)
    Tasks: 28 (limit: 2333)
   CGroup: /system.slice/mysql.service
           └─657 /usr/sbin/mysqld --daemonize --pid-file=/run/mysqld/mysqld.pid
```

进入MySQL

```bash
sudo mysql -u root -p
```

创建新用户

```sql
CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'password';
```

给新用户并授权

```sql
GRANT ALL PRIVILEGES ON *.* TO 'newuser'@'localhost' ;
```

**刷新权限表（一定要记得刷新）**

```sql
FLUSH PRIVILEGES;
```

创建新数据库，给网站使用

```sql
CREATE DATABASE newdatabase;
```

使用新数据库

```sql
USE newdatabase;
```

退出MySQL

```sql
exit
```

## 安装|配置 php

### 安装

建议使用源码编译安装。
**获取源码包**

```bash
curl -o php-7.4.33.tar.gz https://www.php.net/distributions/php-7.4.33.tar.gz
tar -zxvf php-7.4.33.tar.gz
cd php-7.4.33
```

**配置安装内容**
按需求配置安装内容，这里只是一个示例，具体安装内容可以参考官方文档。

```bash
./configure --prefix=/usr/local/php --sysconfdir=/etc/php --with-openssl --with-zlib --with-bz2 --with-curl --enable-bcmath --enable-gd --with-webp --with-jpeg --with-mhash --enable-mbstring --with-imap-ssl --with-mysqli=mysqlnd --enable-exif --with-ffi --with-zip --enable-sockets --with-pcre-jit --enable-fpm --enable-pdo --with-pdo-mysql=mysqlnd --with-mysql=mysqlnd --enable-pcnt
```

mysqlnd是php提供的mysql驱动，是php5.3之后才有的。此处不选择mysql驱动之后会出错。

配置过程中可能会出现一些错误，根据错误提示安装相应的依赖即可。

**编译安装**

```bash
make
sudo make install
```

安装完成后执行以下命令

```bash
sudo cp php.ini-development /etc/php/php.ini # 复制配置文件模板
ln -s /usr/local/php/bin/php /usr/bin/php   # 建立软链接
ln -s /usr/local/php/bin/phpize /usr/bin/phpize
ln -s /usr/local/php/sbin/php-fpm /usr/bin/php-fpm
```

然后执行以下命令，查看php版本

```bash
php -v
```

### 配置

修改php配置文件

```bash
sudo vim /etc/php/php.ini
```

添加pdo_mysql扩展

```ini
extension=pdo       ; 添加pdo扩展
extension=mysqlnd   ; 添加mysqlnd扩展，因为前面设置pdo_mysql驱动为mysqlnd
extension=pdo_mysql ; 添加pdo_mysql扩展
```

修改完后退出保存，重启php-fpm

```bash
sudo systemctl restart php-fpm
```

## 安装|配置 apache

### 安装

使用 `apt-get` 安装

```bash
sudo apt-get install apache2
sudo apt-get install libapache2-mod-php
```

安装完成后启动apache

```bash
sudo systemctl start apache2
```

### 配置

修改apache配置文件

```bash
sudo vim /etc/apache2/apache2.conf
```

添加如下内容

```conf
<Directory /var/www/html>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

修改完后退出保存，重启apache

```bash
sudo systemctl restart apache2
```

执行以下命令，启动`rewrite`模块

```bash
sudo a2enmod rewrite
```

在 `/var/www/html` 目录下创建 `index.php` 文件，输入以下内容

```php
<?php
phpinfo();
?>
```
创建`.htaccess`文件，输入以下内容

```conf
<IfModule mod_rewrite.c>
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
</IfModule>
```

然后在浏览器中输入 `http://localhost` ，如果出现php信息页面，说明apache和php都安装成功了。可以用此页面查看php的配置信息。
随后即可在该路径下放置网页文件。

#### 设置域名

在 `/etc/apache2/sites-available` 目录下创建 `example.com.conf` 文件，输入以下内容

```conf
<VirtualHost *:80>
    ServerName example.com
    DocumentRoot /var/www/html

    <Directory /var/www/>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>

```
