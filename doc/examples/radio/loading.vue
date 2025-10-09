<template>
  <p>通过设置loading属性 变成加载状态</p>
  <fl-radio loading value="张三" label="张三"></fl-radio>
  <fl-radio loading v-model="checked1" value="李四" type="success" label="李四"></fl-radio>
  <fl-radio loading v-model="checked2" value="王五" type="warning" label="王五"></fl-radio>
  <fl-radio loading value="赵六" type="error" label="赵六"></fl-radio>
  <p>为beforeChange属性设置返回Promise对象的函数，然后点击触发</p>
  <fl-radio :beforeChange="beforeChange1" value="张三" label="张三"></fl-radio>
  <fl-radio :beforeChange="beforeChange2" value="赵六" type="error" label="赵六"></fl-radio>
</template>
<script setup>
import { ref } from 'vue'
const checked1 = ref('李四')
const checked2 = ref('王五')

const beforeChange1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const beforeChange2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
} 
</script>
