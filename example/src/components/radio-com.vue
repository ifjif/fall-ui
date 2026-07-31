<template>
  <ComponentLayout :anchors="anchors">
    <h2>单选框</h2>
    <div>
      <h3 id="fl-radio-basic">基础</h3>
      <fl-radio v-model="value1" value="主要" label="主要"></fl-radio>
      <fl-radio v-model="value1" type="success" value="成功" label="成功"></fl-radio>
      <fl-radio v-model="value1" type="warning" value="警告" label="警告"></fl-radio>
      <fl-radio v-model="value1" type="error" value="错误" label="错误"></fl-radio>
      <fl-radio label="自定义" :styles="styles"></fl-radio>
    </div>
    <div>
      <h3 id="fl-radio-disabled">禁用</h3>
      <fl-radio disabled v-model="value1" value="主要" label="主要"></fl-radio>
      <fl-radio disabled v-model="value1" type="success" value="成功" label="成功"></fl-radio>
      <fl-radio disabled v-model="value1" type="warning" value="警告" label="警告"></fl-radio>
      <fl-radio disabled v-model="value1" type="error" value="错误" label="错误"></fl-radio>

      <fl-radio disabled v-model="checked1" value="1" label="主要"></fl-radio>
      <fl-radio disabled v-model="checked1" value="1" type="success" label="成功"></fl-radio>
      <fl-radio disabled v-model="checked1" value="1" type="warning" label="警告"></fl-radio>
      <fl-radio disabled v-model="checked1" value="1" type="error" label="错误"></fl-radio>
      <fl-radio disabled v-model="checked1" value="1" label="自定义" :styles="styles"></fl-radio>
    </div>
    <div>
      <h3 id="fl-radio-group">单选框组</h3>
      <fl-radio-group v-model="value2">
        <fl-radio value="主要" label="主要"></fl-radio>
        <fl-radio type="success" value="成功" label="成功"></fl-radio>
        <fl-radio type="warning" value="警告" label="警告"></fl-radio>
        <fl-radio type="error" value="错误" label="错误"></fl-radio>
      </fl-radio-group>
    </div>
    <div>
      <h3 id="fl-radio-init-data">初始数据，默认选中</h3>
      <h4 id="fl-radio-init-data-single">单个</h4>
      <fl-radio v-model="value7" value="主要" label="主要"></fl-radio>
      <fl-radio v-model="value7" type="success" value="成功" label="成功"></fl-radio>
      <h4 id="fl-radio-init-data-group">组中</h4>
      <fl-radio-group v-model="value8">
        <fl-radio type="warning" value="警告" label="警告"></fl-radio>
        <fl-radio type="error" value="错误" label="错误"></fl-radio>
      </fl-radio-group>
    </div>
    <div>
      <h3 id="fl-radio-async">异步</h3>
      <h4 id="fl-radio-async-attr">属性设置</h4>
      <fl-radio-group v-model="value3">
        <fl-radio loading value="主要" label="主要"></fl-radio>
        <fl-radio loading type="success" value="成功" label="成功"></fl-radio>
        <fl-radio loading :styles="styles" label="自定义"></fl-radio>
      </fl-radio-group>
      <h4 id="fl-radio-async-click">点击设置</h4>
      <fl-radio :beforeChange="beforeChange1" v-model="value4" type="warning" value="警告" label="警告"></fl-radio>
      <fl-radio :beforeChange="beforeChange2" v-model="value4" type="error" value="错误" label="错误"></fl-radio>
      <fl-radio :beforeChange="beforeChange3" :styles="styles" label="自定义"></fl-radio>
    </div>
    <div>
      <h3 id="fl-radio-event">事件</h3>
      <h4 id="fl-radio-event-single">单change事件</h4>
      <fl-radio @change="changeEvent1" v-model="value5" type="warning" value="警告" label="警告"></fl-radio>
      <h4 id="fl-radio-event-group">组change事件</h4>
      <fl-radio-group @change="changeEvent2" v-model="value6">
        <fl-radio value="主要" label="主要"></fl-radio>
        <fl-radio type="success" value="成功" label="成功"></fl-radio>
      </fl-radio-group>
    </div>
    <div>
      <h3 id="fl-radio-size">大小</h3>
      <h4 id="fl-radio-size-single">单</h4>
      <fl-radio size="small" value="主要" label="主要"></fl-radio>
      <fl-radio type="success" value="成功" label="成功"></fl-radio>
      <fl-radio size="large" type="warning" value="警告" label="警告"></fl-radio>
      <h4 id="fl-radio-size-group">组</h4>
      <fl-radio-group size="small">
        <fl-radio value="主要" label="主要"></fl-radio>
        <fl-radio type="success" value="成功" label="成功"></fl-radio>
        <fl-radio type="warning" value="警告" label="警告"></fl-radio>
      </fl-radio-group>
      <h4 id="fl-radio-size-scale">自缩放</h4>
      <fl-radio scale="0.6" label="0.6倍"></fl-radio>
      <fl-radio scale="1" label="1倍"></fl-radio>
      <fl-radio scale="1.5" label="1.5倍"></fl-radio>
    </div>
    <h3 id="fl-radio-attrs">radio属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-radio-models">radio model</h3>
    <fl-table :data="modelData" :columns="columns">
    </fl-table>
    <h3 id="fl-radio-events">radio事件</h3>
    <fl-table :data="eventData" :columns="eventColumns">
    </fl-table>

    <h3 id="fl-radio-group-attrs">radio-group属性</h3>
    <fl-table :data="groupData" :columns="columns">
    </fl-table>
    <h3 id="fl-radio-group-models">radio-group model</h3>
    <fl-table :data="groupModelData" :columns="columns">
    </fl-table>
    <h3 id="fl-radio-group-slots">radio-group插槽</h3>
    <fl-table :data="groupSlots" :columns="slotColumns">
    </fl-table>
    <h3 id="fl-radio-group-events">radio-group事件</h3>
    <fl-table :data="groupEventData" :columns="eventColumns">
    </fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, eventColumns, slotColumns } from '@/assets/com-props';
