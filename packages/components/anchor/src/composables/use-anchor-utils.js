import { nextTick } from 'vue'
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('anchor-item')
const activeHref = "." + ns.is('active-href', true)
export function useAnchorUtils(anchorListRef, activeBarStyle) {

  const updateActiveBar = () => {
    // dom更新后 去执行，这时刚好是变化后的节点
    nextTick(() => {
      const anchorList = anchorListRef.value
      if (!anchorList) return

      const activeEl = anchorList.querySelector(activeHref)

      if (!activeEl) return

      activeBarStyle.value = {
        top: activeEl.offsetTop + 'px',
        height: activeEl.offsetHeight + 'px'
      }

    })

  }

  return {
    updateActiveBar
  }
}
