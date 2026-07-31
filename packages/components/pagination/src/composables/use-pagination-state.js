import { computed, ref } from 'vue'
export function usePaginationState(props, currentPage) {
  // 跳转页
  const jumpPage = ref(currentPage.value)
  // 总页数
  const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
  // 页码数量
  const pagerCount = 7
  // 页码列表
  // 前、后差距为 2是 显示省略号
  // 1 和 last 始终显示
  // 如是 3开始, 1和3之间有省略号 应为 > 2 了
  // 如后为 10，显示的为8，8和10之间要有省略号,因为 小于 10 - 1
  const pagerList = computed(() => {
    const curPage = currentPage.value
    const total = pageCount.value
    const list = []

    // 如果总页数 小于 显示数量，全部显示
    if (total <= pagerCount) {
      for (let i = 1; i <= total; i++) list.push(i)
    } else {
      // 得到 页表头
      let start = Math.max(1, curPage - 2)
      // 得到 页表位尾
      let end = Math.min(total, start + pagerCount - 1)

      // 判断 start-end是否足够，pagerCount 数量,不够调整
      // 如 7个 start 5, end8 ，最终4, start需要调整
      if (end - start < pagerCount - 1) {
        start = Math.max(1, end - pagerCount + 1)
      }

      // 首页始终展示
      list.push(1)
      // 省略号
      if (start > 2) {
        list.push('...')
      }
      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== total) {
          list.push(i)
        }
      }
      // 省略号
      if (end < total - 1) {
        list.push('...')
      }

      // 始终显示尾
      if (total > 1) list.push(total)

    }

    return list
  })

  // 布局列表
  const layoutList = computed(() => {
    return props.layout.split(',').map(item => item.trim())
  })

  return {
    pagerList,
    pageCount,
    jumpPage,
    layoutList,
  }
}
