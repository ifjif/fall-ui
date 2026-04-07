<template>
  <div @mouseenter="showScrollBar = true" @mouseleave="showScrollBar = false" ref="containerRef" :class="[ns.b()]"
    @scroll.passive="onScroll" @wheel="onWheel" :style="[width, height]" @touchstart="onTouchStart"
    @touchmove.passive="onTouchMove" @touchend="onTouchEnd">
    <div ref="contentRef">
      <div style="display: inline-block;" ref="innerContentRef">
        <slot />
      </div>
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
import { ref, onMounted, nextTick } from 'vue'
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
  innerContentRef,
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
  topPosition,
  endPosition,
  leftPosition,
  rightPostion,
  onScroll,
  scrollDown,
  scrollRight,
  onWheel,
  onTouchStart,
  onTouchMove,
  onTouchEnd
} = useScrollBar(props, emit)

const resizeChange = ref(false)

const scrollToTop = () => {
  nextTick(() => {
    containerRef.value.scrollTop = 0
    topPosition.value = true
    endPosition.value = false
  })
}
/*
 * changed 表示 是否是容器大小改变完成后 再进行 滚动到底部
 * true 滚动到改变后的真实的底部
 * false 未发生改变，滚动到当前底部
 */
const scrollToBottom = (changed = false) => {
  nextTick(() => {
    if (changed && !resizeChange.value) scrollToBottomForChange = scrollToBottom
    containerRef.value.scrollTop = maxScrollTop.value
    topPosition.value = false
    endPosition.value = false
  })
}
let scrollToBottomForChange = null

const scrollToLeft = () => {
  nextTick(() => {
    containerRef.value.scrollLeft = 0
    leftPosition.value = true
    rightPostion.value = false
  })
}

const scrollToRight = (changed) => {
  nextTick(() => {
    if (changed && !resizeChange.value) scrollToRightForChange = scrollToRight
    containerRef.value.scrollLeft = maxScrollLeft.value
    leftPosition.value = false
    rightPostion.value = true
  })
}

let scrollToRightForChange = null

defineExpose({
  scrollToTop,
  scrollToBottom,
  scrollToLeft,
  scrollToRight
})

onMounted(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    resizeChange.value = true
    const height = entries[0].contentRect.height
    existScrollBar.value = height > containerRef.value.clientHeight
    existHorizontalScrollBar.value = containerRef.value.scrollWidth > containerRef.value.clientWidth
    if (existScrollBar.value) {
      maxScrollTop.value = containerRef.value.scrollHeight - containerRef.value.clientHeight
      // 判断 当前 scrollTop是否合法
      if (containerRef.value.scrollTop > maxScrollTop.value) {
        containerRef.value.scrollTop = maxScrollTop.value
      }
    } else {
      topPosition.value = false
      endPosition.value = false
      maxScrollTop.value = 0
    }
    if (existHorizontalScrollBar.value) {
      maxScrollLeft.value = containerRef.value.scrollWidth - containerRef.value.clientWidth
      // 判断 当前 scrollLeft是否合法
      if (containerRef.value.scrollLeft > maxScrollLeft.value) {
        containerRef.value.scrollLeft = maxScrollLeft.value
      }
    } else {
      leftPosition.value = false
      rightPostion.value = false
      maxScrollLeft.value = 0
    }
    const clientHeight = containerRef.value.clientHeight
    const scrollHeight = containerRef.value.scrollHeight
    const clientWidth = containerRef.value.clientWidth
    const scrollWidth = containerRef.value.scrollWidth

    thumbHeightRatio.value = Math.max(clientHeight / scrollHeight, 0.1) //最小10%
    thumbWidthRate.value = Math.max(clientWidth / scrollWidth, 0.1) // 最小10%

    scrollToBottomForChange && scrollToBottomForChange(false)
    scrollToRightForChange && scrollToRightForChange(false)
    resizeChange.value = false
    scrollToBottomForChange = null
    scrollToRightForChange = null
  })
  resizeObserver.observe(contentRef.value)
  resizeObserver.observe(innerContentRef.value)
})
</script>
