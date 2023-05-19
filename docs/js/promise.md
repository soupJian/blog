---
title: 手写 Promise
date: 2021-12-24
categories:
 - js
tags:
 - 面试
sticky:
 - 1
---

>在面试中，手写promise也是热门考点\
>手写promise，能帮助我们更好的理解并运用promise

## 先来了解一下 promise

> 传入一个 function，这个 function 接收 callback
> Promise 有 三种状态 `pending fulfilled rejected`\
> 两种原型链方法 .then .catch\
> 函数方法\
>  `resolve:` promise 成功回调\
>  `reject:`  promise  失败回调\
>  `all:`     多个promise 全部成功回调\
>  `race:`    多个中有一个成功就回调

## 基础的Promise

```js
const PENDDING = 'pending'
const FULFILLER = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  // # 开头是静态属性，外部不可访问
  #status = PENDDING
  #result = undefined

  constructor(func){
    const resolve = (res)=>{
      this.#changeStatus(FULFILLER,res)
    }
    const reject = (err)=>{
      this.#changeStatus(REJECTED,err)
    }
    // 防止传递的 func 出现错误，出现错误会导致 promise 的状态变为 rejected
    try {
      func(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  // 定义修改数据的静态方法
  #changeStatus = (status,result)=>{
    if(this.#status == PENDDING){
      this.#status = status
      this.#result = result
      console.log(this.#status,this.#result);
    }
  }
  
}

const p = new MyPromise((resolve,reject)=>{
  resolve('SUCCESS')
  reject("错误")
})
```

在上述基础 自定义 promise 中，创建了 `#status` 和 `#result` 两个静态属性

利用 `constructor` 构造函数，接收了一个 `function`，执行这个方法，并传入对应的 callback

同时为了避免 传入的 function 错误，采用 `try catch`

## .then()

`promise.then()` 方法接收一个成功和一个失败回调，返回 Promise 形式的内容

```js
class MyPromise {
  // ... 上述内容
  then = (fulfilledCallback,rejectedCallback)=>{
    return new MyPromise((resolve,reject)=>{
      if(this.#status == FULFILLED){
        fulfilledCallback(this.#result)
      }
      else if(this.#status == REJECTED){
        rejectedCallback(this.#result)
      }
    })
  }
}

// fulfilled SUCCESS
// pormise 完成 ----  SUCCESS
```

看上去上述似乎没有什么问题，但是如果我的 promise 不是立即 resolve，而是一个异步的呢？

比如
```js
const p = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('SUCCESS')
  },1000)
})

p.then(res=>{
  console.log("pormise 完成 ---- ",res);
},err=>{
  console.log("pormise 失败 ---- ",err);
})

// fulfilled SUCCESS
```
似乎只运行了 resolve 但是没有触发 `.then()` 方法,因为在等一秒钟的时候，.then方法已经运行结束了，但是 `#status` 此时还是 `pending` 状态，触发不了 `.then()`中的方法


我们可以在 `.then()` 方法中 把`fulfilledCallback`,`rejectedCallback`存储起来，当 promise 的状态改变时候，我们就可以运行这个方法，从而达到目的


```js
class MyPromise {
  
  #status = PENDDING
  #result = undefined

  #handler = undefined

  // 定义修改数据的静态方法
  #changeStatus = (status,result)=>{
    if(this.#status == PENDDING){
      this.#status = status
      this.#result = result
      console.log(this.#status,this.#result);
      this.#run()
    }
  }
  then = (fulfilledCallback,rejectedCallback)=>{
    return new MyPromise((resolve,reject)=>{
      this.#handler = {
        fulfilledCallback,
        rejectedCallback,
      }
      this.#run()
    })
  }
  #run(){
    if(this.#status == PENDDING) return
    const { fulfilledCallback,rejectedCallback } = this.#handler
    if(this.#status == FULFILLED){
      if(typeof(fulfilledCallback) == 'function'){
        fulfilledCallback(this.#result)
      }
    }else{
      if(typeof(rejectedCallback) == 'function'){
        rejectedCallback(this.#result)
      }
    }
  }
}

const p = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('SUCCESS')
  },1000)
})

p.then(res=>{
  console.log("pormise 完成 ---- ",res);
},err=>{
  console.log("pormise 失败 ---- ",err);
})

// fulfilled SUCCESS
// pormise 完成 ----  SUCCESS
```

