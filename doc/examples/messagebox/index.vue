<template>
  <h2>对话框</h2>
  <div>
    <h3>基础</h3>
    <fl-button @click="open1">打开</fl-button>
  </div>
  <div>
    <h3>虚拟节点内容</h3>
    <fl-button @click="open2">打开</fl-button>
  </div>
  <div>
    <h3>事件:关闭、取消、确认</h3>
    <fl-button @click="open3">打开</fl-button>
  </div>
  <div>
    <h3>异步</h3>
    <fl-button @click="open4">打开</fl-button>
  </div>
  <div>
    <h3>自定义宽度</h3>
    <fl-button @click="open5">打开</fl-button>
  </div>
  <div>
    <h3>点击遮罩层不关闭</h3>
    <fl-button @click="open6">打开</fl-button>
  </div>
  <div>
    <h3>不同类型</h3>
    <fl-button type="primary" @click="open7">默认info</fl-button>
    <fl-button type="success" @click="open8">success</fl-button>
    <fl-button type="warning" @click="open9">warning</fl-button>
    <fl-button type="error" @click="open10">error</fl-button>
  </div>
</template>
<script setup>
import { FlMessageBox } from 'fall-ui';
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
</script>
