<template>
  <div @mouseenter="showScrollBar = true" @mouseleave="showScrollBar = false" ref="containerRef" :class="[ns.b()]"
    @scroll.passive="onScroll" @wheel="onWheel" :style="[width, height]" @touchstart="onTouchStart"
    @touchmove.passive="onTouchMove" @touchend="onTouchEnd">
    <div ref="contentRef">
      <!-- 判断水平方向是否会滚动 -->
      <div :style="['display: inline-block;', x ? 'width:max-content;' : 'width:100%;']" ref="innerContentRef">
        <!-- slot为宽高跟随内容增长 -->
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
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
  },
  wheel: {
    type: String,
    validator(m) {
      return ['x', 'y'].includes(m)
    },
    default: 'y'
  },
  x: { // 是否有水平滚动
    type: Boolean,
    default: true
  }
})
const emit = defineEmits(['top', 'bottom', 'left', 'right', 'resize', 'scroll'])

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
const scrollTopInc = (x) => {
  nextTick(() => {
    let newTop = containerRef.value.scrollTop + x
    if (newTop <= 0) {
      newTop = 0
      topPosition.value = true
      endPosition.value = false
    } else if (newTop >= maxScrollTop.value) {
      newTop = maxScrollTop.value
      topPosition.value = false
      endPosition.value = true
    }
    containerRef.value.scrollTop = newTop
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

const scrollLeftInc = (x) => {
  nextTick(() => {
    let newLeft = containerRef.value.scrollLeft + x
    if (newLeft <= 0) {
      newLeft = 0
      leftPosition.value = true
      rightPostion.value = false
    } else if (newLeft >= maxScrollLeft.value) {
      newLeft = maxScrollLeft.value
      leftPosition.value = false
      rightPostion.value = true
    }
    containerRef.value.scrollLeft = newLeft
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
  scrollTopInc,
  scrollToBottom,
  scrollToLeft,
  scrollLeftInc,
  scrollToRight
})
let resizeObserver = null
let rafId = null // 用于取消动画帧
const handleResize = (entries) => {
  //取消上一帧的渲染任务，防止高频触发导致的性能浪费
  if (rafId) cancelAnimationFrame(rafId)

  rafId = requestAnimationFrame(() => {
    resizeChange.value = true
    const container = containerRef.value
    const innerContainer = innerContentRef.value
    if (!container || !innerContainer) return

    const height = entries[0].contentRect.height
    const clientHeight = container.clientHeight
    const clientWidth = container.clientWidth
    const scrollHeight = innerContainer.clientHeight
    const scrollWidth = innerContainer.clientWidth

    existScrollBar.value = height > clientHeight
    existHorizontalScrollBar.value = scrollWidth > clientWidth

    if (existScrollBar.value) {
      maxScrollTop.value = scrollHeight - clientHeight
      // 判断 当前 scrollTop是否合法
      if (containerRef.scrollTop > maxScrollTop.value) {
        containerRef.scrollTop = maxScrollTop.value
      }

      // 更改状态
      if (containerRef.scrollTop === 0) {
        topPosition.value = true
        endPosition.value = false
      } else if (containerRef.scrollTop === maxScrollTop.value) {
        topPosition.value = false
        endPosition.value = true
      } else {
        topPosition.value = false
        endPosition.value = false
      }

    } else {
      topPosition.value = false
      endPosition.value = false
      maxScrollTop.value = 0
    }
    if (existHorizontalScrollBar.value) {
      maxScrollLeft.value = scrollWidth - clientWidth
      // 判断 当前 scrollLeft是否合法
      if (containerRef.scrollLeft > maxScrollLeft.value) {
        containerRef.scrollLeft = maxScrollLeft.value
      }

      // 更改状态
      if (containerRef.scrollLeft === 0) {
        leftPosition.value = true
        rightPostion.value = false
      } else if (containerRef.scrollLeft === maxScrollLeft.value) {
        leftPosition.value = false
        rightPostion.value = true
      } else {
        leftPosition.value = false
        rightPostion.value = false
      }
    } else {
      leftPosition.value = false
      rightPostion.value = false
      maxScrollLeft.value = 0
    }

    thumbHeightRatio.value = Math.max(clientHeight / scrollHeight, 0.1) //最小10%
    thumbWidthRate.value = Math.max(clientWidth / scrollWidth, 0.1) // 最小10%

    scrollToBottomForChange && scrollToBottomForChange(false)
    scrollToRightForChange && scrollToRightForChange(false)
    resizeChange.value = false
    scrollToBottomForChange = null
    scrollToRightForChange = null

    // 触发滚动，重新计算 thumb top rate
    scrollTopInc(-1)
    // 触发滚动，从新计算 thumb left rate
    scrollLeftInc(-1)
    /*
      * 注意 表格中的 absolute td 会 增加 scrollWidth
      * 而clientWidth 不会有 absolute td的 width
      * 随内容增长的容器 请使用 
      *       clientWidth 来 充当 scrollWidth
      *       clientHeight 来 充当 scrollHeight
      */
    emit('resize', { clientWidth, clientHeight, scrollWidth, scrollHeight })
  })
}
onMounted(() => {
  resizeObserver = new ResizeObserver(handleResize)
  resizeObserver.observe(contentRef.value)
  resizeObserver.observe(innerContentRef.value)
})

onUnmounted(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})
</script>
