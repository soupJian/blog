---
title: 接口拦截
date: 2023-09-07
categories:
  - js
tags:
  - utils
  - 面试
---

## 场景

对于一些我们第三方插件，由于不受我们本地代码管控

比如 callrail 的表单收集，无法具体到特定表单,此时就需要进行接口拦截，如果我们不想某个表单被收集，那么我们就需要在他发送接口时候进行拦截

## callrail 接口请求分析

<img src="/img/interface-interception.png"/>

## 示例

满足 POST 请求

满足 url 以 /form_capture.json 结尾，前面的可能会因为 callrail 改变

满足 请求的 data 中 的 特定数据 比如 如果 form 有 not_form_capture 这个属性值，就进行拦截

### xhr

本例中的 callrail 恰好是 xhr 形式的，已验证，接口在提交的时候拦截

```js
const originalXMLHttpRequest = window.XMLHttpRequest;

// 重写 XMLHttpRequest
window.XMLHttpRequest = function () {
  var xhr = new originalXMLHttpRequest();

  // 保存原始的 open 方法和 send 方法
  var originalOpen = xhr.open;
  var originalSend = xhr.send;

  // 标志位，用于判断是否需要拦截请求
  var shouldIntercept = false;

  // 重写 open 方法
  xhr.open = function () {
    // 检查请求的方法和 URL 是否满足条件
    if (
      arguments[0] === "POST" &&
      arguments[1].endsWith("/form_capture.json")
    ) {
      console.log("POST 请求满足条件");
      shouldIntercept = true; // 设置标志位为 true，表示需要拦截请求
    } else {
      shouldIntercept = false; // 设置标志位为 false，表示不拦截请求
    }

    // 继续正常的 open 方法
    originalOpen.apply(xhr, arguments);
  };

  // 重写 send 方法
  xhr.send = function (postData) {
    if (shouldIntercept) {
      console.log("进入 send 方法，应该拦截的请求");
      // 在这里添加检查 POST 数据的逻辑
      var parsedData = JSON.parse(postData);
      console.log(postData);
      // 检查对象中是否包含 "form_metadata" 属性
      if (parsedData.form_metadata) {
        // 检查 "form_metadata" 中是否包含 "not_form_capture" 属性
        if (parsedData.form_metadata.hasOwnProperty("not_form_capture")) {
          console.log("POST 数据满足条件，拦截请求");
          return; // 阻止请求继续
        }
      }

      console.log("POST 数据满足条件，发送请求");
      originalSend.call(xhr, postData); // 发送请求
    } else {
      console.log("进入 send 方法，不需要拦截的请求");
      originalSend.call(xhr, postData); // 发送请求
    }
  };

  return xhr;
};
```

### fetch

fetch 暂时无法验证，但是拦截应该如此

```js
// 拦截 Fetch 请求
const originalFetch = window.fetch;

// 重写 Fetch
window.fetch = function (url, options) {
  // 检查请求方法和 URL 是否满足条件
  if (options.method === "POST" && url.endsWith("/form_capture.json")) {
    console.log("POST 请求满足条件");

    // 在这里添加检查 POST 数据的逻辑
    if (options.body) {
      return options.body.text().then((bodyText) => {
        const parsedData = JSON.parse(bodyText);

        // 检查对象中是否包含 "form_metadata" 属性
        if (parsedData.form_metadata) {
          // 检查 "form_metadata" 中是否包含 "not_form_capture" 属性
          if (parsedData.form_metadata.hasOwnProperty("not_form_capture")) {
            console.log("POST 数据满足条件，拦截请求");
            return Promise.reject("请求被拦截"); // 拒绝请求
          }
        }

        console.log("POST 数据满足条件，发送请求");

        // 继续发送请求
        return originalFetch(url, options);
      });
    }
  }

  // 如果不需要拦截，继续正常的 Fetch 请求
  return originalFetch(url, options);
};

// 发送 Fetch 请求
fetch("/your-api-endpoint/form_capture.json", {
  method: "POST",
  body: JSON.stringify({
    // 请求数据
  }),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("请求失败");
  })
  .then((data) => {
    console.log("请求成功", data);
  })
  .catch((error) => {
    console.error("请求失败", error);
  });
```

### axios

本地无法拦截第三方的 axios，

此处只作为一个记录，axios 创建的实例只能拦截自己的请求

```js
const axios = require("axios");

// 创建 Axios 实例
const instance = axios.create();

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 检查请求方法和 URL 是否满足条件
  if (config.method === "post" && config.url.endsWith("/form_capture.json")) {
    console.log("POST 请求满足条件");

    // 在这里添加检查 POST 数据的逻辑
    if (config.data) {
      const parsedData = JSON.parse(config.data);

      // 检查对象中是否包含 "form_metadata" 属性
      if (parsedData.form_metadata) {
        // 检查 "form_metadata" 中是否包含 "not_form_capture" 属性
        if (parsedData.form_metadata.hasOwnProperty("not_form_capture")) {
          console.log("POST 数据满足条件，拦截请求");
          return Promise.reject("请求被拦截"); // 拒绝请求
        }
      }
    }

    console.log("POST 数据满足条件，发送请求");
    return config; // 继续发送请求
  }

  return config; // 如果不需要拦截，继续正常的请求
});

// 发送 Axios 请求
instance
  .post("/your-api-endpoint/form_capture.json", {
    // 请求数据
  })
  .then((response) => {
    console.log("请求成功", response.data);
  })
  .catch((error) => {
    console.error("请求失败", error);
  });
```
