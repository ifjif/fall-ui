import { computed } from 'vue'

export function useTabsStyle(props, activeTabRect) {
  const barStyle = computed(() => {
    const style = {}
    if (!activeTabRect.rect || ['card', 'border-card'].includes(props.type)) return style
    style.width = `${activeTabRect.rect.width}px`
    style.height = '2px'
    style.left = `${activeTabRect.rect.left - activeTabRect.parentRect.left}px`
    style.bottom = '0'

    if (props.tabPosition === 'bottom') {
      style.bottom = undefined
      style.top = '0'
    } else if (props.tabPosition === 'left') {
      style.height = `${activeTabRect.rect.height}px`
      style.width = '2px'
      style.bottom = undefined
      style.left = undefined
      style.right = '0'
      style.top = `${activeTabRect.rect.top - activeTabRect.parentRect.top}px`
    } else if (props.tabPosition === 'right') {
      style.height = `${activeTabRect.rect.height}px`
      style.width = '2px'
      style.bottom = undefined
      style.left = '0'
      style.top = `${activeTabRect.rect.top - activeTabRect.parentRect.top}px`
    }

    return style
  })

  return {
    barStyle
  }
}
