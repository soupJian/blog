---
title: toLocaleString格式化
date: 2022-01-24
categories:
 - js
tags:
 - utils
---

## 格式化金钱

```js
const num = 123456789.79
num.toLocaleString() // 123,456,789.79
```

可以看到这里将数字金钱格式化了，此前都是采用一堆封装方法实现的[格式化金钱](fmoney.md)


## 百分比

```js
var num1 = 0.89
console.log(num1.toLocaleString('zh',{style:'percent'}))  //  89%
```

## 格式化时间

```js
const time = new Date()

time.toLocaleString() // 2022/1/24 下午2:28:54
time.toLocaleString('chinese',{hour12:false}) // 2022/1/24 14:30:08
```

## 中文十进制

```js
const num = 12345678.98
num.toLocaleString('zh-Hans-CN-u-nu-hanidec') // 一二,三四五,六七八.九八
```

<Valine/>