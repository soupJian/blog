---
title: typescript 进阶用法
date: 2023-08-08 13:00:00
categories:
    - ts
---

## Partial

用于将所有属性转换为可选属性

**源码**

```ts
type Partial<T> = { [P in keyof T]?: T[P] };
```

**例子**

```ts
interface User {
    name: string;
    age: number;
}

const zhangsan: User = {
    name: "张三",
    age: 24,
};

const lisi: Partial<User> = {};
```

## Required

这个和 Partial 相反，将一个类里面所有的 可选的属性值都转为 必选

**源码**

```ts
type Required<T> = {
    [P in keyof T]-?: T[P];
};
```

**例子**

```ts
interface User {
    name?: string;
    age?: number;
}

const lisi: Required<User> = {
    name: "张三",
    age: 24,
};
```

## Readonly

变量赋值后，所有属性值不可更改

**源码**

```ts
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

**例子**

```ts
interface User {
    name: string;
    age: number;
}

const lisi: Readonly<User> = {
    name: "张三",
    age: 24,
};
// lisi.name = "李四" // 这是错误的

// 相当于 定义时候固定写死了
interface User {
    name: "张三";
    age: 24;
}
```

## Pick

从现有类型中取出部分属性

**源码**

```ts
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
```

**例子**

```ts
interface Person {
    name: string;
    age: number;
    email: string;
    address: string;
}

type PersonBasicInfo = Pick<Person, "name" | "age">;

const person: PersonBasicInfo = {
    name: "Alice",
    age: 30,
};
```

## Omit

从一个指定类型中，去除某个属性,或者一个联合类型，返回新类型

**源码**

```ts
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

**例子**

```ts
interface Person {
    name: string;
    age: number;
    email: string;
    address: string;
}

type PersonWithoutEmail = Omit<Person, "email" | "address">;

const person: PersonWithoutEmail = {
    name: "Alice",
    age: 30,
};
```

## Record

它用于创建一个新类型，其中包含一组属性，并且每个属性都有相同的类型。Record 类型通常用于创建具有一组特定属性和类型的对象。

**源码**

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

**例子**

```ts
type Fruit = "apple" | "banana" | "orange";

type Inventory = Record<Fruit, number>;

const stock: Inventory = {
    apple: 10,
    banana: 15,
    orange: 8,
};
```

## Exclude

从联合类型中，排除指定的类型

**源码**

```ts
type Exclude<T, U> = T extends U ? never : T;
```

**例子**

```ts
type Colors = "red" | "blue" | "green" | "yellow";

type NonPrimaryColors = Exclude<Colors, "red" | "blue">;

const color: NonPrimaryColors = "green"; // 合法
// const invalidColor: NonPrimaryColors = 'red'; // 错误
// const invalidColor2: NonPrimaryColors = 'blue'; // 错误
```

## Extract

和 exclude 相反，从联合类型中取出 指定类型，返回一个新类型

**源码**

```ts
type Extract<T, U> = T extends U ? T : never;
```

**例子**

```ts
type Colors = "red" | "blue" | "green" | "yellow";

type NonPrimaryColors = Exclude<Colors, "red" | "blue">;

const color: NonPrimaryColors = "red"; // 合法
// const invalidColor: NonPrimaryColors = 'green'; // 错误
// const invalidColor2: NonPrimaryColors = 'yellow'; // 错误
```

## NonNullable

过滤掉 null 和 undefined

**源码**

```ts
type NonNullable<T> = T & {};
```

**例子**

```ts
type MaybeString = string | null | undefined;

type DefinitelyString = NonNullable<MaybeString>;

const stringValue: DefinitelyString = "hello"; // 合法
// const nullValue: DefinitelyString = null;    // 错误
// const undefinedValue: DefinitelyString = undefined; // 错误
```

## Parameters

提取函数的参数

**源码**

```ts
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;
```

**例子**

```ts
type AddFunction = (a: number, b: number) => number;

type AddFunctionParams = Parameters<AddFunction>;

// AddFunctionParams 的类型为 [number, number]
const params: AddFunctionParams = [2, 3];
const result = params[0] + params[1]; // 结果为 5
```

## ConstructorParameters

提取构造函数的参数

**源码**

```ts
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (
    ...args: infer P
) => any
    ? P
    : never;
```

**例子**

```ts
class Person {
    constructor(public name: string, public age: number) {}
}

type PersonConstructorParams = ConstructorParameters<typeof Person>;

// PersonConstructorParams 的类型为 [string, number]
const params: PersonConstructorParams = ["Alice", 30];
const person = new Person(...params);
console.log(person); // 输出: Person { name: 'Alice', age: 30 }
```

## ReturnType

提取函数的返回值类型

**源码**

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;
```

**例子**

```ts
function greet(name: string): string {
    return `Hello, ${name}!`;
}

type GreetReturnType = ReturnType<typeof greet>;
// 提取的返回类型是 string
const result: GreetReturnType = "soupjian";
```

## InstanceType

提取 class 实例的类型

**源码**

```ts
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R
    ? R
    : any;
```

**例子**

```ts
class Person {
    constructor(public name: string, public age: number) {}
}

type PersonInstance = InstanceType<typeof Person>;

const person: PersonInstance = new Person("Alice", 30);
console.log(person.name); // 输出: Alice
console.log(person.age); // 输出: 30
```

## Uppercase,Lowercase

Uppercase 将所有字符转大写

Lowercase 将所有字符转小写

**源码**

```ts
type Uppercase<S extends string> = intrinsic;

type Lowercase<S extends string> = intrinsic;
```

**例子**

```ts
type UppercaseString = "HELLO";
type LowercaseString = Lowercase<UppercaseString>;

const lowercased: LowercaseString = "hello";
// const invalidLowercased: LowercaseString = 'HELLO'; // 错误
```

## Capitalize,Uncapitalize

Capitalize 首字母转大写

Uncapitalize 首字母转小写

**源码**

```ts
type Capitalize<S extends string> = intrinsic;

type Uncapitalize<S extends string> = intrinsic;
```

**例子**

```ts
type OriginalString = "hello";
type CapitalizedString = Capitalize<OriginalString>;

const capitalized: CapitalizedString = "Hello";
// const invalidCapitalized: CapitalizedString = 'HELLO'; // 错误
```
