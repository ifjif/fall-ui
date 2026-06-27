<template>
  <div class="app-container">
    <h2>📅 Timeline 组件</h2>

    <!-- 基础用法 -->
    <div class="demo-block">
      <h3>1. 基础垂直用法 (带自定义插槽)</h3>
      <fl-timeline :items="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot="{ item, index }">
          <fl-icon color="#fff">
            <component :is="FlCheck"></component>
          </fl-icon>
        </template>

        <!-- 自定义内容 -->
        <template #content="{ item }">
          <div class="custom-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <span class="tag">{{ item.status }}</span>
          </div>
        </template>
      </fl-timeline>
    </div>

    <!-- 基础用法 -->
    <div class="demo-block">
      <h3>1. alternate用法 (带自定义插槽)</h3>
      <fl-timeline :hollow="true" direction="alternate" :items="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot="{ item, index }">
          <component :is="item.icon" />
        </template>

        <!-- 自定义内容 -->
        <template #content="{ item }">
          <div class="custom-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <span class="tag">{{ item.status }}</span>
          </div>
        </template>
      </fl-timeline>
    </div>
    <div class="demo-block">
      <h3>1. alternate-reverse用法 (带自定义插槽)</h3>
      <fl-timeline direction="alternate-reverse" :items="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot="{ item, index }">
          <component :is="item.icon" />
        </template>

        <!-- 自定义内容 -->
        <template #content="{ item }">
          <div class="custom-card">
            <h4>{{ item.title }}</h4>
            <p>{{ item.description }}</p>
            <span class="tag">{{ item.status }}</span>
          </div>
        </template>
      </fl-timeline>
    </div>


    <!-- 横向用法 -->
    <div class="demo-block">
      <h3>2. 横向布局 (Horizontal)</h3>
      <fl-scrollbar>
        <fl-timeline direction="horizontal" :items="activities" color="#409eff">
          <template #content="{ item }">
            <div class="simple-content">
              <strong>{{ item.title }}</strong>
              <small>{{ item.description }}</small>
              <span class="tag">{{ item.status }}</span>
            </div>
          </template>
        </fl-timeline>
      </fl-scrollbar>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FlCheck } from '@fall-ui/icons';

const activities = ref([
  {
    title: '项目启动',
    description: '完成项目立项书',
    timestamp: '2023-10-01',
    color: '#0bbd87',
    icon: '图标1',
    status: '已完成'
  },
  {
    title: '需求分析',
    description: '确定核心功能点',
    timestamp: '2023-10-05',
    color: '#409eff',
    icon: '图标2',
    status: '进行中'
  },
  {
    title: '开发阶段',
    description: '前端与后端联调',
    timestamp: '2023-10-15',
    color: '#f56c6c',
    icon: '图标3',
    status: '待开始'
  },
  {
    title: '测试验收',
    description: '全链路测试',
    timestamp: '2023-10-25',
    color: '#909399',
    status: '待开始'
  }
]);
</script>

<style>
.app-container {
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
}

.demo-block {
  margin-bottom: 50px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
}

.custom-card {
  padding: 10px;
  border-left: 3px solid #0bbd87;
  background: #fff;
}

.tag {
  font-size: 12px;
  padding: 2px 6px;
  background: #f0f0f0;
  border-radius: 4px;
}

.simple-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>
