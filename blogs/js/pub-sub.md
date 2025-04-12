---
title: 发布订阅
date: 2025-04-12
categories:
    - js
tag:
    - 面试
---

发布-订阅模式（Publish/Subscribe Pattern）是一种消息传递模式，发送者（发布者）不会直接将消息发送给特定的接收者（订阅者），而是发布消息到一个事件通道或主题上，然后由系统将这些消息传递给当前已订阅该主题的所有观察者。

```js
// 创建一个发布订阅对象
const pubSub = {
    // 用于存储事件类型和对应的回调函数列表
    events: {},

    // 订阅方法：添加订阅者到指定事件类型中
    subscribe: function (eventName, fn) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(fn);
    },

    // 发布方法：触发指定事件类型，并将数据传给所有监听该事件的回调函数
    publish: function (eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn) {
                fn(data);
            });
        }
    },

    // 取消订阅方法：从指定事件类型中移除订阅者
    unsubscribe: function (eventName, fn) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter(function (el) {
                return el !== fn;
            });
        }
    },
};

// 定义两个订阅者
function subscriber1(data) {
    console.log("Subscriber 1 received:", data);
}

function subscriber2(data) {
    console.log("Subscriber 2 received:", data);
}

// 订阅事件
pubSub.subscribe("news", subscriber1);
pubSub.subscribe("news", subscriber2);

// 发布事件
pubSub.publish("news", "Breaking News!");

// 取消其中一个订阅
pubSub.unsubscribe("news", subscriber1);

// 再次发布事件，此时只有subscriber2会收到通知
pubSub.publish("news", "More Breaking News!");
```
