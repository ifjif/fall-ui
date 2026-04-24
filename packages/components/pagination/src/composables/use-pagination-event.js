export function usePaginationEvent(props, emit, pageCount, currentPageSize, jumpPage) {

  const pageChange = (page) => {
    if (page < 1 || page > pageCount || page === props.currentPage) return

    emit('update:currentPage', page)
    emit('change', { page, pageSize: props.pageSize })
  }

  // 如果是 省略号
  // 前:往前跳5
  // 后:往后跳5
  const pagerClick = (page, index) => {
    if (page === '...') {
      const isStartEllipsis = (index - 1) === 0
      if (isStartEllipsis) {
        pageChange(props.currentPage - 5)
      } else {
        pageChange(props.currentPage + 5)
      }
      return
    }
    pageChange(page)
  }

  // 页大小改变
  const handleSizeChange = () => {
    emit('update:pageSize', currentPageSize.value)

    // 一般大小改变，跳转到第一页
    emit('update:currentPage', 1)

    emit('change', { page: 1, pageSize: currentPageSize.value })
  }

  // jump blur 处理
  const handleJumpBlur = () => {
    if (!jumpPage.value) {
      jumpPage.value = props.currentPage
      return
    }

    let page = parseInt(jumpPage.value)

    if (page < 1) page = 1
    else if (page > pageCount.value) page = pageCount.value

    if (page !== props.currentPage) {
      pageChange(page)
    } else {
      jumpPage.value = props.currentPage
    }
  }

  return {
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  }
}
