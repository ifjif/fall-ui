<template>
  <ComponentLayout :anchors="anchors">
    <h2>对话框</h2>
    <div>
      <h3 id="fl-message-box-basic">基础</h3>
      <fl-button @click="open1">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-vnode">虚拟节点内容</h3>
      <fl-button @click="open2">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-some-events">事件:关闭、取消、确认</h3>
      <fl-button @click="open3">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-async">异步</h3>
      <fl-button @click="open4">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-self-width">自定义宽度</h3>
      <fl-button @click="open5">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-maskclose-false">点击遮罩层不关闭</h3>
      <fl-button @click="open6">打开</fl-button>
    </div>
    <div>
      <h3 id="fl-message-box-some-kind">不同类型</h3>
      <fl-button type="primary" @click="open7">默认info</fl-button>
      <fl-button type="success" @click="open8">success</fl-button>
      <fl-button type="warning" @click="open9">warning</fl-button>
      <fl-button type="error" @click="open10">error</fl-button>
    </div>
    <h3 id="fl-message-box-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-message-box-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-message-box-expose">暴露</h3>
    <fl-table :data="exposeData" :columns="exposeColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, eventColumns, exposeColumns } from '@/assets/com-props';
import { FlMessageBox } from '@fall-ui/components';
import { h } from 'vue'
const open1 = () => {
  FlMessageBox({ title: '标题', content: '这是内容这是内容这是内容' })
}
const open2 = () => {
  FlMessageBox({
    title: '标题', content: h('span', {
      style: { 'color': 'red' },
    },
      [
        '这是虚拟节点中的'
      ]
    )
  })
}
const open3 = () => {
  FlMessageBox({
    title: '标题', content: '这是内容这是内容这是内容',
    onClose() { console.log('关闭事件') },
    onOk() { console.log('确认事件') },
    onCancel() { console.log('取消事件') }
  })
}
const open4 = () => {
  const ins = FlMessageBox({
    title: '标题', content: '这是内容这是内容这是内容',
    onCancel() { console.log('取消事件') },
    beforeChange() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
          console.log(ins)
          ins.close()
        }, 2000)
      })
    }
  })
}

const open5 = () => {
  FlMessageBox({ width: '500', title: '标题', content: '这这是内容这是内容这是内容这是内容这是内容这是内容是内容这是内容这是内容' })
}
const open6 = () => {
  FlMessageBox({ maskClose: false, title: '标题', content: '这这是内容这是内容这是内容这是内容这是内容这是内容是内容这是内容这是内容' })
}
const open7 = () => {
  FlMessageBox({ title: '标题', content: '这是内容这是内容这是内容' })
}
const open8 = () => {
  FlMessageBox({ type: 'success', title: '标题', content: '这是内容这是内容这是内容' })
}
const open9 = () => {
  FlMessageBox({ type: "warning", title: '标题', content: '这是内容这是内容这是内容' })
}
const open10 = () => {
  FlMessageBox({ type: "error", title: '标题', content: '这是内容这是内容这是内容' })
}

const anchors = [
  { title: '基础', href: 'fl-message-box-basic' },
  { title: '虚拟节点内容', href: 'fl-message-box-vnode' },
  { title: '事件：关闭，取消、确认', href: 'fl-message-box-some-events' },
  { title: '异步', href: 'fl-message-box-async' },
  { title: '自定义宽度', href: 'fl-message-box-self-width' },
  { title: '点击遮罩层不关闭', href: 'fl-message-box-maskclose-false' },
  { title: '不同类型', href: 'fl-message-box-some-kind' },
  { title: '属性', href: 'fl-message-box-attrs' },
  { title: '事件', href: 'fl-message-box-events' },
  { title: '暴露', href: 'fl-message-box-expose' },
]

const data = [
  { name: 'type', type: 'String', default: 'info', value: 'info,success,warning,error', desc: '' },
  { name: 'title', type: 'String', default: '', value: '', desc: '' },
  { name: 'content', type: 'String, Object', default: '', value: '', desc: '可为string或虚拟节点' },
  { name: 'onClose', type: 'Function', default: '', value: '', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'width', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'maskClose', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
]

const eventData = [
  { name: 'ok', params: '', desc: '点击确认' },
  { name: 'cancel', params: '', desc: '点击取消' }
]

const exposeData = [
  { name: 'close', type: '函数', desc: '关闭函数' },
]
</script>
