---
title: next 数据获取
date: 2023-05-05 17:55:00
categories:
    - next
tags:
    - 面试
---

# 数据获取

接口在 `src/api` 目录中

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

`getStaticProps` 是 Next.js 中用于数据预取和预渲染静态页面的函数。它是一个异步函数，用于在构建时或请求时获取数据，并将数据作为 props 传递给页面组件。

1. `export async function getStaticProps(context) {}`
    - `context` 是包含有关请求上下文的对象，它包含以下属性：
        - `context.params`：包含动态路由参数的对象。例如，对于动态路由 `/posts/[slug]`，`context.params` 将包含 `{ slug: 'example' }`。
        - `context.preview`：一个布尔值，指示是否处于预览模式。仅当使用 Next.js 的预览模式时才会有此属性。
        - `context.previewData`：一个对象，包含预览模式所需的数据。仅当使用 Next.js 的预览模式时才会有此属性。
2. `return { props: { data } }`
    - `props` 是一个对象，用于将数据传递给页面组件的 props。
    - `data` 是从 `getStaticProps` 中获取的数据，可以是一个对象、数组或其他类型的数据。
3. `revalidate: number | boolean`
    - `revalidate` 是一个可选属性，用于指定页面重新生成的时间间隔（秒）。
    - 如果设置为 `false`，则表示页面在构建时生成，并且不会重新生成。
    - 如果设置为 `true`，则表示页面在每个请求上重新生成。
    - 如果设置为一个数字，表示页面在指定的时间间隔内重新生成，以确保数据的新鲜度。
4. `notFound: boolean`
    - `notFound` 是一个可选属性，用于指定页面是否是一个 404 页面。
    - 如果设置为 `true`，则表示页面将返回 404 状态码。
5. `redirect: { destination: string; permanent: boolean }`
    - `redirect` 是一个可选属性，用于指定页面是否是一个重定向页面。
    - `destination` 是重定向的目标 URL。
    - `permanent` 是一个布尔值，指示重定向是否是永久的。如果设置为 `true`，则表示重定向是永久的，将返回 301 状态码。

使用 `getStaticProps` 可以在构建时或请求时获取数据，并将其预渲染为静态页面，提供更好的性能和 SEO 优化。

## getServeSideProps

`getServerSideProps` 是 Next.js 中用于在每个请求时获取数据并进行服务器端渲染的函数。它是一个异步函数，用于从服务器获取数据，并将数据作为 props 传递给页面组件。

1. `export async function getServerSideProps(context) {}`
    - `context` 是包含有关请求上下文的对象，它包含以下属性：
        - `context.req`：HTTP 请求对象。
        - `context.res`：HTTP 响应对象。
        - `context.query`：包含查询参数的对象。
        - `context.params`：包含动态路由参数的对象。例如，对于动态路由 `/posts/[slug]`，`context.params` 将包含 `{ slug: 'example' }`。
2. `return { props: { data } }`
    - `props` 是一个对象，用于将数据传递给页面组件的 props。
    - `data` 是从 `getServerSideProps` 中获取的数据，可以是一个对象、数组或其他类型的数据。
3. `notFound: boolean`
    - `notFound` 是一个可选属性，用于指定页面是否是一个 404 页面。
    - 如果设置为 `true`，则表示页面将返回 404 状态码。
4. `redirect: { destination: string; permanent: boolean }`
    - `redirect` 是一个可选属性，用于指定页面是否是一个重定向页面。
    - `destination` 是重定向的目标 URL。
    - `permanent` 是一个布尔值，指示重定向是否是永久的。如果设置为 `true`，则表示重定向是永久的，将返回 301 状态码。

使用 `getServerSideProps`，每次请求页面时都会执行该函数，因此可以根据请求的特定上下文动态获取数据。这使得在每个请求上都可以获取最新的数据，适用于那些需要实时数据的情况。

## getStatciProps 和 getServeSideProps 区别

`getStaticProps` 和 `getServerSideProps` 是 Next.js 中用于数据获取和服务器端渲染的两种函数，它们之间存在以下区别：

1. 数据获取时机：
    - `getStaticProps` 在构建时执行，用于在静态生成（Static Generation）阶段获取数据。它会将数据预渲染为静态 HTML 文件，并在后续请求中重用该文件。
    - `getServerSideProps` 在每个请求时执行，用于在服务器端渲染（Server-side Rendering）阶段获取数据。它会在每个请求上动态获取数据并进行渲染。
