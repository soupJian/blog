---
title: pinia
date: 2022-04-11
categories:
  - npm
tags:
  - npm
---

:::tip
  vue3 + setup + pinia + typescript + volar === "真香"
:::

## 对比vuex

> 1. 更好的ts支持
> 2. 体积更小 pinia---6.5k   vuex---15.2k
> 3. 更加灵活，没有metation,修改仓库值更加便携
> 4. 模块化，每个仓库单都导入导出，不再需要唯一入口
> 5. vuex action是异步的,mutation是同步的。 pinia看action的写法区分同步和异步

## 安装

```ts
yarn add pinia

// main.ts
import { createPinia  } from 'pinia'
const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
```

## 创建一个store 

```ts
//theme.ts

import { defineStore } from 'pinia'

export default defineStore('theme', {
  state: () => {
    return {
      theme: 'light',
      list: [] as string[], // 对于数组和对象，无法进行类型推断，需要采用断言
      userInfo: null as userType | null
    }
  },
  getters:{
    color(state){
      return state.theme === 'light' ? '#000' : '#fff'
    },
    bgColor(state){
      return state.theme === 'light' ? '#fff' : '#000'
    }
  },
  actions:{
    changeTheme(){
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    }
  }
})
```

### 页面使用

```ts
import useThemeStore from '@/store/theme'
const themeStore = useThemeStore()
const { color,bgColor } = storeToRefs(themeStore)

const changeTheme = () =>{
  themeStore.changeTheme()
}
```

## 修改pinia的多种方式

```ts
// 1. 通过 action 修改仓库值
  themeStore.changeTheme()
    // changeTheme(){
    //   this.theme = this.theme === 'light' ? 'dark' : 'light'
    // }
// 2. 直接修改
  themeStore.theme = themeStore.theme === 'light' ? 'dark' : 'light'
// 3. $patch 修改 
  //将整个仓库全部替换
    themeStore.$patch({
      theme: themeStore.theme === 'light' ? 'dark' : 'light'
    })
  // 局部替换
    themeStore.$patch((state)=>{
      state.theme = themeStore.theme === 'light' ? 'dark' : 'light'
    })
// 4. $reset 全部恢复初始值
  themeStore.$reset()
// 5. 更换state 废除旧的，采用新的state 不推荐
  themeStore.$state = { count: 60 }
  pinia.state.value = {}
```

## 监仓库发生改变 $subscribe
```js
userStore.$subscribe((mutation,state)=>{
  console.log(mutation); // 指出修改的仓库名，修改的仓库中的值前后变化
  console.log(state); // 仓库所有值
})
```

## 订阅 $onAction

```js
userStore.$onAction(
  ({
    name, // 触发的 action 名称
    store, // 仓库名称
    args, // 传递的参数 数组
    after, // 监听回调函数
    onError, // 捕获错误
  }) => {
    console.log(name)
    console.log(store)
    console.log(`[${args.join(', ')}]`)
    after((result) => {
      console.log(result)
    })
    onError((error) => {
      console.warn(
        `失败错误: ${error}.`
      )
    })
  }
)
```

## use 插件

```js
import { createPinia } from 'pinia'
const pinia = createPinia()
// 声明自定义 pinia 类型
declare module 'pinia' {
  export interface PiniaCustomProperties {
    hello: string
  }
}
function globalPlugin() {
  return { count: 0 }
}
// 使用后在 devtools中单独store中可见 为 customProperties
pinia.use(globalPlugin)

// 使用后devtools不可见
pinia.use(({ store }) => {
  store.hello = 'pinia'
})
```
