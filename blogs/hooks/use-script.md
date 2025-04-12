---
title: useScript
date: 2024-05-17
categories:
    - hooks
---

## 封装

```js
const useScript = (url, position, id) => {
    if (!position) return;

    if (document.querySelector(`#${id}`)) return;

    const script = document.createElement("script");

    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = url;

    position.appendChild(script);
};

//
useScript(url, document.head, "script-id");
```
