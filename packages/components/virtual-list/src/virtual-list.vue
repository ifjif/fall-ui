<template>
  <FlScrollBar @left="handleLeft" @right="handleRight" @top="handleTop" @bottomPrev="handleBottomPrev"
    @resize="handleResize" ref="scrollbarRef" @scroll="onScroll">
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
        <div v-for="item in visibleItems" :data-id="item.id" :key="item.id" class="virtual-list-item-wrapper">
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
import { computed, onMounted, onUnmounted, ref, watch, nextTick } from 'vue';
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

const emit = defineEmits(['scroll', 'resize', 'visibleRangeChange', 'top', 'bottom', 'left', 'right'])
let scrollbarRef = ref(null)
let phantomRef = ref(null)
let contentRef = ref(null)

// 贴底相关
let stickToBottom = false // 是否处于 吸附底部 模式
let syncingBottom = false // 标记：当前scroll 事件由程序贴底触发
const AT_BOTTOM_THRESHOLD = 8    // 距底多少像素算"贴底"
//  标记「当前 scroll 事件由测量补偿（rebuildTops 锚定）触发」
// 与 syncingBottom 同族：程序滚动事件回流时，只同步 scrollTop，不改动 stickToBottom
let adjustingScroll = false

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
    const h = heightCache.get(String(props.items[i].id)) ?? props.estimatedHeight
    heights[i] = h
    tops[i] = top
    top += h
  }
  totalHeightComputed.value = top
  updateVisibleItems()
}

// 二分查找，查找滚动条位置的开始索引
function getStartIndex(scrollTop) {
  if (tops.length === 0) return 0
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

  return result
}

