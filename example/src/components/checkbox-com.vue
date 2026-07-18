<template>
  <fl-container style="height: 100%;width:100%;">
    <fl-main>
      <fl-scrollbar ref="scrollbar" @resize="handleResize" :x="false">
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

        <h3 id="checkbox-description">属性说明</h3>
        <div :style="{ width: `${tableWidth}px` }">
          <fl-table :data="data" :columns="columns"></fl-table>
        </div>
      </fl-scrollbar>
    </fl-main>
    <fl-aside style="width:200px;">
      <fl-anchor :container="scrollbarContainer" :data="anchors"></fl-anchor>
    </fl-aside>
  </fl-container>
</template>
<script setup>
import { computed, ref } from 'vue'
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
  { title: '属性说明', href: '#checkbox-description' }

]

const scrollbar = ref(null)
const scrollbarContainer = computed(() => {
  if (!scrollbar.value) {
    return null
  }
  return scrollbar.value.getScrollContainer()
})

const tableWidth = ref(0)
const handleResize = ({ clientWidth }) => {
  tableWidth.value = clientWidth
}

const columns = [
  {
    prop: 'name',
    label: '属性名',
    width: '100px'
  },
  {
    prop: 'type',
    label: '类型',
    width: '100px'
  },
  {
    prop: 'default',
    label: '默认值',
    width: '100px'
  },
  {
    prop: 'value',
    label: '可选值',
    width: '100px'
  },
]

const data = [
  { name: 'tag', type: 'String,Object', default: 'label', value: '' },
  { name: 'type', type: 'String', default: 'primary', value: 'primary、success、warning、error' },
  { name: 'label', type: 'String,Number', default: '', value: '' },
  { name: 'value', type: 'String,Number,Boolean', default: '', value: '' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'indeterminate', type: 'Boolean', default: 'false', value: 'true、false' },
  { name: 'beforeChange', type: 'Function', default: '', value: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large' },
  { name: 'scale', type: 'String,Number', default: '1', value: '' },
  {
    name: 'styles', type: 'Object', default: '', value: `
{
   root:{
     bg_color:
     bd_color:
     color:
   },
   disabled:{
     bg_color:
     bd_color:
     color:
     icon_color:
   },
   hover:{
     bg_color:
     bd_color:
     color:
   },
   selected:{
     bg_color:
     bd_color:
     color:
     icon_color:
   },
   loading:{
     bg_color:
     bd_color:
     color:
   }
  }`
  }
]

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
</script>
