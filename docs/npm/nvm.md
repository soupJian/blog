---
title: nvm版本控制
date: 2023-05-14 21:37:44
categories:
 - npm
tags:
 - npm
---

nvm 进行 node 的多版本控制，有时候会同时开发多个项目，node日新月异，这就导致多个项目的node环境不一样，某些node_module就安装失败

此时就需要一个工具来进行版本管理，nvm就是这样的一个工具

## [安装地址](https://github.com/coreybutler/nvm-windows/releases) 

选择 nvm-setup.exe安装并运行

会让我们选择两次安装地址

第一次是 安装 nvm 的地址
第二次是安装 node 的地址

## nvm 命令

`nvm list`: 也可以使用 `nvm ls` 查看本地所有的 node 版本

`nvm use`: 例如`nvm use 18.16.0` 就会将本地的 node 环境 配置为 18.16.0 的版本

`nvm install <version>` 安装node版本号

`nvm uninstall <version>` 卸载node版本号
## nvm 镜像

```js
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
```

## 补充知识

node 查看 某个npm 模块的 所有版本

`npm view 模块名 versions` 例如 `npm view swiper versions`