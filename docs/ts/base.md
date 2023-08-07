---
title: typescript 基础
date: 2023-08-07 09:00:00
categories:
  - ts
tags:
  - ts
---

## TS 介绍

### TS 介绍

`TS` 为 JS 添加了类型支持

从编程语言的动静来区分，`TS` 属于静态类型的编程语言，`JS` 属于动态类型的编程语言。

静态类型和动态类型的区别：

- 静态类型：编译期做类型检查
- 动态类型：执行期做类型检查

`TS`文件都会最终编译为 `JS` 执行，同时去除掉类型代码

### TS 优势

- TS 可以提前到在编写代码的同时就发现代码中的错误。
- 更好的代码提示，类型识别
- 代码可维护性强，重构和拓展比较容易
- TS 适合中大型项目交互协作。
- 前端必备

## TS 安装与使用

```sh
npm i -g typescript

tsc –V  // tsc --version

tsc hello.ts
```

## 常用类型

### 类型概述

- JS 已有类型
  - 原始类型：`number`,`string`,`boolean`,`null`,`undefined`,`symbol`
  - 对象类型：`object`(数组，对象，函数，正则，日期，Map,Set 等)
- TS 新增类型字段
  - 联合类型，类型别名（自定义类型），接口(interface)，元组(tuple)，类型(type)，枚举(enum)，void，any，unknow,

### 原始类型

```ts
let age: number = 24;
let name: string = "soupjian";
let isBoy: boolean = true;
let n: null = null;
let u: undefined = undefined;
let s: symbol = Symbol();
```

### 数组类型

```ts
let num_1: number[] = [1, 2, 3];
let num_2: Array<number> = [1, 2, 3];
let num_2: Array<number | string> = [1, 2, 3, "2"];
```

## 元组

```ts
let arr_1: [number, number] = [2, 4];
// 剩余参数
let arr_2: [number, string, ...string[]] = [1, "a", "b", "c"];
```

不能在剩余参数后面再添加任何参数

## 类型别名

```ts
type CustomerArray = Array<number | string>; // (number | string)[];

let arr1: CustomerArray = [1, 2, 3, "4"];
```

## 函数类型

### 一般用法

```ts
// 直接声明函数
function add_1(num1: number, num2: number): number {
  return num1 + num2;
}

// 函数表达式
const add_2 = (num1: number, num2: number): number => {
  return num1 + num2;
};
```

### 类型定义

```ts
type Add_function = (num1: number, num2: number) => number;

let add_3: Add_function = (num1, num2) => {
  return num1 + num2;
};

add_3(1, 2);
```

## void

函数没有返回值

```ts
const log_name = (name: string): void => {
  console.log(name);
};
```

## 参数可选

可选参数只能放到最后，并且只有一个

```ts
const log_userinfo = (name: string, age?: number): string => {
  if (age) {
    return `姓名:${name},年龄: ${age}`;
  } else {
    return `姓名:${name}`;
  }
};
log_userinfo("soupjian");
log_userinfo("soupjian", 24);
```

## interface

```ts
interface Props {
  phone: numebr;
  children: React.ReactNode;
}
exprot default Hello: React.FC<propsType>(props:Props)=>{
  return <>hello</>
}
```

### type 和 interface 的区别

- `interface` 可以重复声名，`type` 定义后不可重复声明

  ```ts
  interface Person {
    name: string;
  }
  interface Person {
    age: number;
  }
  // 会自动进行整合
  const student: Person = {
    name: "soupjian",
    age: 24,
  };
  ```

- `interface` 可以继承 `extends`,`type` 不可以
  ```ts
  interface Person {
    name: string;
    age: number;
  }
  interface Student extends Person {
    class: string;
  }
  const student: Student = {
    name: "soupjian",
    age: 24,
    class: "五年级",
  };
  ```

* type 可以定义非对象类型，interface 只能定义对象类型
  - 基本类型 `type StringType: string`
  - 联合类型 `type paramsType: string|number`
  * 元组类型 `type arrType: [string,number,string]`

## 断言

- “尖括号”

```ts
let someValue: any = "hello";
let strLength: number = (<string>someValue).length;
```

