---
title: 前端导出excel文件
date: 2022-10-19
categories:
  - js
tags:
 - utils
---

## 分析

1. vbs 这种方式实现需要单独拼接,给数据，而且还要单独处理表头，实现相对麻烦，而且生成的 vbs 文件虽然能够打开，但是编辑的时候保存不友好，而且不兼容，有的电脑打不开

2. xls 这种格式，打开会提示文件格式错误，体验不友好

3. xlsx 是 excel 的默认格式，完全符合要求

**如果是要生成复杂的样式，那就只能是 xls 这种拼接方式，按照 table 生成**

## 实现

```js
// 安装 xlsx
// yarn add xlsx || npm install xlsx --save
import { utils, write } from 'xlsx'

/**
 * 两个参数
 * name: 导出的 excel名称
 * data: 导出的 excel数据
 * data 中 每一项的 key 就是表头，value 就是一行数据，保证 data中的数据一致
 */
export const exportExcel = (name, data) => {
  const ws = utils.json_to_sheet(data)
  /* 新建空workbook */
  const wb = utils.book_new()
  /* 添加worksheet，当然你可以添加多个，这里我只添加一个 */
  utils.book_append_sheet(wb, ws, 'result')
  const wbout = write(wb, {
    bookType: 'xlsx',
    bookSST: true,
    type: 'array'
  })
  let url = window.URL.createObjectURL(new Blob([wbout]))
  let link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.setAttribute('download', name + '.xlsx')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link) //下载完成移除元素
  window.URL.revokeObjectURL(url) //释放掉blob对象
}
```

## 使用

```js
const data = [
  {
    name: 'soupjian',
    age: 23
  },
  {
    name: '张三',
    age: 18
  }
]

exportExcel('user', data)
```
