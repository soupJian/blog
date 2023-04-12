---
title: promise
date: 2021-12-24
categories:
 - js
---

>在面试中，手写promise也是热门考点\
>手写promise，能帮助我们更好的理解并运用promise

## 先来了解一下 promise

>三种状态 `pending resolved rejected`\
>两种原型链方法 .then .catch\
>函数方法\
>  `resolve:`promise 成功回调\
> `reject:` promise  失败回调\
> `all:`    多个promise 全部成功回调\
>`race:`  多个中有一个成功就回调

## 本文尝试实现 then() 方法
```js
const PENDING = 'pending' // 加载中
const RESOLVED = 'resolved' // 成功
const REJECTED = 'rejected' // 失败

class myPromise {
  constructor(fun) {
    this.status = PENDING; // promise的状态
    this.data = ""; // 成功的回调参数
    let resolve = (res) => {
      if (this.status == PENDING) {
        this.status = RESOLVED;
        this.data = res;
      }
    }
    let reject = (err) => { //reject函数处理时也需传递参数
      if (this.status == PENDING) {
        this.status = REJECTED;
        this.data = err; //赋值
      }
    }
    try {
      fun(resolve, reject);
    } catch (err) {
      console.log(err)
    }
  }
  then = (resCallBack, errCallBack) => {
    // 第一个参数是成功的回调函数 第二个是失败的回调函数
    if (this.status == RESOLVED) {
      // 把成功值放到回调函数中
      resCallBack(this.data)
    } else if(this.status == REJECTED) {
      errCallBack(this.data)
    }
  }
  catch = (errCallBack) => {
    errCallBack(this.data)
  }
}

```
## 创建个实例验证一下
```js
const promise = new myPromise((resolve, reject) => {
    // 获取数据
    let data = 'SUCCESS'
    resolve(data);
})
setTimeout(() => {
    promise.then(res => {
      console.log("请求成功"+res) // 这是成功时的结果
    }, err => {
      console.log("请求失败"+err);
    })
}, 1000);
```
<Valine/>
