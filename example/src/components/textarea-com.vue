<template>
  <ComponentLayout :anchors="anchors">
    <h2>文本框</h2>
    <h3 id="fl-textarea-basic">基础</h3>
    <fl-textarea rows="10" maxlength="400" count clear>
      <template #prefix>
        <fl-icon>
          <FlEye />
        </fl-icon>
        <fl-button text type="primary">查看</fl-button>
      </template>
      <template #suffixLeft>
        <fl-button text type="primary">查看</fl-button>
      </template>
      <template #suffixRight>
        <fl-button type="primary">发送</fl-button>
      </template>
    </fl-textarea>
    <h3 id="fl-textarea-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-textarea-models">model</h3>
    <fl-table :data="modelData" :columns="columns"></fl-table>
    <h3 id="fl-textarea-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, slotColumns } from '@/assets/com-props';

const anchors = [
  { title: '基础', href: '#fl-textarea-basic' },
  { title: '属性', href: '#fl-textarea-attrs' },
  { title: 'model', href: '#fl-textarea-models' },
  { title: '插槽', href: '#fl-textarea-slots' }
]


const data = [
  { name: 'inputType', type: 'String', default: 'primary', value: 'primary、success、warning、error', desc: '' },
  { name: 'placeholder', type: 'String', default: '请输入', value: '', desc: '' },
  { name: 'disabled', type: 'Boolean', default: 'false', value: 'true、false', desc: '' },
  { name: 'maxlength', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'size', type: 'String', default: '', value: 'small、large', desc: '' },
  { name: 'clear', type: 'Boolean', default: 'false', value: '', desc: '' },
  { name: 'count', type: 'Boolean', default: 'false', value: '', desc: '' },
  { name: 'width', type: 'String, Number', default: '', value: '', desc: '' },
  { name: 'rows', type: 'String, Number', default: '4', value: '', desc: '' },
]

const modelData = [
  { name: '', type: 'String', default: '', value: '', desc: '' },
]

const slotData = [
  { name: 'prefix', param: '', desc: '上面添加' },
  { name: 'suffixLeft', param: '', desc: '下面左边（相对于清空，计数图标）' },
  { name: 'suffixRight', param: '', desc: '下面右边（相对于清空，计数图标）' },
]
</script>
