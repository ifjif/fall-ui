<template>
  <ComponentLayout :anchors="anchors">
    <h2>布局</h2>
    <div>
      <h3 id="fl-row-col-basic">基本</h3>
      <fl-row>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="8">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
    </div>
    <div>
      <h3 id="fl-row-col-row-col">行列间距</h3>
      <fl-row :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="8">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
    </div>
    <div>
      <h3 id="fl-row-col-offset">偏移量</h3>
      <fl-row :gutter="20" gap="20">
        <fl-col :offset="6" :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="8">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
    </div>
    <div>
      <h3 id="fl-row-col-layout">布局</h3>
      <h4 id="fl-row-col-layout-center">center</h4>
      <fl-row justify="center" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
      <h4 id="fl-row-col-layout-end">end</h4>
      <fl-row justify="end" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
      <h4 id="fl-row-col-layout-start">start</h4>
      <fl-row justify="start" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
      <h4 id="fl-row-col-layout-space-around">space-around</h4>
      <fl-row justify="space-around" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
      <h4 id="fl-row-col-layout-space-between">space-between</h4>
      <fl-row justify="space-between" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
      <h4 id="fl-row-col-layout-space-evenly">space-evenly</h4>
      <fl-row justify="space-evenly" :gutter="20" gap="20">
        <fl-col :span="6">
          <div :class="['gray']"></div>
        </fl-col>
        <fl-col :span="6">
          <div :class="['skyblue']"></div>
        </fl-col>
      </fl-row>
    </div>

    <h3 id="fl-row-col-attrs-row">row属性</h3>
    <fl-table :data="rowData" :columns="columns"></fl-table>
    <h3 id="fl-row-col-attrs-row-slots">row插槽</h3>
    <fl-table :data="rowSlotData" :columns="slotColumns"></fl-table>


    <h3 id="fl-row-col-attrs-col">col属性</h3>
    <fl-table :data="colData" :columns="columns"></fl-table>
    <h3 id="fl-row-col-attrs-col-slots">col插槽</h3>
    <fl-table :data="colSlotData" :columns="slotColumns"></fl-table>

  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, slotColumns } from '@/assets/com-props';

const anchors = [
  { title: '基本', href: '#fl-row-col-basic' },
  { title: '行列间距', href: '#fl-row-col-row-col' },
  { title: '偏移量', href: '#fl-row-col-offset' },
  {
    title: '布局', href: '#fl-row-col-layout',
    children: [
      { title: 'center', href: '#fl-row-col-layout-center' },
      { title: 'end', href: '#fl-row-col-layout-end' },
      { title: 'start', href: '#fl-row-col-layout-start' },
      { title: 'space-around', href: '#fl-row-col-layout-space-around' },
      { title: 'space-between', href: '#fl-row-col-layout-space-between' },
      { title: 'space-evenly', href: '#fl-row-col-layout-space-evenly' },
    ]
  },
  { title: 'row属性', href: '#fl-row-col-attrs-row' },
  { title: 'row插槽', href: '#fl-row-col-attrs-row-slots' },
  { title: 'col属性', href: '#fl-row-col-attrs-col' },
  { title: 'col插槽', href: '#fl-row-col-attrs-col-slots' },
]

const rowData = [
  { name: 'tag', type: 'String, Object', default: 'div', value: '', desc: '' },
  { name: 'gap', type: 'String, Number', default: '0', value: '', desc: '' },
  { name: 'gutter', type: 'Number', default: '0', value: '', desc: '' },
  { name: 'justify', type: 'String', default: '', value: '', desc: '' },
]

const rowSlotData = [
  { name: 'default', param: '', desc: '' },
]

const colData = [
  { name: 'tag', type: 'String, Object', default: 'div', value: '', desc: '' },
  { name: 'span', type: 'Number', default: '', value: '', desc: '' },
  { name: 'offset', type: 'Number', default: '', value: '', desc: '' },
]
const colSlotData = [
  { name: 'default', param: '', desc: '' },
]
</script>


<style scoped>
.gray {
  height: 32px;
  background-color: gray;
}

.skyblue {
  height: 32px;
  background-color: skyblue;
}
</style>
