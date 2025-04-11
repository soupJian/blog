---
title: a==1 && a==2 && a==3
date: 2023-05-07 22:43:00
categories:
 - js
tags:
 - 面试
 - 算法
sticky:
 - 2
---


如何使得 a==1 && a==2 && a==3 成立呢？

## a为对象，重写 `valueOf()` / `toString()`
对象 和 数字类型比较，先用valueOf()转换，看是否能转换为原始的，否则用 toString() 转换
```js
// 法一
let a = {
  n: 1,
  valueOf(){
    return this.n++
  }
}

// 法二
let a = {
  n: 0,
  targets: [1,5,6,7],
  valueOf(){
    return this.targets[n++]
  }
}
```
## a 为数组，重写 `join()`/ 方法
对于数据而言，在处理和原始类型比较的时候，会调用 toSrting()方法

```js
let a = [1,2,3]

Object.defineProperty(a, 'toString', {
  get: function () {
    return () => this.shift()
  }
})

Object.defineProperty(a, 'join', {
  get: function () {
    return () => this.shift()
  }
})

```
## a 为代理 proxy 够高 get 捕获器

proxy其实也是类似 object.defineProperty，但是更能监听对象数组的变化，这点在 vue3 采用 proxy ，舍弃 Object.defineProperty体现

```js
let a = new Proxy(
  { v: 1 },
  {
    get(target, property, receiver) {
      // 隐式转换会调用 Symbol.toPrimitive，这是一个函数
      if (property === Symbol.toPrimitive) {
        // 函数属性，所以要返回一个函数，会被自动执行
        return () => target.v++
      }
    }
  }
)

```

## 补充知识

## == 比较

1. 特殊的 
    * undefined == null
    * NaN != NaN
2. 类型相同
  比较值
3. 类型不同
  * 均为原始 转换为数字比较
  * 一端原始一端对象 => 对象转原始后比较，先调用 valueOf,若无法转原始，则调用 toString()

```js
const obj = {a:1}

obj.valueOf() // => {a:1}
obj.toString() // [object object]

const arr = [1,2,3]

arr.valueOf() // [1,2,3]
arr.toString()  // '1,2,3' // 相当于 join()

let str = '1,2,3'

arr == '1,2,3' // true
```
`Array.prototype.toString() === Array.prototype.join()`
