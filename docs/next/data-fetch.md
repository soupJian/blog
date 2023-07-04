---
title: next 数据获取
date: 2023-05-05 17:55:00
categories:
  - next
tags:
  - 面试
---

## getInitialProps

1. 是 next.js 最早引入的数据获取函数，可以在页面组件和\_app,js 中定义
2. 现在已经用 getStaticProps 和 getServeSideProps 替代

```jsx
import axios from "axios";

const MyPage = ({ data }) => {
  // 使用获取到的数据进行渲染
  return (
    <div>
      {data.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
};

MyPage.getInitialProps = async (ctx) => {
  // 在服务端获取数据
  const response = await axios.get("https://api.example.com/data");
  const data = response.data;

  return { data }; // 将获取到的数据作为props返回
};

export default MyPage;
```

## getStaticProps

1. 构建静态页面所需数据的函数
2. 只能在 页面组件 中使用
3. 适用于数据不频繁变动，不需要实时更新的页面
4. 返回 props，用于页面组件中数据
5. 返回 revalidate，服务器缓存，下一次访问距离上一次被访问，如果时间超过了，那就重新生成，没有配置或者配置 true，则只会在打包时候运行一次

```jsx
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data
    }，
		revalidate: 60 // 每分钟重新生成页面一次，
		notFount: true // 页面不存在
  };
}
```

## getServeSideProps

1. 每次在请求时候动态生成所需数据的函数
2. 适用于频繁变动的页面
3. 返回 props，用于页面组件数据
4. 返回 revalidate，一个可选的数值或布尔值，用于控制页面的缓存时间和重新生成的频率。如果设置为数值，表示页面将在指定的秒数后重新生成；如果设置为布尔值 true，则表示页面将在每个请求时都重新生成；

```jsx
export async function getServerSideProps(context) {
  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}

function MyPage({ data }) {
  return <div>{data}</div>;
}

export default MyPage;
```

## getServeSideProps 和 getStaticProps 关于 revalidate 统一配置

可以在 next.config.js 中统一全局配置

```jsx
module.exports = {
  // other configurations...
  revalidate: 60, // 设置缓存时间为60秒
};
```

如果需要特定页面特定配置

```jsx
export async function getStaticProps() {
  return {
    props: {
      // 页面的数据
    },
    revalidate: 120, // 将该页面的缓存时间设置为 120 秒
  };
}
```

## getStaticPaths

1. 在构建时候运行
2. paths 和 fallback 两个返回参数
3. fallback 有三个参数,true，false，blocking，默认 false，也就是不在 paths 中的，都返回 404，如果是 blocking，将在服务器端等待数据获取完成后再返回完整的页面给用户

```jsx
return {
  paths: [
    { params: { slug: "post1" } },
    { params: { slug: "post2" } },
    // 其他路径对象...
  ],
  fallback: "blocking",
};
```

当将  `fallback`  设置为  `blocking`  时，并不意味着每次都会运行构建。实际上，它只会在第一次请求未在  `paths`  中指定的路径时触发服务器端渲染。

当一个未知的路径被请求时，Next.js 会生成一个临时的静态页面，同时触发服务器端渲染来获取数据。这个过程是在服务器端进行的，所以用户将看到一个加载中的状态。一旦数据获取完成，Next.js 将使用获取到的数据重新生成静态页面，并将其缓存起来供后续请求使用。

所以，`fallback: 'blocking'`  可以让你在服务器端渲染时等待数据获取完成后再进行页面渲染，以提供更好的用户体验。但它并不会导致每次请求都触发构建过程。只有在请求的路径未在  `paths`  中指定时，才会触发服务器端渲染和页面生成的过程。
