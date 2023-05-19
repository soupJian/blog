---
title: setState同步异步？
date: 2023-05-10 20:50:00
categories:
 - react
tags:
 - 面试
---

setState用于变更状态，触发组件重新渲染，更新视图UI

非真异步，在React可以控制的地方是异步的，

在原生事件 `addEventListener`,`setTimeout`,`setInterval` 中是同步的

React可以控制字段加入异步队列

```js
state = {
  count: 0
}
this.setState({
  count: 1
},()=>{
  console.log(this.state.count) // 1
})
console.log(this.state.count) // 0
```
通常情况下认为是异步的

## 异步场景
```js
state = {
  count: 0
}
this.setState({
  count: this.state.count + 1
},()=>{
  console.log(this.state.count) // 1
})
this.setState({
  count: this.state.count + 1
},()=>{
  console.log(this.state.count) // 1
})
console.log(this.state.count) // 0
```

```js
state = {
  count: 0
}
this.setState(preState=>{
  count: preState.count + 1
},()=>{
  console.log(this.state.count) // 1
})
this.setState(preState=>{
  count: preState.count + 1
},()=>{
  console.log(this.state.count) // 2
})
```

异步操作进行批量处理节省性能

## 同步场景

```js
state = {
  count: 0
}
console.log(this.state.count) // 0
setTimeOut(()=>{
  this.setState({
    count: this.state.count+1
  })
  console.log(this.state.count) // 1
},0)
```

所以在 `addEventListener`,`setTimeout`,`setInterval` 这些原生事件中都会立即执行