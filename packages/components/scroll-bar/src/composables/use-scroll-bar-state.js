import { ref, computed } from 'vue'
export function useScrollBarState() {
  const containerRef = ref(null)
  const contentRef = ref(null)
  const innerContentRef = ref(null)

  const existScrollBar = ref(false)
  const existHorizontalScrollBar = ref(false)
  const showScrollBar = ref(false)

  //高度比
  const thumbHeightRatio = ref(0)
  //滚动条实际高度
  const thumbHeight = computed(() => {
    if (!containerRef.value) return 0
    return containerRef.value.clientHeight * thumbHeightRatio.value

  })

  //轨道高度
  const trackHeight = computed(() => {
    return containerRef.value.clientHeight - thumbHeight.value
  })

  // 计算top值
  const thumbTopRate = ref(0)
  //往下滚动了多少
  const scrollTop = ref(0)
  const maxScrollTop = ref(0)
  // 滚动条距顶部的最大top值
  const maxThumbTop = computed(() => {
    if (!containerRef.value) return 0
    const { clientHeight } = containerRef.value
    return clientHeight - thumbHeight.value
  })
  const thumbTop = computed(() => {
    return maxThumbTop.value * thumbTopRate.value + scrollTop.value
  })

  const startY = ref(0)
  const trackOffset = ref(0)
  const dragging = ref(false)

  // 宽度比
  const thumbWidthRate = ref(0)
  const thumbWidth = computed(() => {
    if (!containerRef.value) return 0
    return containerRef.value.clientWidth * thumbWidthRate.value
  })
  //轨道宽度
  const trackWidth = computed(() => {
    return containerRef.value.clientWidth - thumbWidth.value
  })

  const startX = ref(0)
  const trackHorizontalOffset = ref(0)
  //计算右边的值
  const thumbLeftRate = ref(0)
  //往右滚动了多少
  const scrollLeft = ref(0)
  // 滚动条距 左边最大偏移
  const maxScrollLeft = ref(0)
  const maxThumbLeft = computed(() => {
    if (!containerRef.value) return 0
    const { clientWidth } = containerRef.value
    return clientWidth - thumbWidth.value
  })
  const thumbLeft = computed(() => {
    return maxThumbLeft.value * thumbLeftRate.value + scrollLeft.value
  })


  const topPosition = ref(true)
  const endPosition = ref(false)
  const leftPosition = ref(true)
  const rightPostion = ref(false)
  return {
    containerRef,
    contentRef,
    innerContentRef,
    existScrollBar,
    showScrollBar,
    thumbHeightRatio,
    thumbHeight,
    trackHeight,
    thumbTopRate,
    scrollTop,
    maxScrollTop,
    thumbTop,
    startY,
    trackOffset,
    dragging,
    thumbWidth,
    thumbWidthRate,
    trackWidth,
    startX,
    thumbLeft,
    maxScrollLeft,
    scrollLeft,
    thumbLeftRate,
    trackHorizontalOffset,
    existHorizontalScrollBar,
    topPosition,
    endPosition,
    leftPosition,
    rightPostion,
  }
}
