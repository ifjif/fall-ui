<template>
  <fl-scrollbar ref="scrollbar" :x="false">
    <div class="page-layout">
      <!-- 侧边栏 -->
      <div class="sidebar">
        <fl-anchor :anchor-list="anchors" :container="scrollContainer" :offset-top="160" affix />
      </div>

      <!-- 内容区域 -->
      <div class="content">
        <div id="section1" class="section">
          <h2>第一部分：介绍</h2>
          <p>这里是第一部分的内容...</p>
        </div>
        <div id="section2" class="section">
          <h2>第二部分：安装</h2>
          <p>这里是第二部分的内容...</p>
        </div>
        <div id="section3" class="section">
          <h2>第三部分：使用</h2>
          <p>这里是第三部分的内容...</p>
        </div>
      </div>

    </div>

  </fl-scrollbar>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue';

const scrollbar = ref(null)
const scrollContainer = ref(null)

const anchors = ref([
  { title: '介绍', href: '#section1' },
  { title: '安装', href: '#section2' },
  { title: '使用', href: '#section3' },
]);

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
