export function useTableEvent(
  props,
  emit,
  clearCacheWidths,
  placeholderWidth,
  sortStates,
  filterValues,
  debounceTimers,
) {


  // 列宽 调整
  const startResize = (event, col) => {
    event.preventDefault()
    const startX = event.pageX
    const startWidth = parseInt(col.width) || 120

    const doDrag = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.pageX - startX)
      if (newWidth > 60) {
        col.width = newWidth + 'px'
        clearCacheWidths()
      }
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
    }

    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
  }

  const handleResize = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
    if (scrollWidth < clientWidth) {
      placeholderWidth.value = clientWidth - scrollWidth
    } else {
      placeholderWidth.value = 2
    }
  }

  // 排序 (本地或远程)
  const triggerSort = (prop) => {
    const existingIndex = sortStates.value.findIndex(s => s.prop === prop)
    let newOrder = 'ascending'

    // 存在，改order
    if (existingIndex !== -1) {
      const current = sortStates.value[existingIndex]
      newOrder = current.order === 'ascending' ? 'descending' : null
    }

    if (newOrder) {
      // 更新或增加
      if (existingIndex !== -1) {
        sortStates.value[existingIndex].order = newOrder
      } else {
        sortStates.value.push({ prop, order: newOrder })
      }
    } else {
      // 进行移除
      sortStates.value.splice(existingIndex, 1)
    }

    if (!props.remoteSort) return
    // 如果是远程排序，通知父组件
    emit('sort-change', [...sortStates.value])
  }

  // 下拉选择筛选处理
  const handleFilterSelect = (prop, value) => {
    if (value === '') {
      delete filterValues.value[prop]
    } else {
      filterValues.value[prop] = value
    }

    // 如果远程过滤，通知父组件
    if (!props.remoteFilter) return
    emit('filter-change', { ...filterValues.value })
  }
  // 输入筛选处理
  const handleFilterInput = (prop, value) => {
    // 清除之前的定时器
    if (debounceTimers[prop]) {
      clearTimeout(debounceTimers[prop])
    }

    const trimmed = value.trim()
    if (trimmed === '') {
      delete filterValues[prop]
    } else {
      filterValues[prop] = trimmed
    }

    // 如果远程过滤，通知父组件
    if (!props.remoteFilter) return

    // 启动新防抖
    debounceTimers[prop] = setTimeout(() => {
      emit('filter-change', { ...filterValues.value })
    }, 300)
  }

  // 页改变
  const handlePageChange = ({ page, pageSize }) => {
    props.pagination.currentPage = page
    props.pagination.pageSize = pageSize
    emit('page-change', { page, pageSize })
  }

  return {
    startResize,
    handleResize,
    triggerSort,
    handleFilterSelect,
    handleFilterInput,
    handlePageChange
  }
}
