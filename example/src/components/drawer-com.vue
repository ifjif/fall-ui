<template>
  <ComponentLayout :anchors="anchors">
    <fl-button @click="opentest">打开test</fl-button>
    <h2>抽屉</h2>
    <div>
      <h3 id="fl-drawer-basic">基础</h3>
      <fl-button @click="open1">打开 left</fl-button>
      <fl-button @click="open2">打开 right</fl-button>
      <fl-button @click="open3">打开 top</fl-button>
      <fl-button @click="open4">打开 bottom</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-width-height-self">自定义宽度和高度</h3>
      <fl-button @click="open5">打开 left</fl-button>
      <fl-button @click="open6">打开 right</fl-button>
      <fl-button @click="open7">打开 top</fl-button>
      <fl-button @click="open8">打开 bottom</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-fixed-screen">固定屏幕</h3>
      <fl-button @click="open9">打开 left</fl-button>
      <fl-button @click="open10">打开 right</fl-button>
      <fl-button @click="open11">打开 top</fl-button>
      <fl-button @click="open12">打开 bottom</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-some-events">关闭、取消、确认事件</h3>
      <fl-button @click="open13">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-async">异步</h3>
      <fl-button @click="open14">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-maskclose-false">遮罩层不关闭</h3>
      <fl-button @click="open15">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-drawer-vnode">内容虚拟节点</h3>
      <fl-button @click="open16">打开</fl-button>
    </div>
    <h3 id="fl-drawer-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-drawer-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, eventColumns } from '@/assets/com-props';
import { FlDrawer } from 'fall-ui';
import { FlInput } from 'fall-ui';
import { h } from 'vue';
const title = '这是头部'
const content = `
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
  `

const opentest = () => {
  FlDrawer({ title: '测试', content: 'abc' })
}
const open1 = () => {
  FlDrawer({ title, placement: 'left', content })
}
const open2 = () => {
  FlDrawer({ title, placement: 'right', content })
}
const open3 = () => {
  FlDrawer({ title, placement: 'top', content })
}
const open4 = () => {
  FlDrawer({ title, placement: 'bottom', content })
}
const open5 = () => {
  FlDrawer({ title, placement: 'left', content, fixedScreen: true, width: 500, height: 400 })
}
const open6 = () => {
  FlDrawer({ title, placement: 'right', content, fixedScreen: true, width: 500, height: 400 })
}
const open7 = () => {
  FlDrawer({ title, placement: 'top', content, fixedScreen: true, width: 500, height: 400 })
}
const open8 = () => {
  FlDrawer({ title, placement: 'bottom', content, fixedScreen: true, width: 500, height: 400 })
}
const open9 = () => {
  FlDrawer({ title, placement: 'left', content, fixedScreen: true })
}
const open10 = () => {
  FlDrawer({ title, placement: 'right', content, fixedScreen: true })
}
const open11 = () => {
  FlDrawer({ title, placement: 'top', content, fixedScreen: true })
}
const open12 = () => {
  FlDrawer({ title, placement: 'bottom', content, fixedScreen: true })
}
const open13 = () => {
  FlDrawer({
    title,
    content,
    fixedScreen: true,
    onClose() {
      console.log('关闭')
    },
    onOk() {
      console.log('确认')
    },
    onCancel() {
      console.log('取消')
    }
  })
}
const open14 = () => {
  FlDrawer({
    title,
    fixedScreen: true,
    content,
    beforeChange() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    }
  })
}
const open15 = () => {
  FlDrawer({ title, fixedScreen: true, maskClose: false, content })
}
const open16 = () => {
  FlDrawer({ title, fixedScreen: true, content: h(FlInput) })
}

const anchors = [
  { title: '基础', href: 'fl-drawer-basic' },
  { title: '自定义宽度和高度', href: 'fl-drawer-width-height-self' },
  { title: '固定屏幕', href: 'fl-drawer-fixed-screen' },
  { title: '关闭、取消、确认事件', href: 'fl-drawer-some-events' },
  { title: '异步', href: 'fl-drawer-async' },
  { title: '遮罩层不关闭', href: 'fl-drawer-maskclose-false' },
  { title: '内容虚拟节点', href: 'fl-drawer-vnode' },
  { title: '属性', href: 'fl-drawer-attrs' },
  { title: '事件', href: 'fl-drawer-events' },
]


const data = [
  { name: 'onClose', type: 'Function', default: '', value: '', desc: '' },
  { name: 'placement', type: 'String', default: 'right', value: 'left, right, top, bottom', desc: '' },
  { name: 'fixedScreen', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
  { name: 'height', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'width', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'maskClose', type: 'Boolean', default: 'true', value: '', desc: '' },
  { name: 'content', type: 'String, Object', default: '', value: '', desc: '可为string或虚拟节点' },
  { name: 'title', type: 'String', default: '', value: '', desc: '' },
]

const eventData = [
  { name: 'cancel', params: '', desc: '取消事件' },
  { name: 'ok', params: '', desc: '确认事件' }
]
</script>
