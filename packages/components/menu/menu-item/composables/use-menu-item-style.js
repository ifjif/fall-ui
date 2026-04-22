import { computed, watch, nextTick, ref } from 'vue'

export function useMenuItemStyle(props, submenuRef, ssubmenuRef, isOpen) {
  const indentStyle = computed(() => {
    const style = {}
    if (props.mode === 'horizontal') return {}
    style.paddingLeft = `${20 * props.indent}px`

    return style
  })

  const subMenuStyle = ref({})

  const resizeO = new ResizeObserver(() => {
    updatePosition()
  })

  const updatePosition = () => {
    const submenuDom = submenuRef.value
    const ssubmenuDom = ssubmenuRef.value
    if (!submenuDom || !ssubmenuDom) return

    const rect = submenuDom.getBoundingClientRect()
    const subRect = ssubmenuDom.getBoundingClientRect()

    const style = {}

    const innerWidth = window.innerWidth
    const leftRemaining = rect.left
    const rightRemaining = innerWidth - rect.right

    // 判断是左边还是 右边
    //  获取到子菜单的宽度
    if (rightRemaining > 240) {
      style.left = rect.right + 'px'
    } else if (leftRemaining > 240) {
      style.left = rect.left - subRect.width + 'px'
    }

    style.top = rect.top + window.scrollY + 'px'

    subMenuStyle.value = style

    resizeO.observe(ssubmenuDom)
  }

  watch(() => isOpen.value, nv => {
    if (nv) {
      nextTick(() => {
        updatePosition()
      })
    } else {
      resizeO.disconnect()
      subMenuStyle.value = {}
    }
  })

  return {
    indentStyle,
    subMenuStyle
  }

}
