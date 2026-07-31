<template>
  <ComponentLayout :anchors="anchors">
    <h2>popconfirm</h2>
    <h3 id="fl-popconfirm-basic">基础</h3>
    <div style="margin-left:200px">
      <fl-popconfirm @cancel="topCancel" @confirm="topConfirm">
        <template #reference>
          <button>top</button>
        </template>
        top
      </fl-popconfirm>
      <fl-popconfirm placement="top-start" @cancel="topStartCancel" @confirm="topStartConfirm">
        <template #reference>
          <button>top-start</button>
        </template>
        top-start
      </fl-popconfirm>
      <fl-popconfirm placement="top-end" @cancel="topEndCancel" @confirm="topEndConfirm">
        <template #reference>
          <button>top-end</button>
        </template>
        top-end
      </fl-popconfirm>
    </div>
    <div style="margin-left:250px">
      <fl-popconfirm placement="bottom" @cancel="bottomCancel" @confirm="bottomConfirm">
        <template #reference>
          <button>bottom</button>
        </template>
        bottom
      </fl-popconfirm>
      <fl-popconfirm placement="bottom-start" @cancel="bottomStartCancel" @confirm="bottomStartConfirm">
        <template #reference>
          <button>bottom-start</button>
        </template>
        bottom-start
      </fl-popconfirm>
      <fl-popconfirm placement="bottom-end" @cancel="bottomEndCancel" @confirm="bottomEndConfirm">
        <template #reference>
          <button>bottom-end</button>
        </template>
        bottom-end
      </fl-popconfirm>
    </div>
    <div style="margin-left:0;width:100px;">
      <fl-popconfirm placement="left" @cancel="leftCancel" @confirm="leftConfirm">
        <template #reference>
          <button>left</button>
        </template>
        left
      </fl-popconfirm>
      <fl-popconfirm placement="left-start" @cancel="leftStartCancel" @confirm="leftStartConfirm">
        <template #reference>
          <button>left-start</button>
        </template>
        left-start
      </fl-popconfirm>
      <fl-popconfirm placement="left-end" @cancel="leftEndCancel" @confirm="leftEndConfirm">
        <template #reference>
          <button>left-end</button>
        </template>
        left-end
      </fl-popconfirm>
    </div>
    <div style="margin-left:350px">
      <fl-popconfirm tag="button" placement="right" @cancel="rightCancel" @confirm="rightConfirm">
        <template #reference>
          right
        </template>
        right
      </fl-popconfirm>
      <fl-popconfirm tag="button" placement="right-start" @cancel="rightStartCancel" @confirm="rightStartConfirm">
        <template #reference>
          right-start
        </template>
        right-start
      </fl-popconfirm>
      <fl-popconfirm tag="button" placement="right-end" @cancel="rightEndCancel" @confirm="rightEndConfirm">
        <template #reference>
          right-end
        </template>
        right-end

      </fl-popconfirm>
    </div>

    <h3 id="fl-popconfirm-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-popconfirm-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-popconfirm-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import { columns, slotColumns, eventColumns } from '@/assets/com-props'
import ComponentLayout from '@/layout/component-layout.vue'


const topCancel = () => {
  console.log('top-cancel')
}
const topConfirm = () => {
  console.log('top-confirm')
}
const topStartCancel = () => {
  console.log('top-start-cancel')
}
const topStartConfirm = () => {
  console.log('top-start-confirm')
}
const topEndCancel = () => {
  console.log("top-end-cancel")
}
const topEndConfirm = () => {
  console.log('top-end-confirm')
}

const bottomCancel = () => {
  console.log('bottom-cancel')
}
const bottomConfirm = () => {
  console.log('bottom-confirm')
}
const bottomStartCancel = () => {
  console.log('bottom-start-cancel')
}
const bottomStartConfirm = () => {
  console.log('bottom-start-confirm')
}
const bottomEndCancel = () => {
  console.log('bottom-end-cancel')
}
const bottomEndConfirm = () => {
  console.log('bottom-end-confirm')
}

const leftCancel = () => {
  console.log('left-cancel')
}
const leftConfirm = () => {
  console.log('left-confirm')
}
const leftStartCancel = () => {
  console.log('left-start-cancel')
}
const leftStartConfirm = () => {
  console.log('left-start-confirm')
}
const leftEndCancel = () => {
  console.log('left-end-cancel')
}
const leftEndConfirm = () => {
  console.log('left-end-confirm')
}

const rightCancel = () => {
  console.log('right-cancel')
}
const rightConfirm = () => {
  console.log('right-confirm')
}
const rightStartCancel = () => {
  console.log('right-start-cancel')
}
const rightStartConfirm = () => {
  console.log('right-start-confirm')
}
const rightEndCancel = () => {
  console.log('right-end-cancel')
}
const rightEndConfirm = () => {
  console.log('right-end-confirm')
}

const anchors = [
  { title: '基础', href: '#fl-popconfirm-basic' },
  { title: '属性', href: '#fl-popconfirm-attrs' },
  { title: '插槽', href: '#fl-popconfirm-slots' },
  { title: '事件', href: '#fl-popconfirm-events' },
]

const data = [
  { name: 'class', type: 'String', default: '', value: '', desc: '' },
  { name: 'tag', type: 'String', default: 'div', value: '', desc: '' },
  { name: 'trigger', type: 'String', default: 'click', value: 'click, hover', desc: '' },
  { name: 'padding', type: 'Number', default: '12', value: '', desc: '' },
  { name: 'showArrow', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'toBody', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  {
    name: 'placement', type: 'String', default: 'top', value: 'top, top-start,top-end,\
        bottom, bottom-start, bottom-end,\
        left, left-start, left-end,\
        right, right-start,right-end' , desc: ''
  },
]
const slotData = [
  { name: 'reference', param: '', desc: '要展示浮层的组件' },
  { name: 'default', param: '', desc: '浮层内容' },
]

const eventData = [
  { name: 'cancel', params: '', desc: '取消事件' },
  { name: 'confirm', params: '', desc: '确认事件' }
]
</script>
