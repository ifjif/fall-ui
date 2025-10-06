<template>
  <h2>抽屉</h2>
  <div>
    <h3>基础</h3>
    <fl-button @click="open1">打开 left</fl-button>
    <fl-button @click="open2">打开 right</fl-button>
    <fl-button @click="open3">打开 top</fl-button>
    <fl-button @click="open4">打开 bottom</fl-button>
  </div>
  <div>
    <h3>自定义宽度和高度</h3>
    <fl-button @click="open5">打开 left</fl-button>
    <fl-button @click="open6">打开 right</fl-button>
    <fl-button @click="open7">打开 top</fl-button>
    <fl-button @click="open8">打开 bottom</fl-button>
  </div>
  <div>
    <h3>固定屏幕</h3>
    <fl-button @click="open9">打开 left</fl-button>
    <fl-button @click="open10">打开 right</fl-button>
    <fl-button @click="open11">打开 top</fl-button>
    <fl-button @click="open12">打开 bottom</fl-button>
  </div>
  <div>
    <h3>关闭、取消、确认事件</h3>
    <fl-button @click="open13">打开</fl-button>
  </div>
  <div>
    <h3>异步</h3>
    <fl-button @click="open14">打开</fl-button>
  </div>
  <div>
    <h3>遮罩层不关闭</h3>
    <fl-button @click="open15">打开</fl-button>
  </div>
  <div>
    <h3>内容虚拟节点</h3>
    <fl-button @click="open16">打开</fl-button>
  </div>
</template>
<script setup>
import { FlDrawer } from '@ui-library/components';
import { FlInput } from '@ui-library/components';
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
</script>
