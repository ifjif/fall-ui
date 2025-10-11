<template>
  <p>获取焦点 方法:focus</p>
  <fl-textarea rows="2" v-model="v1" ref="input1"></fl-textarea>
  <fl-button @click="click1">获取焦点</fl-button>
  <p>失去焦点 方法:blur</p>
  <fl-textarea rows="2" v-model="v2" ref="input2"></fl-textarea>
  <fl-button @click="click2">失去焦点</fl-button>
  <p>全部选中 方法:select</p>
  <fl-textarea rows="2" v-model="v4" ref="input4"></fl-textarea>
  <fl-button @click="click4">全部选中</fl-button>
  <p>您可以 通过访问实例的ref属性来得到内部的input实例</p>
  <fl-textarea rows="2" ref="input5"></fl-textarea>
  <fl-button @click="click5">获取内部input实例</fl-button>
  <div>{{ instance }}</div>
</template>
<script setup>
import { ref } from 'vue'
const input1 = ref(null)
const input2 = ref(null)
const input3 = ref(null)
const input4 = ref(null)
const input5 = ref(null)
const v1 = ref('')
const v2 = ref('')
const v3 = ref('textetxttext')
const v4 = ref('内容内容内容内容内容')

const click1 = () => {
  input1.value.focus()
}
const click2 = () => {
  input2.value.blur()
}
const click3 = () => {
  input3.value.clear()
}
const click4 = () => {
  input4.value.select()
}
const instance = ref(null)
const click5 = () => {
  instance.value = input5.value.ref
}
</script>
