<template>
  <ComponentLayout :anchors="anchors">
    <h2>输入框</h2>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-basic">基础</h3>
      <fl-input></fl-input>
      <fl-input placeholder="成功" input-type="success"></fl-input>
      <fl-input placeholder="错误" input-type="error"></fl-input>
      <fl-input placeholder="警告" input-type="warning"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-disabled">禁用</h3>
      <fl-input disabled></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-length-limited">长度限制</h3>
      <fl-input maxlength="10"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-round">圆角</h3>
      <fl-input round></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-size">尺寸</h3>
      <h4 id="fl-input-size-small">小</h4>
      <fl-input size="small"></fl-input>
      <h4 id="fl-input-size-default">默认</h4>
      <fl-input></fl-input>
      <h4 id="fl-input-size-large">大</h4>
      <fl-input size="large" round></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-prefix_suffix">前缀和后缀</h3>
      <fl-input prefix="前缀" suffix="后缀"></fl-input>
      <fl-input prefixIcon="fl-search" suffixIcon="fl-close-circle"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-prepend_append">前置和后置</h3>
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
      <h3 id="fl-input-password">密码框</h3>
      <fl-input show-password></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-clearly">清除框</h3>
      <fl-input clear></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-count">数量统计</h3>
      <fl-input maxlength="10" count clear></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-v-model">双向绑定</h3>
      <fl-input @input="inputEvent" v-model="text" clear></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-some-event">输入、获焦、失焦、鼠标进入、鼠标离开、change、keyup、keydown事件</h3>
      <fl-input @input="inputEvent2" @focus="focusEvent" @blur="blurEvent" @mouseenter="mouseenterEvent"
        @mouseleave="mouseleaveEvent" @change="changeEvent" @keyup="keyupEvent" @keydown="keydownEvent"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-focus">自动获焦、失焦</h3>
      <fl-input ref="input"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-all">全选</h3>
      <fl-input v-model="text2" ref="input2"></fl-input>
    </div>
    <div :style="{ width: '300px' }">
      <h3 id="fl-input-width">指定宽度</h3>
      <fl-input width="200"></fl-input>
    </div>

    <h3 id="fl-input-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-input-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="fl-input-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-input-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-input-expose">暴露</h3>
    <fl-table :data="exposeData" :columns="exposeColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, slotColumns, eventColumns, exposeColumns } from '@/assets/com-props'
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

const anchors = [
  { title: '基础', href: '#fl-input-basic' },
  { title: '禁用', href: '#fl-input-disabled' },
  { title: '长度限制', href: '#fl-input-length-limited' },
  { title: '圆角', href: '#fl-input-round' },
  {
    title: '尺寸', href: '#fl-input-size',
    children: [
      { title: '小', href: '#fl-input-size-small' },
      { title: '默认', href: '#fl-input-size-default' },
      { title: '大', href: '#fl-input-size-large' },
    ]
  },
  { title: '前缀和后缀', href: '#fl-input-prefix_suffix' },
  { title: '前置和后置', href: '#fl-input-prepend_append' },
  { title: '密码框', href: '#fl-input-password' },
  { title: '清除框', href: '#fl-input-clearly' },
  { title: '数量统计', href: '#fl-input-count' },
  { title: '双向绑定', href: '#fl-input-v-model' },
  {
    title: '输入、获焦、失焦、鼠标进入、鼠标离开、change、keyup、keydown事件',
    href: '#fl-input-some-event'
  },
  { title: '自动获焦、失焦', href: '#fl-input-focus' },
  { title: '全选', href: '#fl-input-all' },
  { title: '指定宽度', href: '#fl-input-width' },
  { title: '属性', href: '#fl-input-attrs' },
  { title: 'model', href: '#fl-input-models' },
  { title: '插槽', href: '#fl-input-slots' },
  { title: '事件', href: '#fl-input-events' },
  { title: '暴露', href: '#fl-input-expose' }

]

const data = [
  { name: 'type', type: 'String', default: 'text', value: 'text', desc: '' },
  { name: 'inputType', type: 'String', default: 'primary', value: 'primary、success、warning、error', desc: '' },
  { name: 'placeholder', type: 'String', default: '请输入', value: '', desc: '' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'maxlength', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'round', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
  { name: 'prefix', type: 'String', default: '', value: '', desc: '' },
  { name: 'suffix', type: 'String', default: '', value: '', desc: '' },
  { name: 'prefixIcon', type: 'String, Object', default: '', value: '', desc: '' },
  { name: 'suffixIcon', type: 'String, Object', default: '', value: '', desc: '' },
  { name: 'prepend', type: 'String', default: '', value: '', desc: '' },
  { name: 'append', type: 'String', default: '', value: '', desc: '' },
  { name: 'showPassword', type: 'Boolean', default: 'false', value: '', desc: '' },
  { name: 'clear', type: 'Boolean', default: 'false', value: '', desc: '' },
  { name: 'count', type: 'Boolean', default: 'false', value: '', desc: '' },
  { name: 'width', type: 'String, Number', default: '', value: '', desc: '' },

]

const slotData = [
  { name: 'prepend', param: '', desc: '前面添加' },
  { name: 'append', param: '', desc: '后面添加' },
]

const modelData = [
  { name: '', type: 'String', default: '', value: '', desc: '' },
]

const eventData = [
  { name: 'input', params: '(e)', desc: '' },
  { name: 'focus', params: '(e)', desc: '' },
  { name: 'blur', params: '(e)', desc: '' },
  { name: 'mouseenter', params: '(e)', desc: '' },
  { name: 'mouseleave', params: '(e)', desc: '' },
  { name: 'change', params: '(e)', desc: '' },
  { name: 'keyup', params: '(e)', desc: '' },
  { name: 'keydown', params: '(e)', desc: '' },
]

const exposeData = [
  { name: 'ref', type: '属性', desc: '内部input引用' },
  { name: 'focus', type: '函数', desc: '获焦' },
  { name: 'blur', type: '函数', desc: '失焦' },
  { name: 'select', type: '函数', desc: '全选' },
]

</script>
