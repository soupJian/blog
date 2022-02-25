<template>
<div class="contentwrap">
  <div class="default" contenteditable="true">这是一段默认的可编辑文本，试试</div>
  <div class="user-setting" contenteditable="true">修改自定义样式，编辑试试编辑吧</div>
</div>
</template>
<style scoped>
.user-setting{
  margin-top: 10px;
  padding: 5px 10px;
}
.user-setting:focus-visible{
  outline: 2px solid skyblue;
}
</style>