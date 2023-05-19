---
title: a链接点击后hover失效问题
date: 2022-02-25
categories:
 - html
---

## 对比一下

<template>
<div>
<a href="#" class="default">这是普通版的</a>  visited后hover失效
<br/>
<br/>
<a href="#" class="upgrade">这是升级版的</a>  visited后hover恢复
</div>
</template>
<style scoped>
div{
  margin-bottom: 20px;
}
.default:hover{
  color: red
}
.default:visited{
  color: blue;
}
.upgrade:visited{
  color: blue;
}
.upgrade:hover{
  color: red
}
</style>



## 解决方式

```css
.default:hover{
  color: red
}
.default:visited{
  color: blue;
}
// 调换一下位置 visted在hover前面就可以了
.upgrade:visited{
  color: blue;
}
.upgrade:hover{
  color: red
}
```

## a 链接处理原则
`link`->`visited`->`hover`->`active`

`a:link：` 未访问时的样式，一般省略成a

`a:visited：` 已经访问后的样式

`a:hover：` 鼠标移上去时的样式

`a:active：` 鼠标按下时的样式