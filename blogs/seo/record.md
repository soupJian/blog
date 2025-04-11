---
title: 搞定收录，搞定排名
date: 2023-04-01 16:50:00
categories:
 - seo
---

## 如何提交网站到谷歌？

1. 找到你的站点地图

  https://xxx.com/sitemap.xml (常见的 shopify)

  https://xxx.com/sitemap_index.xml (常见的 wordpress)

2. 提交你的站点地图

  search console

  submit your sitemap by pinging google
  `http://www.google.com/ping?sitemap=你的站点地图`
  不要多次提交或者 ping 没有更改的 sitemap

## 如何提交网址到谷歌？

1. Ping Google

如果是 wordpress 通常用 Recommended 插件提交

2. 使用谷歌网址检查工具

## 谷歌多久把内容编入索引？

除非是大型网站，否则需要一两周的时间

## 为什么谷歌没有收录你的网站？

1. 你阻止了谷歌爬取
常见如下
```txt
Use-agent: Googlebot
Disallow: /
```
2. 禁止了谷歌收录
```html
<meta name="robots" content="noindex">
```
3. 谷歌爬虫没有上门
4. 你有低价值的页面

    1. 字数过少

    2. 是重复或者接近重复的页面

## 如何检查谷歌是否收录了你的页面

```txt
site:yourwebsite.com/url
```

## 十个被谷歌收录的方法

1. 删除 robot.txt文件中的 Disallow
2. 删除不需要的 noindex 标签
3. 在站点地图包含该页面
4. 删除不必要的规范化标记
```html
<link rel="canonical" href="url">
```
5. 检查是不是 orphan page（孤链接）

    看看有没有内部链接指向
6. 修复 nofollow 的内部链接
7. 添加强大的内部链接
8. 确保页面有价值和独特性
9. 移除低质量的页面（优化抓取预算）
10. 建立高质量的反向链接

