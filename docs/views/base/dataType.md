---
title: js数据类型介绍
date: 2021-12-23
categories:
 - base
tags:
 - base
---
>总共有八种 

es5 有6中 `undefined`,`null`,`number`,`string`,`boolean`,`object`

es6新增 `symbol`

谷歌67版本 新增 `bigInt`，类似于java的数据类型

## js 基本数据类型

基本数据类型有五种，除了null，都可以用 typeof识别
基本类型存储在栈里面

### undefined 

undefined 是没有定义的

```js
var a
console.log(a) // undefined
console.log(typeof a) // undefined
```

### null

不存在的对象，null 是定义了但是为空，无法通过 typeof识别类型

```js
var a = null
console.log(a) // null
console.log(typeof a) // object
```

>区别 undefined 和 null

```js
// 判断一个值 是 undefined 还是 null
// 在js中 undefined == null

1. 首先过滤掉非 null和undefined的值
2. 再来 typeof判断区分
```

### number 数字类型

NaN是Number中的一种，但不是Number，并且`NaN != NaN`

```js
var a = 1
console.log(a) // 1
console.log(typeof a) // number
```

### string 字符串类型

```js
var a = '1'
console.log(a) // 1
console.log(typeof a) // string
```

### boolean 布尔类型 true/false

```js
var a = true
console.log(a) // true
console.log(typeof a) // bolean
```

特别注意 在 js 中 `true == 1` `fasle == 0`

## js复杂类型(引用类型) object

引用类型存储在堆里面

无法通过 typeof 区分

### object

```js
var person = {
    name:'soupjian',
    age: 22
}
```

person是一个对象，特点就是键值对的形式存在，有对应的key--value

### Array 对象

```js
 var a = [1,2,3,4]
 
 a[0]  // 1
```

数组形式，有对应的索引

### Data 日期格式

```js
    var a = new Date()
    console.log(a) // 2021-12-23T03:02:45.219Z
    // 转化为对应的秒数
    console.log(a.getTime()) // 1640228785344
```

### function 函数

```js
var add = function (a,b){
    return a + b
}

add(1,2) // 3
```

### RegExp 正则

一般用于表单校验

```js
var a = /^\d{1,}$/

a.test('1bc') // false
a.test(123) // true
```
<Valine/>


  