---
title: monaco editor使用与优化
date: 2022-04-15
categories:
 - npm
tags:
 - npm
---

> vscode在线编辑器

## 安装

> 安装 monaco-editor-webpack-plugin 需要到npm 查看 对应的 monaco-editor 的版本匹配\
> https://www.npmjs.com/package/monaco-editor-webpack-plugin\
> 比如 monaco-editor 版本是 0.29 那么就相应安装 5 版本的 monaco-editor-webpack-plugin

```js
yarn add monaco-editor 
yarn add monaco-editor-webpack-plugin
```
## 配置vue.config.js

```js
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ?'./' : '/',
  productionSourceMap: false, // 生产打包时不输出map文件，增加打包速度
  chainWebpack:(config)=>{
    config.plugins.delete('prefetch'),
    config.plugin('monaco-editor').use(MonacoWebpackPlugin)
  },
  // configureWebpack: {
  //   plugins: [
  //       new MonacoWebpackPlugin()
  //   ]
  // },
}
```

## 组件使用

### 封装子组件

```vue
<template>
  <div id="monaco-editor" ref="monacoEditor"></div>
</template>

<script>
// import * as monaco from "monaco-editor/esm/vs/editor/editor.main";
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
export default {
  name:"MonacoEditor",
  props: {
    // 编辑器支持的文本格式,自行在百度上搜索
    language: {
      type: String,
      default:"javascript"
    },
    editorOptions: {
      type: Object,
      default: function () {
        return {
          selectOnLineNumbers: true,
          roundedSelection: false,
          // readOnly: false, // 只读
          writeOnly: false,
          cursorStyle: "line", //光标样式
          automaticLayout: true, //自动布局
          glyphMargin: true, //字形边缘
          useTabStops: false,****
          fontSize: 14, //字体大小
          autoIndent: true, //自动布局
          //quickSuggestionsDelay: 500,   //代码提示延时
          folding: true,
          showFoldingControls: 'always', // 折叠代码
          tabSize: 2, // 缩进
        };
      },
    },
    code: {
      type: String,
      default: function () {
        return "";
      },
    },
  },
  data() {
    return {
      editor: null, //文本编辑器
    };
  },
  watch: {
    code: function (newValue) {
      if (this.editor) {
        if (newValue !== this.editor.getValue()) {
          this.editor.setValue(newValue);
          this.editor.trigger(this.editor.getValue(), 'editor.action.formatDocument')
        }
      }
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    // 初始化
    initEditor() {
      const self = this;
      // 初始化编辑器，确保dom已经渲染
      this.editor = monaco.editor.create(self.$refs.monacoEditor, {
        value: self.code, // 编辑器初始显示内容
        language: self.language, // 支持语言
        theme: "vs-light", // 主题
        selectOnLineNumbers: true, //显示行号
        ...self.editorOptions,
      });
      self.$emit("editMounted", self.editor); //编辑器创建完成回调
      // self.editor.onDidChangeModelContent(function (event) {
      //     //编辑器内容changge事件
      //     self.codeCopy = self.editor.getValue();
      //     self.$emit("onCodeChange", self.editor.getValue(), event);
      // });
    },
    // 格式化
    formatterCode(){
      this.editor.getAction('editor.action.formatDocument').run()  //格式化
    }
  },
};
</script>
```

### 父组件

```vue
<template>
  <MonacoEditor  language="javascript" :code="editorCode" @editMounted="editMounted"></MonacoEditor>
</template>
<script>
 import MonacoEditor from '@/components/MonacoEditor'
 export default{
   components:{
     MonacoEditor
   },
   data(){
      return {
        editor: null, // 编辑器
        editorCode: ''
     }
   },
   methods:{
     // 编辑器代码格式化
     formatCode(){
        this.editor.getAction('editor.action.formatDocument').run()  //格式化
      },
      // 挂载编辑器
      editMounted(editor) {
        this.editor = editor;
      },
      getValue(){
        return this.editor.getValue()
      }
      setValue(value){
        return this.editor.setValue(value)
      }
   }
 }
</script>
```

## 常用 option

```
value: '', // 编辑器初始显示文字
language: 'javascript', // 语言javascript | json
automaticLayout: true, // 自动布局
theme: 'vs', // 官方自带三种主题vs, hc-black, or vs-dark
foldingStrategy: 'indentation', // 代码可分小段折叠
overviewRulerBorder: false, // 不要滚动条的边框
lineNumbers: 'off', // 控制行号的出现on | off
scrollbar: { // 滚动条设置
  verticalScrollbarSize: 4, // 竖滚动条
  horizontalScrollbarSize: 6, // 横滚动条
},
readOnly: false, // 是否只读 Defaults to false | true
minimap: { // 关闭小地图
  enabled: false,
},
cursorStyle: 'line', // 光标样式
automaticLayout: false, // 自动布局
fontSize: 14, // 字体大小
tabSize: 2, // tab缩进长度
autoIndent: true, // 自动布局
```