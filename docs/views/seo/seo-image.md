---
title: 不可忽视图片搜索流量
date: 2023-04-02 23:36:00
categories:
 - seo
---

:::tip
  全面把握流量渠道，不要觉得少就不重要
::: 

## 什么是图片搜索流量

1. google search console 中可以看到
2. 在谷歌搜索结果中的图片

## 如何获得图片搜索流量

1. 做 Alt 优化

    * B2C/B2B 图片ALT 打法，描述详细点，相关性，关键词

    * 给图片添加型号

2. 做抓取优化

  创建图片的 image sitemap

      * 展示型铲平适合展示 sitemap
      * image sitemap 

3. 做结构化的优化

  图片也要做结构化标记（搜索结果中图片会包含product标记）
```html
<meta property="og:type" content="og:product" />
<meta property="og:title" content="**产品" />
<meta property="og:description" content="图片或者产品描述" />
<meta property="og:url" content="产品地址" />
<meta property="og:image" content="图片地址" />
<meta property="product:plural_title" content={productTitle} />
<meta property="product:price.amount" content="100" />
<meta property="product:price.amount" content="USD" />
```
```txt
og:title 标题
og:type 类型（常用值:article book movie）
og:image 略缩图地址
og:author 作者名称
og:url 页面地址
og:release_date 发布时间
og:description 页面的简单描述
og:site_name 页面所在网站名
og:videosrc 视频或者Flash地址
og:audiosrc 音频地址
```

4. 做图片速度优化

    * 减少图片大小
    * 提供响应式图片 srcset
    * 图片提供CDN
    * 图片的延迟加载


