---
title: react-cool-inview 滚动加载
date: 2023-03-19
description: react滚动加载组件
categories:
  - npm
tags:
  - npm
---
```js
import { useInView } from "react-cool-inview";
const App = () => {
  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0.25, // Default is 0
    onChange: ({ inView, scrollDirection, entry, observe, unobserve }) => {
      // Triggered whenever the target meets a threshold, e.g. [0.25, 0.5, ...]
      unobserve(); // 停止观察当前元素
      observe(); // 观察当前元素
    },
    onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
      // 最后一项进入视口的时候
    },
    onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
    },
  });

  return <div ref={observe}>{inView ? "Hello, I am 🤗" : "Bye, I am 😴"}</div>;
};
```
## 也可采用 组件 方式

```js
import { InView } from "react-cool-inview";

const HelloText = ({ inView, observe }) => (
  <div ref={observe}>{inView ? "Hello, I am 🤗" : "Bye, I am 😴"}</div>
);

const App = () => (
  <InView unobserveOnEnter>
    <HelloText />
  </InView>
);
```

## 延迟加载图片
```js
import { useInView } from "react-cool-inview";

const LazyImage = ({ width, height, ...rest }) => {
  const { observe, inView } = useInView({
    // inview是否只触发一次
    unobserveOnEnter: true,
    // 离视口多元才开始加载
    rootMargin: "50px",
  });

  return (
    <div className="placeholder" style={{ width, height }} ref={observe}>
      {inView && <img {...rest} />}
    </div>
  );
};
```

## 无线滚动 && 滚动加载
```js
import { useState } from "react";
import { useInView } from "react-cool-inview";
import axios from "axios";

const App = () => {
  const [todos, setTodos] = useState(["todo-1", "todo-2", "..."]);
  const { observe } = useInView({
    rootMargin: "50px 0px",
    // 当最后一项进入视口的时候
    onEnter: ({ unobserve, observe }) => {
      // 先停止观察
      unobserve();
      // 加载数据
      axios.get("/todos").then((res) => {
        setTodos([...todos, ...res.todos]);
        // 重新观察
        observe();
      });
    },
  });

  return (
    <div>
      {todos.map((todo, idx) => (
        <div ref={idx === todos.length - 1 ? observe : null}>{todo}</div>
      ))}
    </div>
  );
};

```

## 滚动方向
react-cool-inview不仅监控元素进入或离开视口,还通过scrollDirection对象告诉你它的滚动方向。该对象包含垂直(y-axios)和水平(x-axios)属性,只要目标元素满足threshold,就会计算它们。如果没有足够的计算条件,属性的值将是undefined。另外,属性的值将与视口的滚动方向同步。
```js
import { useInView } from "react-cool-inview";

const App = () => {
  const {
    observe,
    inView,
    // vertical will be "up" or "down", horizontal will be "left" or "right"
    scrollDirection: { vertical, horizontal },
  } = useInView({
    // Scroll direction is calculated whenever the target meets a threshold
    // more trigger points the calculation will be more instant and accurate
    threshold: [0.2, 0.4, 0.6, 0.8, 1],
    onChange: ({ scrollDirection }) => {
      // We can also access the scroll direction from the event object
      console.log("Scroll direction: ", scrollDirection.vertical);
    },
  });

  return (
    <div ref={observe}>
      <div>{inView ? "Hello, I am 🤗" : "Bye, I am 😴"}</div>
      <div>{`You're scrolling ${vertical === "up" ? "⬆️" : "⬇️"}`}</div>
    </div>
  );
};

```