<template>
  <ComponentLayout :anchors="anchors">
    <h2>virtual-list 虚拟列表</h2>
    <h3 id="fl-virtual-list-basic">动态高度 10000个内容</h3>
    <div style="height:420px;border:1px solid #eee">
      <FlVirtualList :items="messages" :estimated-height="60" :buffer="5">
        <template #default="{ item }">
          <div :key="item.id" style="box-sizing: border-box;padding: 12px;border-bottom: 1px solid #f0f0f0;">
            {{ item.text }}
            <template v-if="item.id % 2 === 0">
              <p>{{ item.text }}</p>
            </template>
          </div>
        </template>
      </FlVirtualList>
    </div>

    <h3 id="fl-virtual-list-attrs">属性</h3>
    <fl-table :data="data" :columns="columns" style="height:500px;"></fl-table>

    <h3 id="fl-virtual-list-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns" style="height:200px;"></fl-table>

    <h3 id="fl-virtual-list-event">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns" style="height:200px;"></fl-table>
    <h3 id="fl-virtual-list-expose">暴露</h3>
    <fl-table :columns="exposeColumns" :data="exposeData" style="height:200px;"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import { ref } from 'vue'
import { columns, exposeColumns, slotColumns, eventColumns } from '@/assets/com-props';
import ComponentLayout from '@/layout/component-layout.vue';
import { FlVirtualList } from 'fall-ui';
const messages = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `消息 ${i + 1}：${'hello'.repeat(Math.floor(Math.random() * 20))}`,
})))

const anchors = [
  { title: '动态高度 10000个内容', href: '#fl-virtual-list-basic' },
  { title: '属性', href: '#fl-virtual-list-attrs' },
  { title: '插槽', href: '#fl-virtual-list-slots' },
  { title: '事件', href: '#fl-virtual-list-event' },
  { title: '暴露', href: '#fl-virtual-list-expose' },
]

const data = [
  { name: 'items', type: 'Array', default: '[]', value: '', desc: '渲染内容,确保含id' },
  { name: 'estimatedHeight', type: 'Number', default: '80', value: '', desc: '初始预估高度' },
  { name: 'buffer', type: 'Number', default: '5', value: '', desc: '缓冲数量' },
]

const slotData = [
  { name: '', param: '{item}', desc: '单个内容' },
]

const eventData = [
  { name: 'scroll', params: '({top, left})', desc: '滚动事件' },
  { name: 'visibleRangeChange', params: '( begin, end )', desc: '选中的范围索引(双闭)' }
]


const exposeData = [
  { name: 'markDirty', type: '函数:(id)', desc: '强制删除缓存高度' },
]
</script>
