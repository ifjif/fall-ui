<template>
  <div :class="{
    'is-alternate': direction === 'alternate',
    'is-alternate-reverse': direction === 'alternate-reverse'
  }">
    <div v-for="(item, index) in items" :key="index" :class="['my-timeline-item', {
      'item-odd': index % 2 === 1,
      'item-even': index % 2 === 0
    }]">
      <!-- 时间和标签区域 -->
      <div class="my-timeline-item__label">
        <slot name="label" :item="item" :index="index">
          <div>{{ item.timestamp }}</div>
        </slot>
      </div>

      <!-- 节点 -->
      <div class="my-timeline-item__node" :style="nodeStyle(item)">
        <slot name="dot" :item="item" :index="index">
          <div class="node-dot"></div>
        </slot>
      </div>

      <!-- 连接线 -->
      <div :style="tailStyle(item)" class="my-timeline-item__tail" v-if="index !== items.length - 1"></div>

      <!-- 内容主体 -->
      <div class="my-timeline-item__content">
        <slot name="content" :item="item" :index="index">
          <div>{{ item.title }}</div>
          <div>{{ item.description }}</div>
        </slot>
      </div>

    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('timeline')
export default {
  name: ns.b()
}
</script>
<script setup>

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  direction: {
    type: String,
    validator(d) {
      return ['vertical', 'horizontal', 'alternate', 'alternate-reverse'].includes(d)
    },
    default: 'vertical',
  },
  hollow: { // 是否空心节点
    type: Boolean,
    default: false
  }
})


const nodeStyle = (item) => {
  const style = {
    borderColor: item.color
  }
  // 如果不是空心样式，添加背景
  if (!props.hollow && !item.hollow) {
    style.backgroundColor = item.color
  }

  return style
}

const tailStyle = (item) => {
  const style = {
    backgroundColor: item.color
  }
  return style
}
</script>
<style scoped>
/* alternate 和 alternate-reverse 采用grid布局 */
.is-alternate,
.is-alternate-reverse {
  position: relative;
}

.my-timeline-item__node {
  display: flex;
  justify-content: center;
  align-items: center;
}

.node-dot {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: #fff;
}

.is-alternate .my-timeline-item,
.is-alternate-reverse .my-timeline-item {
  display: grid;
  /* 左 | 轴 | 右 */
  grid-template-columns: 1fr auto 1fr;
  column-gap: 4px;
}

.is-alternate .my-timeline-item__label,
.is-alternate-reverse .my-timeline-item__label {
  grid-column: 1;
  grid-row: 1;
  text-align: right;
}

.is-alternate .my-timeline-item__node,
.is-alternate-reverse .my-timeline-item__node {
  position: relative;
  grid-column: 2;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid skyblue;
}

.is-alternate .my-timeline-item__tail,
.is-alternate-reverse .my-timeline-item__tail {
  position: relative;
  grid-column: 2;
  grid-row: 2;
  width: 2px;
  top: -4px;
  left: 7px;
  height: calc(100% + 4px);
  background-color: skyblue;
}

.is-alternate .my-timeline-item__content,
.is-alternate-reverse .my-timeline-item__content {
  grid-column: 3;
  grid-row: 2;
}

.is-alternate .item-odd .my-timeline-item__content,
.is-alternate-reverse .item-even .my-timeline-item__content {
  /* 奇数 内容在左 偶数内容在左 */
  grid-column: 1;
  grid-row: 2;
}

.is-alternate .item-odd .my-timeline-item__label,
.is-alternate-reverse .item-even .my-timeline-item__label {
  /* 奇数 在右 偶数在右 */
  grid-column: 3;
  text-align: left;
  grid-row: 1;
}
</style>
