<template>
  <div @mouseenter="showScrollBar = true" @mouseleave="showScrollBar = false" ref="containerRef" :class="[ns.b()]"
    @scroll.passive="onScroll" @wheel="onWheel" :style="[width, height]" @touchstart="onTouchStart"
    @touchmove.passive="onTouchMove" @touchend="onTouchEnd">
    <div ref="contentRef">
      <slot />
    </div>

    <div @mousedown="scrollDown" v-if="existScrollBar" v-show="showScrollBar || dragging" :class="[ns.e('thumb')]"
      :style="[thumbTopStyle, thumbRightStyle, thumbHeightStyle]">
    </div>
    <div v-if="existHorizontalScrollBar" v-show="showScrollBar || dragging" @mousedown="scrollRight"
      :class="[ns.e('thumbb')]" :style="[thumbLeftStyle, thumbBottomStyle, thumbWidthStyle]">
    </div>
  </div>
</template>
<script>
//todo 滚动栏颜色、宽度、高度、border-radius 自定义 鼠标滑轮滚动的方向(vertical / horizontal)
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('scrollbar')
export default {
  name: ns.b()
}
</script>
<script setup>
import { onMounted } from 'vue'
import { useScrollBar } from './composables/use-scroll-bar';
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('scrollbar')

const props = defineProps({
  width: {
    type: [Number, String],
    default: () => 0
  },
  height: {
    type: [Number, String],
    default: () => 0
  }
})
const emit = defineEmits(['top', 'bottom', 'left', 'right'])

const {
  containerRef,
  contentRef,
  existScrollBar,
  showScrollBar,
  thumbHeightRatio,
  width,
  height,
  thumbHeightStyle,
  thumbTopStyle,
  thumbWidthStyle,
  thumbWidthRate,
  maxScrollTop,
  maxScrollLeft,
  dragging,
  thumbLeftStyle,
  thumbRightStyle,
  thumbBottomStyle,
  existHorizontalScrollBar,
  onScroll,
  scrollDown,
  scrollRight,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd
} = useScrollBar(props, emit)

onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    const height = entries[0].contentRect.height
    existScrollBar.value = height > containerRef.value.clientHeight
    existHorizontalScrollBar.value = containerRef.value.scrollWidth > containerRef.value.clientWidth
    maxScrollTop.value = containerRef.value.scrollHeight - containerRef.value.clientHeight
    maxScrollLeft.value = containerRef.value.scrollWidth - containerRef.value.clientWidth
    const clientHeight = containerRef.value.clientHeight
    const scrollHeight = containerRef.value.scrollHeight
    const clientWidth = containerRef.value.clientWidth
    const scrollWidth = containerRef.value.scrollWidth
    thumbHeightRatio.value = Math.max(clientHeight / scrollHeight, 0.1) //最小10%
    thumbWidthRate.value = Math.max(clientWidth / scrollWidth, 0.1) // 最小10%
  })
  resizeObserver.observe(contentRef.value)
})
</script>
