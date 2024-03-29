---
title: 数组乱序---洗牌算法
date: 2021-12-24
categories:
 - js
tags:
 - 算法
---

>场景\
>在我的一个项目中,需要用到随机播放这个功能,就研究了一下,记录如下

## 洗牌算法

>原理\
>1.倒序循环这个数组\
>2.取范围从 0 到 i 的随机索引 j\
>3. i 与 j 位置交换\
>4.直到循环至数组的首个元素
```js
function shuffle(arr) {
  let i = arr.length;
  for(let i = arr.length-1; i > 0;i--) {
    let j = Math.floor(Math.random() * i);
    var t = arr[i]
    arr[i] = arr[j]
    arr[j] = t
  }
  return arr;
}
var arr = [1,2,3,4,5,6,7,8,9];
console.log(shuffle(arr)); //  [6, 3, 9, 1, 8,7, 2, 4, 5]
```
>看一下变换过程 随机数向下取整
```
[1,2,3,4,5,6,7,8,9] 

// 第一次 0 ~ 8  随机数 和 最后一个交换 
// 5 和 9 交换
[1, 2, 3, 4, 9,6, 7, 8, 5]

// 第二次 0 ~ 7 随机数 和 最后倒数第二个交换
// 4 和 8 交换
[1, 2, 3, 8, 9,6, 7, 4, 5]

// 第三次 0 ~ 6 随机数 和 最后倒数第三个交换
// 2 和 7 交换
[1, 7, 3, 8, 9,6, 2, 4, 5]

// 第四次 0 ~ 5 随机数 和 最后倒数第四个交换
// 7 和 6 交换
[1, 6, 3, 8, 9,7, 2, 4, 5]

// 第五次 0 ~ 4 随机数 和 最后倒数第五个交换
// 8 和 9 交换
[1, 6, 3, 9, 8,7, 2, 4, 5]

// 第六次 0 ~ 3 随机数 和 最后倒数第六个交换
// 1 和 9 交换
[9, 6, 3, 1, 8,7, 2, 4, 5]

// 第七次 0 ~ 2 随机数 和 最后倒数第七个交换
// 9 和 3交换
[3, 6, 9, 1, 8,7, 2, 4, 5]

// 第八次 0 ~ 1 随机数 和 最后倒数第八个交换
// 3 和 6 交换
[6, 3, 9, 1, 8,7, 2, 4, 5]
```
> 可以看出 总共循环了八次,深度打乱了原位置数据

## es6进阶
```js
function shuffle(arr) {
  let i = arr.length;
  while (i) {
    let j = Math.floor(Math.random() * i--);
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}
```
## sort
>简易打乱 sort 有的时候大部分位置还是在原地
```js
function shuffle(arr) {
  arr.sort((a,b) => {
      return Math.random() - 0.5
  }) 
  return arr
}
```
<Valine/>
