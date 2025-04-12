---
title: call、apply、bind的区别
date: 2025-04-12
categories:
    - js
tags:
    - 面试
---

## 相同点

`apply`, `bind`, `call` 是 JavaScript 中用于改变函数执行上下文（即函数内部的 this 指向）的方法

## call

1. 语法：`function.call(thisArg, arg1, arg2, ...)`
2. 功能：立即调用函数，并且可以指定函数内部的 `this` 指向的对象以及传入参数。
3. 参数：第一个参数是要绑定给 `this` 的值，后面的参数列表是传递给函数的参数。
4. 应用场景：当你需要立即执行一个函数并且明确知道所有参数时，可以使用 `call`

```js
let person = { name: "Alice" };
function greet(age, city) {
    console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}

// 使用 call 方法
greet.call(person, 25, "New York");
// 输出: Alice is 25 years old and lives in New York.
```

## apply

1. 语法：`function.apply(thisArg, [argsArray])`
2. 功能：立即调用函数，并且可以指定函数内部的 `this` 指向的对象以及传入参数。
3. 参数：第一个参数是要绑定给 `this` 的值，第二个参数是一个数组，包含了函数的参数。
4. 应用场景：当你有一个参数数组要传递给函数时，使用 `apply` 非常方便。

```js
let person = { name: "Bob" };
function greet(age, city) {
    console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}

// 使用 apply 方法
greet.apply(person, [30, "Los Angeles"]);
// 输出: Bob is 30 years old and lives in Los Angeles.
```

## bind

1. 语法：`function.bind(thisArg[, arg1[, arg2[, ...]]])`
2. 功能：**不会立即执行函数**，而是返回一个新的函数，这个新函数在被调用时其内部的 this 指向的是 bind 方法中指定的对象。
3. 参数：第一个参数是指定 this 的值，后续参数可选，表示预设的初始参数。
4. 应用场景：当你希望创建一个具有不同 this 值的新函数，或者预先设置一些参数但不立即执行函数时，使用 `bind`

```js
let person = { name: "Charlie" };
function greet(age, city) {
    console.log(`${this.name} is ${age} years old and lives in ${city}.`);
}

// 使用 bind 方法
let greetPerson = greet.bind(person);
greetPerson(35, "Chicago");
// 输出: Charlie is 35 years old and lives in Chicago.

// 或者预先设置部分参数
let greetWithCity = greet.bind(person, 40);
greetWithCity("Miami");
// 输出: Charlie is 40 years old and lives in Miami.
```
