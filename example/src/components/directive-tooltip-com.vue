<template>
  <ComponentLayout :anchors="anchors">
    <h2>directive-tooltip</h2>
    <h3 id="fl-directive-tooltip-basic">基础</h3>
    <div style="margin-left:300px">
      <button v-fl-tooltip="aa">
        展示浮层
      </button>
    </div>

    <div style="margin-left:200px">
      <button v-fl-tooltip="{ placement: 'top', content: 'top' }">
        top
      </button>
      <button v-fl-tooltip="{ placement: 'top-start', content: 'top-start' }">
        top-start
      </button>
      <button v-fl-tooltip="{ placement: 'top-end', content: 'top-end' }">
        top-end
      </button>
      <button style="width:200px" v-fl-tooltip="{ placement: 'top-start', content: 'top-start' }">
        top-start
      </button>
      <button style="width:200px" v-fl-tooltip="{ placement: 'top-end', content: 'top-end' }">
        top-end
      </button>
    </div>
    <div style="margin-left:200px">
      <button v-fl-tooltip="{ placement: 'bottom', content: 'bottom' }">
        bottom
      </button>
      <button v-fl-tooltip="{ placement: 'bottom-start', content: 'bottom-start' }">
        bottom-start
      </button>
      <button v-fl-tooltip="{ placement: 'bottom-end', content: 'bottom-end' }">
        bottom-end
      </button>
      <button style="width:200px" v-fl-tooltip="{ placement: 'bottom-start', content: 'bottom-start' }">
        bottom-start
      </button>
      <button style="width:400px" v-fl-tooltip="{
        placement: 'bottom-end', content: 'bottom-end'
      }">
        bottom-end
      </button>
    </div>
    <div style="margin-left:200px">
      <button style="height:50px" v-fl-tooltip="{ placement: 'left', content: 'left' }">
        left
      </button>
      <button style="height:50px" v-fl-tooltip="{ placement: 'left-start', content: 'left-start' }">
        left-start
      </button>
      <button style="height:50px" v-fl-tooltip="{ placement: 'left-end', content: 'left-end' }">
        left-end
      </button>
      <button style="height:200px" v-fl-tooltip="{ placement: 'left-start', content: 'left-start' }">
        left-start
      </button>
      <button style="height:200px" v-fl-tooltip="{ placement: 'left-end', content: 'left-end' }">
        left-end
      </button>
    </div>
    <div style="margin-left:200px">
      <button style="height:50px" v-fl-tooltip="{ placement: 'right', content: 'right' }">
        right
      </button>
      <button style="height:50px" v-fl-tooltip="{ placement: 'right-start', content: 'right-start' }">
        right-start
      </button>
      <button style="height:50px" v-fl-tooltip="{ placement: 'right-end', content: 'right-end' }">
        right-end
      </button>
      <button style="height:200px" v-fl-tooltip="{ placement: 'right-start', content: 'right-start' }">
        right-start
      </button>
      <button style="height:200px" v-fl-tooltip="{ placement: 'right-end', content: 'right-end' }">
        right-end
      </button>
    </div>

    <h3 id="fl-directive-tooltip-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-directive-tooltip-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, slotColumns } from '@/assets/com-props'
import { reactive } from 'vue'
const aa = reactive({
  title: '这是title', placement: 'top-start', trigger: 'click', content: '这是内容'
})

setTimeout(() => {
  //aa.value = { ...aa.value, placement: 'top' }
  aa.placement = 'top'
}, 2000)

setTimeout(() => {
  //aa.value = { ...aa.value, trigger: 'hover' }
  aa.trigger = 'hover'
}, 4000)

setTimeout(() => {
  //aa.value = { ...aa.value, trigger: 'click' }
  aa.trigger = 'click'
}, 6000)

const anchors = [
  { title: '基础', href: '#fl-directive-tooltip-basic' },
  { title: '属性', href: '#fl-directive-tooltip-attrs' },
  { title: '插槽', href: '#fl-directive-tooltip-slots' },
]


const data = [
  { name: 'title', type: 'String', default: '', value: '', desc: '' },
  { name: 'content', type: 'String', default: '', value: '', desc: '' },
  {
    name: 'placement', type: 'String', default: 'top', value: 'top, top-start, top-end,\
        bottom, bottom-start, bottom-end,\
        left, left-start, left-end,\
        right, right-start, right-end', desc: ''
  },
  { name: 'showArrow', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'trigger', type: 'String', default: 'hover', value: 'hover, click', desc: '' },
  { name: 'padding', type: 'Number', default: '12', value: '', desc: '' },
  { name: 'toBody', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'footer', type: 'Boolean', default: 'false', value: 'true, false', desc: '' },
  { name: 'onCancel', type: 'Function', default: '', value: '', desc: '' },
  { name: 'onConfirm', type: 'Function', default: '', value: '', desc: '' },
]


const slotData = [
  { name: 'title', param: '', desc: '' },
  { name: 'default', param: '', desc: '' },
]
</script>
