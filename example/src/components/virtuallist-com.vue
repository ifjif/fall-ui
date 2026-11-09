<template>
  <ComponentLayout :anchors="anchors">
    <h2>virtual-list 虚拟列表</h2>
    <h3 id="fl-virtual-list-basic">动态高度 10000个内容</h3>
    <div style="height:420px;border:1px solid #eee">
      <FlVirtualList ref="virtualListRef" @scroll="scrollEvent" @resize="resizeEvent" @top="topEvent"
        @bottom="bottomEvent" @right="rightEvent" @left="leftEvent" :items="messages" :estimated-height="60"
        :buffer="5">
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
    <fl-table height="500" :data="data" :columns="columns"></fl-table>

    <h3 id="fl-virtual-list-slots">插槽</h3>
    <fl-table height="200" :data="slotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-virtual-list-event">事件</h3>
    <fl-table height="500" :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-virtual-list-expose">暴露</h3>
    <fl-table height="500" :columns="exposeColumns" :data="exposeData"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { columns, exposeColumns, slotColumns, eventColumns } from '@/assets/com-props';
import ComponentLayout from '@/layout/component-layout.vue';
import { FlVirtualList } from 'fall-ui';
const messages = ref(Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  text: `消息 ${i + 1}：${'hello'.repeat(Math.floor(Math.random() * 20))}`,
})))

const virtualListRef = ref(null)
const scrollEvent = ({ top, left }) => {
  console.log('滚动事件', top, left)
}
const resizeEvent = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
  console.log('resize事件', clientWidth, clientHeight, scrollWidth, scrollHeight)
}
const topEvent = () => {
  console.log('top 事件')
}
const bottomEvent = () => {
  console.log('bottom 事件')
}
const leftEvent = () => {
  console.log('left 事件')
}
const rightEvent = () => {
  console.log('right 事件')
}

setTimeout(() => {
  virtualListRef.value.scrollToBottom()
}, 2000)
setTimeout(() => {
  virtualListRef.value.scrollToTop()
}, 4000)
setTimeout(() => {
  virtualListRef.value.scrollToRight()
}, 6000)
setTimeout(() => {
  virtualListRef.value.scrollToLeft()
}, 8000)
setTimeout(() => {
  virtualListRef.value.scrollLeft(100)
}, 10000)
setTimeout(() => {
  virtualListRef.value.scrollTop(500)
}, 12000)
setTimeout(() => {
  virtualListRef.value.scrollLeft(0)
}, 14000)

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
  {
    name: 'resize', params: '({clientWidth, clientHeight,scrollWidth,scrollHeight})', desc:
      '容器大小改变事件(包括滚动内容的改变)'
  },
  { name: 'top', params: '()', desc: '滚动到顶部' },
  { name: 'bottom', params: '()', desc: '滚动到底部' },
  { name: 'left', params: '()', desc: '滚动到左边' },
  { name: 'right', params: '()', desc: '滚动右边' },
  { name: 'visibleRangeChange', params: '( begin, end )', desc: '选中的范围索引(双闭)' }
]


const exposeData = [
  { name: 'markDirty', type: '函数:(id)', desc: '强制删除缓存高度' },
  { name: 'scrollToTop', type: '函数:()', desc: '滚动到顶部' },
  { name: 'scrollTop', type: '函数:(newTop)', desc: '垂直滚动到指定位置' },
  { name: 'scrollToBottom', type: '函数:()', desc: '滚动到底部' },
  { name: 'scrollToLeft', type: '函数:()', desc: '滚动到最左边' },
  { name: 'scrollLeft', type: '函数:(newLeft)', desc: '水平滚动到指定位置' },
  { name: 'scrollToRight', type: '函数:()', desc: '滚动到最右边' },
  { name: 'getScrollContainer', type: '函数:()', desc: '获取内部滚动容器' },
]

onMounted(() => {
  console.log(virtualListRef.value.getScrollContainer())
})
</script>