## 多个 .then()

那么问题来了，Promise 定义后，我们是可以多次调用.then()方法的

```js
p.then(res=>{
  console.log("pormise 完成1 ---- ",res);
},err=>{
  console.log("pormise 失败1 ---- ",err);
})

p.then(res=>{
  console.log("pormise 完成2 ---- ",res);
},err=>{
  console.log("pormise 失败2 ---- ",err);
})

p.then(res=>{
  console.log("pormise 完成3 ---- ",res);
},err=>{
  console.log("pormise 失败3 ---- ",err);
})
// fulfilled SUCCESS
// pormise 完成3 ----  SUCCESS
```
从结果看，只执行了一次，这显然不符合要求，那么我们就应该把我们的 handler 基座一个数组，当调用一次`.then()` 时候，就读取一次，状态改变时候就删除一个

```js
#handler = []

then = (fulfilledCallback,rejectedCallback)=>{
  return new MyPromise(()=>{
    this.#handler.push({
      fulfilledCallback,
      rejectedCallback,
    })
    this.#run()
  })
}
#run(){
  if(this.#status == PENDDING) return
  while(this.#handler.length){
    const { fulfilledCallback,rejectedCallback } = this.#handler.shift()
    if(this.#status == FULFILLED){
      if(typeof(fulfilledCallback) == 'function'){
        fulfilledCallback(this.#result)
      }
    }else{
      if(typeof(rejectedCallback) == 'function'){
        rejectedCallback(this.#result)
      }
    }
  }
}
// pormise 完成1 ----  SUCCESS
// pormise 完成2 ----  SUCCESS
// pormise 完成3 ----  SUCCESS
```
promise只会 `resolve` 一次，但是可以 `.then()` 多次

## 完整代码

```js
const PENDDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  
  #status = PENDDING
  #result = undefined

  #handler = []

  constructor(func){
    const resolve = (res)=>{
      this.#changeStatus(FULFILLED,res)
    }
    const reject = (err)=>{
      this.#changeStatus(REJECTED,err)
    }
    // 防止传递的 func 出现错误，出现错误会导致 promise 的状态变为 rejected
    try {
      func(resolve,reject)
    } catch (error) {
      reject(error)
    }
  }
  // 定义修改数据的静态方法
  #changeStatus = (status,result)=>{
    if(this.#status == PENDDING){
      this.#status = status
      this.#result = result
      console.log(this.#status,this.#result);
      this.#run()
    }
  }
  then = (fulfilledCallback,rejectedCallback)=>{
    return new MyPromise(()=>{
      this.#handler.push({
        fulfilledCallback,
        rejectedCallback,
      })
      this.#run()
    })
  }
  #run(){
    if(this.#status == PENDDING) return
    while(this.#handler.length){
      const { fulfilledCallback,rejectedCallback } = this.#handler.shift()
      if(this.#status == FULFILLED){
        if(typeof(fulfilledCallback) == 'function'){
          fulfilledCallback(this.#result)
        }
      }else{
        if(typeof(rejectedCallback) == 'function'){
          rejectedCallback(this.#result)
        }
      }
    }
  }
}

const p = new MyPromise((resolve,reject)=>{
  setTimeout(()=>{
    resolve('SUCCESS')
  },1000)
})

p.then(res=>{
  console.log("pormise 完成1 ---- ",res);
},err=>{
  console.log("pormise 失败1 ---- ",err);
})

p.then(res=>{
  console.log("pormise 完成2 ---- ",res);
},err=>{
  console.log("pormise 失败2 ---- ",err);
})

p.then(res=>{
  console.log("pormise 完成3 ---- ",res);
},err=>{
  console.log("pormise 失败3 ---- ",err);
})
```