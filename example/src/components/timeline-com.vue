<template>
  <ComponentLayout :anchors="anchors">
    <h2>Timeline</h2>
    <!-- 基础用法 -->
    <div class="demo-block">
      <h3 id="fl-timeline-vertical">垂直用法</h3>
      <fl-timeline :data="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot>
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
      <h3 id="fl-timeline-alternate">alternate用法</h3>
      <fl-timeline :hollow="true" direction="alternate" :data="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot="{ item }">
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
      <h3 id="fl-timeline-alternate-reverse">alternate-reverse用法</h3>
      <fl-timeline direction="alternate-reverse" :data="activities">
        <!-- 自定义节点：使用图标 -->
        <template #dot="{ item }">
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
      <h3 id="fl-timeline-horizontal">横向布局</h3>
      <fl-scrollbar>
        <fl-timeline direction="horizontal" :data="activities" color="#409eff">
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
    <h3 id="fl-timeline-attrs">属性</h3>
    <fl-table :data="data" :columns="columns"></fl-table>
    <h3 id="fl-timeline-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
  </ComponentLayout>
</template>

<script setup>
import { ref } from 'vue';
import { FlCheck } from '@fall-ui/icons';
import ComponentLayout from '@/layout/component-layout.vue';
import { columns, slotColumns } from '@/assets/com-props';

const activities = ref([
  {
    title: '项目启动',
    description: '完成项目立项书',
    label: '2023-10-01',
    color: '#0bbd87',
    icon: '图标1',
    status: '已完成'
  },
  {
    title: '需求分析',
    description: '确定核心功能点',
    label: '2023-10-05',
    color: '#409eff',
    icon: '图标2',
    status: '进行中'
  },
  {
    title: '开发阶段',
    description: '前端与后端联调',
    label: '2023-10-15',
    color: '#f56c6c',
    icon: '图标3',
    status: '待开始'
  },
  {
    title: '测试验收',
    description: '全链路测试',
    label: '2023-10-25',
    color: '#909399',
    status: '待开始'
  }
]);

const anchors = [
  { title: '垂直用法', href: '#fl-timeline-vertical' },
  { title: 'alternate用法', href: '#fl-timeline-alternate' },
  { title: 'alternate-reverse用法', href: '#fl-timeline-alternate-reverse' },
  { title: '横向布局', href: '#fl-timeline-horizontal' },
  { title: '属性', href: '#fl-timeline-attrs' },
  { title: '插槽', href: '#fl-timeline-slots' },
]

const data_ = { title: '', description: '', label: '', color: '', icon: '' }

const data = [
  { name: 'data', type: 'Array', default: '[]', value: JSON.stringify(data_, null, 2), desc: '' },
  { name: 'direction', type: 'String', default: 'vertical', value: 'vertical, horizontal, alternate, alternate-reverse', desc: '' },
  { name: 'hollow', type: 'Boolean', default: 'false', value: 'true, false', desc: '是否空心节点' },
]

const slotData = [
  { name: 'label', param: '{item, index}', desc: 'item为data中的数据, 插槽不存在，默认label值' },
  {
    name: 'content', param: '{item, index}', desc:
      'item为data中的数据,插槽不存在，默认title+description值'
  },
]
</script>

<style>
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
