<template>
  <FlScrollBar @resize="handleResize" ref="scrollbarRef" @scroll="onScroll">
    <!-- 虚拟内容-->
    <div ref="phantomRef" class="virtual-list-phantom"
      :style="{ width: `${totalWidth}px`, height: `${totalHeight}px` }">

      <div ref="contentRef" class="virtual-list-content" :style="{
        top: `${offsetY}px`,
        position: `absolute`,
        left: 0,
        right: 0,
        width: `max-content`,
        willChange: 'top'
      }">
        <!-- 具体item-->
        <div v-for="item in visibleItems" :key="item.id" class="virtual-list-item-wrapper">
          <slot :item="item" />
        </div>
      </div>

    </div>
  </FlScrollBar>

</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('virtual-list')
export default {
  name: ns.b()
}
</script>
<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { FlScrollBar } from '@fall-ui/components';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  estimatedHeight: {
    type: Number,
    default: () => 80,
  },
  buffer: {
    type: Number,
    default: () => 5,
  }
})

const emit = defineEmits(['scroll', 'visibleRangeChange'])
let scrollbarRef = ref(null)
let phantomRef = ref(null)
let contentRef = ref(null)

const scrollTop = ref(0)
const containerHeight = ref(0)
// 每个元素的高度缓存
const heightCache = new Map()
const totalHeightComputed = ref(0)

// 每个元素的top偏移量
let tops = []
let heights = []
let isUpdating = false
let lastVisibleStart = -1
let lastVisibleEnd = -1

// 总内容高度
const totalHeight = computed(() => totalHeightComputed.value)
const totalWidth = ref(0)

// 暴露给父组件的可视项列表
const visibleItems = ref([])

//初始位置计算, 撑开容器
function initPositions() {
  const len = props.items.length
  tops = new Array(len)
  heights = new Array(len)
  let top = 0
  totalHeightComputed.value = 0

  for (let i = 0; i < len; i++) {
    const h = heightCache.get(props.items[i].id) ?? props.estimatedHeight
    heights[i] = h
    tops[i] = top
    top += h
  }
  totalHeightComputed.value = top
  updateVisibleItems()
}

// 二分查找，查找滚动条位置的开始索引
function getStartIndex(scrollTop) {
  if (tops.length === 0) return
  let low = 0
  let high = tops.length - 1
  let result = 0

  while (low <= high) {
    let mid = (low + high) >> 1
    if (tops[mid] <= scrollTop) {
      result = mid
      low = low + 1
    } else {
      high = high - 1
    }
  }

  // 增加缓冲的一半，防止拖动时 上方或下方空白(因为会基于它往上找缓冲)
  return result + Math.ceil(props.buffer / 2)
}

// 计算可视区域内的元素
function updateVisibleItems() {
  let visibleArr = []
  if (tops.length === 0) {
    visibleItems.value = []
    return
  }

  const startIndex = getStartIndex(scrollTop.value)
  // 往前的缓冲索引
  const begin = Math.max(0, startIndex - props.buffer)

  let end = begin
  let sum = 0
  while (end < tops.length && sum < containerHeight.value) {
    sum += heights[end]
    end++
  }

  const finish = Math.min(tops.length - 1, end + props.buffer)
  visibleArr = props.items.slice(begin, finish + 1)
  if (visibleArr.length > 0) {
    visibleItems.value = visibleArr
  }

  if (begin !== lastVisibleStart || finish !== lastVisibleEnd) {
    lastVisibleStart = begin
    lastVisibleEnd = finish
    emit('visibleRangeChange', begin, finish)
  }
}

// 计算当前偏移量
const offsetY = computed(() => {
  const start = getStartIndex(scrollTop.value)
  const begin = Math.max(0, start - props.buffer)
  return tops[begin] ?? 0
})

// MutationObserver 测量高度
let mutationObserver = null
const virtualListContentClassName = 'virtual-list-content'
function initMutationObserver() {
  mutationObserver = new MutationObserver(mutations => {
    if (isUpdating) return
    isUpdating = true

    let needsUpdate = false
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        const target = mutation.target
        if (target.classList.contains(virtualListContentClassName)) {
          const width = target.getBoundingClientRect().width
          if (width) {
            totalWidth.value = width
          }
        }

        const slots = target.children

        //console.log(target)
        if (!target.classList.contains(virtualListContentClassName)) return

        for (let i = 0; i < slots.length; i++) {
          const itemData = visibleItems.value[i]
          if (!itemData) continue

          const itemHeight = slots[i].getBoundingClientRect().height
          const cachedHeight = heightCache.get(itemData.id)
          if (!cachedHeight || Math.abs(cachedHeight - itemHeight) > 0.5) {
            heightCache.set(itemData.id, itemHeight)
            needsUpdate = true
          }
        }
      }
    })

    //console.log('needsUpdate', needsUpdate)
    // 重新计算所有位置
    if (needsUpdate) {
      let top = 0
      for (let i = 0; i < props.items.length; i++) {
        const id = props.items[i].id
        const h = heightCache.get(id) ?? props.estimatedHeight
        tops[i] = top
        heights[i] = h
        top += h
      }
      totalHeightComputed.value = top

      // 修正滚动位置，防止跳动
      //console.log(scrollbarRef.value.getScrollContainer().scrollTop, scrollTop.value)
      //scrollbarRef.value.getScrollContainer().scrollTop = scrollTop.value
      //const container = containerRef.value
      //if (container) {
      //  container.scrollTop = scrollTop.value
      //}
    }

    // 简单防抖，防止高频更新
    setTimeout(() => { isUpdating = false }, 50)
  })
}

// 滚动处理
let rafId = null
function onScroll({ top, left }) {
  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    scrollTop.value = top
    updateVisibleItems()
    emit('scroll', { top, left })
  })

}

function handleResize({ clientWidth, clientHeight }) {
  containerHeight.value = clientHeight
}

onMounted(() => {
  containerHeight.value = scrollbarRef.value.getScrollContainer().clientHeight
  initMutationObserver()

  mutationObserver.observe(phantomRef.value, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeFilter: ['style']
  })

  initPositions()

})

onUnmounted(() => {
  mutationObserver?.disconnect()
  if (rafId) cancelAnimationFrame(rafId)
})

watch(() => props.items, () => {
  heightCache.clear()
  initPositions()
}, { deep: false })

defineExpose({
  markDirty(id) {
    heightCache.delete(id)
  }
})

</script>