// 计算可视区域内的元素
function updateVisibleItems() {
  if (tops.length === 0) {
    visibleItems.value = []
    return
  }

  const startIndex = getStartIndex(scrollTop.value)
  // 往前的缓冲索引
  const begin = Math.max(0, startIndex - props.buffer)

  // ✅ 从 startIndex 开始累积，buffer 项不占用视口预算
  let end = startIndex, sum = 0

  while (end < tops.length && sum < containerHeight.value) {
    sum += heights[end]
    end++
  }

  const finish = Math.min(tops.length - 1, end + props.buffer)
  // 原来 if (visibleArr.length>0) 才赋值：空/收缩时保留上一帧旧内容 -> 窗口与 tops 错位
  visibleItems.value = props.items.slice(begin, finish + 1)

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

function measureFromMutations() {
  let needsUpdate = false
  const slots = contentRef.value.children
  for (const slot of slots) {
    const id = slot.getAttribute('data-id')
    if (!id) continue
    // slot内部中不该存在margin, 这个height返回的是不包含margin的
    const h = slot.getBoundingClientRect().height
    const c = heightCache.get(id)
    if (!c || Math.abs(c - h) > 0.5) {
      heightCache.set(id, h)
      needsUpdate = true
    }
  }

  if (needsUpdate) rebuildTops()
  return needsUpdate
}

// 如果 顶部tops变了，scrollTop要相应的补偿
// 这时，顶部才能稳定定
//tops 变了，但 scrollTop 没变。
//getStartIndex(scrollTop) 二分查出的 startIndex、offsetY=tops[begin] 都跟着跳 → content 整体瞬间位移
function rebuildTops() {
  // 1.备份重算前的tops,作为锚点插值基准
  const oldTops = tops.slice()
  let top = 0
  for (let i = 0; i < props.items.length; i++) {
    const h = heightCache.get(String(props.items[i].id)) ?? props.estimatedHeight
    tops[i] = top
    heights[i] = h
    top += h
  }

  totalHeightComputed.value = top

  // 高度变了，贴底态必须重新吸附, 贴底态不做锚点补偿
  if (stickToBottom) {
    nextTick(() => syncToLastItem())
    return
  }

  adjustScroll(oldTops, top)
}

// 滚动补偿, top为总内容高度
// oldTops必须是 tops.slice()
function adjustScroll(oldTops, top) {
  if (!oldTops) return
  const oldLen = oldTops.length ?? 0
  // 1) 列表结构变化时不做补偿（增删）
  // 这时tops为整体位移，锚点插值不可信，交给外部的getAnchor/restoreAnchor
  if (oldLen !== tops.length) return

  const sc = getScrollContainer()
  if (!sc) return
  // 基准用 真实DOM 的scrollTop: 组件ref被rAF节流
  const cur = sc.scrollTop

  // 2)取锚点，当前视口的第一项
  const startIndex = getStartIndex(cur)
  // 顶部第一项之上没有累计高度，不可锚
  if (startIndex <= 0) return

  const oldTop = oldTops[startIndex] ?? 0
  const newTop = tops[startIndex] ?? 0
  const delta = newTop - oldTop

  // 3)视口之上的累计高度确实变了才补偿（亚像素抖动忽略）
  if (Math.abs(delta) <= 0.5) return

  // 4)目标scrollTop: 保持scrollTop - tops[startIndex] 不变, 并夹在合法区间内
  const maxScroll = Math.max(0, top - containerHeight.value)
  const target = Math.max(0, Math.min(cur + delta, maxScroll))
  if (Math.abs(target - cur) <= 0.5) return

  // 5)施加补偿：先改内部状态再驱动真实滚动
  //    并用 adjustingScroll 包住这次程序滚动，避免 onScroll 误判成用户滚动
  adjustingScroll = true
  scrollTop.value = target
  updateVisibleItems()   // 让 begin / offsetY 与新的 scrollTop 同帧一致，避免闪一帧旧窗口
  sc.scrollTop = target // 驱动 FlScrollBar 真实滚动（会异步回流 onScroll）

  // 6) 下一帧释放：等本次程序滚动的 scroll 事件消费完再恢复用户判定
  requestAnimationFrame(() => { adjustingScroll = false })
}

// MutationObserver 测量高度
let mutationObserver = null
let pending = false
function initMutationObserver() {
  mutationObserver = new MutationObserver(mutations => {
    // 用微任务节流替代 setTimeout(50ms)，不吞 anchor 区测量
    if (pending) return
    pending = true
    //让测量发生在 Vue 本轮更新、DOM 变更、原始 MutationObserver 回调都跑完之后。
    queueMicrotask(() => {
      measureFromMutations()
      // 测量后【不要】主动改 scrollTop，避免和用户滚动/restore 打架
      pending = false
    })
  })
}
// restore 精修前同步 flush 一次，确保 takeRecords 里未投递的回调也参与测量
function flushMeasure() {
  //把当前已经检测到、但 MutationObserver 回调还没来得及处理的 DOM 变更记录，同步取出来并清空队列。
  mutationObserver.takeRecords()
  //重新测量高度。
  measureFromMutations()
}

// 滚动处理
//区分用户滚动 / 程序贴底 / 程序锚点补偿
let rafId = null
function onScroll({ top, left }) {
  //   程序贴底 或 程序锚定补偿 引发的滚动：只同步 scrollTop，
  //   既不改动 stickToBottom，也不需要再重算可视窗口（调用方已自行同步）
  if (syncingBottom || adjustingScroll) {
    scrollTop.value = top
    return
  }

  // 用户滚动：是否贴底决定 stickToBottom
  const sc = getScrollContainer()
  if (sc) {
    //console.log('scroll', top, sc.clientHeight, sc.scrollHeight)
    stickToBottom = top + sc.clientHeight >= sc.scrollHeight - AT_BOTTOM_THRESHOLD
  }

  if (rafId) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    scrollTop.value = top
    updateVisibleItems()
    emit('scroll', { top, left })
  })

}

function handleResize({ clientWidth, clientHeight, scrollWidth, scrollHeight }) {
  const oldHeight = containerHeight.value
  if (oldHeight !== clientHeight) {
    containerHeight.value = clientHeight
    updateVisibleItems()
    if (stickToBottom) syncToBottom()
  }
  emit('resize', { clientWidth, clientHeight, scrollWidth, scrollHeight })
}

