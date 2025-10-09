<template>
  <p>input :输入事件</p>
  <fl-input @input="inputEvent"></fl-input>
  <p>change :</p>
  <fl-input inputType="success"></fl-input>
  <fl-input inputType="warning"></fl-input>
  <fl-input typeinputType="error"></fl-input>
</template>
<script setup>
import { FlMessage } from 'fall-ui'
const inputEvent = (e) => {
  FlMessage({ content: `发生input事件,事件对象：${e}` })
}
</script>
