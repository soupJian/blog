---
title: 递归算法(快速排序)
date: 2022-03-16
categories:
 - javascript
tags:
 - 算法
---

>递归算法通俗地讲类似于while，当条件满足时候一直进入循环，不满足跳出循环

# 数字排序

给定一个无序数组对其进行排序

```js
const arr = [85, 24, 63, 45, 17, 31, 96, 50]

function digui(arr){
  if(arr.length <= 1){
    return arr
  }
  // 定义左侧数组
  const left = []
  // 定义右侧数组
  const right = []
  const midIndex = Math.floor(arr.length / 2)
  // 取得中间值，并数组删除这个值
  // 如果不删除，当数组只剩下两个值的时候，在一定情况下会进入死循环
  // splice 截取的也是一个数组
  const mid = arr.splice(midIndex,1)[0]
  arr.forEach(item=>{
    item > mid ? right.push(item) : left.push(item)
  })
  return digui(left).concat([mid],digui(right))
}

digui(arr) // [24, 31, 45, 50, 63, 85, 96]
```
对应流程如下

<img src="/img/digui.png"/>

