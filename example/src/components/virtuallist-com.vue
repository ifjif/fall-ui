<template>
  <ComponentLayout :anchors="anchors">
    <h2>virtual-list 虚拟列表</h2>

    <h3 id="fl-virtual-list-stick-bottom">滚动底部吸附(10s后容器变高，存在底部吸附,自动进行)</h3>
    <div :style="{ height: `${height1}px` }" style="background-color: beige;">
      <FlVirtualList @visibleRangeChange="visibleRangeChangeHandler" :estimatedHeight="80" :buffer="8"
        v-show="testMessages3.length > 0" ref="testRef3" @resize="testResize" :items="testMessages3">
        <template #default="{ item }">
          <div style="display:flex;flex-direction: column;box-sizing: border-box;">
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
            <h3 v-if="item.type === 1">文本</h3>
            <h3 style="background-color: blue;" :style="{ width: `${item.width}px`, height: `${item.height}px` }"
              v-else-if="item.type === 2">图片</h3>
            <p style="width:30px;height:30px;border-radius: 50%;background-color: red;">{{ item.avatar }}</p>
            <p style="">{{ item.name }}</p>
          </div>
        </template>
      </FlVirtualList>
    </div>
    <fl-button @click="append">追加一条</fl-button>


    <h3 id="fl-virtual-list-pull-up">消息,向上拉</h3>
    <div style="height:400px;background-color: yellow;">
      <FlVirtualList @visibleRangeChange="visibleRangeChangeHandler" :estimatedHeight="80" :buffer="5"
        @scroll="testScroll" v-show="testMessages.length > 0" ref="testRef" @resize="testResize" @top="testTop"
        :items="testMessages">
        <template #default="{ item }">
          <div style="display:flex;flex-direction: column;box-sizing: border-box;">
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
            <h3 v-if="item.type === 1">文本</h3>
            <h3 style="background-color: blue;" :style="{ width: `${item.width}px`, height: `${item.height}px` }"
              v-else-if="item.type === 2">图片</h3>
            <p style="width:30px;height:30px;border-radius: 50%;background-color: red;">{{ item.avatar }}</p>
            <p style="">{{ item.name }}</p>
          </div>
        </template>
      </FlVirtualList>
    </div>

    <h3 id="fl-virtual-list-pull-down">消息,向下拉</h3>
    <div style="height:400px;background-color: green;">
      <FlVirtualList @visibleRangeChange="visibleRangeChangeHandler" :estimatedHeight="80" :buffer="5"
        @scroll="testScroll" v-show="testMessages2.length > 0" ref="testRef2" @resize="testResize" @bottom="testbottom"
        :items="testMessages2">
        <template #default="{ item }">
          <div style="display:flex;flex-direction: column;box-sizing: border-box;">
            <p>{{ item.content }}</p>
            <p>{{ item.time }}</p>
            <h3 v-if="item.type === 1">文本</h3>
            <h3 style="background-color: blue;" :style="{ width: `${item.width}px`, height: `${item.height}px` }"
              v-else-if="item.type === 2">图片</h3>
            <p style="width:30px;height:30px;border-radius: 50%;background-color: red;">{{ item.avatar }}</p>
            <p style="">{{ item.name }}</p>
          </div>
        </template>
      </FlVirtualList>
    </div>


    <h3 id="fl-virtual-list-attrs">属性</h3>
    <fl-table height="300" :data="data" :columns="columns"></fl-table>

    <h3 id="fl-virtual-list-slots">插槽</h3>
    <fl-table height="200" :data="slotData" :columns="slotColumns"></fl-table>

    <h3 id="fl-virtual-list-event">事件</h3>
    <fl-table height="500" :data="eventData" :columns="eventColumns"></fl-table>
    <h3 id="fl-virtual-list-expose">暴露</h3>
    <fl-table height="500" :columns="exposeColumns" :data="exposeData"></fl-table>
  </ComponentLayout>
</template>
<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { columns, exposeColumns, slotColumns, eventColumns } from '@/assets/com-props';
import ComponentLayout from '@/layout/component-layout.vue';
import { FlVirtualList } from 'fall-ui';

/*
 * {
 * time
 * avatar
 * name
 * content {
 *  type:       // 1.文本 2.图片
 * }
 * }
 *
 *
 */
const height1 = ref(400)
const testMessages = ref([])
const testMessages2 = ref([])
const testMessages3 = ref([])
const generateMessage = (count, step) => {
  const content = Array.from({ length: count }, (_, i) => ({
    id: i + 1 + step,
    time: new Date(),
    avatar: 'avatar'.repeat(Math.floor(Math.random() * 5)),
    name: `name`.repeat(Math.floor(Math.random() * 10)),
    type: Math.floor(Math.random() * 2) + 1,
    width: Math.floor(Math.random() * 300) + 10,
    height: Math.floor(Math.random() * 300) + 10,
    content: `消息 ${i + 1 + step}：${'hello'.repeat(Math.floor(Math.random() * 20))}`,
  }))

  return content
}
const testRef = ref(null)
const testRef2 = ref(null)
const testRef3 = ref(null)
const testScroll = ({ top }) => {
}
const visibleRangeChangeHandler = (begin, finish) => {
  console.log(begin, finish)
}
const testResize = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
}
const testTop = async () => {
  // 加载前保存锚点
  const anchor = testRef.value.getAnchor()
  //console.log('anchor', anchor)
  pullMessage()
  await nextTick()
  testRef.value.restoreAnchor(anchor)
}
const testbottom = async () => {
  // 加载前保存锚点
  const anchor = testRef2.value.getAnchor()
  //console.log('anchor', anchor)
  pullMessage2()
  await nextTick()
  await testRef2.value.restoreAnchor(anchor)
}

const pullMessage = () => {
  const content = generateMessage(40, testMessages.value.length).reverse()
  testMessages.value = [...content, ...testMessages.value]
}
const pullMessage2 = () => {
  const content = generateMessage(40, testMessages2.value.length)
  testMessages2.value = [...testMessages2.value, ...content]
}
const pullMessage3 = () => {
  const content = generateMessage(40, testMessages3.value.length)
  testMessages3.value = [...content, ...testMessages3.value]
  nextTick(() => {
    testRef3.value.scrollToBottom()
  })
}

const append = () => {
  const content = generateMessage(1, testMessages3.value.length)
  testMessages3.value.push(...content)
  testMessages3.value = testMessages3.value.slice(0, testMessages3.value.length)
}

setTimeout(() => {
  pullMessage()
  pullMessage2()
  pullMessage3()
}, 2000)


const anchors = [
  { title: '滚动底部吸附', href: '#fl-virtual-list-stick-bottom' },
  { title: '消息，向上拉', href: '#fl-virtual-list-pull-up' },
  { title: '消息，向下拉', href: '#fl-virtual-list-pull-down' },
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
  { name: 'getAnchor', type: '函数:()', desc: '获取一条完全可见项, 没有时取渲染中第一条' },
  { name: 'restoreAnchor', type: '函数:(anchor)=>Promise', desc: '恢复锚点到指定位置' },
]

onMounted(() => {
  setTimeout(() => {
    console.log('更新高度')
    height1.value = 600
  }, 10000)
})
</script>
