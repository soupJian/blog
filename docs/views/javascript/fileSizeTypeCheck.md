---
title: 上传文件的大小和格式校验
date: 2021-12-24
categories:
 - javascript
tags:
 - javascript
---

>根据input的change事件,可以得到上传到文件

```html
<input type="file" onChange="upload();" id="upload" />
```

## 获取上传的文件大小
```javascript
function upload(){
    var size = event.target.files[0].size / 1024 / 1024
    if(size > 10){
        alert(上传的文件大于10M,请重新选择上传)
    }
}
```
## 获取上传的文件格式

```javascript
function upload(){
    // 两种方式获取文件名 第一种获取文件全路径,第二种获取文件名
    // const url = document.getElementById("upload").value
    const url = event.target.files[0].name
    const index= url.lastIndexOf(".");
    //获取后缀 判断文件格式
    const ext = url.substr(index+1).toLowerCase();
    const arr = ['jpg','png']
    if(arr.indexOf(ext) < 0){
        alert("上传图片不合法")
    }else{
    	...action
    }
}
```
<Valine/>