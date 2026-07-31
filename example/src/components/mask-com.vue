<template>
  <ComponentLayout :anchors="anchors">
    <h2>遮罩</h2>
    <h3 id="fl-mask-basic">基础</h3>
    <fl-button @click="open">开启</fl-button>
    <fl-mask v-if="show">
      <fl-button @click="close">关闭</fl-button>
    </fl-mask>
    <h3 id="fl-mask-false">不带遮罩</h3>
    <fl-button @click="open2">开启</fl-button>
    <fl-mask :mask="false" @close="closeHandler" v-if="show2">
      <fl-button @click="close2">关闭</fl-button>
    </fl-mask>
    <h3 id="fl-mask-maskclose-true">点击遮罩层触发close事件</h3>
    <fl-button @click="open3">开启</fl-button>
    <fl-mask @close="closeHandler" v-if="show3">
      <fl-button @click="close3">关闭</fl-button>
    </fl-mask>
    <h3 id="fl-mask-maskclose-false">点击遮罩层不触发close事件</h3>
    <fl-button @click="open4">开启</fl-button>
    <fl-mask :maskClose="false" @close="closeHandler" v-if="show4">
      <fl-button @click="close4">关闭</fl-button>
    </fl-mask>

    <h3 id="fl-mask-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>

    <h3 id="fl-mask-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import { columns, eventColumns } from '@/assets/com-props';
import ComponentLayout from '@/layout/component-layout.vue'
import { FlMessage } from '@fall-ui/components';
import { ref } from 'vue'
const show = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
const closeHandler = () => {
  FlMessage({ content: '点击遮罩层' })
}
const open = () => {
  show.value = true
}
const close = () => {
  show.value = false
}

const open2 = () => {
  show2.value = true
}
const close2 = () => {
  show2.value = false
}

const open3 = () => {
  show3.value = true
}
const close3 = () => {
  show3.value = false
}

const open4 = () => {
  show4.value = true
}
const close4 = () => {
  show4.value = false
}

const anchors = [
  { title: '基础', href: '#fl-mask-basic' },
  { title: '不带遮罩', href: '#fl-mask-false' },
  { title: '点击遮罩触发close事件', href: '#fl-mask-maskclose-true' },
  { title: '点击遮罩不触发close事件', href: '#fl-mask-maskclose-false' },
  { title: '属性', href: '#fl-mask-attrs' },
  { title: '事件', href: '#fl-mask-events' },
]
const data = [
  { name: 'mask', type: 'Boolean', default: 'true', value: 'true,false', desc: '' },
  { name: 'maskClose', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
]

const eventData = [
  { name: 'close', params: '', desc: '点击遮罩层触发' }
]
</script>
