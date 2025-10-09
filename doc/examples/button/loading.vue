<template>
  <fl-button loading>默认</fl-button>
  <fl-button loading type="primary">primary</fl-button>
  <fl-button loading type="success">success</fl-button>
  <p>通过给beforeChange属性传入返回Promise对象的函数来进行加载</p>
  <p>使用了beforeChange后，点击事件不再处理</p>
  <p>请确保beforeChange返回的是Promise, 否则会一直处于加载状态</p>
  <fl-button @click="clickEvent" :beforeChange="beforeChange1" type="warning">warning</fl-button>
  <fl-button :beforeChange="beforeChange1"  type="error">error</fl-button>
  <fl-button :beforeChange="beforeChange2"  type="error">不是返回Promise</fl-button>
</template>
<script setup>
import {FlMessage} from 'fall-ui'
const clickEvent = () => {
  FlMessage({content:'产生点击事件'})
}
const beforeChange1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const beforeChange2 = () => {
  return true
}
</script>
