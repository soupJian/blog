---
title: next Image
date: 2023-07-04 15:30:00
categories:
  - next
---

# Image 参数解析

Image 组件来自于 next 自带的优化图像组件

```jsx
import Image from 'next/image

<Image src="xxx.webp"/>
```

1. `src`（必需）：指定图像的源路径。
2. `alt`：指定图像的替代文本，用于辅助功能和 SEO。
3. `width`：指定图像的显示宽度。可以是像素值（例如 `width={300}`）或百分比（例如 `width="100%"`）。
4. `height`：指定图像的显示高度。可以是像素值（例如 `height={200}`）或百分比（例如 `height="auto"`）。
5. `layout`：指定图像的布局方式。常用取值有：
   - `"intrinsic"`（默认）：图像按比例显示，宽度和高度根据原始图像保持不变。
   - `"fixed"`：固定宽度和高度的图像，需要指定 `width` 和 `height`。
   - `"responsive"`：响应式图像，自动根据容器宽度调整大小。
6. `objectFit`：指定图像在容器中的适应方式。常用取值有：
   - `"contain"`：保持图像比例，完整显示在容器内，可能留有空白区域。
   - `"cover"`：保持图像比例，填充容器，可能被裁剪。
   - `"fill"`：拉伸图像以填充容器，可能导致图像变形。
   - `"none"`：图像按原始尺寸显示，可能超出容器。
7. `objectPosition`：指定图像在容器中的位置。可以使用像素值（例如 `objectPosition="10px 20px"`）或百分比（例如 `objectPosition="50% 50%"`）。
8. `loading`：指定图像加载的方式。常用取值有：
   - `"eager"`：立即加载图像。
   - `"lazy"`（默认）：延迟加载图像，根据用户滚动或交互进行懒加载。
   - `"auto"`：让浏览器自行决定加载方式。
9. `priority`：指定图像的优先级，用于确定首次渲染时加载的图像。默认情况下，Next.js 会自动根据图像的可见性和位置来决定加载顺序。
10. `unoptimized`: 禁用图片进行优化处理

## next.config.js 配置 Image

```jsx
images: {
    deviceSizes: [80, 320, 475, 600, 960, 1280, 1920],
    minimumCacheTTL: 60,
    domains: [
      "static.westshade.com",
      "static-woo.westshade.com",
      // "static-woo.westshade.com/wp-content/uploads"
    ],
    formats: ["image/webp"],
    loader: "imgix",
    // path: isProd ? "https://static.westshade.com" : "http://localhost:3000",
    path: "https://static.westshade.com",
  },
```

deviceSizes： 根据设备的屏幕宽度，Next.js 将选择与其最接近的较小设备宽度，以减少图像传输的数据量。

minimumCacheTTL： 指定缓存时间的最小值的整数，上述表示图像资源将至少被缓存 60 秒，这将减少服务器的请求

domains： 图片资源的域名数组

formats： 表示指定所支持的图像格式的数组

loader： 指定使用的图像加载器的字符串，上述表示使用 Imgix 图像加载器来处理图像资源。

path: 基本路径

## Image 的 Layout

1. **`layout="fill"`**：将图像拉伸至父容器的尺寸，并完全填充。这可以用于创建响应式的全屏背景图像。需要将父容器设置为相对定位（position: relative）。
2. **`layout="responsive"`**：图像将根据父容器的尺寸，按照其原始宽高比进行缩放。图像会自动调整大小以适应父容器，并在保持宽高比的同时填充整个容器。
3. **`layout="intrinsic"`**：图像将根据其原始宽高比进行缩放，并在不超过其原始尺寸的情况下，尽量填充父容器。这种布局适用于需要保持图像比例，并且在容器中居中显示的情况。
4. **`layout="fixed"`**：图像将在指定的 **`width`** 和 **`height`** 值内进行缩放，而不考虑父容器的尺寸。这可以用于显示具有固定尺寸要求的图像。

## 注意点

1. 需要在 next.config.js 中配置图片的域名
2. quality 不会改变图片，它只会对图片质量和大小进行权衡，较高的 quality 会保留更多的图像细节，但会增加文件大小。默认值 75 。**`quality`** 选项并不能直接改变原始图像资源的质量，但它可以控制图像的压缩级别，从而影响图像的文件大小。
3. layout 不为 fill，则需要指定 width 和 height
