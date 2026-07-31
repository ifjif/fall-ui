<template>
  <ComponentLayout :anchors="anchors">
    <h2>多选框</h2>
    <div>
      <h3 id="checkbox-default">基础</h3>
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
      <fl-checkbox :styles="styles" label="自定义" scale="1"></fl-checkbox>
    </div>
    <div>
      <h3 id="checkbox-disabled">禁用</h3>
      <fl-checkbox disabled label="主要" value="主要"></fl-checkbox>
      <fl-checkbox disabled type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox disabled type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox disabled type="error" label="错误" value="错误"></fl-checkbox>
      <fl-checkbox :styles="styles" disabled label="自定义" scale="1"></fl-checkbox>
      <fl-checkbox disabled v-model="checked1" label="主要" value="主要"></fl-checkbox>
      <fl-checkbox disabled v-model="checked1" type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox disabled v-model="checked1" type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox disabled v-model="checked1" type="error" label="错误" value="错误"></fl-checkbox>
      <fl-checkbox :styles="styles" disabled v-model="checked1" label="自定义" scale="1"></fl-checkbox>
    </div>
    <div>
      <h3 id="checkbox-group">多选框组</h3>
      <fl-checkbox-group v-model="value">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
        <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
      </fl-checkbox-group>
    </div>
    <div>
      <h3 id="checkbox-init-data-selected">初始数据，默认选中</h3>

      <h4 id="checkbox-group-data">组中存在数据</h4>
      <fl-checkbox-group v-model="value2">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
        <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
      </fl-checkbox-group>

      <h4 id="checkbox-data">单独设置true</h4>
      <fl-checkbox v-model="value3" type="success" label="设置true选中"></fl-checkbox>
      <fl-checkbox type="error" label="未设置"></fl-checkbox>
    </div>
    <div>
      <h3 id="checkbox-event">事件</h3>

      <h4 id="checkbox-group-event">组事件</h4>
      <fl-checkbox-group @change="changeEvent" v-model="value4">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
        <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
      </fl-checkbox-group>

      <h4 id="checkbox-single-event">单checkbox事件</h4>
      <fl-checkbox @change="changeEvent2" type="error" label="值" value="值"></fl-checkbox>
    </div>
    <div>
      <h3 id="checkbox-async">异步</h3>
      <h4 id="checkbox-async-by-attribute">属性触发</h4>
      <fl-checkbox loading label="主要"></fl-checkbox>
      <fl-checkbox loading type="success" label="成功"></fl-checkbox>
      <fl-checkbox :styles="styles" loading label="自定义" scale="1"></fl-checkbox>

      <h4 id="checkbox-async-by-click">点击触发</h4>
      <fl-checkbox :beforeChange="beforeChange1" type="warning" label="警告"></fl-checkbox>
      <fl-checkbox :beforeChange="beforeChange2" type="error" label="错误"></fl-checkbox>
      <fl-checkbox :styles="styles" :beforeChange="beforeChange3" label="自定义" scale="1"></fl-checkbox>
    </div>
    <div>
      <h3 id="checkbox-all">全选</h3>
      <fl-checkbox-all @change="changeEvent3" v-model="value5">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
        <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
      </fl-checkbox-all>
    </div>
    <div>
      <h3 id="checkbox-size">大小</h3>
      <h4 id="checkbox-size-single">单个</h4>
      <fl-checkbox size="small" label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox size="large" type="warning" label="警告" value="警告"></fl-checkbox>
      <h4 id="checkbox-size-scale">自伸缩</h4>
      <fl-checkbox label="0.6倍" scale="0.6"></fl-checkbox>
      <fl-checkbox label="1倍" scale="1"></fl-checkbox>
      <fl-checkbox label="2倍" scale="2"></fl-checkbox>
      <h4 id="checkbox-size-group">组</h4>
      <fl-checkbox-group size="small">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      </fl-checkbox-group>
      <h4 id="checkbox-size-all">全选</h4>
      <fl-checkbox-all size="large">
        <fl-checkbox label="主要" value="主要"></fl-checkbox>
        <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
        <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      </fl-checkbox-all>
    </div>

    <h3 id="checkbox-attrs">checkbox属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="checkbox-models">checkbox model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="checkbox-slots">checkbox插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="checkbox-events">checkbox事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>

    <h3 id="checkbox-group-attrs">checkbox-group属性</h3>
    <fl-table :data="groupData" :columns="columns"></fl-table>
    <h3 id="checkbox-group-models">checkbox-group model</h3>
    <fl-table :data="groupModel" :columns="columns"></fl-table>
    <h3 id="checkbox-group-slots">checkbox-group插槽</h3>
    <fl-table :data="groupSlotData" :columns="slotColumns"></fl-table>
    <h3 id="checkbox-group-events">checkbox-group事件</h3>
    <fl-table :data="groupEventData" :columns="eventColumns"></fl-table>

    <h3 id="checkbox-all-attrs">checkbox-all属性</h3>
    <fl-table :data="allData" :columns="columns"></fl-table>
    <h3 id="checkbox-all-models">checkbox-all model</h3>
    <fl-table :data="allModel" :columns="columns"></fl-table>
    <h3 id="checkbox-all-slots">checkbox-all插槽</h3>
    <fl-table :data="allSlotData" :columns="slotColumns"></fl-table>
    <h3 id="checkbox-all-events">checkbox-all事件</h3>
    <fl-table :data="allEventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, slotColumns, eventColumns } from '@/assets/com-props'
