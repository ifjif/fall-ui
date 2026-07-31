export function useAnchorEvent(
  props,
  emit,
  flatData,
  activeHref,
  getAnchorEl,
  getScrollContainer,
  getScrollTop,
  updateActiveBar,
) {

  const handleClick = (item) => {
    const targetEl = getAnchorEl(item)
    if (!targetEl) return

    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })

    emit('click', item)
  }

  const addScrollEvent = (container) => {
    const el = getScrollContainer(container)
    if (!el) return
    el.addEventListener('scroll', scrollEvent)
  }
  const removeScrollEvent = (container) => {
    const el = getScrollContainer(container)
    if (!el) return
    el.removeEventListener('scroll', scrollEvent)
  }


  const scrollEvent = (e) => {
    const scrollTop = getScrollTop(props.container)

    // 遍历所有的 锚点，找到离滚动位置最近的 锚点
    const anchors = flatData.value
    let maxTop = -Infinity
    let currentActive = ''

    anchors.some(anchor => {
      const targetEl = getAnchorEl(anchor)
      if (!targetEl) return false

      // 获取 相对于容器顶部的 offsetTop
      const offsetTop = targetEl.offsetTop

      // 增加 10px 让判定更敏感
      if ((scrollTop + 10) >= offsetTop) {
        if (offsetTop > maxTop) {
          maxTop = offsetTop
          currentActive = anchor.href
          return false
        }
      }

      return true
    })

    // 不存在，默认第一个
    if (!currentActive && anchors.length > 0) {
      currentActive = anchors[0].href
    }

    if (currentActive !== activeHref.value) {
      activeHref.value = currentActive
      emit('change', currentActive)
      updateActiveBar()
    }
  }

  return {
    handleClick,
    addScrollEvent,
    removeScrollEvent,
    scrollEvent
  }
}
