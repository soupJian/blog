---
title: 闭包
date: 2023-05-04 22:04:00
categories:
  - js
---

## 什么是闭包？
```js
var inc = function () {
  var count = 0;
  return ++count;
};

inc(); // return: 1
inc(); // return: 1


var inc = (function () { // 该函数体中的语句将被立即执行（IIFE）
  var count = 0; // 局部变量 count 初始化
  return function () { // 父函式返回一个闭包（函式引用）
    return ++count; // 当父函式 return（即上一个 return）后，这里的 count 不再是父函式的局部变量，而是返回结果闭包中的一个闭包（环境）变量。
  };
})();

inc(); // return: 1
inc(); // return: 2
```
闭包就是能够读取其他函数内部变量的函数。
## 用途
1. 读取函数内部的变量
2. 让变量的值始终保存在内存中，不会函数调用后被自动清除
## 闭包有什么优缺点？
由于闭包会使得函数中的变量都被保存在内存中，内存消耗大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能会导致内存泄漏，结局办法就是，在退出函数之前，把不适用的局部变量
## 闭包的漏洞？

```js
// 假设有如下一个闭包

var o = (function (){
  var obj = {
    a: 1,
    b: 2
  }
  return {
    get: function(k){
      return obj[k]
    }
  }
})()

o.get('a')() => 1
```

分析：上述方法返回一个 get 方法，屏蔽 obj，外部不能直接访问它，只能读取它的某个属性，保护 obj

**那如何  获取 并 修改 obj 对象呢？**

我们可以访问 obj的任意一个属性，那如果我们访问 原型上的数据呢？ => Object.prototype ,我们可以访问 a,b，那么也可以访问 valueOf，通常来讲 对象的 valueOf 就是它自身，那我们是不是可以 利用 `o.get('valueOf')()` 获取到 obj对象呢？

显然是不可以的,正常来讲 `obj.valueOf()` 可以访问，但是 上述的 this 指向 全局，严格模式下是undefined, `o.get('valueOf')()` 也就相当于 `const valueOf = Object.prototype.valueOf()  => valueOf()`

如果我们想要修改这个 obj的话，那么就是说当读取 obj 的某个属性 就是一个函数调用，同时在返回的方法里面，把这个 obj 返回，也就是说，读取某个属性是一个访问器

如下 我们定义可一个 defineProperty , 监听原型，当对象没有 abc 属性的时候，直接返回这个对象

```js
Object.defineProperty(Object.prototype,'abc',{
  get(){
    return this
  }
})

const obj2 = o.get('abc')

obj2.a = '1234456'

o.get('a') => '123456'
```

**如何闭包解决？**

上述是利用原型漏洞实现，那我们直接把这一块儿屏蔽掉

```js
// 法一，判断对象是否有这个属性
var o = (function (){
  var obj = {
    a: 1,
    b: 2
  }
  return {
    get: function(k){
      if(Object.hasOwnProperty(k)){
        return obj[k]
      }
      return undefined
    }
  }
})()

// 法二， 如果不需要用到原型上的东西，直接把原型设置为 null
var o = (function (){
  var obj = {
    a: 1,
    b: 2
  }
  Object.setPrototypeOf(obj,null)
  return {
    get: function(k){
        return obj[k]
    }
  }
})()


```