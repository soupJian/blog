---
title: vuex在ts中使用
date: 2022-04-11
categories:
 - javascript
 - vue
tags:
 - 插件
 - ts
---

:::tip
  vuex在ts中其实不是特别友好的，推荐 [pinia]('./pinia.md')
:::

## 创建入口store

> store
> >  modules 仓库模块化
> > >user.ts  user仓库
> >
> > index.ts  仓库入口\
> > type.ts   存储store interface类型


### index.ts

```ts
// 需要为store导入自定义类型，否则都是any
import { createStore } from 'vuex'/
// user模块数据
import userStore from './modules/user'
// state的类型
import {storeStateType} from './type'

// 创建一个新的 store 实例
const store = createStore<storeStateType>({
  state:{
    theme: 'light',
  },
  mutations:{
    changeTheme(state){
      state.theme = state.theme === 'light' ? 'dark' : 'light'
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
  modules:{
    userStore // user模块
  }
});

export default store;
```

### user.ts
```ts
import {userStateType,userType} from '../type'
const state:userStateType = {
  user: null,
};
const mutations = {
  setUser(state:userStateType,user: userType){
    state.user = user
  }
};
const actions = {
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};

```

### type.ts

```ts
// 定义根节点 store
export interface rootStore{
  theme: string,
  userStore: userStateType
}
// 全局的store
export interface storeStateType{
  theme: string,
}
// user模块的类型
export interface userStateType{
  user: userType | null,
}
export interface userType{
  name: string,
  age: number,
  imgList: string[]
}
```

## 使用

```ts
import {useStore} from 'vuex'
// 这里需要传入一个store 类型 ，传 rootStore是因为有 modules ，否则无法推断
const store = useStore<rootStore>()/
// 这里的 getter无法进行类型推断
const { color,bgColor } = toRefs(store.getters)
// 或者采用 computed 手动传入值类型
// const color:ComputedRef<string> = computed(()=>store.getters.color)
const { user } = toRefs(store.state.userStore)
const changeTheme = () =>{
  store.commit('changeTheme')
}
```