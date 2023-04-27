---
title: 移动窗口(无重复最长子串)
date: 2022-03-16
categories:
 - js
tags:
 - 算法
---

>移动窗口\
>求无重复字符的最长子串
>逐渐从一个数组中从左向右移动,当新加入的字母在前面窗口中存在，则删除前面窗口中的字母及之前的，新加入一个字母，一直到最后

假设存在一个字符串 'aabaab!bb' 求最长子串

## 方法

```js
function lengthOfLongestSubstring (s) {
  if(s == ''){
      return 0
  }
  // 总的数组
  const arr = s.split('')
  // 移动窗口
  let result = []
  // 长度
  let len = 0
  for(let i = 0;i< arr.length;i++){
      const index = result.findIndex((item)=>{
          return item == arr[i]
      })
      if(index >= 0){
          result.splice(0,index+1)
      }
      result.push(arr[i])
      // 添加后移动的长度
      const len1 = result.length
      len = len > len1 ? len : len1
  }
  return len
};
```

## 运算分析

aabaab!bb

`第一次` 新加入 a  不需要删除         `旧窗口`[]  `新窗口` [a]  

`第二次` 新加入 a 删除第一个a        `旧窗口` [a]  `新窗口` [a]

`第三次` 新加入 b 不需要删除         `旧窗口` [a]  `新窗口` [a,b]

`第四次` 新加入 a 删除原窗口第一个a   `旧窗口` [a,b]  `新窗口` [b,a]

`第五次` 新加入 a 删除原窗口a前面的b和a `旧窗口`[b,a] `新窗口` [a]

`第六次` 新加入 b 不需要删除           `旧窗口` [a] `新窗口` [a,b]

`第七次` 新加入 i 不需要删除           `旧窗口` [a,b] `新窗口` [a,b,i]

`第八次` 新加入 b 删除原窗口b之前的     `旧窗口` [a,b,i] `新窗口` [i,b]

`第九次` 新加入 b 删除b之前的 第一个a    `旧窗口`[i,b] `新窗口` [b]



