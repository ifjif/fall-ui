<template>
  <ComponentLayout :anchors="anchors">
    <h2>Popover</h2>
    <h3 id="fl-popover-basic">基础</h3>
    <div style="margin-left:200px">
      <fl-popover title="这是标题top">
        <template #reference>
          <button>top</button>
        </template>
        {{ av }}
      </fl-popover>
      <fl-popover title="这是标题top-start" placement="top-start">
        <template #reference>
          <button>top-start</button>
        </template>
        top-start
      </fl-popover>
      <fl-popover title="这是标题top-end" placement="top-end">
        <template #reference>
          <button>top-end</button>
        </template>
        top-end
      </fl-popover>
    </div>

    <div style="margin-left:250px">
      <fl-popover title="这是标题bottom" placement="bottom">
        <template #reference>
          <button>bottom</button>
        </template>
        bottom
      </fl-popover>
      <fl-popover title="这是标题bottom-start" placement="bottom-start">
        <template #reference>
          <button>bottom-start</button>
        </template>
        bottom-start
      </fl-popover>
      <fl-popover title="这是标题left-end" placement="bottom-end">
        <template #reference>
          <button>bottom-end</button>
        </template>
        bottom-end
      </fl-popover>
    </div>

    <div style="margin-left:300px">
      <fl-popover title="这是标题left" placement="left">
        <template #reference>
          <button>left</button>
        </template>
        left
      </fl-popover>
      <fl-popover title="这是标题left-start" placement="left-start">
        <template #reference>
          <button>left-start</button>
        </template>
        left-start
      </fl-popover>
      <fl-popover title="这是标题left-end" placement="left-end">
        <template #reference>
          <button>left-end</button>
        </template>
        left-end
      </fl-popover>
    </div>

    <div style="margin-left:350px">
      <fl-popover tag="button" title="这是标题right" placement="right">
        <template #reference>
          right
        </template>
        right
      </fl-popover>
      <fl-popover tag="button" title="这是标题right-start" placement="right-start">
        <template #reference>
          right-start
        </template>
        right-start
      </fl-popover>
      <fl-popover tag="button" title="这是标题right-end" placement="right-end">
        <template #reference>
          right-end
        </template>
        right-end
      </fl-popover>
    </div>
    <h3 id="fl-popover-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-popover-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, slotColumns } from '@/assets/com-props'
import { ref } from 'vue'
const av = ref('')

setTimeout(() => {
  av.value = '这是更新后的值fjdslfjslfjslfjsdljfdsf'
}, 4000)

const anchors = [
  { title: '基础', href: '#fl-popover-basic' },
  { title: '属性', href: '#fl-popover-attrs' },
  { title: '插槽', href: '#fl-popover-slots' }
]

const data = [
  { name: 'class', type: 'String', default: '', value: '', desc: '' },
  { name: 'tag', type: 'String', default: 'div', value: '', desc: '' },
  { name: 'title', type: 'String', default: '', value: '', desc: '' },
  { name: 'padding', type: 'Number', default: '12', value: '', desc: '' },
  { name: 'showArrow', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'trigger', type: 'String', default: 'click', value: 'click, hover', desc: '' },
  { name: 'toBody', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  {
    name: 'placement', type: 'String', default: 'top', value: 'top, top-start, top-end,\
        bottom, bottom-start, bottom-end,\
        left, left-start, left-end,\
        right, right-start, right-end', desc: ''
  },
]


const slotData = [
  { name: 'reference', param: '', desc: '要展示浮层的组件' },
  { name: 'default', param: '', desc: '浮层内容' },
]
</script>
