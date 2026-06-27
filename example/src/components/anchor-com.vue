<template>
  <div style="height:100%;" class="page-layout">
    <!-- 内容区域 -->
    <div style="height:100%;" class="content">
      <fl-scrollbar ref="scrollbar" :x="false">
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
      </fl-scrollbar>
    </div>

    <!-- 侧边栏 -->
    <div class="sidebar">
      <fl-anchor @click="handleClick" @change="handleChange" :data="anchors" :container="scrollContainer" />
    </div>
  </div>

</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue';

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
]);

const handleChange = (item) => {
  console.log(item)
}

const handleClick = (item) => {
  console.log(item)
}

onMounted(() => {
  nextTick(() => {
    scrollContainer.value = scrollbar.value.getScrollContainer()
  })
})

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
