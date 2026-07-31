export function usePaginationEvent(props, emit, currentPage, pageSize, pageCount, jumpPage) {

  const pageChange = (page) => {
    if (page < 1 || page > pageCount || page === currentPage.value) return

    currentPage.value = page
    emit('change', { page, pageSize: props.pageSize })
  }

  // 如果是 省略号
  // 前:往前跳5
  // 后:往后跳5
  const pagerClick = (page, index) => {
    if (page === '...') {
      const isStartEllipsis = (index - 1) === 0
      if (isStartEllipsis) {
        pageChange(currentPage.value - 5)
      } else {
        pageChange(currentPage.value + 5)
      }
      return
    }
    pageChange(page)
  }

  // 页大小改变
  const handleSizeChange = () => {
    // 一般大小改变，跳转到第一页
    currentPage.value = 1

    emit('change', { page: 1, pageSize: pageSize.value })
  }

  // jump blur 处理
  const handleJumpBlur = () => {
    if (!jumpPage.value) {
      jumpPage.value = currentPage.value
      return
    }

    let page = parseInt(jumpPage.value)

    if (page < 1) page = 1
    else if (page > pageCount.value) page = pageCount.value

    if (page !== currentPage.value) {
      pageChange(page)
    } else {
      jumpPage.value = currentPage.value
    }
  }

  return {
    pageChange,
    pagerClick,
    handleSizeChange,
    handleJumpBlur
  }
}
