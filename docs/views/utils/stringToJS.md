---
title: string to js
date: 2022-04-15
categories:
 - utils
tags:
 - utils
---

:::tip
  将一段字符串代码运行为js
:::

> 很多人查阅资料后想到的是\
> 1. eval\
> 2. 动态创建script标签

我个人都试用过
结果如下

:::tip
  eval: 在vue框架中,使用eval后，eval中定义的变量无法暴露出来，在vue文件中获取不到\
  动态script 现在都是模块化开发，设置全局script，不容易销毁，而且全局的开发不友善
:::

## new Function

记一个根据后台 接口返回的 options 渲染 echarts

```js
// 将字符串转化为 对象
const chartOption = new Function('echarts,myChart',`try{
  ${this.option}
  if(option){
    return option
  }
}catch(e){console.log(e)}`)(this.$echarts,this.myChart)
```

记得用 try catch  防止错误

`this.option`：接口返回的 option

`this.$echarts`: 全局挂载的 echarts

`this.myChart`: 实例化的echarts 实例

## 小测试

```js
var str = 'var a = 123; console.log("我是内部的---"+a)'

const strA = new Function(`try{
  ${str}
  if(a){
    return a
  }
}catch(err){
  console.log(err)
}`)()

console.log("我是回调的---"+strA)

// 我是内部的---123
// 我是回调的---123
```