<template>
<div>
  <!-- 控制台看打印 -->
  <p>input 没有防抖的</p>
  <p><input type="text" v-model="baseValue"/></p>  
  <p>input 防抖后的</p>
  <p><input type="text" v-model="debounceValue"/></p>  
  <p>input 节流后的</p>
  <p><input type="text" v-model="throttleVlaue"/></p>
</div>
</template>
<script>
export default{
  data(){
    return{
      baseValue: '',
      debounceValue: '',
      throttleVlaue: ''
    }
  },
  watch:{
    baseValue(){
      const time = this.formatDateTime()
      console.log(`没有防抖: ${this.baseValue} ---- ${time}`)
    },
    debounceValue(){
      console.log(this.debounceValue);
      this.sayDebounce(this.debounceValue)
    },
    throttleVlaue(){
      console.log(this.throttleVlaue);
      this.sayThrottle(this.throttleVlaue)
    }
  },
  methods:{
    formatDateTime() {
      let date = new Date();
      const year = date.getFullYear() // 年
      const month = date.getMonth() + 1 // 月
      const day = date.getDate() // 日 获取日是 getDate()方法 区别于 getDay()是星期
      const hour = date.getHours() // 时
      const minute = date.getMinutes() // 分
      const second = date.getSeconds() // 秒
      return `${year}-${this.formatNum(month)}-${this.formatNum(day)} ${this.formatNum(hour)}:${this.formatNum(minute)}:${this.formatNum(second)}` 
    },
    formatNum(num){
      return num > 10 ? num : `0${num}`
    },
    debounce(fn,delay){
      let timer = null;
      return function(){
        const context = this
        const args = [...arguments];
        timer && clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context,args);
        },delay);
      }
    },
    printDebounce(content){
      const time = this.formatDateTime()
      console.log(`防抖: 只执行一秒内的最后一次: ${content} ---- ${time}`)
    },
    throttle(fn,delay){
      let flag = true
      return function(){
        if(!flag){
          return 
        }
        const context = this
        const args = arguments
        flag = false
        setTimeout(function(){
          fn.apply(context,args)
          flag = true
        },delay)
      }
    },
    printThrottle(content){
      const time = this.formatDateTime()
      console.log(`节流: 只执行一秒内的第一次: ${content} ---- ${time}`)
    }
  },
  created(){
    this.sayDebounce = this.debounce(this.printDebounce,1000)
    this.sayThrottle = this.throttle(this.printThrottle,1000)
  }
}
</script>