import { ref } from 'vue';
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('主要')
const value8 = ref('错误')
const checked1 = ref('1')

const beforeChange1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const beforeChange2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const beforeChange3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const changeEvent1 = (val) => {
  console.log('单change事件', val)
}
const changeEvent2 = (val) => {
  console.log('组change事件', val)
}
const styles = {
  root: {
    bg_color: '#000',
    bd_color: 'blue',
    color: 'brown'
  },
  hover: {
    bg_color: 'red',
    bd_color: 'yellow',
    color: 'red'
  },
  selected: {
    bg_color: 'beige',
    bd_color: '#000',
    color: 'skyblue',
    icon_color: 'red'
  },
  disabled: {
    bg_color: 'brown',
    bd_color: 'yellow',
    color: 'blue',
    icon_color: 'green'
  },
  loading: {
    bg_color: '#fff',
    bd_color: '#000',
    color: 'gray',
  }
}

const anchors = [
  { title: '基础', href: '#fl-radio-basic' },
  { title: '禁用', href: '#fl-radio-disabled' },
  { title: '单选框组', href: '#fl-radio-group' },
  {
    title: '初始数据，默认选中', href: '#fl-radio-init-data',
    children: [
      { title: '单个', href: '#fl-radio-init-data-single' },
      { title: '组中', href: '#fl-radio-init-data-group' },
    ]
  },
  {
    title: '异步', href: '#fl-radio-async',
    children: [
      { title: '属性设置', href: '#fl-radio-async-attr' },
      { title: '点击设置', href: '#fl-radio-async-click' },
    ]
  },
  {
    title: '事件', href: '#fl-radio-event',
    children: [
      { title: '单change事件', href: '#fl-radio-event-single' },
      { title: '组change事件', href: '#fl-radio-event-group' },
    ]
  },
  {
    title: '大小', href: '#fl-radio-size',
    children: [
      { title: '单', href: '#fl-radio-size-single' },
      { title: '组', href: '#fl-radio-size-group' },
      { title: '自缩放', href: '#fl-radio-size-scale' },
    ]
  },
  { title: 'radio属性', href: '#fl-radio-attrs' },
  { title: 'radio model', href: '#fl-radio-models' },
  { title: 'radio事件', href: '#fl-radio-events' },
  { title: 'radio-group属性', href: '#fl-radio-group-attrs' },
  { title: 'radio-group model', href: '#fl-radio-group-models' },
  { title: 'radio-group插槽', href: '#fl-radio-group-slots' },
  { title: 'radio-group事件', href: '#fl-radio-group-events' },
]

const stylesV =
{
  root: {
    bg_color: "",
    bd_color: "",
    color: "",
  },
  disabled: {
    bg_color: "",
    bd_color: "",
    color: "",
    icon_color: "",
  },
  hover: {
    bg_color: "",
    bd_color: "",
    color: "",
  },
  selected: {
    bg_color: "",
    bd_color: "",
    color: "",
    icon_color: "",
  },
  loading: {
    bg_color: "",
    bd_color: "",
    color: "",
  }
}
const data = [
  { name: 'tag', type: 'String,Object', default: 'label', value: '', desc: '' },
  { name: 'type', type: 'String', default: 'primary', value: 'primary、success、warning、error', desc: '' },
  { name: 'label', type: 'String,Number', default: '', value: '', desc: '' },
  { name: 'value', type: 'String,Number,Boolean', default: '', value: '', desc: '' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
  { name: 'scale', type: 'String,Number', default: '1', value: '', desc: '' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(stylesV, null, 2), desc: '' }
]

const modelData = [
  { name: '', type: 'String, Number, Boolean', default: '', value: '', desc: '' },
]

const eventData = [
  { name: 'change', params: '(checked)', desc: '' }
]

const groupData = [
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
]

const groupModelData = [
  { name: '', type: 'String, Number, Boolean', default: '', value: '', desc: '' },
]

const groupSlots = [
  { name: 'default', param: '', desc: '' },
]

const groupEventData = [
  { name: 'change', params: '(value)', desc: '组值改变' }
]

</script>
