<template>
  <h2>输入框</h2>
  <div :style="{ width: '300px' }">
    <h3>基础</h3>
    <a-input></a-input>
    <a-input placeholder="成功" input-type="success"></a-input>
    <a-input placeholder="错误" input-type="error"></a-input>
    <a-input placeholder="警告" input-type="warning"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>禁用</h3>
    <a-input disabled></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>长度限制</h3>
    <a-input maxlength="10"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>圆角</h3>
    <a-input round></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>尺寸</h3>
    <a-input size="small"></a-input>
    <a-input></a-input>
    <a-input size="large" round></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>前缀和后缀</h3>
    <a-input prefix="前缀" suffix="后缀"></a-input>
    <a-input prefixIcon="a-search" suffixIcon="a-close-circle"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>前置和后置</h3>
    <a-input prepend="前置" append="后置"></a-input>
    <a-input prepend="http://" append=".com"></a-input>
    <a-input prefix="http://" suffix=".com">
      <template #prepend>
        <a-button><a-icon>
            <ASearch />
          </a-icon></a-button>
      </template>
      <template #append>
        <a-button>发送</a-button>
      </template>
    </a-input>
  </div>

  <div :style="{ width: '300px' }">
    <h3>密码框</h3>
    <a-input show-password></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>清除框</h3>
    <a-input clear></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>数量统计</h3>
    <a-input maxlength="10" count clear></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>双向绑定</h3>
    <a-input @input="inputEvent" v-model="text" clear></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>输入、获焦、失焦、鼠标进入、鼠标离开、change、keyup、keydown事件</h3>
    <a-input @input="inputEvent2" @focus="focusEvent" @blur="blurEvent" @mouseenter="mouseenterEvent"
      @mouseleave="mouseleaveEvent" @change="changeEvent" @keyup="keyupEvent" @keydown="keydownEvent"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>自动获焦、失焦</h3>
    <a-input ref="input"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>全选</h3>
    <a-input v-model="text2" ref="input2"></a-input>
  </div>
  <div :style="{ width: '300px' }">
    <h3>指定宽度</h3>
    <a-input width="200"></a-input>
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
