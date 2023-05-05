---
title: getServerSideProps 和 getStaticProps
date: 2023-05-05 17:55:00
categories:
  - next
tags:
  - next
---

## 相同点

getServerSideProps 和 getStaticProps 都是用来配置 页面数据的，在其对应的return props中可以传递数据到页面的组件中

## 不同点

getServerSideProps 会在每次页面访问时候重新构建页面

getStaticProps 只在打包时候运行一次

一般吧 getServerSideProps 的 页面 称为 `SSR`，getStaticProps页面称为 `SSG`

## getServerSideProps

```js
function Page({ data }) {
  // Render data...
}
 
// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();
 
  // Pass data to the page via props
  return { props: { data } };
}
 
export default Page;
```

除了 props 参数之外，getServerSideProps 函数还支持一个可选参数 notFound，当设置为 true 时，表示该页面不存在，Next.js 会显示 404 页面。

例如，如果您的页面需要根据某些条件动态生成内容，如果条件不满足，您可以返回 { notFound: true }，告诉 Next.js 显示 404 页面。
```js
export async function getServerSideProps(context) {
  const { params } = context
  const data = await fetchData(params.id)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      data,
    },
  }
}

function MyPage({ data }) {
  // Use data to render the page
}
```

配置缓存

```js
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59',
  );
 
  return {
    props: {},
  };
}
```
如果 getServerSideProps 运行错误，会直接渲染 500 的页面

## getStaticProps

```js
export default function Blog({ posts }) {
  // Render posts...
}
 
// This function gets called at build time
export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('https://.../posts');
  const posts = await res.json();
 
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  };
}
```
**可选参数** 和 props 同级别
1. revalidate: 将 revalidate 设置为 3600，这将告诉 Next.js 在每次请求时重新生成该页面，并在下一次更新之前等待一个小时
2. notFound: 当返回 true 时，表示该页面不存在，Next.js 将会显示 404 页面。例如，如果您使用 getStaticPaths 和 fallback 来动态生成页面，您可以使用 notFound: true 来指定某些参数无法匹配时应该返回 404 页面。

3. redirect: 当返回一个对象时，表示该页面应该被重定向到另一个页面。该对象应包含 destination 和 permanent 属性，destination 表示重定向的目标页面，permanent 表示重定向是永久的还是临时的。例如，如果您想将旧的页面 URL 重定向到新的页面 URL，您可以使用 getStaticProps 函数返回一个包含重定向信息的对象。

4. decrementalStaticRegeneration: 当返回一个布尔值 true 时，表示该页面支持增量静态再生（ISR）。ISR 可以在不重新生成整个页面的情况下更新页面数据。例如，如果您的页面中的数据每分钟更新一次，您可以将 decrementalStaticRegeneration 设置为 true，这将使 Next.js 在页面过期时自动重新生成页面。
## 扩展 getStaticPaths

getStaticPaths 是 为 next 的动态路由而创建的

```js
export async function getStaticPaths() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();
  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));
  return { paths, fallback: 'blocking' };
}
 
export default Blog;
```

这个会 在打包时候默认生成 paths中的页面

如果 fallback 为 false , 则会预先生成所有可能的页面

如果 fallback 为 true, 则只会生成 paths 中的指定界面

如果 fallback 为 blocking, 则 需要在动态页面生成之前等待页面数据加载，这样确保每个页面都有完整的数据，但会增加用户等待时间



