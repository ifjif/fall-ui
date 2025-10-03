<template>
  <h2>输入框</h2>
  <div :style="{ width: '300px' }">
    <h3>基础</h3>
    <fl-input></fl-input>
    <fl-input placeholder="成功" input-type="success"></fl-input>
    <fl-input placeholder="错误" input-type="error"></fl-input>
    <fl-input placeholder="警告" input-type="warning"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>禁用</h3>
    <fl-input disabled></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>长度限制</h3>
    <fl-input maxlength="10"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>圆角</h3>
    <fl-input round></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>尺寸</h3>
    <fl-input size="small"></fl-input>
    <fl-input></fl-input>
    <fl-input size="large" round></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>前缀和后缀</h3>
    <fl-input prefix="前缀" suffix="后缀"></fl-input>
    <fl-input prefixIcon="a-search" suffixIcon="a-close-circle"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>前置和后置</h3>
    <fl-input prepend="前置" append="后置"></fl-input>
    <fl-input prepend="http://" append=".com"></fl-input>
    <fl-input prefix="http://" suffix=".com">
      <template #prepend>
        <fl-button><fl-icon>
            <FlSearch />
          </fl-icon></fl-button>
      </template>
      <template #append>
        <fl-button>发送</fl-button>
      </template>
    </fl-input>
  </div>

  <div :style="{ width: '300px' }">
    <h3>密码框</h3>
    <fl-input show-password></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>清除框</h3>
    <fl-input clear></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>数量统计</h3>
    <fl-input maxlength="10" count clear></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>双向绑定</h3>
    <fl-input @input="inputEvent" v-model="text" clear></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>输入、获焦、失焦、鼠标进入、鼠标离开、change、keyup、keydown事件</h3>
    <fl-input @input="inputEvent2" @focus="focusEvent" @blur="blurEvent" @mouseenter="mouseenterEvent"
      @mouseleave="mouseleaveEvent" @change="changeEvent" @keyup="keyupEvent" @keydown="keydownEvent"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>自动获焦、失焦</h3>
    <fl-input ref="input"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>全选</h3>
    <fl-input v-model="text2" ref="input2"></fl-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>指定宽度</h3>
    <fl-input width="200"></fl-input>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const text = ref('')
const inputEvent = (e) => {
  console.log(text.value)
}
const inputEvent2 = (e) => {
  console.log('输入事件', e)
}
const focusEvent = (e) => {
  console.log('获焦事件', e)
}
const blurEvent = (e) => {
  console.log('失焦事件', e)
}
const mouseenterEvent = (e) => {
  console.log('鼠标进入', e)
}
const mouseleaveEvent = (e) => {
  console.log('鼠标离开', e)
}
const changeEvent = (e) => {
  console.log('change事件', e)
}
const keyupEvent = (e) => {
  console.log('keyup事件', e)
}
const keydownEvent = (e) => {
  console.log('keydown事件', e)
}
const input = ref()
const input2 = ref()
const text2 = ref('全部选中')

onMounted(() => {
  //console.log(input.value.ref)
  setTimeout(() => {
    //input.value.focus()
  }, 2000)
  setTimeout(() => {
    //input.value.blur()
  }, 4000)
})

setTimeout(() => {
  //input2.value.select()
}, 3000)
</script>
