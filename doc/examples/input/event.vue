<template>
  <p>input :输入事件</p>
  <fl-input @input="inputEvent" clear></fl-input>
  <p>change :内容改变+光标消失</p>
  <fl-input @change="changeEvent" clear></fl-input>
  <p>focus :获取光标事件</p>
  <fl-input @focus="focusEvent" clear></fl-input>
  <p>blur :失去光标事件</p>
  <fl-input @blur="blurEvent" clear></fl-input>
  <p>mouseenter :鼠标进入事件</p>
  <fl-input @mouseenter="mouseenterEvent" clear></fl-input>
  <p>mouseleave :鼠标离开事件</p>
  <fl-input @mouseleave="mouseleaveEvent" clear></fl-input>
  <p>keyup :键盘抬起事件</p>
  <fl-input @keyup="keyupEvent" clear></fl-input>
  <p>keydown :键盘按下事件</p>
  <fl-input @keydown="keydownEvent" clear></fl-input>
</template>
<script setup>
import { FlMessage } from 'fall-ui'
const inputEvent = (e) => {
  FlMessage({ content: `发生input事件,事件对象：${e}` })
}
const changeEvent = (e) => {
  FlMessage({ content: `发生change事件,事件对象：${e}` })
}
const focusEvent = (e) => {
  FlMessage({ content: `发生focus事件, 事件对象${e}` })
}
const blurEvent = (e) => {
  FlMessage({ content: `发生blur事件，事件对象${e}` })
}
const mouseenterEvent = (e) => {
  FlMessage({ content: `发生mouseenter事件，事件对象${e}` })
}
const mouseleaveEvent = (e) => {
  FlMessage({ content: `发生mouseleave事件，事件对象${e}` })
}
const keyupEvent = (e) => {
  FlMessage({ content: `发生keyup事件，事件对象${e}` })
}
const keydownEvent = (e) => {
  FlMessage({ content: `发生keydown事件，事件对象${e}` })
}
</script>
