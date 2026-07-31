<template>
  <ComponentLayout :anchors="anchors">
    <h2>切换按钮</h2>
    <div>
      <h3 id="fl-switch-basic">基础</h3>
      <fl-switch></fl-switch>
      <fl-switch type="success"></fl-switch>
      <fl-switch type="warning"></fl-switch>
      <fl-switch type="error"></fl-switch>
      <span>自定义</span>
      <fl-switch :styles="styles"></fl-switch>
    </div>
    <div>
      <h3 id="fl-switch-disabled">禁用</h3>
      <fl-switch disabled></fl-switch>
      <fl-switch disabled type="success"></fl-switch>
      <fl-switch disabled type="warning"></fl-switch>
      <fl-switch disabled type="error"></fl-switch>
      <span>自定义</span>
      <fl-switch disabled :styles="styles"></fl-switch>
    </div>
    <div>
      <h3 id="fl-switch-icon">图标</h3>
      <fl-switch checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch type="success" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch type="warning" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <span>自定义</span>
      <fl-switch checkedIcon="fl-eye" uncheckedIcon="fl-eye-close" :styles="styles"></fl-switch>
    </div>
    <div>
      <h3 id="fl-switch-async">异步</h3>
      <h4 id="fl-switch-async-attr">属性控制</h4>
      <fl-switch loading checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch loading type="success"></fl-switch>
      <fl-switch loading type="warning" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <span>自定义</span>
      <fl-switch loading checkedIcon="fl-eye" uncheckedIcon="fl-eye-close" :styles="styles"></fl-switch>
      <h4 id="fl-switch-async-click">点击设置</h4>
      <fl-switch :beforeChange="beforeChange1" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch :beforeChange="beforeChange2" type="success"></fl-switch>
      <fl-switch :beforeChange="beforeChange3" type="warning" checkedIcon="fl-eye"
        uncheckedIcon="fl-eye-close"></fl-switch>
      <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
      <span>自定义</span>
      <fl-switch :styles="styles" :beforeChange="beforeChange1"></fl-switch>
      <fl-switch :styles="styles" :beforeChange="beforeChange1" checkedIcon="fl-eye"
        uncheckedIcon="fl-eye-close"></fl-switch>
    </div>
    <div>
      <h3 id="fl-switch-change">change事件</h3>
      <fl-switch @change="changeEvent1" type="success"></fl-switch>
    </div>
    <div>
      <h3 id="fl-switch-size">大小</h3>
      <h4 id="fl-switch-small">小</h4>
      <fl-switch size="small"></fl-switch>
      <h4 id="fl-switch-default">默认</h4>
      <fl-switch type="success"></fl-switch>
      <h4 id="fl-switch-large">大</h4>
      <fl-switch size="large" type="warning"></fl-switch>
      <h4 id="fl-switch-scale">自伸缩</h4>
      <span>0.8倍</span>
      <fl-switch scale="0.8"></fl-switch>
      <span>1倍</span>
      <fl-switch></fl-switch>
      <span>2倍</span>
      <fl-switch scale="2"></fl-switch>
    </div>
    <h3 id="fl-switch-attrs">属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>

    <h3 id="fl-switch-models">model</h3>
    <fl-table :data="modelData" :columns="columns">
    </fl-table>

    <h3 id="fl-switch-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns">
    </fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, eventColumns } from '@/assets/com-props'
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
const changeEvent1 = (checked, e) => {
  console.log(checked, e)
}

const styles = {
  root: {
    bg_color: 'yellow',
    color: 'red',
    circle_bg_color: 'blue',
    icon_color: '#fff'
  },
  disabled: {
    bg_color: 'red',
    color: 'yellow',
  },
  loading: {
    bg_color: 'green',
    color: 'blue',
  },
  active: {
    bg_color: 'beige',
    color: 'skyblue',
  },
  hover: {
    circle_bg_color: '#000'
  }
}

const anchors = [
  { title: '基础', href: '#fl-switch-basic' },
  { title: '禁用', href: '#fl-switch-disabled' },
  { title: '图标', href: '#fl-switch-icon' },
  {
    title: '异步', href: '#fl-switch-async',
    children: [
      { title: '属性控制', href: '#fl-switch-async-attr' },
      { title: '点击设置', href: '#fl-switch-async-click' },
    ]
  },
  {
    title: 'change事件', href: '#fl-switch-change',
  },
  {
    title: '大小', href: '#fl-switch-size',
    children: [
      { title: '小', href: '#fl-switch-small' },
      { title: '默认', href: '#fl-switch-default' },
      { title: '大', href: '#fl-switch-large' },
      { title: '自伸缩', href: '#fl-switch-scale' },
    ]
  },
  { title: '属性', href: '#fl-switch-attrs' },
  { title: 'model', href: '#fl-switch-models' },
  { title: '事件', href: '#fl-switch-events' },
]


const styleV = {
  root: {
    bg_color: '',
    color: '',
    circle_bg_color: '',
    icon_color: '',
  },
  disabled: {
    bg_color: '',
    color: '',
  },
  loading: {
    bg_color: '',
    color: '',
  },
  active: {
    bg_color: '',
    color: '',
  },
  hover: {
    circle_bg_color: '',
  }
}
const data = [
  {
    name: 'type', type: 'String', default: 'primary', value:
      'primary、success、warning、error', desc: ''
  },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'checkedIcon', type: 'String,Object', default: '', value: '', desc: '' },
  { name: 'uncheckedIcon', type: 'String,Object', default: '', value: '', desc: '' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'beforeChange', type: 'Function', default: '', value: '', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
  { name: 'scale', type: 'String,Number', default: '1', value: '', desc: '' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(styleV, null, 2), desc: '' },
]

const modelData = [
  { name: '', type: 'Boolean', default: 'false', value: '', desc: '' },
]


const eventData = [
  { name: 'change', params: '(checked, e)', desc: '' }
]
</script>
