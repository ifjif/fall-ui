<template>
  <div :class="[ns.b(), ns.is('horizontal', direction === 'horizontal'),
  ns.is('alternate', direction === 'alternate'),
  ns.is('alternate-reverse', direction === 'alternate-reverse')
  ]">
    <div :class="[ns.e('item'),
    ns.is('item-odd', index % 2 === 1),
    ns.is('item-even', index % 2 === 0)
    ]" v-for="(item, index) in data" :key="index">
      <!-- 时间/标签区域 -->
      <div :class="[ns.e('item-label')]">
        <slot name="label" :item="item" :index="index">
          <div>{{ item.label }}</div>
        </slot>
      </div>

      <!-- 节点 和 内容区域 -->
      <div v-if="['vertical', 'horizontal'].includes(direction)" :class="[ns.e('item-body')]">
        <!-- 节点 dot/icon -->
        <div :class="ns.e('item-node')" :style="nodeStyle(item)">
          <slot name="dot" :item="item" :index="index">
            <div :class="[ns.e('node-dot')]"></div>
          </slot>
        </div>

        <!-- 连接线，最后一项通常隐藏 -->
        <div :style="tailStyle(item)" :class="ns.e('line-tail')" v-if="index !== data.length - 1"></div>

        <!-- 内容 -->
        <div :class="ns.e('item-content')">
          <slot name="content" :item="item" :index="index">
            <div>{{ item.title }}</div>
            <div>{{ item.description }}</div>
          </slot>
        </div>
      </div>

      <!-- alternate 和 alternate-reverse 布局需要 -->
      <template v-else>
        <!-- 节点 -->
        <div :class="[ns.e('item-node')]" :style="nodeStyle(item)">
          <slot name="dot" :item="item" :index="index">
            <div :class="ns.e('node-dot')"></div>
          </slot>
        </div>

        <!-- 连接线 -->
        <div :style="tailStyle(item)" :class="ns.e('line-tail')" v-if="index !== data.length - 1"></div>

        <!-- 内容主体 -->
        <div :class="[ns.e('item-content')]">
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
  data: {
    type: Array, // {title:'' ,description:'' ,label:'' ,color:'' ,icon:'' }
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
