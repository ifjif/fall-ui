import { computed, ref } from 'vue'
export function useTableState(props) {

  const visibleColumns = computed(() => {
    return props.columns
  })

  const placeholderWidth = ref(2)

  // 筛选状态
  const filterValues = ref({}) // {prop:value, ...}
  // 输入框防抖
  const debounceTimers = ref({}) // {prop:timier, ...}

  // 过滤数据
  const filterData = computed(() => {
    // 如果没有过滤条件 或 启动了远程过滤，直接返回外部值
    if (Object.keys(filterValues.value).length === 0 || props.remoteFilter) return props.data
    // 否则 进行 本地过滤
    return [...props.data].filter(item => {
      // 比较每个条件
      return Object.entries(filterValues.value).every(([key, filterValue]) => {
        // 获取 要 predicate的 值
        const itemValue = item[key]

        // 1.如果数据不存在 返回false
        if (item === undefined || item === null) return false

        // 2.处理日期对象
        if (filterValue instanceof Date) {
          // 比较时间戳是否一致
          return item.getTime() === filterValue.getTime()
        }

        // 3.处理数字，这里精确匹配
        if (typeof filterValue === 'number') {
          return itemValue === filterValue
        }

        // 4.处理字符串（包含匹配）
        if (typeof filterValue === 'string') {
          return String(itemValue).includes(filterValue)
        }

        //其余返回 false
        return false
      })
    })
  })

  // 排序状态
  // [{prop, order:'ascending' | 'descending'},...]
  const sortStates = ref([])

  // 排序数据
  const sortedData = computed(() => {
    if (sortStates.value.length === 0 || props.remoteSort) return filterData.value
    return [...filterData.value].sort((a, b) => {
      for (let i = 0; i < sortStates.value.length; i++) {
        const rule = sortStates.value[i]
        const prop = rule.prop
        const order = rule.order
        const factor = order === 'ascending' ? 1 : -1

        const aVal = a[prop]
        const bVal = b[prop]

        let result = 0

        if (typeof aVal === 'number' || typeof bVal === 'number') {
          result = aVal - bVal
        } else {
          // 字符串，按符合语言习惯的 比较法
          result = String(aVal).localeCompare(String(bVal))
        }

        // 不相等，更据升降序 返回结果
        if (result !== 0) {
          return result * factor
        }

        // 等于0，继续下一轮规则的比较
      }

      // 所有规则都比较完了，还相等，按原顺序返回
      return 0
    })
  })


  // 分页信息
  const innerCurrentPage = ref(props.pagination.currentPage)
  const innerPageSize = ref(props.pagination.pageSize)
  // 分页数据
  // 以这个来表示数据，页数变化会有两次触发，一次本地的结果，然后是远程的新结果
  const paginatedData = computed(() => {
    if (!props.pagination) return sortedData.value
    const start = (innerCurrentPage.value - 1) * innerPageSize.value
    return sortedData.value.slice(start, start + innerPageSize.value)
  })

  return {
    visibleColumns,
    placeholderWidth,
    sortStates,
    paginatedData,
    innerCurrentPage,
    innerPageSize,
    filterValues,
    debounceTimers
  }
}
