---
title: 深拷贝与浅拷贝
date: 2021-12-23
categories:
 - javascript
tags:
 - base
 - utils
---


>深拷贝与浅拷贝与赋值之间的关系

## 为什么研究呢

```js
var person1 = {
    name: "张三",
    age: "45",
    children: {
        name: "张心",
        age: '12',
    },
    arr: [1,[2,3],4,5]
}
```

尝试改变一下值

```js
// 进行拷贝
var person2 = person1

// 改变拷贝后的值
person2.name = '李四'
person2.children.name = '李四海';
person2.arr[1][1] = 'm'

// 打印一下
console.log(person1)
// { 
//    name: "李四", 
//    age: "45",
//    children: {
//        name: "李四海", 
//        age: "12"},
//        arr: [1,[2,'m'],4,5]
//    }
//   }
```

可以看到 改变 person2 会直接改变 person1

显然这不是我们想要的效果,这个是bug么? 其实这是因为赋值的时候 person2 和 person1 都指向同一个堆中，改变person2的值，其实是把堆里面的值也改变了.这也导致person1的值也改变了

## 浅拷贝

>就是新开辟一个内存地址,遍历person1的所有key,将对应的key-value进行逐一copy,这样就属于两个内存地址,两个堆中就互不影响了

```js
// 封装拷贝方法
function shallowClone(obj){
  const shallowCloneObj = {}
  for(let key in obj){
    shallowCloneObj[key] = obj[key]
  }
  return shallowCloneObj
}
// 进行浅拷贝
person3 = shallowClone(person1)
person3.name = "王五"
person3.children.name = "王浩"
person3.arr[1] = 'w'
console.log(person3)
// {name: "王五", age: "45",children: {name: "王浩", age: "12"},arr: (4) [1, "w", 4, 5]
console.log(person1)
// {name: "张三", age: "45",children: {name: "王浩", age: "12"},arr: (4) [1, "w", 4, 5]

```

显然看出,经过一层转换,person1里面的基本类型的值没有被影响,但是引用类型的值还是被改变了,主要原因是浅拷贝只拷贝了一层,没有拷贝彻底

这种未拷贝彻底的行为就称为 `浅拷贝`

## 深拷贝

>深拷贝就是在浅拷贝的基础上进行一个递归,直到所有的子元素都被拷贝完毕

```js
// 定义深拷贝方法
function deepClone(obj){
    if (obj === null) return obj;
     // 解决 日期和正则拷贝问题
    if (obj instanceof Date) return new Date(obj);
    if (obj instanceof RegExp) return new RegExp(obj);
    if (typeof obj !== "object") return obj; // 停止递归
    var deepCloneObj= {}
    for(let key in obj){
        // 子元素是 object的才需要递归 ,注意 null的typeof也是 object
        if(typeof obj[key] == 'object' && typeof obj[key] != null){
            // 这里需要递归一下，使得引用类型 也 更换内存地址并赋值内容
            deepCloneObj[key] = deepClone(obj[key])
        }else{
         deepCloneObj[key] = obj[key]
        }
    }
    return deepCloneObj;
}
// 验证一下
person3 = deepClone(person1)
person3.name = "王五"
person3.children.name = "王浩"
person3.arr[1] = 'w'
console.log(person3)
// {name: "王五", age: "45",children: {name: "王浩", age: "12"},arr: (4) [1, "w", 4, 5]
console.log(person1)
// {name: "张三", age: "45",children: {name: "张心", age: "12"},arr: [1,[2,3],4,5]
```

显然看出这种对于子元素任然是引用类型,采用递归方式,就可以使得拷贝前后的元素互不影响的方式,称为`深拷贝`

## 最简单的深拷贝

>利用JSON进行转化,这样就给新的值一个新的内存地址,但JSON不能够解析包含 function,Date,RegExp特殊格式

```
function deepClone(obj){
    let  newObj = JSON.stringfy(obj),
            cloneObj = JSON.parse(newObj);
    return cloneObj;
}
```
<Valine/>

