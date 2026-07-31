<template>
  <div :class="[ns.b()]" :style="[anchorStyle]">
    <!-- 活跃线-->
    <div :class="[ns.e('active-bar')]" :style="activeBarStyle"></div>
    <ul :class="[ns.e('list')]" ref="anchorListRef">
      <AnchorItem @click="handleClick" v-for="anchor in data" :key="anchor.href" :anchor="anchor" />
    </ul>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { useAnchor } from './composables/use-anchor';
const ns = useNamespace('anchor')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { provide, watch, onUnmounted } from 'vue'
import AnchorItem from './anchor-item.vue'
const ns = useNamespace('anchor')

const props = defineProps({
  data: { // [{title, href:'#xxx', children}]
    type: Array,
    required: true,
    default: () => []
  },
  container: { // 滚动容器，默认为 window，可以传选择器#xxx, 也可以是dom对象
    type: [String, Object],
    default: () => 'window'
  },
  offsetTop: { // 距离顶部的偏移量，用于固定定位或滚动补偿
    type: Number,
    default: 0
  },
  affix: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click', 'change'])

const {
  anchorListRef,
  activeHref,
  handleClick,
  addScrollEvent,
  removeScrollEvent,
  scrollEvent,
  anchorStyle,
  activeBarStyle,
} = useAnchor(props, emit)


provide('anchor_root', { activeHref })

watch(() => props.container, (nv, ov) => {
  if (ov) removeScrollEvent(ov)
  if (nv) addScrollEvent(nv)

  // 触发一次 active
  scrollEvent()
})

// 监听吸附
watch(() => props.affix, nv => {
  if (nv) {
    anchorStyle.value = {
      position: 'fixed',
      top: `${props.offsetTop}px`,
      width: '200px'
    }
  } else {
    anchorStyle.value = {}
  }
}, { immediate: true })

onUnmounted(() => {
  removeScrollEvent(props.container)
})

</script>
