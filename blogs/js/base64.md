---
title: 文件转 base64
date: 2022-10-19
categories:
  - js
tags:
 - utils
---

**将文件上传后的 file 对象传进来就可以**

```js
export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
```
