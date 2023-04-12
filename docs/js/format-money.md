---
title: 数字金钱格式化
date: 2021-12-24
categories:
 - js
---

## 需求
>实现输入框输入数字失焦后转化为金钱格式,即千分位\
>实现输入框获取焦点后取消格式化转化为常规字符串

## 金钱格式化

```js
function fmoney(strNum) {
  if(strNum.length <= 3){
    return strNum;
  }
  if(!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)){
    return strNum
  }
   const a = RegExp.$1
   let b=RegExp.$2
   const c=RegExp.$3;
   const re = new RegExp();
   re.compile("(\\d)(\\d{3})(,|$)");
   while(re.test(b)){
     b = b.replace(re,"$1,$2$3");
   }
   return `${a}${b}${c}`
}
var money = '12345678.00'
const result = fmoney(money) 
console.log(result); // 12,345,678.00

```

## toLocaleString() 更简洁

```js
const num = 123456789.79
num.toLocaleString() // 123,456,789.79

```

**注意只有`number`才支持此方法，注意对应转换**

## 取消格式化

```js
function trimMoney(value){
    return value.trim().replace(/[￥,%]/g,"")
}

const trimResult = trimMoney(result)

console.log(trimResult); // 12345678.00
```
<Valine/>
