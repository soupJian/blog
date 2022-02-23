---
title: 时间格式化处理
date: 2022-01-24
categories:
 - utils
tags:
 - utils
---

## 时间转时间戳

>时间戳从1970年1月1日开始\
> 一般采用时间戳比较时间大小

```js
new Date().valueOf()  // 1643011953182
new Date().getTime() // 1643011969293
```

## 时间戳转时间格式

```js
const timestamp = 1643011953182
new Date(timestamp) // 2022-01-24T08:12:33.182Z  ISO8601格式
```

## 当前时间

### 自定义写法

```js
function formatDateTime() {
  let date = new Date();
  const year = date.getFullYear() // 年
  const month = date.getMonth() + 1 // 月
  const day = date.getDate() // 日 获取日是 getDate()方法 区别于 getDay()是星期
  const hour = date.getHours() // 时
  const minute = date.getMinutes() // 分
  const second = date.getSeconds() // 秒
  return `${year}-${formatNum(month)}-${formatNum(day)} ${formatNum(hour)}:${formatNum(minute)}:${formatNum(second)}` 
}

function formatNum(num){
  return num > 10 ? num : `0${num}`
}

formatDateTime() // 2022-01-24 16:42:47

```

### toLocalestring()

```js
function formatDateTime(){
  const time = new Date()
  return time.toLocaleString('chinese',{hour12:false}) // 2022/1/24 14:30:08
  // return time.toLocaleString() // 2022/1/24 下午2:28:54
}

// 结合 replace 方法 可以转化为自己想要的格式
```

## 时间对比

```js
/*
@params
 date1 2021-12-12
 date2 2021-03-24
*/
function compareTime(date1,date2){
  // 也可以采用 getTime() 方法
  return new Date(date1).valueOf() > new Date(date2).valueOf()
}
// 传入任何时间格式即可 没有传递时分秒，默认都是 0
compareTime('2021/12/12 12:03:23','2021-12-12 12:03:22') // true
```

<Valine/>


