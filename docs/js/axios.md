---
title: axios封装
date: 2022-02-23
categories:
  - js

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

## 基于typescript

### 封装
```ts
import axios from 'axios';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
// 创建一个实例类
class service {
  instance: AxiosInstance;
  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    // 请求拦截
    this.instance.interceptors.request.use(
      config => {
        config.params = {
          ...config.params,
          token: '******',
        };
        return config;
      },
      err => {
        return err;
      },
    );
    // 响应拦截
    this.instance.interceptors.response.use(
      res => {
        return res.data;
      },
      err => {
        return err;
      },
    );
  }
  // 响应拦截
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
          return err;
        });
    });
  }
  get<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' });
  }
  post<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' });
  }
  delete<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' });
  }
  patch<T>(config: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' });
  }
}

const baseURL = '/api'; // 自己服务器需要代理

const request = new service({
  baseURL
});
export default request;

```
### 使用

```ts
import request from '@/utils/request';

interface bannerType {
  imageUrl: string;
}

/**
 * 获取轮播图
 * @returns
 */
export const BANNER = async (): Promise<bannerType[]> => {
  const res = await request.get<{ banners: bannerType[] }>({
    url: '/banner',
  });
  return res.banners;
};

```

持续更新...