function handleLeft() {
  emit('left')
}

function handleRight() {
  emit('right')
}

function handleTop() {
  emit('top')
}

// 虚拟滚动很难触发真正的 触底
//function handleBottom() {
//  console.log('滚动到底部')
//  emit('bottom')
//}
function handleBottomPrev() {
  emit('bottom')
}

function scrollToTop() {
  scrollbarRef.value.scrollToTop()
}
function scrollTopX(newTop) {
  scrollbarRef.value.scrollTop(newTop)
}
function scrollTopInc(inc) {
  scrollbarRef.value.scrollTopInc(inc)
}

// 滚动到最后一项（尽量保证在高度稳定后调用，这样更准确）
function syncToLastItem() {
  const sc = getScrollContainer()
  if (!sc || !contentRef.value) return false


  //  const last = contentRef.value.lastElementChild
  //  if (!last) return false
  //  const lastId = last.getAttribute('data-id')
  //  if (!lastId) return false
  //  const idx = props.items.findIndex(i => String(i.id) === String(lastId))
  //  if (idx === -1) return false

  // 直接用 props.items 末尾项 + tops数组，不依赖DOM渲染时序
  const lastIdx = props.items.length - 1
  if (lastIdx < 0) return false

  const itemTop = tops[lastIdx] ?? 0
  const itemH = heights[lastIdx] ?? props.estimatedHeight
  // 让最后一条的底部对齐容器底部
  const target = itemTop + itemH - sc.clientHeight
  if (target < 0) return false
  syncingBottom = true
  scrollTopX(target)
  scrollTop.value = target
  updateVisibleItems()
  requestAnimationFrame(() => syncingBottom = false)
  return true
}

