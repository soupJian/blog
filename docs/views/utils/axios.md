---
title: axios封装
date: 2022-02-23
categories:
 - utils
tags:
 - utils
---

## 安装axios

```js
npm install axios --save
```

## 创建一个实例

```js
import axios from 'axios'
// 创建一个axios实例
const service = axios.create({
  baseURL: "/api",
  method: "post",
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
});
```

## 添加请求拦截

```js
service.interceptors.request.use(
  config => {
    const token = getUserToken();
    // 登录成功请求头带上用户token
    if (token) {
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    // 请求错误做些事
    return Promise.reject(error);
  }
);
```

## 响应拦截

```js
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 200) {
      return res.data;
    }else if (res.code === 4001) {
      // 未登录或登录token已过期
    } 
    else {
     
    }
  },
  error => {
    // 网络错误
    return Promise.reject(error);
  }
);
```

## 接口请求失败，自动重试
```js
npm install axios-retry --save

import axiosRetry from 'axios-retry'
// 自动重连3次
// 接收创建的axios实例
axiosRetry(service, { retries: 3 })
```

## 使用

```js
import request from '@/utils/request'

function login(phone,password){
  return request({
    url: "/login",
    // data的处理方式需要放在request.js处理
    data: {
      phone,
      password
    }
  });
}
```


## 取消axios请求

> 情景： 用户点了分页，调用了接口，等待过程中又点击了查询接口
> 此时应该展示的是查询内容
> 但是查询接口比分页接口慢，页面已经渲染了分页数据，误导用户以为是查询数据
> 则此时需要终止分页接口

持续更新...