- "as"

```ts
let someValue: any = "hello";
let strLength: number = (someValue as string).length;
```

- 断言为特定类型

```ts
interface Cat {
  name: string;
  meow: () => void;
}

interface Dog {
  name: string;
  bark: () => void;
}

function handlePet(pet: Cat | Dog) {
  switch (pet.name) {
    case "Fluffy":
      (pet as Cat).meow(); // 在这里我们断言 pet 为 Cat 类型
      break;
    case "Buddy":
      (pet as Dog).bark(); // 在这里我们断言 pet 为 Dog 类型
      break;
    default:
      break;
  }
}
```

## 枚举(enum)

```ts
enum Color {
  Red,
  Green,
  Blue,
}

let myColor: Color = Color.Green;
console.log(myColor); // 输出: 1，因为枚举默认从 0 开始编号

enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}

let myDirection: Direction = Direction.Right;
console.log(myDirection); // 输出: "RIGHT"
```

## 关键词

`type`: 用于创建类型别名或定义自定义的类型。

`interface`: 用于定义接口，描述对象的结构和属性。

`class`: 用于定义类，包含构造函数、属性和方法。

`enum`: 用于定义枚举类型，表示一组命名的常量值。

`readonly`: 用于将属性设置为只读，不能再被修改。

`implements`: 用于类声明实现某个接口。

`extends`: 用于类和接口继承，扩展现有的类或接口。

`abstract`: 用于声明抽象类或方法，不能被直接实例化。

`keyof`: 用于获取一个类型的所有属性名作为联合类型。

`as`: 类型断言操作符，告诉编译器某个值的类型。

`instanceof`: 用于检查一个对象是否是某个类的实例。

`namespace`: 用于创建命名空间，用于封装和组织代码。

`never`: 表示永远不会发生的类型，通常用于表示无法到达的终点或错误。

`any`: 用于表示任意类型，关闭了 TypeScript 的类型检查。

`unknown`: 用于表示未知类型，比 any 更安全，需要类型断言。

`void`: 用于表示没有返回值的函数的返回类型。

`null`: 用于表示空值，是 null 类型的唯一值。

`undefined`: 用于表示未定义的值，是 undefined 类型的唯一值。

`this`: 用于指向当前对象，通常在方法中使用。

`typeof`: 用于获取一个值的类型信息，作为类型。

### typeof

```ts
let numValue: number = 24;
let strValue: string = "soupjian";

let numType: typeof numValue; // 类型为 number
let strType: typeof strValue; // 类型为 string

type Person = {
  name: string;
  age: number;
};

let person: Person = { name: "Alice", age: 30 };
type PersonType = typeof person; // 类型为 Person
```

### keyof

```ts
type Person = {
  name: string;
  age: number;
  email: string;
};

type PersonKeys = keyof Person; // 类型为 "name" | "age" | "email"

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person: Person = { name: "Alice", age: 30, email: "alice@example.com" };

const name = getProperty(person, "name"); // 类型为 string
const age = getProperty(person, "age"); // 类型为 number
const email = getProperty(person, "email"); // 类型为 string
```

### implements

```ts
interface Shape {
  calculateArea(): number;
}

class Circle implements Shape {
  constructor(private radius: number) {}

  calculateArea() {
    return Math.PI * this.radius ** 2;
  }
}

const myCircle = new Circle(5);
console.log(myCircle.calculateArea()); // 输出: 78.53981633974483
```

### namespace

命名空间

```ts
// math.ts
export namespace MathUtils {
  export function add(x: number, y: number): number {
    return x + y;
  }
}

// app.ts
import { MathUtils } from "./math";

const sum = MathUtils.add(10, 20); // 调用 math.ts 中的 add 函数
console.log(sum); // 输出: 30
```

### declare

- 声明全局变量或函数：

```ts
declare var myGlobalVariable: number;
declare function myGlobalFunction(): void;
```

- 声明外部模块：

```ts
declare module "my-module" {
  export function myFunction(): void;
  export const myValue: number;
}
```

- 声明类库中的全局变量和函数

```ts
declare namespace MyLibrary {
  function myFunction(): void;
  const myValue: number;
}
```
