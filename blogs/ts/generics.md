---
title: typescript 泛型
date: 2023-08-07 14:00:00
categories:
    - ts
---

:::tip
`泛型`是 `ts` 的 高阶用法；
泛型通常标记 符号 `T`
:::

## 常用的泛型变量

-   T（Type） ：代表类型，定义泛型时通常作为第一个类型变量名称
-   K（Key）：表示对象中的键类型
-   U：表示对象中的键类型
-   V（Value）：表示对象中的值类型
-   E（Element）：表示元素或者节点类型

## 最简单的泛型

```ts
type Foo<T> = T;

const a: Foo<number> = 2;

const b: Foo<boolean> = false;
```

## 泛型的约束

```ts
type Foo<T extends string | boolean> = T;

const a: Foo<string> = "1";

// const b: Foo<number> = 1 ; 提示 类型“number”不满足约束“string | boolean”
```

## 条件判断

```ts
type Foo<T> = T extends number ? string : boolean;

const a: Foo<number> = "123";
const b: Foo<string> = false;
```

## 联合类型

```ts
type key = "react" | "next";
type MapType = {
    [k in key]: string;
};
const versions: MapType = {
    react: "18.2",
    next: "13.4",
};
```

## 默认参数类型

```ts
function identity<T = number>(arg: T): T {
    return arg;
}

const numValue = identity(42); // number
const strValue = identity("hello"); //  string
```

## 多重类型约束

```ts
function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
}

const merged = merge({ name: "Alice" }, { age: 30 });
// merged 的类型为 { name: string, age: number }
```

## 例子

### 在函数中使用

```ts
function userInfo<T>(name: T): T {
    return name;
}
userInfo("soupjian");
```

### 在接口中使用

```ts
interface Container<T> {
    value: T;
}
const numContainer: Container<number> = { value: 42 };
const strContainer: Container<string> = { value: "hello" };
```

### 在 class 中的使用

```ts
class Box<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    getValue(): T {
        return this.value;
    }
}

const numBox = new Box<number>(42);
console.log(numBox.getValue()); // 42

const strBox = new Box<string>("hello");
console.log(strBox.getValue()); // hello
```

### 泛型约束

```ts
function identity<T extends number | string>(arg: T): T {
    return arg;
}

const numValue = identity(42); //  number
const strValue = identity("hello"); //  string
```

```ts
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dog extends Animal {
    bark() {
        console.log("Woof!");
    }
}

class Cat extends Animal {
    meow() {
        console.log("Meow!");
    }
}

function makeSound<T extends Animal>(animal: T): void {
    if (animal instanceof Dog) {
        animal.bark();
    } else if (animal instanceof Cat) {
        animal.meow();
    }
}

const dog = new Dog("Buddy");
const cat = new Cat("Fluffy");

makeSound(dog); // 输出: "Woof!"
makeSound(cat); // 输出: "Meow!"
```
