<template>
  <h2>消息提示</h2>
  <div>
    <h3>基础</h3>
    <fl-button type="primary" @click="clickEvent1">打开 info</fl-button>
    <fl-button type="success" @click="clickEvent2">打开 success</fl-button>
    <fl-button type="warning" @click="clickEvent3">打开 warning</fl-button>
    <fl-button type="error" @click="clickEvent4">打开 error</fl-button>
  </div>
  <div>
    <h3>带背景</h3>
    <fl-button type="primary" @click="clickEvent5">打开 info</fl-button>
    <fl-button type="success" @click="clickEvent6">打开 success</fl-button>
    <fl-button type="warning" @click="clickEvent7">打开 warning</fl-button>
    <fl-button type="error" @click="clickEvent8">打开 error</fl-button>
  </div>
  <div>
    <h3>尺寸</h3>
    <fl-button size="small" type="primary" @click="clickEvent9">打开 info 小</fl-button>
    <fl-button type="success" @click="clickEvent10">打开 success</fl-button>
    <fl-button size="large" type="warning" @click="clickEvent11">打开 warning 大</fl-button>
    <fl-button type="error" @click="clickEvent12">打开 error</fl-button>
  </div>
  <fl-button @click="clickAll">关闭所有</fl-button>
</template>
<script setup>
//import { FlMessage } from '@fall-ui/components';
import { FlMessage } from '../../../fall-ui/es/index.mjs';
//import { getCurrentInstance } from 'vue';

//const { appContext } = getCurrentInstance()

const clickEvent1 = () => {
  FlMessage({ content: '这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息这是一条消息' })
  //appContext.config.globalProperties['$flmessage']()
}
const clickEvent2 = () => {
  FlMessage({ content: '这是一条消息', type: 'success' })
}
const clickEvent3 = () => {
  FlMessage({ content: '这是一条消息', type: 'warning' })
}
const clickEvent4 = () => {
  FlMessage({ content: '这是一条消息', type: 'error' })
}
const clickEvent5 = () => {
  FlMessage({ content: '这是一条消息', bg: true })
}
const clickEvent6 = () => {
  FlMessage({ content: '这是一条消息', type: 'success', bg: true })
}
const clickEvent7 = () => {
  FlMessage({ content: '这是一条消息', type: 'warning', bg: true })
}
const clickEvent8 = () => {
  FlMessage({ content: '这是一条消息', type: 'error', bg: true, onClose: () => { console.log('销毁') } })
}
const clickEvent9 = () => {
  FlMessage({ content: '这是一条消息(小)', size: 'small' })
}
const clickEvent10 = () => {
  FlMessage({ content: '这是一条消息', type: 'success', bg: true })
}
const clickEvent11 = () => {
  FlMessage({ content: '这是一条消息(大)', type: 'warning', bg: true, size: 'large' })
}
const clickEvent12 = () => {
  FlMessage({ content: '这是一条消息', type: 'error', onClose: () => { console.log('销毁') } })
}

const clickAll = () => {
  FlMessage.closeAll()
}
</script>
