import { nextTick } from 'vue'
export function useTabsEvent(ns, emit, panes, navRef, activeTabRect) {
  // 注册 pane
  const registerPane = (pane) => {
    // 避免重复注册
    if (panes.find(p => p.name === pane.name)) return
    panes.push(pane)
    nextTick(() => updateBar())
  }

  // 移出 pane
  const removePane = (name) => {
    const i = panes.findIndex(p => p.name === name)
    if (i === -1) return
    // 删除后，激活前一个，如果没有，则后一个
    const nextPane = panes[i - 1] || panes[i + 1]
    panes.splice(i, 1)
    emit('update:modelValue', nextPane ? nextPane.name : '')
  }

  const updateBar = () => {
    const nav = navRef.value
    const activeTab = nav?.querySelector(`.${ns.is('active', true)}`)


    if (!activeTab) return
    const rect = activeTab.getBoundingClientRect()
    const parentRect = nav.getBoundingClientRect()
    activeTabRect.rect = rect
    activeTabRect.parentRect = parentRect
  }

  // 切换 tab
  const toggleTab = (pane) => {
    if (pane.disabled) return
    emit('update:modelValue', pane.name)
  }

  // 增加标签
  const handleAdd = () => {
    emit('tab-add')
  }
  // 删除标签
  const handleRemove = (name) => {
    emit('tab-remove', name)
  }

  return {
    registerPane,
    removePane,
    updateBar,
    toggleTab,
    handleAdd,
    handleRemove
  }
}
