---
title: Set与Map
date: 2025-04-12
categories:
    - js
---

## Set

`Set`是一个新的全局对象，用于创建一个类似集合的数据结构，它允许你存储任何类型的唯一值，无论是原始值还是对象引用

### 基本特性

1. 集合中的元素是唯一的，也就是说，Set 对象中的元素是唯一的，重复的元素会被自动去除。
2. Set 对象中的元素是按插入顺序排列的，也就是说，Set 对象中的元素是按照插入顺序排列的，而不是按照插入顺序排列的。
3. Set 可以迭代，可以直接用`for of`循环遍历。

### 方法

1. add(value)：向集合中添加一个元素。
2. delete(value)：从集合中删除一个元素。
3. has(value)：判断集合中是否有某个元素。
4. clear()：清空集合中的所有元素。
5. size：获取集合中元素的个数。

### 使用场景

你需要确保一组数据中没有重复值时，Set 是非常有用的

## Map

`Map`是一个对象，用于保存键值对，并且能够记住键的原始插入顺序。任何值（对象或者原始值）都可以作为键或值。

### 基本特性

1. 键值对：Map 中的每个元素都是键值对（key/value）。
2. Map 可以迭代，可用于 `for of` 循环

### 常用方法

1. `set()`：向 Map 对象中添加新元素
2. `get()`：根据键值返回对应的值
3. `has()`：判断 Map 中是否有某个键值
4. `delete()`：删除 Map 中的某个键值
5. `clear()`：清空 Map
6. `size`：获取 Map 的长度

### 使用场景

当你需要频繁地根据键查找值，并且这些键不仅仅是字符串时，Map 是一个非常好的选择。

Map 查找速度快 效率比对象要高