import { ref } from 'vue'
const value = ref([])
const value2 = ref(['主要', '警告'])
const value3 = ref(true)
const value4 = ref([])
const checked1 = ref(true)
const changeEvent = (val) => {
  console.log('组change事件', val)
}
const changeEvent2 = (e) => {
  console.log('单change事件', e)
}
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
const value5 = ref([])
const changeEvent3 = () => {
  console.log(value5.value)
}

const anchors = [
  { title: '基础', href: '#checkbox-default' },
  { title: '禁用', href: '#checkbox-disabled' },
  { title: '多选框组', href: '#checkbox-group' },
  {
    title: '初始数据，默认选中', href: '#checkbox-init-data-selected',
    children: [
      { title: '组中存在数据', href: '#checkbox-group-data' },
      { title: '单独设置为true', href: '#checkbox-data' },
    ]
  },
  {
    title: '事件', href: '#checkbox-event',
    children: [
      { title: '组事件', href: '#checkbox-group-event' },
      { title: '单checkbox事件', href: '#checkbox-single-event' },
    ]
  },
  {
    title: '异步', href: '#checkbox-async',
    children: [
      { title: '属性触发', href: '#checkbox-async-by-attribute' },
      { title: '点击触发', href: '#checkbox-async-by-click' },
    ]
  },
  { title: '全选', href: '#checkbox-all' },
  {
    title: '大小', href: '#checkbox-size',
    children: [
      { title: '单个', href: '#checkbox-size-single' },
      { title: '自伸缩', href: '#checkbox-size-scale' },
      { title: '组', href: '#checkbox-size-group' },
      { title: '全选', href: '#checkbox-size-all' },
    ]
  },
  { title: 'checkbox属性', href: '#checkbox-attrs' },
  { title: 'checkbox model', href: '#checkbox-models' },
  { title: 'checkbox插槽', href: '#checkbox-slots' },
  { title: 'checkbox事件', href: '#checkbox-events' },
  { title: 'checkbox-group属性', href: '#checkbox-group-attrs' },
  { title: 'checkbox-group model', href: '#checkbox-group-models' },
  { title: 'checkbox-group插槽', href: '#checkbox-group-slots' },
  { title: 'checkbox-group事件', href: '#checkbox-group-events' },
  { title: 'checkbox-all属性', href: '#checkbox-all-attrs' },
  { title: 'checkbox-all model', href: '#checkbox-all-models' },
  { title: 'checkbox-all插槽', href: '#checkbox-all-slots' },
  { title: 'checkbox-all事件', href: '#checkbox-all-events' },

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
const data = [
  { name: 'tag', type: 'String,Object', default: 'label', value: '', desc: '' },
  { name: 'type', type: 'String', default: 'primary', value: 'primary、success、warning、error', desc: '' },
  { name: 'label', type: 'String,Number', default: '', value: '', desc: '' },
  { name: 'value', type: 'String,Number,Boolean', default: '', value: '', desc: '' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'indeterminate', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
  { name: 'scale', type: 'String,Number', default: '1', value: '', desc: '' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(stylesV, null, 2), desc: '' }
]
const modelData = [
  { name: '', type: 'String, Number, Boolean, Array', default: '', value: '', desc: '' },
]

const slotData = [
  { name: '', param: '', desc: '' },
]
const eventData = [
  { name: 'change', params: '(checked, e)', desc: '选中切换' }
]


const groupData = [
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
]
const groupModel = [
  { name: '', type: 'Array', default: '[]', value: '', desc: '' },
]
const groupSlotData = [
  { name: 'default', param: '', desc: '' },
]
const groupEventData = [
  { name: 'change', params: '(value)', desc: '组值改变' }
]

const allData = [
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
]
const allModel = [
  { name: '', type: 'Array', default: '[]', value: '', desc: '' },
]
const allSlotData = [
  { name: 'default', param: '', desc: '' },
]
const allEventData = [
  { name: 'change', params: '(value)', desc: '组值改变' }
]

</script>
