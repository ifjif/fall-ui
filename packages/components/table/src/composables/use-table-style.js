import { generateStyle } from "../tools/generateStyle"
import { computed } from 'vue'

export function useTableStyle(
  props,
  visibleColumns,
  sortStates,
  isTreeData
) {

  const styles = computed(() => {
    const styles = {
      ...generateStyle(props.styles)
    }

    return styles
  })

  // head column 样式辅助
  const getHeaderCellStyle = (col) => {
    const style = {
      width: col.width,
      minWidth: col.minWidth || col.width,
      textAlign: col.align || 'left',
    }

    if (col.fixed === 'left') {
      style.position = 'sticky'
      style.left = computedStickyLeft(col)
      style.zIndex = 11
      style.backgroundColor = 'var(--fl-table-fixed-th-bg-color)'
    } else if (col.fixed === 'right') {
      style.position = 'sticky'
      style.right = computedStickyRight(col)
      style.zIndex = 11
      style.backgroundColor = 'var(--fl-table-fixed-th-bg-color)'
    }

    return style
  }

  // body column 样式辅助
  const getCellStyle = (col, level) => {
    const style = {
      width: col.width,
      minWidth: col.minWidth || col.width,
      textAlign: col.align || 'left'
    }

    // 树形节点，第一列需要特殊处理
    if (isTreeData.value && col === props.columns[0]) {
      style.paddingLeft = `${props.indentSize * (level + 1)}px`
    }

    if (col.fixed === 'left') {
      style.position = 'sticky'
      style.left = computedStickyLeft(col)
      style.zIndex = 3
      style.backgroundColor = 'var(--fl-table-fixed-tr-bg-color)'
    } else if (col.fixed === 'right') {
      style.position = 'sticky'
      style.right = computedStickyRight(col)
      style.zIndex = 3
      style.backgroundColor = 'var(--fl-table-fixed-tr-bg-color)'
    }

    return style
  }

  // 计算 各固定列宽度
  // 固定列按位置顺序累加 (建议采用ResizeObserver)
  let cacheWidths = null
  const computedStickyLeft = (targetCol) => {
    // 首次计算，得到各列的宽度
    if (!cacheWidths) {
      // 简化，默认120
      cacheWidths = visibleColumns.value.map(col => parseInt(col.width) || 120)
    }
    let total = 0
    for (let i = 0; i < visibleColumns.value.length; i++) {
      const col = visibleColumns.value[i]
      if (col === targetCol) break
      if (col.fixed === 'left') {
        total += cacheWidths[i]
      }
    }

    return total + 'px'
  }

  const computedStickyRight = (targetCol) => {
    // 首次计算，得到各列的宽度
    if (!cacheWidths) {
      cacheWidths = visibleColumns.value.map(col => parseInt(col.width) || 120)
    }

    let total = 0
    for (let i = 0; i < visibleColumns.value.length; i++) {
      const col = visibleColumns.value[i]
      if (col === targetCol) break
      if (col.fixed === 'right') {
        total += cacheWidths[i]
      }
    }

    return total + 'px'
  }

  const clearCacheWidths = () => {
    cacheWidths = null
  }

  // 排序样式
  const getSortOrder = (prop) => {
    const state = sortStates.value.find(s => s.prop === prop)
    return state ? state.order : null
  }

  return {
    styles,
    getHeaderCellStyle,
    getCellStyle,
    clearCacheWidths,
    getSortOrder
  }
}
