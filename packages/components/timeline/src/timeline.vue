<template>
  <div :class="[ns.b(), { 'is-horizontal': direction === 'horizontal' },
  {
    'is-alternate': direction === 'alternate',
    'is-alternate-reverse': direction === 'alternate-reverse'
  }
  ]">
    <div :class="['my-timeline-item', {
      'item-odd': index % 2 === 1,
      'item-even': index % 2 === 0
    }]" v-for="(item, index) in items" :key="index">
      <!-- 时间/标签区域 -->
      <div class="my-timeline-item__label">
        <slot name="label" :item="item" :index="index">
          <div>{{ item.timestamp }}</div>
        </slot>
      </div>

      <!-- 节点 和 内容区域 -->
      <div v-if="['vertical', 'horizontal'].includes(direction)" class="item-content">
        <!-- 节点 dot/icon -->
        <div class="node" :style="nodeStyle(item)">
          <slot name="dot" :item="item" :index="index">
            <div class="node-dot"></div>
          </slot>
        </div>
        <!-- 连接线，最后一项通常隐藏 -->
        <div :style="tailStyle(item)" class="line-tail" v-if="index !== items.length - 1"></div>
        <!-- 内容 -->
        <div class="item-body">
          <slot name="content" :item="item" :index="index">
            <div>{{ item.title }}</div>
            <div>{{ item.description }}</div>
          </slot>
        </div>
      </div>

      <!-- alternate 和 alternate-reverse 布局需要 -->
      <template v-else>
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
      </template>

    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('timeline')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('timeline')

const props = defineProps({
  items: {
    type: Array,
    required: true,
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
.fl-timeline {
  font-size: 14px;
}

.is-horizontal {
  display: flex;

  .my-timeline-item__label {
    margin-right: auto;
    margin-bottom: 4px;
  }

  .my-timeline-item {
    min-width: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .item-content {
    padding-left: 0;
    padding-top: 12px;
  }

  .line-tail {
    bottom: auto;
    top: 7px;
    left: 12px;
    right: 0;
    height: 2px;
    width: auto;
  }

  .item-body {
    margin-left: 0;
    margin-top: 20px;
  }
}

.my-timeline-item {
  display: flex;
  padding-bottom: 20px;
}

.my-timeline-item__label {
  margin-right: 4px;
  font-size: 13px;
}

.item-content {
  position: relative;
  display: flex;
  padding-left: 12px;
}

.node {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  border: 2px solid;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.node-dot {
  height: 4px;
  width: 4px;
  border-radius: 50%;
  background-color: #fff;
}

.line-tail {
  position: absolute;
  left: 7px;
  top: 14px;
  bottom: -20px;
  width: 2px;
  background-color: #e4e7ed;
}

.item-body {
  margin-left: 20px;
  margin-top: 16px;
}


/* alternate 和 alternate-reserve */
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
  top: -2px;
  left: 7px;
  height: calc(100% + 4px + 20px);
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
