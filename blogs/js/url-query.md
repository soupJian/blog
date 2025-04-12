---
title: 路由参数查询
date: 2023-03-19
categories:
    - js
tags:
    - utils
---

## query

```js
function getSearchQuery() {
    return decodeURI(window.location.search)
        .replace("?", "")
        .split("&")
        .map((param) => param.split("="))
        .reduce((values, [key, value]) => {
            values[key] = value;
            return values;
        }, {});
}
```

## params

```js
function getSearchParam() {
    return Object.fromEntries(new URLSearchParams(window.location.search));
}
```
