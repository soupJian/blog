---
title: 防抖和节流
date: 2022-04-27
categories:
  - js

---

## 防抖

### 防抖原理

:::tip
 防抖是在某个时间内，无论触发多少次，都只执行最后一次
 例如： 输入框搜索，窗口抖动
:::
### 防抖代码

```js
function debounce(fn,delay) {
  let timer = null; //通过闭包缓存了一个定时器
  return function () {
    const args = [...arguments];
    const context = this
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
        fn.apply(context,args);
    },delay);
  }
}
```

## 节流

### 节流原理
:::tip
 节流原理就是在一定时间内只执行第一次，在定时器内无论执行多少次只有第一次生效
 例如： 按钮点击
:::

### 节流代码

```js
function throttle(fn, delay) {
  let flag = true;
  return function () {
    if (!flag) {
      return;
    }
    const context = this
    const args = [...arguments];
    flag = false;
    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, delay);
  }
}
```

## 在线测试
输入框输入  -- 控制台查看
<utils-debounceThrottle />

## 在vue中使用

**合理利用闭包**
```vue
<template>
<div>
  <!-- 控制台看打印 -->
  <p>input 没有防抖的</p>
  <p><input type="text" v-model="baseValue"/></p>  
  <p>input 防抖后的</p>
  <p><input type="text" v-model="debounceValue"/></p>  
  <p>input 节流后的</p>
  <p><input type="text" v-model="throttleVlaue"/></p>
</div>
</template>
<script>
export default{
  data(){
    return{
      baseValue: '',
      debounceValue: '',
      throttleVlaue: ''
    }
  },
  watch:{
    baseValue(){
      const time = this.formatDateTime()
      console.log(`没有防抖: ${this.baseValue} ---- ${time}`)
    },
    debounceValue(){
      console.log(this.debounceValue);
      this.sayDebounce(this.debounceValue)
    },
    throttleVlaue(){
      console.log(this.throttleVlaue);
      this.sayThrottle(this.throttleVlaue)
    }
  },
  methods:{
    formatDateTime() {
      let date = new Date();
      const year = date.getFullYear() // 年
      const month = date.getMonth() + 1 // 月
      const day = date.getDate() // 日 获取日是 getDate()方法 区别于 getDay()是星期
      const hour = date.getHours() // 时
      const minute = date.getMinutes() // 分
      const second = date.getSeconds() // 秒
      return `${year}-${this.formatNum(month)}-${this.formatNum(day)} ${this.formatNum(hour)}:${this.formatNum(minute)}:${this.formatNum(second)}` 
    },
    formatNum(num){
      return num > 10 ? num : `0${num}`
    },
    // 封装防抖函数
    debounce(fn,delay){
      let timer = null;
      return function(){
        const context = this
        const args = [...arguments];
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context,args);
        },delay);
      }
    },
    // 防抖执行函数
    printDebounce(content){
      const time = this.formatDateTime()
      console.log(`防抖: 只执行一秒内的最后一次: ${content} ---- ${time}`)
    },
    // 封装节流函数
    throttle(fn,delay){
      let flag = true
      return function(){
        if(!flag){
          return 
        }
        const context = this
        const args = arguments
        flag = false
        setTimeout(function(){
          fn.apply(context,args)
          flag = true
        },delay)
      }
    },
    // 执行节流函数
    printThrottle(content){
      const time = this.formatDateTime()
      console.log(`节流: 只执行一秒内的第一次: ${content} ---- ${time}`)
    }
  },
  created(){
    // 合理利用闭包
    this.sayDebounce = this.debounce(this.printDebounce,1000)
    this.sayThrottle = this.throttle(this.printThrottle,1000)
  }
}
</script>
```