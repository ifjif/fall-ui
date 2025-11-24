export function useScrollBarEvent(
  emit,
  containerRef,
  scrollTop,
  thumbTopRate,
  dragging,
  trackHeight,
  maxScrollTop,
  startY,
  trackOffset,
  trackWidth,
  startX,
  maxScrollLeft,
  scrollLeft,
  thumbLeftRate,
  trackHorizontalOffset
) {
  let endY = 0
  let topY = 0
  let leftX = 0
  let rightX = 0

  let topPosition = true
  let endPosition = false
  let leftPosition = true
  let rightPostion = false

  //是否是垂直滚动
  let verticalScroll = false

  const onScroll = (e) => {
    const el = e.target
    scrollTop.value = el.scrollTop
    thumbTopRate.value = el.scrollTop / maxScrollTop.value
    scrollLeft.value = el.scrollLeft
    thumbLeftRate.value = el.scrollLeft / maxScrollLeft.value
    //console.log(able, el.scrollTop, el.clientHeight, el.scrollHeight)
    if (verticalScroll) { // 垂直方向的判断
      const able = el.scrollHeight - (el.scrollTop + el.clientHeight)
      if (able < 1) {
        endPosition = true
        emit('bottom')
        return
      }
      if (scrollTop.value === 0) {
        topPosition = true
        emit('top')
        return
      }
      endPosition = false
      topPosition = false
    } else {            // 水平方向的判断
      const able = el.scrollWidth - (el.scrollLeft + el.clientWidth)
      if (able < 1) {
        rightPostion = true
        emit('right')
        return
      }
      if (scrollLeft.value === 0) {
        leftPosition = true
        emit('left')
        return
      }
      rightPostion = false
      leftPosition = false
    }
  }

  const scrollDown = (e) => {
    e.preventDefault()
    verticalScroll = true
    dragging.value = true
    startY.value = e.clientY
    const trackRate = trackHeight.value / maxScrollTop.value
    const currentScrollTop = containerRef.value.scrollTop
    //当前已走的 轨道
    trackOffset.value = currentScrollTop * trackRate
    document.addEventListener('mousemove', onDragMove)
    document.addEventListener("mouseup", onDragEnd)
  }
  // 改变容器的 scrollTop 让容器内部滚动
  const onDragMove = (e) => {
    //到达顶部不计算
    if (topY && topY <= e.clientY) {
      topY = 0
    } else if (topPosition) {
      if (!topY) {
        topY = e.clientY
      }
      return
    }
    //到达底部不计算
    if (endY && endY >= e.clientY) {
      endY = 0
    } else if (endPosition) {
      if (!endY) {
        endY = e.clientY
      }
      return
    }

    //console.log(currentScrollTop, maxScrollTop.value)
    const offset = e.clientY - startY.value + trackOffset.value
    //占总轨道的比例
    const offsetRate = offset / trackHeight.value
    containerRef.value.scrollTop = maxScrollTop.value * offsetRate
  }
  //结束拖拽
  const onDragEnd = (e) => {
    topY = 0
    endY = 0
    leftX = 0
    rightX = 0
    dragging.value = false
    document.removeEventListener('mousemove', onDragMove)
    document.removeEventListener('mousemove', onDragMoveHorizontal)
    document.removeEventListener('mouseup', onDragEnd)
  }

  const scrollRight = (e) => {
    verticalScroll = false
    dragging.value = true
    startX.value = e.clientX
    // 计算已走的 left
    const trackRate = trackWidth.value / maxScrollLeft.value
    const currentScrollLeft = containerRef.value.scrollLeft
    trackHorizontalOffset.value = currentScrollLeft * trackRate
    document.addEventListener('mousemove', onDragMoveHorizontal)
    document.addEventListener("mouseup", onDragEnd)
    e.preventDefault()
  }

  const onDragMoveHorizontal = (e) => {
    //到达右边不计算
    if (rightX && rightX >= e.clientX) {
      rightX = 0
    } else if (rightPostion) {
      if (!rightX) {
        rightX = e.clientX
      }
      return
    }

    //到达左边不计算
    if (leftX && leftX <= e.clientX) {
      leftX = 0
    } else if (leftPosition) {
      if (!leftX) {
        leftX = e.clientX
      }
      return
    }
    const offset = e.clientX - startX.value + trackHorizontalOffset.value
    //占总轨道的比例
    const offsetRate = offset / trackWidth.value
    containerRef.value.scrollLeft = maxScrollLeft.value * offsetRate
  }

  //鼠标滚轮事件
  const onWheel = (e) => {
    verticalScroll = true
    e.preventDefault()
    const delta = e.deltaY
    //进行垂直滚动
    containerRef.value.scrollTop += delta
    //进行水平滚动
    //containerRef.value.scrollLeft += delta
  }
  return {
    onScroll,
    scrollDown,
    onDragMove,
    onDragEnd,
    scrollRight,
    onWheel,
  }
}
