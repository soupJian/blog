---
title: a链接下载
date: 2022-10-19
categories:
  - javascript
tags:
  - utils
---

**上传后的文件对象**

```js
window.URL.createObjectURL(file)
```

**顺便记录一下下载**

```js
function download = (url)=>{
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name + '.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) //下载完成移除元素
}
```
