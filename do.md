# 创建项目流程
## 1. 梳理前端项目结构
- [node_modules]   存放第三方node模块 由npm自动生成 不需要git管理
    - [interface]      存放php文件
        - [library]    库文件 例如 comm
    - [src]            存放前端项目源代码
        - [html]     
            - index.html
        - [styles]
            - index.less
        - [js]
            - [library] 前端库文件
                - jquery.js
                - bootstrap.js
                - cookie.js
                - querystring.js
            - index.js
            - product.js
            - shop.js
            - reg.js
            - login.js
    - [dist]           存放工具生成的文件(gulp grunt webpack...)
        - [html]
            - index.html
        - [css]
            - index.min.css
        - [js]
    - gulpfile.js      gulp的配置文件
    - .gitignore       git忽略列表
    - package.json     node模块依赖列表
    - README.md        项目说明

## 2. 创建项目架构

## 3. 初始化
1. npm init -y
2. git init

## 4. 安装cnpm
### npm淘宝镜像
https://developer.aliyun.com/mirror/NPM?from=tnpm
### 安装cnpm
```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```
### npm安装命令
```bash
npm install(i) packageName[version] -g               # 全局安装 ( 一般是工具或命令行工具 )
npm install(i) packageName[version] --save(-S)       # 项目依赖安装 ( 项目在部署环境需要使用的 )
npm install(i) packageName[version] --save-dev(-D)   # 开发依赖安装 ( 在项目开发时需要使用的工具 )
# 使用npm进行包安装时
# 项目依赖和开发依赖的安装命令必须在项目根目录执行
# 全局安装无所谓执行目录
```
### 使用cnpm安装gulp
```bash
# 所有全局安装的东西 每台电脑只需要装一次
$ cnpm i gulp -g       # 全局安装gulp
$ cnpm i gulp-cli -g   # 全局安装gulp命令行工具
```
```bash
# OSX操作系统在进行全局安装时需要获得权限 否则无法读写磁盘
$ sudo cnpm i gulp -g
$ sudo cnpm i gulp-cli -g
$ sudo -s # 长期获取root
$ cnpm i gulp -g
```
```bash
# 在全局安装完成后需要进行开发依赖安装
$ cnpm i gulp --save-dev
```