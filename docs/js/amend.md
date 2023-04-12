---
title: js数字运算
date: 2023-03-19
categories:
  - js
---

```js
/**
 * @param {*} num1 
 * @param {*} num2 
 * @param {*} symbol  操作符  + - * /
 */
export const  amend = (num1,num2,symbol)=>{
  let str1=num1.toString(),
      str2=num2.toString(),
      result,
      str1Length,
      str2Length
    //解决整数没有小数点方法
  try {str1Length= str1.split('.')[1].length} catch (error) {str1Length=0}
  try {str2Length= str2.split('.')[1].length} catch (error) {str2Length=0}
  const step=Math.pow(10,Math.max(str1Length,str2Length))
  switch (symbol) {
    case "+":
      result= (num1*step+num2*step)/step
      break;
    case "-":
      result= (num1*step-num2*step)/step
      break;
    case "*":
      result= ((num1*step)*(num2*step)) / step/step
      break;
    case "/":
      result= (num1*step)/(num2*step)
      break;
    default:
      break;
  }
  return result
}
```