2. 缓存和性能：
    - `getStaticProps` 生成的页面可以通过 CDN 进行缓存，提供较好的性能和缓存效果。页面在重新验证时间间隔（通过 `revalidate` 属性设置）之后重新生成。
    - `getServerSideProps` 每次请求时都会执行，并且不会被缓存。每个请求都会获取最新的数据，适用于需要实时数据的情况。
3. 静态生成 vs. 服务器端渲染：
    - `getStaticProps` 适用于那些数据变化不频繁、可预测的情况。它在构建时获取数据并生成静态 HTML 文件，可以在后续请求中快速呈现，适合于静态内容、博客文章等。
    - `getServerSideProps` 适用于那些需要实时数据的情况，每次请求都会执行数据获取逻辑，并在服务器端动态渲染页面。它适合于个性化页面、需要用户特定数据的情况。
4. 构建时间 vs. 请求时间：
    - `getStaticProps` 在构建时执行，因此可以将数据预取和预渲染为静态文件，减少后续请求的服务器负载和响应时间。
    - `getServerSideProps` 在每个请求时执行，因此可以根据每个请求的上下文动态获取数据，适用于需要实时数据或无法在构建时预知数据的情况。

综上所述，`getStaticProps` 和 `getServerSideProps` 在数据获取时机、缓存性能、渲染方式和适用场景上存在差异。根据项目的需求和数据变化的频率，可以选择适合的函数来实现最佳的数据获取和渲染策略。

## getServeSideProps 如何配置缓存？

**`getServerSideProps`** 默认情况下不会缓存数据，因为它在每个请求时都会执行

要配置 **`getServerSideProps`** 的缓存，您可以在处理数据的函数中修改响应头

1. 在 **`getServerSideProps`** 函数中，获取数据并将其存储在变量中。
2. 在处理数据的逻辑之后，使用 **`context.res.setHeader`** 方法设置响应头。您可以设置 **`Cache-Control`** 和其他相关的缓存头来控制数据的缓存行为。例如：

```js
export async function getServerSideProps(context) {
    // 获取数据的逻辑
    const data = await fetchData();

    // 设置缓存头
    context.res.setHeader("Cache-Control", "max-age=3600"); // 设置缓存时间为 1 小时

    // 返回数据作为 props
    return {
        props: {
            data,
        },
    };
}
```

在上述示例中，将 **`Cache-Control`** 头设置为 **`'max-age=3600'`**，表示数据将在客户端缓存 1 小时。您可以根据需要进行自定义，使用适当的缓存策略。

请注意，**`getServerSideProps`** 的缓存是基于每个请求的，它在每个请求时执行，并且响应的缓存头将影响客户端对数据的缓存行为。不同的缓存头指令和参数可以用来实现不同的缓存策略，如 **`max-age`**、**`s-maxage`**、**`public`**、**`private`** 等。

## getStaticPaths

`getStaticPaths` 是 Next.js 中用于生成动态路由的函数。它用于告知 Next.js 构建系统应该生成哪些路径，并指定这些路径的参数。

1. `export async function getStaticPaths() {}`
    - `getStaticPaths` 是一个异步函数，用于生成动态路由的路径和参数。
2. `return { paths, fallback }`
    - `paths` 是一个数组，包含要生成的路径和参数对象。
    - `fallback` 是一个布尔值或字符串，指定如何处理未指定的路由。
        - 如果设置为 `false`，表示只生成 `paths` 数组中指定的路径，其他路径将返回 404 页面。
        - 如果设置为 `'blocking'`，表示在服务器端生成所有未指定的路径，并在生成期间阻塞请求，直到所有路径都被生成完成。
        - 如果设置为 `true`，表示在服务器端生成所有未指定的路径，并在客户端请求时进行动态生成。
3. `paths`
    - `paths` 是一个包含路径和参数对象的数组。每个对象都表示一个动态路由的路径和对应的参数。
    - 对象的结构如下：`{ params: { param1: value1, param2: value2, ... } }`
    - `params` 是一个对象，包含动态路由参数及其对应的值。

`getStaticPaths` 函数用于告知 Next.js 构建系统应该生成哪些路径，并为这些路径指定参数。在动态路由的情况下，有时无法提前知道所有可能的路径，因此使用 `getStaticPaths` 来生成这些路径。

通常，您需要将 `getStaticPaths` 与 `getStaticProps` 一起使用。`getStaticPaths` 用于指定动态路由的路径和参数，`getStaticProps` 用于获取每个具体路径的数据并进行预渲染。

请注意，`getStaticPaths` 通常与动态路由相关，用于生成特定的路径。它在构建时执行，并在生成期间确定要生成的路径。
