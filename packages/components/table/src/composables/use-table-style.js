export function useTableStyle(visibleColumns, sortStates) {

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
      style.backgroundColor = '#f5f7fa'
    } else if (col.fixed === 'right') {
      style.position = 'sticky'
      style.right = computedStickyRight(col)
      style.zIndex = 11
      style.backgroundColor = '#f5f7fa'
    }

    return style
  }

  // body column 样式辅助
  const getCellStyle = (col) => {
    const style = {
      width: col.width,
      minWidth: col.minWidth || col.width,
      textAlign: col.align || 'left'
    }

    if (col.fixed === 'left') {
      style.position = 'sticky'
      style.left = computedStickyLeft(col)
      style.zIndex = 2
      style.backgroundColor = '#f5f7fa'
    } else if (col.fixed === 'right') {
      style.position = 'sticky'
      style.right = computedStickyRight(col)
      style.zIndex = 2
      style.backgroundColor = '#f5f7fa'
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
    getHeaderCellStyle,
    getCellStyle,
    clearCacheWidths,
    getSortOrder
  }
}