function syncToBottom() {
  const sc = getScrollContainer()
  if (!sc) return
  const target = sc.scrollHeight - sc.clientHeight
  if (target < 0) return
  if (Math.abs(target - scrollTop.value) > 0.5) {
    syncingBottom = true
    scrollTopX(target)
    scrollTop.value = target
    updateVisibleItems()
    // 下一帧释放，避免这次程序滚动被onScroll 误判成 用户离开底部
    requestAnimationFrame(() => { syncingBottom = false })
  }
}
// 滚动到底部，并稳定高度（它不保证最后一项在可视最底部，它只保证高度稳定）
function scrollTopBottomStable() {
  // 参照物是 scrollHeight
  syncToBottom()
  let lastH = -1, stable = 0
  const tick = () => {
    if (!stickToBottom) return // 用户已上滚，停止
    syncToBottom()
    const sc = getScrollContainer()
    const h = sc ? sc.scrollHeight : 0
    if (h === lastH) {
      if (++stable >= 3) {
        // 确保在最后一项
        syncToLastItem()
        return // 连续3帧稳定 = 测量收敛完成
      }
    } else {
      stable = 0
      lastH = h
    }
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}
//开贴底态 + 多帧收敛
function scrollToBottom() {
  stickToBottom = true
  scrollTopBottomStable()

  // 这个 触发的 高度一直不稳定, 准度不太对
  // let tries = 0
  // // 高度收敛：连续几帧 scrollHeight 不再变化才停，消除偏移
  // const tick = () => {
  //   if (!stickToBottom || tries++ > 20) return
  //   if (syncToLastItem()) return
  //   requestAnimationFrame(tick)
  // }
  // nextTick(() => requestAnimationFrame(tick))

}
function scrollToLeft() {
  scrollbarRef.value.scrollToLeft()
}
function scrollLeftX(newLeft) {
  scrollbarRef.value.scrollLeft(newLeft)
}
function scrollToRight() {
  scrollbarRef.value.scrollToRight()
}
function getScrollContainer() {
  return scrollbarRef.value.getScrollContainer()
}

// 获取当前锚点位置 用dom真实rect取一条完全可见项
function getAnchor() {
  const container = getScrollContainer()
  const cRect = container.getBoundingClientRect()
  const slots = contentRef.value.children
  for (const el of slots) {
    const id = el.getAttribute('data-id')
    if (!id) continue
    const r = el.getBoundingClientRect()
    if (r.top >= cRect.top - 1 && r.bottom <= cRect.bottom + 1) {
      return { id, viewportOffset: r.top - cRect.top } // 真实像素偏移，不含估算误差
    }
  }
  const first = slots[0]
  if (!first) return null
  return { id: first.getAttribute('data-id'), viewportOffset: first.getBoundingClientRect().top - cRect.top }
}
// 恢复锚点到指定位置
async function restoreAnchor(anchor) {
  if (!anchor?.id) return

  const applyByDom = () => {
    const sel = '[data-id="' + anchor.id + '"]'
    const el = contentRef.value.querySelector(sel)
    if (!el) return false
    const offY = parseFloat(contentRef.value.style.top) || 0 // 当前tops[begin]
    const target = offY + el.offsetTop - anchor.viewportOffset
    scrollTopX(target)
    scrollTop.value = target
    updateVisibleItems()
    return true
  }

  // 等tops重新计算好
  await nextTick()
  // 第 1 轮：近似把 anchor 滚进可渲染窗口，触发它真实渲染与测量
  if (!applyByDom()) {
    const idx = props.items.findIndex(i => String(i.id) === String(anchor.id))
    if (idx === -1) return
    const itemTop = tops[idx] ?? 0
    const approx = itemTop - (anchor.viewportOffset ?? 0)
    scrollTopX(approx)
    scrollTop.value = approx
    updateVisibleItems()
  }

  // 第 2 轮：anchorEl.offsetTop 已是真实流位置 -> 精修，消除累积偏差
  //用“可见窗口 + DOM 稳定”重试
  const MAX_RETRY = 12
  for (let i = 0; i < MAX_RETRY; i++) {
    await nextTick()
    await new Promise(requestAnimationFrame)

    // 关键：如果 anchor 还没进 visibleItems，继续找也没用
    const inWindow = visibleItems.value?.some(
      item => String(item.id) === String(anchor.id)
    )

    if (!inWindow) {
      updateVisibleItems()
      continue
    }
    if (applyByDom()) {
      return
    }

    // 如果高度还在被 ResizeObserver / MutationObserver 修正，
    // 等下一帧再试，避免读到中间态
    flushMeasure()
  }

  const idx = props.items.findIndex(i => String(i.id) === String(anchor.id))
  if (idx === -1) return
  // 兜底：DOM 始终找不到时，用 tops 精修
  const finalTop = tops[idx] ?? 0
  const fallback = finalTop - (anchor.viewportOffset ?? 0)

  scrollTopX(fallback)
  scrollTop.value = fallback
  updateVisibleItems()
}

onMounted(() => {
  containerHeight.value = scrollbarRef.value.getScrollContainer().clientHeight
  //console.log('mounted 容器宽度', containerHeight.value)
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

// 只对新 item补默认值, 保留已知高度
watch(() => props.items, () => {
  // 可选：清理已不存在的 id（防止内存泄漏）
  const idSet = new Set(props.items.map(i => String(i.id)))
  for (const key of heightCache.keys()) {
    if (!idSet.has(key)) heightCache.delete(key)
  }
  initPositions()
  // 贴底态，到底部
  if (stickToBottom) {
    nextTick(() => scrollToBottom())
  }
}, { deep: false })

// 强制删除 某项缓存高度
function markDirty(id) {
  heightCache.delete(String(id))
}

defineExpose({
  markDirty,
  scrollToTop,
  scrollTop: scrollTopX,
  scrollTopInc,
  scrollToBottom,
  scrollToLeft,
  scrollLeft: scrollLeftX,
  scrollToRight,
  getScrollContainer,
  getAnchor,
  restoreAnchor,
})

</script>
