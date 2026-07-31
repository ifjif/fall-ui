<template>
  <ComponentLayout :anchors="anchors">
    <h2>tree</h2>
    <h3 id="fl-tree-basic">基础</h3>
    <div>
      <fl-tree :default-checked-keys="dekeys" @check-change="onCheckChange" :data="treeDataR"></fl-tree>
    </div>
    <h3 id="fl-tree-node-checkbox">不带选择框</h3>
    <div>
      <fl-tree ref="treeRef" :data="treeDataR" :showCheckbox="false"></fl-tree>
    </div>
    <h3 id="fl-tree-label-slot">label插槽</h3>
    <fl-tree :data="treeDataR" :showCheckbox="true">
      <template #label="{ item }">
        <span>这是label slot:</span>
        <span>{{ item.label }}</span>
        <button>这是button</button>
      </template>
    </fl-tree>
    <h3 id="fl-tree-attrs">属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-tree-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-tree-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-tree-expose">暴露</h3>
    <fl-table :data="exposeData" :columns="exposeColumns"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import { treeData } from '@/assets/treeData';
import ComponentLayout from '@/layout/component-layout.vue';
import { reactive, ref } from 'vue';
import { columns, slotColumns, eventColumns, exposeColumns } from '@/assets/com-props';

const treeDataR = reactive(treeData)

const treeRef = ref(null)

const dekeys = ref(['1-1-1'])

const onCheckChange = (result) => {
  const leafs = treeRef.value.getCheckedKeys(true)
}

const anchors = [
  { title: '基础', href: '#fl-tree-basic' },
  { title: '不带选择框', href: '#fl-tree-node-checkbox' },
  { title: 'label插槽', href: '#fl-tree-label-slot' },
  { title: '属性', href: '#fl-tree-attrs' },
  { title: '插槽', href: '#fl-tree-slots' },
  { title: '事件', href: '#fl-tree-events' },
  { title: '暴露', href: '#fl-tree-expose' },
]


const data_ = {
  id: '',
  label: '',
  children: [{ id: '', label: '', children: [] }]
}
const data = [
  { name: 'data', type: 'Array', default: '', value: JSON.stringify(data_, null, 2), desc: '' },
  { name: 'showCheckbox', type: 'Boolean', default: 'true', value: 'false, true', desc: '' },
  { name: 'defaultCheckedKeys', type: 'Array', default: '[]', value: '', desc: '默认选中的ids' },
]

const slotData = [
  { name: 'label', param: 'item', desc: 'label插槽，没有默认data中的label数据，有item为data' },
]

const eventData = [
  { name: 'check-change', params: '(result)', desc: '选中的ids' }
]

const exposeData = [
  {
    name: 'getCheckedKeys', type: '方法', params: '(leafOnly = false)', desc: '\
    false只存在选中的值，如果孩子全部选中，则只有父id;true存在选中的叶id' },
]
</script>
