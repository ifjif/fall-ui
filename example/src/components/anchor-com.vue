<template>
  <ComponentLayout :anchors="anchors">
    <!-- 内容区域 -->
    <div id="section1" class="section">
      <h2>第一部分：介绍</h2>
      <p>这里是第一部分的内容...</p>
    </div>
    <div id="section1-1" class="section">
      <h2>介绍1</h2>
      <p>这里是第一部分的介绍1内容...</p>
    </div>
    <div id="section1-2" class="section">
      <h2>介绍2</h2>
      <p>这里是第一部分的介绍2内容...</p>
    </div>
    <div id="section2" class="section">
      <h2>第二部分：安装</h2>
      <p>这里是第二部分的内容...</p>
    </div>
    <div id="section3" class="section">
      <h2>第三部分：使用</h2>
      <p>这里是第三部分的内容...</p>
    </div>
    <div id="section3-1" class="section">
      <h2>使用1</h2>
      <p>这里是第三部分的使用1内容...</p>
    </div>
    <div id="section3-2" class="section">
      <h2>使用2</h2>
      <p>这里是第三部分的使用2内容...</p>
    </div>

    <h3 id="fl-anchor-attrs">属性</h3>
    <fl-table :data="data" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-anchor-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>
  </ComponentLayout>

</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue';
import { columns, eventColumns } from '@/assets/com-props';
import ComponentLayout from '@/layout/component-layout.vue';

const scrollbar = ref(null)
const scrollContainer = ref(null)

const anchors = ref([
  {
    title: '介绍', href: '#section1',
    children: [
      { title: '介绍1', href: '#section1-1' },
      { title: '介绍2', href: '#section1-2' },
    ]
  },
  { title: '安装', href: '#section2' },
  {
    title: '使用', href: '#section3', children: [
      { title: '使用1', href: '#section3-1' },
      { title: '使用2', href: '#section3-2' },
    ]
  },
  { title: '属性', href: '#fl-anchor-attrs' },
  { title: '事件', href: '#fl-anchor-events' },
]);

const data_ = [{
  title: '', href: "#xxx",
  children: [
    { title: '', href: '#xxx', children: [] }
  ]
}]
const data = [
  { name: 'data', type: 'Array', default: '[]', value: JSON.stringify(data_, null, 2), desc: '' },
  { name: 'container', type: 'String, Object', default: 'window', value: '', desc: '滚动容器，默认为 window，可以传选择器#xxx, 也可以是dom对象' },
  { name: 'offsetTop', type: 'Number', default: '0', value: '', desc: '距离顶部的偏移量，用于固定定位或滚动补偿' },
  { name: 'affix', type: 'Boolean', default: 'false', value: 'true, false', desc: '吸附在顶部' },
]


const eventData = [
  { name: 'click', params: '(item)', desc: 'data中数据' },
  { name: 'change', params: '(item)', desc: '当前活跃的href值' }
]

</script>

<style scoped>
.page-layout {
  display: flex;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
}

.content {
  flex: 1;
}

.section {
  height: 400px;
  /* 仅用于演示高度 */
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
</style>
