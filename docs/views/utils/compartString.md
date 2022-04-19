---
title: 字符串比较顺序
date: 2022-04-19
categories:
 - utils
tags:
 - utils
---

## 普通比较

```js
const arr = ['c','a','ab','ca']
arr.sort() // [ 'a', 'ab', 'c', 'ca' ]
```

## 对象数组比较

```js
const arr = [
  {name: 'Banana',price: 1},
  {name: 'Orange',price: 2},
  {name: 'Apple',price: 3}
]
arr.sort((a,b)=>{
  return a.name.localeCompare(b.name)
})
console.log(arr);
// [
//   { name: 'Apple', price: 3 },
//   { name: 'Banana', price: 0 },
//   { name: 'Orange', price: 0 }
// ]

```

## 中文比较

中文可以通过 [pinyin](https://www.npmjs.com/package/pinyin) 插件转为拼音比较

或者 [pinyin-pro](https://www.npmjs.com/package/pinyin-pro) 插件

看需求使用

