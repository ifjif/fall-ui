<template>
  <p>input: 输入事件</p>
  <fl-textarea @input="inputEvent" rows="2"></fl-textarea>
  <p>change: 内容改变+失去焦点</p>
  <fl-textarea @change="changeEvent" rows="2"></fl-textarea>
  <p>focus: 获取焦点</p>
  <fl-textarea @focus="focusEvent" rows="2"></fl-textarea>
  <p>blur: 失去焦点</p>
  <fl-textarea @blur="blurEvent" rows="2"></fl-textarea>
  <p>mouseenter: 鼠标进入</p>
  <fl-textarea @mouseenter="mouseenterEvent" rows="2"></fl-textarea>
  <p>mouseleave: 鼠标离开</p>
  <fl-textarea @mouseleave="mouseleaveEvent" rows="2"></fl-textarea>
  <p>keyup: 键盘抬起</p>
  <fl-textarea @keyup="keyupEvent" rows="2"></fl-textarea>
  <p>keydown: 键盘按下</p>
  <fl-textarea @keydown="keydownEvent" rows="2"></fl-textarea>
</template>
<script setup>
import { FlMessage } from 'fall-ui'
const inputEvent = (e) => {
  FlMessage({ content: `发生input事件，事件对象:${e}` })
}
const changeEvent = (e) => {
  FlMessage({ content: `发生change事件，事件对象:${e}` })
}
const focusEvent = (e) => {
  FlMessage({ content: `发生focus事件，事件对象:${e}` })
}
const blurEvent = (e) => {
  FlMessage({ content: `发生blur事件，事件对象:${e}` })
}
const mouseenterEvent = (e) => {
  FlMessage({ content: `发生mouseenter事件，事件对象:${e}` })
}
const mouseleaveEvent = (e) => {
  FlMessage({ content: `发生mouseleave事件，事件对象:${e}` })
}
const keyupEvent = (e) => {
  FlMessage({ content: `发生keyup事件，事件对象:${e}` })
}
const keydownEvent = (e) => {
  FlMessage({ content: `发生keydown事件，事件对象:${e}` })
}
</script>
