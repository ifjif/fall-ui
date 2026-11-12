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
  trackWidth,
  startX,
  maxScrollLeft,
  scrollLeft,
  thumbLeftRate,
  topPosition,
  endPosition,
  leftPosition,
  rightPostion,
  maxThumbTop,
  maxThumbLeft
) {
  let endY = 0
  let topY = 0
  let leftX = 0
  let rightX = 0

  //是否是垂直滚动
  let verticalScroll = false

  // 拖拽手势内冻结的映射基准（避免虚拟列表动态总高追溯式搬动滚动位置）
  let dragTrackRate = 0        // 竖向：每 1px 轨道对应多少内容像素（冻结）
  let dragStartScrollTop = 0   // 竖向：手势起始的 scrollTop（冻结）
  let dragTrackRateX = 0       // 水平：每 1px 轨道对应多少内容像素（冻结）
  let dragStartScrollLeft = 0  // 水平：手势起始的 scrollLeft（冻结）
  // 拖拽起始的 thumb rate和maxThumb 快照
  // 几何冻结+实时换算方案
  // 上面4个已经没必要了
  let dragStartThumbRateY = 0
  let dragStartMaxThumbTop = 0
  let dragStartThumbRateX = 0
  let dragStartMaxThumbLeft = 0

  const updateThumbRate = () => {
    //   拖拽期间跳过，防止 handleResize（ResizeObserver 异步回调）
    //   用新的 maxScrollTop 覆盖 thumbTopRate
    if (dragging.value) return

    // 不存在 滚动条时，maxScrollTop为 0
    thumbTopRate.value = maxScrollTop.value === 0 ? 0 : scrollTop.value / maxScrollTop.value
    // 不存在 滚动条时，maxScrollLeft为 0
    thumbLeftRate.value = maxScrollLeft.value === 0 ? 0 : scrollLeft.value / maxScrollLeft.value
  }

  const onScroll = (e) => {
    const el = e.target
    scrollTop.value = el.scrollTop
    scrollLeft.value = el.scrollLeft

    updateThumbRate()

    emit('scroll', { top: scrollTop.value, left: scrollLeft.value })
    //console.log(able, el.scrollTop, el.clientHeight, el.scrollHeight)
    if (verticalScroll) { // 垂直方向的判断
      const able = el.scrollHeight - (el.scrollTop + el.clientHeight)
      if (able < 1) {
        endPosition.value = true
        topPosition.value = false
        emit('bottom')
        return
      }
      if (scrollTop.value === 0) {
        topPosition.value = true
        endPosition.value = false
        emit('top')
        return
      }
      endPosition.value = false
      topPosition.value = false
    } else {            // 水平方向的判断
      const able = el.scrollWidth - (el.scrollLeft + el.clientWidth)
      if (able < 1) {
        rightPostion.value = true
        leftPosition.value = false
        emit('right')
        return
      }
      if (scrollLeft.value === 0) {
        leftPosition.value = true
        rightPostion.value = false
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
    // 冻结像素基准 轨道像素/内容像素
    const frozenMax = maxScrollTop.value || 1
    dragTrackRate = trackHeight.value / frozenMax
    dragStartScrollTop = containerRef.value.scrollTop
    // 冻结起始rate
    dragStartThumbRateY = thumbTopRate.value
    // 冻结 thumb 几何：把当前的 maxThumbTop 快照下来
    dragStartMaxThumbTop = maxThumbTop.value

    //const trackRate = trackHeight.value / maxScrollTop.value
    //const currentScrollTop = containerRef.value.scrollTop
    //当前已走的 轨道
    //trackOffset.value = currentScrollTop * trackRate
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

    // 增量映射：鼠标位移 -> scrollTop 位移，不依赖实时 maxScrollTop
    // 在虚拟列表中，maxScrollTop 是在变化的，但是offset确实上一帧的maxScrollTop
    // 那么可能出现 回滚等问题
    // 鼠标和滚动栏驱动 scrollTop,保证鼠标和滚动栏一致
    const dy = e.clientY - startY.value
    //  鼠标 → rate：用冻结的 maxThumbTop，钳制 [0,1]
    let rate = dragStartThumbRateY + dy / dragStartMaxThumbTop
    rate = Math.max(0, Math.min(1, rate))
    thumbTopRate.value = rate
    //  rate → scrollTop：用【实时】真实可滚范围
    const el = containerRef.value
    const realMaxScrollTop = el.scrollHeight - el.clientHeight
    el.scrollTop = rate * realMaxScrollTop

    //let target = dragStartScrollTop + dy / dragTrackRate
    //const liveMax = containerRef.value.scrollHeight - containerRef.value.clientHeight
    //target = Math.max(0, Math.min(target, liveMax))
    //console.log(currentScrollTop, maxScrollTop.value)
    //const offset = e.clientY - startY.value + trackOffset.value
    //占总轨道的比例
    //const offsetRate = Math.min(1, offset / trackHeight.value)
    //containerRef.value.scrollTop = maxScrollTop.value * offsetRate
    //containerRef.value.scrollTop = target

    // ★ 新增：用鼠标位移直接驱动 thumbTopRate
    //   轨道 1px 对应 rate 增量 = 1 / maxThumbTop
    //if (maxThumbTop.value > 0) {
    //  const rateDy = dy / maxThumbTop.value
    //  thumbTopRate.value = Math.max(0, Math.min(dragStartThumbRateY + rateDy, 1))
    //}
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
    // 冻结像素基准 轨道像素/内容像素
    const frozenMax = maxScrollLeft.value || 1
    dragTrackRateX = trackWidth.value / frozenMax
    dragStartScrollLeft = containerRef.value.scrollLeft
    // 冻结起始rate
    dragStartThumbRateX = thumbLeftRate.value
    // 冻结 thumb 几何：把当前的 maxThumbLeft 快照下来
    dragStartMaxThumbLeft = maxThumbLeft.value

    // 计算已走的 left
    //const trackRate = trackWidth.value / maxScrollLeft.value
    //const currentScrollLeft = containerRef.value.scrollLeft
    //trackHorizontalOffset.value = currentScrollLeft * trackRate
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
    // 增量映射 : 鼠标位移 -> scrollLeft位移，不依赖maxScrollLeft
    // 鼠标和滚动栏驱动 scrollLeft,保证鼠标和滚动栏一致
    const dx = e.clientX - startX.value
    //  鼠标 → rate：用冻结的 maxThumbLeft，钳制 [0,1]
    let rate = dragStartThumbRateX + dx / dragStartMaxThumbLeft
    rate = Math.max(0, Math.min(1, rate))
    thumbLeftRate.value = rate
    //  rate → scrollLeft：用【实时】真实可滚范围
    const el = containerRef.value
    const realMaxScrollLeft = el.scrollWidth - el.clientWidth
    el.scrollLeft = rate * realMaxScrollLeft

    //let target = dragStartScrollLeft + dx / dragTrackRateX
    //target = Math.max(0, Math.min(target, maxScrollLeft.value))
    //const offset = e.clientX - startX.value + trackHorizontalOffset.value
    //占总轨道的比例
    //const offsetRate = Math.min(1, offset / trackWidth.value)
    //containerRef.value.scrollLeft = maxScrollLeft.value * offsetRate
    //containerRef.value.scrollLeft = target
  }

  //鼠标滚轮事件
  const onWheel = (e) => {
    if ((props.wheel === 'y' && existScrollBar.value) || (props.wheel === 'x' && existHorizontalScrollBar.value)) {
      // 阻止冒泡
      e.stopPropagation()
    }
    if (props.wheel === 'y' && !existScrollBar.value) return
    if (props.wheel === 'x' && !existHorizontalScrollBar.value) return
    verticalScroll = true
    e.preventDefault()
    const delta = e.deltaY

    if (props.wheel === 'y') {
      //进行垂直滚动, 如果不加限制，容器如果没有固定高度，它会滚动并增加容器高度
      //if (delta > 0 && endPosition) return
      let newScrollTop = containerRef.value.scrollTop + delta
      if (newScrollTop > maxScrollTop.value) {
        newScrollTop = maxScrollTop.value
      }
      containerRef.value.scrollTop = newScrollTop
    } else {
      //进行水平滚动, 如果不加限制，容器如果没有固定宽度，它会滚动并增加容器宽度
      //if (delta > 0 && endPosition) return
      let newScrollLeft = containerRef.value.scrollLeft + delta
      if (newScrollLeft > maxScrollLeft.value) {
        newScrollLeft = maxScrollLeft.value
      }
      containerRef.value.scrollLeft = newScrollLeft
    }
  }

  // 新增 用于判断方向的变量
  let isScrolling

  // 统一触摸开始处理
  const onTouchStart = (e) => {
    // 采用 stopPropagation且onTouchMove也用来组件父的移动
    // 这个会阻止内部的click
    //e.preventDefault()
    // 记录手指按下的初始位置
    e.stopPropagation()
    startX.value = e.changedTouches[0].clientX
    startY.value = e.changedTouches[0].clientY

    // 重置方向判断
    isScrolling = undefined
  }
  // 统一的触摸移动处理
  const onTouchMove = (e) => {
    e.stopPropagation()
    //e.preventDefault()
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

          const frozenMax = maxScrollLeft.value || 1
          dragTrackRateX = trackWidth.value / frozenMax
          dragStartScrollLeft = containerRef.value.scrollLeft
          // 冻结起始rate
          dragStartThumbRateX = thumbLeftRate.value
          // 冻结 thumb 几何：把当前的 maxThumbLeft 快照下来
          dragStartMaxThumbLeft = maxThumbLeft.value
          // 计算已走的 left
          //const trackRate = trackWidth.value / maxScrollLeft.value
          //const currentScrollLeft = containerRef.value.scrollLeft
          //trackHorizontalOffset.value = currentScrollLeft * trackRate
          startX.value = currentX // 以当前手指位置作为起点
        } else {
          isScrolling = 'vertical' // 判断为垂直
          verticalScroll = true
          dragging.value = true

          // 冻结竖向映射基准（与scrollDown同口径）
          const frozenMax = maxScrollTop.value || 1
          dragTrackRate = trackHeight.value / frozenMax
          dragStartScrollTop = containerRef.value.scrollTop
          // 冻结起始rate
          dragStartThumbRateY = thumbTopRate.value
          // 冻结 thumb 几何：把当前的 maxThumbTop 快照下来
          dragStartMaxThumbTop = maxThumbTop.value

          //const trackRate = trackHeight.value / maxScrollTop.value
          //const currentScrollTop = containerRef.value.scrollTop
          //当前已走的 轨道
          //trackOffset.value = currentScrollTop * trackRate
          startY.value = currentY // 已当前手指位置作为起点
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

    // 增量映射 和鼠标同理
    // 鼠标和滚动栏驱动 scrollTop,保证鼠标和滚动栏一致
    const dy = startY.value - clientY
    //  鼠标 → rate：用冻结的 maxThumbTop，钳制 [0,1]
    let rate = dragStartThumbRateY + dy / dragStartMaxThumbTop
    rate = Math.max(0, Math.min(1, rate))
    thumbTopRate.value = rate
    //  rate → scrollTop：用【实时】真实可滚范围
    const el = containerRef.value
    const realMaxScrollTop = el.scrollHeight - el.clientHeight
    el.scrollTop = rate * realMaxScrollTop
    //const dy = startY.value - clientY
    //let target = dragStartScrollTop + dy / dragTrackRate
    //target = Math.max(0, Math.min(target, maxScrollTop.value))
    //const offset = startY.value - clientY + trackOffset.value
    //const offsetRate = offset / trackHeight.value
    //containerRef.value.scrollTop = maxScrollTop.value * offsetRate
    //containerRef.value.scrollTop = target
  }
  // --- 修改点 3: 新增触摸移动逻辑 (水平) ---
  // 往左，右边内容 (也就是滚动条往右)
  const onDragMoveHorizontalTouch = (clientX) => {
    if (rightX && rightX <= clientX) { rightX = 0 }
    else if (rightPostion.value) { if (!rightX) rightX = clientX; return }

    if (leftX && leftX >= clientX) { leftX = 0 }
    else if (leftPosition.value) { if (!leftX) leftX = clientX; return }

    // 增量映射，和鼠标同理
    // 鼠标和滚动栏驱动 scrollLeft,保证鼠标和滚动栏一致
    const dx = startX.value - clientX
    //  鼠标 → rate：用冻结的 maxThumbLeft，钳制 [0,1]
    let rate = dragStartThumbRateX + dx / dragStartMaxThumbLeft
    rate = Math.max(0, Math.min(1, rate))
    thumbLeftRate.value = rate
    //  rate → scrollLeft：用【实时】真实可滚范围
    const el = containerRef.value
    const realMaxScrollLeft = el.scrollWidth - el.clientWidth
    el.scrollLeft = rate * realMaxScrollLeft

    //const dx = startX.value - clientX
    //let target = dragStartScrollLeft + dx / dragTrackRateX
    //target = Math.max(0, Math.min(target, maxScrollLeft.value))
    //const offset = startX.value - clientX + trackHorizontalOffset.value
    //const offsetRate = offset / trackWidth.value
    //containerRef.value.scrollLeft = maxScrollLeft.value * offsetRate
    //containerRef.value.scrollLeft = target
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
    onTouchEnd,
    updateThumbRate,
  }
}
