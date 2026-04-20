export function useScrollBarEvent(
  props,
  emit,
  containerRef,
  existScrollBar,
  existHorizontalScrollBar,
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
  trackHorizontalOffset,
  topPosition,
  endPosition,
  leftPosition,
  rightPostion,
) {
  let endY = 0
  let topY = 0
  let leftX = 0
  let rightX = 0

  //是否是垂直滚动
  let verticalScroll = false

  const onScroll = (e) => {
    const el = e.target
    scrollTop.value = el.scrollTop

    // 不存在 滚动条时，maxScrollTop为 0
    thumbTopRate.value = maxScrollTop.value === 0 ? 0 : el.scrollTop / maxScrollTop.value
    scrollLeft.value = el.scrollLeft
    // 不存在 滚动条时，maxScrollLeft为 0
    thumbLeftRate.value = maxScrollLeft.value === 0 ? 0 : el.scrollLeft / maxScrollLeft.value
    emit('scroll', { top: scrollTop.value, left: scrollLeft.value })
    //console.log(able, el.scrollTop, el.clientHeight, el.scrollHeight)
    if (verticalScroll) { // 垂直方向的判断
      const able = el.scrollHeight - (el.scrollTop + el.clientHeight)
      if (able < 1) {
        endPosition.value = true
        emit('bottom')
        return
      }
      if (scrollTop.value === 0) {
        topPosition.value = true
        emit('top')
        return
      }
      endPosition.value = false
      topPosition.value = false
    } else {            // 水平方向的判断
      const able = el.scrollWidth - (el.scrollLeft + el.clientWidth)
      if (able < 1) {
        rightPostion.value = true
        emit('right')
        return
      }
      if (scrollLeft.value === 0) {
        leftPosition.value = true
        emit('left')
        return
      }
      rightPostion.value = false
      leftPosition.value = false
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
    } else if (topPosition.value) {
      if (!topY) {
        topY = e.clientY
      }
      return
    }
    //到达底部不计算
    if (endY && endY >= e.clientY) {
      endY = 0
    } else if (endPosition.value) {
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
    } else if (rightPostion.value) {
      if (!rightX) {
        rightX = e.clientX
      }
      return
    }

    //到达左边不计算
    if (leftX && leftX <= e.clientX) {
      leftX = 0
    } else if (leftPosition.value) {
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
    if (props.wheel === 'y' && !existScrollBar.value) return
    if (props.wheel === 'x' && !existHorizontalScrollBar.value) return
    verticalScroll = true
    e.preventDefault()
    const delta = e.deltaY
    //进行垂直滚动, 如果不加限制，容器如果没有固定高度，它会滚动并增加容器高度
    //if (delta > 0 && endPosition) return
    let newScrollTop = containerRef.value.scrollTop + delta
    if (newScrollTop > maxScrollTop.value) {
      newScrollTop = maxScrollTop.value
    }

    if (props.wheel === 'y') {
      containerRef.value.scrollTop = newScrollTop
    } else {
      //进行水平滚动
      containerRef.value.scrollLeft += delta
    }
  }

  // 新增 用于判断方向的变量
  let isScrolling

  // 统一触摸开始处理
  const onTouchStart = (e) => {
    e.preventDefault()
    // 记录手指按下的初始位置
    startX.value = e.changedTouches[0].clientX
    startY.value = e.changedTouches[0].clientY

    // 重置方向判断
    isScrolling = undefined
  }
  // 统一的触摸移动处理
  const onTouchMove = (e) => {
    e.preventDefault()
    const currentX = e.changedTouches[0].clientX
    const currentY = e.changedTouches[0].clientY
    // 计算位移差
    const diffX = currentX - startX.value
    const diffY = currentY - startY.value

    // 判断方向，看谁滑动的距离大
    if (isScrolling === undefined) {
      // 阈值：滑动超过 2px 才开始判断方向，防止微小手抖
      if (Math.abs(diffX) > 2 || math.abs(diffY) > 2) {
        if (Math.abs(diffX) > Math.abs(diffY)) {
          isScrolling = 'horizontal' // 判定为水平
          verticalScroll = false

          dragging.value = true
          // 计算已走的 left
          const trackRate = trackWidth.value / maxScrollLeft.value
          const currentScrollLeft = containerRef.value.scrollLeft
          trackHorizontalOffset.value = currentScrollLeft * trackRate
        } else {
          isScrolling = 'vertical' // 判断为垂直
          verticalScroll = true

          dragging.value = true
          const trackRate = trackHeight.value / maxScrollTop.value
          const currentScrollTop = containerRef.value.scrollTop
          //当前已走的 轨道
          trackOffset.value = currentScrollTop * trackRate
        }
      }

    }

    // 阻止页面滚动（只有判定出方向后才阻止）
    if (isScrolling) {
      // 执行滚动逻辑
      if (isScrolling == 'vertical') {
        onDragMoveTouch(currentY)
      } else {
        onDragMoveHorizontalTouch(currentX)
      }
    }
  }

  const onTouchEnd = () => {
    isScrolling = undefined
    dragging.value = false
  }

  // --- 修改点 2: 新增触摸移动逻辑 (垂直) ---
  // 往上，内容应该往下 (也就是滚动条往下)
  const onDragMoveTouch = (clientY) => {
    // 复用边界检查逻辑 (参考原有的 onDragMove)
    if (topY && topY >= clientY) { topY = 0 }
    else if (topPosition.value) { if (!topY) topY = clientY; return }

    if (endY && endY <= clientY) { endY = 0 }
    else if (endPosition.value) { if (!endY) endY = clientY; return }

    const offset = startY.value - clientY + trackOffset.value
    const offsetRate = offset / trackHeight.value
    containerRef.value.scrollTop = maxScrollTop.value * offsetRate
  }
  // --- 修改点 3: 新增触摸移动逻辑 (水平) ---
  // 往左，右边内容 (也就是滚动条往右)
  const onDragMoveHorizontalTouch = (clientX) => {
    if (rightX && rightX <= clientX) { rightX = 0 }
    else if (rightPostion.value) { if (!rightX) rightX = clientX; return }

    if (leftX && leftX >= clientX) { leftX = 0 }
    else if (leftPosition.value) { if (!leftX) leftX = clientX; return }

    const offset = startX.value - clientX + trackHorizontalOffset.value
    const offsetRate = offset / trackWidth.value
    containerRef.value.scrollLeft = maxScrollLeft.value * offsetRate
  }

  return {
    onScroll,
    scrollDown,
    onDragMove,
    onDragEnd,
    scrollRight,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}
