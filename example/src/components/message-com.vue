<template>
  <ComponentLayout :anchors="anchors">
    <h2>消息提示</h2>
    <div>
      <h3 id="fl-message-basic">基础</h3>
      <fl-button type="primary" @click="clickEvent1">打开 info</fl-button>
      <fl-button type="success" @click="clickEvent2">打开 success</fl-button>
      <fl-button type="warning" @click="clickEvent3">打开 warning</fl-button>
      <fl-button type="error" @click="clickEvent4">打开 error</fl-button>
    </div>
    <div>
      <h3 id="fl-message-bg">带背景</h3>
      <fl-button type="primary" @click="clickEvent5">打开 info</fl-button>
      <fl-button type="success" @click="clickEvent6">打开 success</fl-button>
      <fl-button type="warning" @click="clickEvent7">打开 warning</fl-button>
      <fl-button type="error" @click="clickEvent8">打开 error</fl-button>
    </div>
    <div>
      <h3 id="fl-message-size">尺寸</h3>
      <fl-button size="small" type="primary" @click="clickEvent9">打开 info 小</fl-button>
      <fl-button type="success" @click="clickEvent10">打开 success</fl-button>
      <fl-button size="large" type="warning" @click="clickEvent11">打开 warning 大</fl-button>
      <fl-button type="error" @click="clickEvent12">打开 error</fl-button>
    </div>
    <fl-button @click="clickAll">关闭所有</fl-button>
    <h3 id="fl-message-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-message-expose">暴露</h3>
    <fl-table :data="exposeData" :columns="exposeColumns"></fl-table>
    <p>通过FlMessage.closeAll()可关闭所有</p>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { FlMessage } from 'fall-ui';
import { columns, exposeColumns } from '@/assets/com-props';
//import { FlMessage } from '../../../fall-ui/es/index.mjs';
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

const anchors = [
  { title: '基础', href: 'fl-message-basic' },
  { title: '带背景', href: 'fl-message-bg' },
  { title: '尺寸', href: 'fl-message-size' },
  { title: '属性', href: 'fl-message-attrs' },
  { title: '暴露', href: 'fl-message-expose' },
]
const data = [
  {
    name: 'type', type: 'String', default: 'primary', value: 'primary、success、warning、error',
    desc: ''
  },
  { name: 'content', type: 'String', default: '', value: '', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small, large', desc: '' },
  { name: 'offset', type: 'Number', default: '16', value: '', desc: '' },
  { name: 'duration', type: 'Number', default: '3000', value: '', desc: '' },
  { name: 'bg', type: 'Boolean', default: 'false', value: 'true,false', desc: '' },
  { name: 'onClose', type: 'Function', default: '', value: '', desc: '' },

]

const exposeData = [
  { name: 'close', type: '方法', desc: '关闭' },
  { name: 'bottomOffset', type: '属性', desc: '底部距视口顶部偏移' },
]
</script>
