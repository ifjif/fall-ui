<template>
  <fl-button @click="click1" type="primary">primary</fl-button>
  <p>设置了beforeChange属性值为Function后，点击事件不会触发</p>
  <p>请确保beforeChange返回的是Promise, 否则会一直处于加载状态</p>
  <fl-button @click="click2" :beforeChange="beforeChange" type="success">success</fl-button>
</template>
<script setup>
import {FlMessage} from 'fall-ui'
const click1 = () => {
  FlMessage({content:'primary按钮被点击了'})
}
const click2 = () => {
  FlMessage({content:'success按钮被点击了'})
}
const beforeChange = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>
