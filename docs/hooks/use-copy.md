---
title: useClipboard 文字复制
date: 2023-03-19
categories:
  - hooks
---
## 普通写法

```javascript
function useClipboard(text) {
  return new Promise((res, rej) => {
    try {
      navigator.clipboard
        .writeText(text.toString())
        .then(function () {
          res(text);
          message.success("sussess!");
        })
        .catch(function (err) {
          rej(err);
          message.error("error!");
        });
    } catch (error) {
      rej(error);
    }
  });
}
const getClipboard = ()=>{
  return navigator.clipboard.readText();
}
export default {
  useClipboard,
  getClipboard
};

```

## react hooks

```javascript
import { useCallback } from "react";
import { message } from "antd";

function useClipboard() {
  const copyToClipboard = useCallback((text) => {
    return new Promise((res, rej) => {
      try {
        navigator.clipboard
          .writeText(text.toString())
          .then(function () {
            res(text);
            message.success("sussess!");
          })
          .catch(function (err) {
            rej(err);
            message.error("error!");
          });
      } catch (error) {
        rej(error);
      }
    });
  }, []);
  const getClipboard = useCallback(function () {
    return navigator.clipboard.readText();
  }, []);
  return [copyToClipboard, getClipboard];
}
export default useClipboard;
```