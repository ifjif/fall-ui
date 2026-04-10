<template>
  <div class="my-table-wrapper" ref="tableWrapperRef">
    <!-- 顶部工具栏槽 -->
    <div v-if="$slots.toolbar" class="my-table-toolbar">
      <slot name="toolbar" />
    </div>

    <!-- 加载遮罩 -->
    <div v-if="loading" class="my-table-loading">
      <div class="spinner"></div>
    </div>

    <!-- 普通表格 -->
    <div :class="[ns.b(), { 'my-table--border': border, 'my-table--stripe': stripe }]" ref="tableRef">
      <FlScrollBar ref="flScrollBar" @resize="handleResize">
        <table :class="[ns.m('inner')]">
          <!-- 1. 使用 colgroup 定义所有列的宽度 -->
          <!--<colgroup>-->
          <!-- 为每个普通列设置固定宽度 -->
          <!--<col v-for="col in visibleColumns.filter(c => c.width)" :key="col.prop" :width="col.width" />-->
          <!-- 2. 添加一个没有宽度的 col，作为占位列 -->
          <!-- 它会自动占据表格的剩余宽度 -->
          <!--<col class="filler-column" />-->
          <!--</colgroup>-->

          <thead style="position:sticky;top:0;z-index:10;">
            <tr style="position:relative;">
              <th v-for="col in visibleColumns" :key="col.prop || col.type" :style="getHeaderCellStyle(col)"
                :data-col-prop="col.prop"
                :class="{ 'is-sortable': col.sortable, 'is-fixed-left': col.fixed === 'left', 'is-fixed-right': col.fixed === 'right' }">
                <!-- 原内容 -->
                <div class="cell">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" :checked="allSelected" :indeterminate="partialSelected"
                      @change="toggleAllSelection" />
                  </template>
                  <template v-else>
                    {{ col.label }}

                    <!-- 排序图标（仅当 sortable || remote-sort + sortable启用）-->
                    <span v-if="col.sortable || (remoteSort && col.sortable)" class="sort-icon"
                      @click.stop="triggerSort(col.prop)">
                      <span :class="{ active: getSortOrder(col.prop) === 'ascending' }">↑</span>

                      <span :class="{ active: getSortOrder(col.prop) === 'descending' }">↓</span>
                    </span>
                  </template>
                </div>

                <!-- 筛选触发器 (仅当filterable 或 remote-filter+filterable 启用) -->
                <div v-if="col.filterable || (remoteFilter && col.filterable)" class="filter-trigger"
                  @click.stop="openFilterPopup(col.prop)">
                  <span class="filter-icon">▼</span>
                  <span v-if="filterValues[col.prop]" class="filter-badge">●</span>
                </div>

                <!-- 拖拽手柄 -->
                <div v-if="props.enableResize && col.resizable === true" class="resize-handle"
                  @mousedown="startResize($event, col)">
                </div>
              </th>

              <!-- 占位-->
              <th
                :style="{ backgroundColor: '#f5f7fa', position: 'absolute', right: `${-placeholderWidth}px`, padding: 0, top: 0, minWidth: '2px', height: '100%', zIndex: 10, width: `${placeholderWidth}px` }">
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in paginatedData" :key="getRowKey(row)"
              :class="{ 'selected-row': selectionMap.has(getRowKey(row)) }" style="position:relative;">
              <td v-for="col in visibleColumns" :key="col.prop || col.type" :style="getCellStyle(col)"
                :class="{ 'is-fixed-left': col.fixed === 'left', 'is-fixed-right': col.fixed === 'right' }">
                <div class="cell">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" :checked="selectionMap.has(getRowKey(row))"
                      @change="toggleRowSelection(row, $event)" />
                  </template>
                  <!--如果有对应插槽，则使用插槽；否则显示 row[prop] -->
                  <slot v-else-if="$slots[col.prop]" :name="col.prop" :row="row" :$index="index" />
                  <template v-else>
                    {{ row[col.prop] }}
                  </template>
                </div>
              </td>

              <!-- 占位 -->
              <td
                :style="{ backgroundColor: 'inherit', position: 'absolute', right: `${-placeholderWidth}px`, padding: 0, top: 0, minWidth: '2px', height: '100%', zIndex: 2, width: `${placeholderWidth}px` }">
              </td>
            </tr>
          </tbody>
        </table>
      </FlScrollBar>
    </div>

    <!-- Fixed Left Shadow -->
    <Teleport :to="tableRef" v-if="hasFixedLeft && tableRef">
      <div class="fixed-left-shadow" />
    </Teleport>

    <!-- Fixed Right Shadow -->
    <Teleport :to="tableRef" v-if="hasFixedRight && tableRef">
      <div class="fixed-right-shadow"></div>
    </Teleport>

    <!-- 分页器 -->
    <div v-if="pagination" class="my-table-pagination">
      <button :disabled="pagination.currentPage <= 1"
        @click="beforePage(pagination.onPageChange, pagination.currentPage - 1)">上一页</button>
      <span>第 {{ pagination.currentPage }} 页</span>
      <button :disabled="pagination.currentPage * pagination.pageSize >= pagination.total"
        @click="afterPage(pagination.onPageChange, pagination.currentPage + 1)">
        下一页
      </button>
      <span>共 {{ Math.ceil(pagination.total / pagination.pageSize) }} 页，{{ pagination.total }} 条</span>
      <select :value="pagination.pageSize"
        @change="emitSizeChange(pagination.onSizeChange, Number($event.target.value))" style="margin-left: 10px">
        <option :value="10">10 条/页</option>
        <option :value="20">20 条/页</option>
        <option :value="50">50 条/页</option>
      </select>
    </div>

    <!-- 筛选浮层 -->
    <Teleport to="body">
      <template v-for="colProp in Object.keys(filterPopups)">
        <div v-if="filterPopups[colProp].show" :style="{
          top: `${filterPopups[colProp].rect.bottom}px`,
          left: `${filterPopups[colProp].rect.left}px`,
          width: `${filterPopups[colProp].width}px`
        }" class="filter-popup" @click.stop>

          <!-- 输入筛选 -->
          <div v-if="!getColByProp(colProp).filterOptions" class="filter-input-wrapper">
            <input type="text" v-model="filterPopups[colProp].value"
              @input="handleFilterInput(colProp, $event.target.value)" :placeholder="`筛选${getColByProp(colProp).label}`"
              class="filter-input" />
          </div>

          <!-- 下拉筛选 -->
          <ul v-else class="filter-options">
            <li class="filter-option" :class="{ active: !filterPopups[colProp].value }"
              @click="handleFilterSelect(colProp, '')">
              <span>全部</span>
            </li>
            <li v-for="opt in getColByProp(colProp).filterOptions" :key="opt.value" class="filter-option"
              :class="{ active: filterPopups[colProp].value === opt.value }"
              @click="handleFilterSelect(colProp, opt.value)">
              <span>{{ opt.label }}</span>
            </li>
          </ul>

          <div class="filter-footer">
            <button @click="closeFilterPopup(colProp)">取消</button>
            <button @click="applyFilter(colProp)" class="confirm-btn">确定</button>
          </div>
        </div>
      </template>
    </Teleport>
  </div>

</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('table')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { FlScrollBar } from '../../scroll-bar';
import { computed, ref, watch, onBeforeUnmount, onBeforeMount, onMounted, onUnmounted } from 'vue'
const ns = useNamespace('table')

const flScrollBar = ref(null)
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => []
  },
  columns: {
    type: Array,
    required: true,
    validator(cols) {
      return cols.every(col => col.type === 'selection' ||
        (typeof col.label === 'string' && (col.prop || col.type))
      )
    },
    default: () => []
  },
  loading: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  stripe: { type: Boolean, default: false },
  pagination: {
    type: Object,
    dfeault: null // {currentPage, pageSize, total, onPageChange, onSizeChange}
  },
  // 双向绑定多选
  selection: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' }, // 自定义 row-key 字段名
  enableResize: { type: Boolean, default: false }, // 列宽拖拽
  remoteSort: { type: Boolean, default: false },
  remoteFilter: { type: Boolean, default: false },
})

const emit = defineEmits([
  'update:selection',
  'sort-change',
  'filter-change',
])
//====================
// refs
//====================
const tableWrapperRef = ref(null)
const tableRef = ref(null)
const placeholderWidth = ref(2)

const handleResize = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => {
  if (scrollWidth < clientWidth) {
    placeholderWidth.value = clientWidth - scrollWidth
  } else {
    placeholderWidth.value = 2
  }
}

//====================
// row key
//====================
const getRowKey = (row) => {
  const key = props.rowKey
  return row[key] !== undefined ? row[key] : JSON.stringify(row)
}

//=====================
// 排序逻辑
//=====================
// 支持多列
const sortStates = ref([]) // [{prop:'name', order:'ascending' | 'descending'}, ...]

// 辅助函数，获取某列的排序状态
const getSortOrder = (prop) => {
  const state = sortStates.value.find(s => s.prop === prop)
  return state ? state.order : null
}

// 远程排序 (多列)
const triggerSort = (prop) => {
  const existingIndex = sortStates.value.findIndex(s => s.prop === prop)

  let newOrder = 'ascending'
  if (existingIndex !== -1) {
    const current = sortStates.value[existingIndex]
    newOrder = current.order === 'ascending' ? 'descending' : null
  }

  if (newOrder) {
    // 更新或新增排序
    if (existingIndex !== -1) {
      sortStates.value[existingIndex].order = newOrder
    } else {
      sortStates.value.push({ prop, order: newOrder })
    }
  } else {
    // 移除排序
    sortStates.value.splice(existingIndex, 1)
  }

  if (!props.remoteSort) return
  // 通知父组件
  emit('sort-change', [...sortStates.value])
}

// 对当前数据排序
const sortedData = computed(() => {
  if (sortStates.value.length === 0 || props.remoteSort) return filterData.value

  return [...filterData.value].sort((a, b) => {
    // 遍历多字段排序
    for (let i = 0; i < sortStates.value.length; i++) {
      const rule = sortStates.value[i]
      const prop = rule.prop
      const order = rule.order
      const factor = order === 'ascending' ? 1 : -1

      // 获取两个字段的值
      const aVal = a[prop]
      const bVal = b[prop]

      // 比较结果
      let result = 0

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        // 数字比较
        result = aVal - bVal
      } else {
        // 字符串比较
        result = String(aVal).localeCompare(String(bVal))
      }

      // 如果当前字段不相等，则根据升降序返回结果
      if (result !== 0) {
        return result * factor
      }

      // result === 0，当前字段相等，继续循环比较下一个规则
    }

    //  如果所有的规则 都比较完了都相等，则保持原顺序
    return 0
  })
})

//========================
// 筛选状态 + 防抖
//========================
const filterValues = ref({})
const debounceTimers = ref({}) // {'name': timerId, ...}
const filterPopups = ref({}) // {prop:{show, rect, value, width}}
// 初始化筛选弹窗状态
onBeforeMount(() => {
  props.columns.forEach(col => {
    if (col.filterable || props.remoteFilter) {
      filterPopups.value[col.prop] = {
        show: false,
        rect: { left: 0, top: 0, bottom: 0, right: 0 },
        value: filterValues.value[col.prop] || '',
        width: 200
      }
    }
  })
})

// 打开筛选弹窗
const openFilterPopup = (prop) => {
  const col = props.columns.find(c => c.prop === prop)
  if (!col) return

  // 获取表头位置
  const thEl = document.querySelector(`[data-col-prop="${prop}"]`)
  if (!thEl) return

  const rect = thEl.getBoundingClientRect()
  const width = Math.max(200, thEl.offsetWidth * 0.9)

  filterPopups.value[prop] = {
    ...filterPopups.value[prop],
    show: true,
    rect,
    width
  }

  // 关闭其他弹窗
  Object.keys(filterPopups.value).forEach(p => {
    if (p !== prop) filterPopups.value[p].show = false
  })
}

// 关闭筛选弹窗
const closeFilterPopup = (prop) => {
  filterPopups.value[prop].show = false
}

// 应用筛选
const applyFilter = (prop) => {
  closeFilterPopup(prop)
}

// 清空筛选
const clearFilter = (prop) => {
  filterPopups.value[prop].value = ''
  delete filterValues.value[prop]
  emit('filter-change', { ...filterValues.value })
  closeFilterPopup(prop)
}
// 辅助函数
const getColByProp = (prop) => props.columns.find(c => c.prop === prop)
// 点击外部关闭弹窗
onMounted(() => {
  const handler = (e) => {
    if (
      !e.target.closest('.filter-trigger') &&
      !e.target.closest('.filter-popup')
    ) {
      Object.keys(filterPopups.value).forEach(prop => {
        filterPopups.value[prop].show = false
      })
    }
  }
  document.addEventListener('click', handler)
  onUnmounted(() => document.removeEventListener('click', handler))
})
// 清理防抖定时器，组件卸载时
onBeforeUnmount(() => {
  Object.values(debounceTimers.value).forEach(timer => clearTimeout(timer))
})

// 下拉筛选处理
const handleFilterSelect = (prop, value) => {
  filterPopups.value[prop].value = value
  if (value === '') {
    delete filterValues.value[prop]
  } else {
    filterValues.value[prop] = value
  }

  if (!props.remoteFilter) return
  // 下拉选择立即触发，无须防抖
  emit('filter-change', { ...filterValues.value })
}

//防抖 输入筛选处理
const handleFilterInput = (prop, value) => {
  // 清除之前的定时器
  if (debounceTimers.value[prop]) {
    clearTimeout(debounceTimers.value[prop])
  }

  // 更新临时值 (用于input显示)
  const trimmed = value.trim()
  if (trimmed === '') {
    delete filterValues.value[prop]
  } else {
    filterValues.value[prop] = trimmed
  }

  if (!props.remoteFilter) return
  // 启动新防抖
  debounceTimers.value[prop] = setTimeout(() => {
    // 触发筛选变更
    emit('filter-change', { ...filterValues.value })
  }, 300) // 300ms防抖

}

// 对当前数据过滤
const filterData = computed(() => {
  if (Object.keys(filterValues.value).length === 0 || props.remoteFilter) return props.data

  return [...props.data].filter(item => {
    return Object.entries(filterValues.value).every(([key, filterValue]) => {
      // item中存在该key,且 item 中 key的值 包含、相等 filterValues[key]
      const itemValue = item[key];

      // 1. 如果数据项不存在该属性，直接返回 false
      if (itemValue === undefined || itemValue === null) return false;

      // 2. 处理日期对象
      if (filterValue instanceof Date) {
        // 比较时间戳是否一致（或者你可以改为比较大小）
        return itemValue.getTime() === filterValue.getTime();
      }

      // 3. 处理数字 (通常数字是精确匹配)
      if (typeof filterValue === 'number') {
        return itemValue === filterValue;
      }

      // 4. 处理字符串 (包含匹配)
      if (typeof filterValue === 'string') {
        return String(itemValue).includes(filterValue);
      }

      return false;
    })
  })
})

//=================
// 分页逻辑
//=================
const paginatedData = computed(() => {
  if (!props.pagination) return sortedData.value
  const start = (props.pagination.currentPage - 1) * props.pagination.pageSize
  return sortedData.value.slice(start, start + props.pagination.pageSize)
})

const beforePage = (onPageChange, page) => {
  onPageChange(page)
}
const afterPage = (onPageChange, page) => {
  onPageChange(page)
}

const emitSizeChange = (onSizeChange, size) => {
  onSizeChange(size)
}

//==================
// 多选 & 全选 & 跨页全选
//==================
// 是否跨页全选（通过selection 中的特殊标记识别）
const isAllSelectedAcross = computed(() => {
  return props.selection.length === 1 && props.selection[0].__all_selected__
})

const selectionMap = ref(new Map())

const allSelected = computed(() => {
  const keys = paginatedData.value.map(getRowKey)
  return keys.length > 0 && keys.every(key => selectionMap.value.has(key))
})

const partialSelected = computed(() => {
  const keys = paginatedData.value.map(getRowKey)
  const selectedCount = keys.filter(key => selectionMap.value.has(key)).length
  return selectedCount > 0 && selectedCount < keys.length
})

const toggleRowSelection = (row, event) => {
  const key = getRowKey(row)
  if (event.target.checked) {
    selectionMap.value.set(key, row)
  } else {
    selectionMap.value.delete(key)
  }

  emit('update:selection', Array.from(selectionMap.value.values()))
}

const toggleAllSelection = (e) => {
  const checked = e.target.checked
  if (props.pagination && !isAllSelectedAcross.value) {
    // 当前页全选
    const newMap = new Map(selectionMap.value)
    paginatedData.value.forEach(row => {
      const key = getRowKey(row)
      if (checked) {
        newMap.set(key, row)
      } else {
        newMap.delete(key)
      }
    })
    selectionMap.value = newMap
    emit('update:selection', Array.from(newMap.values()))
  } else {
    // 跨页全选切换
    if (checked) {
      emit('update:selection', [{ __all_selected__: true, total: props.pagination?.total || props.data.length }])
    } else {
      emit('update:selection', [])
    }
  }
}

// 显示选中数量（用于UI提示）
const selectedCount = computed(() => {
  if (isAllSelectedAcross.value) {
    return props.pagination?.total || props.data.length
  }
  return props.selection.length
})

// 同步外部 selection
watch(
  () => props.selection,
  (newVal) => {
    const map = new Map()
    newVal.forEach(row => map.set(getRowKey(row), row))
    selectionMap.value = map
    console.log(selectionMap.value)
  },
  {
    immediate: true
  }
)

//=============
// 列处理（过滤 selection列）
//=============
const visibleColumns = computed(() => {
  return props.columns
})

const hasFixedLeft = computed(() => props.columns.some(col => col.fixed === 'left'))
const hasFixedRight = computed(() => props.columns.some(col => col.fixed === 'right'))

//========================
// 列宽调整逻辑
//========================
const startResize = (event, col) => {
  event.preventDefault()
  const startX = event.pageX
  const startWidth = parseInt(col.width) || 120

  const doDrag = (moveEvent) => {
    const newWidth = startWidth + (moveEvent.pageX - startX)
    if (newWidth > 60) {
      col.width = newWidth + 'px'
      cachedWidths = null // 清除缓存
    }
  }

  const stopDrag = () => {
    document.removeEventListener('mousemove', doDrag)
    document.removeEventListener('mouseup', stopDrag)
  }

  document.addEventListener('mousemove', doDrag)
  document.addEventListener('mouseup', stopDrag)
}


//==================
// 样式辅助
// 计算 fixed right 列的 left 值（需动态计算）
//==================
const getHeaderCellStyle = (col) => {
  const style = {
    width: col.width,
    minWidth: col.minWidth || col.width,
    textAlign: col.align || 'left',
  }

  if (col.fixed === 'left') {
    style.position = 'sticky'
    style.left = computedStickyLeft(col)
    style.zIndex = 10
    style.background = '#f5f7fa'
  } else if (col.fixed === 'right') {
    style.position = 'sticky'
    style.right = computedStickyRight(col)
    style.zIndex = 10
    style.background = '#f5f7fa'
  }

  return style
}

const getCellStyle = (col) => {
  const style = {
    width: col.width,
    minWidth: col.minWidth || col.width,
    textAlign: col.align || 'left',
  }

  if (col.fixed === 'left') {
    style.position = 'sticky'
    style.left = computedStickyLeft(col)
    style.zIndex = 2
    style.background = '#fff'
  } else if (col.fixed === 'right') {
    style.position = 'sticky'
    style.right = computedStickyRight(col)
    style.zIndex = 2
    style.background = '#fff'
  }

  return style
}

//======================
// 计算各列宽度
// 简化：固定列位置按顺序累加（实际生产建议用 ResizeObserver + 精准测量）
//======================
let cachedWidths = null
const computedStickyLeft = (targetCol) => {
  if (!cachedWidths) {
    // 首次触发时计算各列宽度（简化：用width 或 120px 默认）
    cachedWidths = visibleColumns.value.map(col => parseInt(col.width) || 120)
  }
  let total = 0
  for (let i = 0; i < visibleColumns.value.length; i++) {
    const col = visibleColumns.value[i]
    if (col === targetCol) break
    if (col.fixed === 'left') {
      total += cachedWidths[i]
    }
  }

  return total + 'px'
}

const computedStickyRight = (targetCol) => {
  if (!cachedWidths) {
    cachedWidths = visibleColumns.value.map(col => parseInt(col.width) || 120)
  }
  let total = 0
  for (let i = visibleColumns.value.length - 1; i >= 0; i--) {
    const col = visibleColumns.value[i]
    if (col === targetCol) break
    if (col.fixed === 'right') {
      total += cachedWidths[i]
    }
  }

  return total + 'px'
}

//=====================
// 重置缓存（响应式更新时清空）
//=====================
watch(() => props.columns, () => {
  cachedWidths = null
})

</script>

<style scoped>
.my-table-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
}

.my-table-toolbar {
  margin-bottom: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.my-table-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 3px solid #ebeef5;
  border-top-color: #409eff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fl-table {
  position: relative;
  flex: 1;
  overflow: auto;
}


.fl-table--inner {
  /*width: fit-content;*/
  box-sizing: border-box;
  min-width: 100%;
  width: max-content;
  height: max-content;
  min-height: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #606266;
  table-layout: auto;
}

.my-table--border .fl-table--inner th,
.my-table--border .fl-table--inner td {
  border: 1px solid #ebeef5;
}

.fl-table--inner th,
.fl-table--inner td {
  padding: 12px 8px;
  border-bottom: 1px solid #ebeef5;
  vertical-align: middle;
}

.fl-table--inner th {
  position: relative;
  background-color: #f5f7fa;
  font-weight: bold;
  text-align: left;
}

.my-table--stripe tbody tr:nth-child(even) {
  background-color: #fafafa;
}

.fl-table--inner tbody tr:hover {
  background-color: #f5f7fa;
}

.selected-row {
  background-color: #f0f9ff;
}

.cell {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.sort-icon span {
  cursor: pointer;
  opacity: 0.5;
  margin-left: 4px;
}

.sort-icon span.active {
  opacity: 1;
  color: #409eff;
}

.is-sortable .cell {
  cursor: pointer;
}

/* 固定列样式 */
.is-fixed {
  box-shadow: 2px 0 4px -2px rgba(0, 0, 0, 0.1);
}

/* Fixed 列阴影 */
.fixed-left-shadow,
.fixed-right-shadow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 4px;
  pointer-events: none;
  z-index: 11;
}

.fixed-left-shadow {
  left: 0;
  box-shadow: inset -4px 0 6px -4px rgba(0, 0, 0, 0.1);
}

.fixed-right-shadow {
  right: 0;
  box-shadow: inset 4px 0 6px -4px rgba(0, 0, 0, 0.1);
}

.my-table-pagination {
  margin-top: 12px;
  text-align: center;
  font-size: 14px;
  color: #606266;
}

.my-table-pagination button {
  margin: 0 8px;
  padding: 6px 12px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.my-table-pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: -4px;
  width: 8px;
  height: 100%;
  cursor: col-resize;
  z-index: 10;
}

.filter-input-wrapper {
  margin-top: 4px;
}

.filter-input {
  width: 80%;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
}

.filter-select {
  width: 100%;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 12px;
  background: white;
}

/* ========== 筛选触发器 ========== */
.filter-trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  color: #666;
  margin-left: 4px;
}

.filter-icon {
  transition: transform 0.2s;
}

.filter-trigger:hover .filter-icon {
  color: #1890ff;
}

.filter-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 6px;
  height: 6px;
  color: #1890ff;
  border-radius: 50%;
  z-index: 1;
}


/* ========== 筛选浮层 ========== */
.filter-popup {
  position: fixed;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.filter-input-wrapper {
  padding: 8px;
  display: flex;
  gap: 6px;
}

.filter-input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
}

.filter-input:focus {
  border-color: #1890ff;
}

.clear-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: #f5f5f5;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

.filter-options {
  max-height: 200px;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
}

.filter-option {
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.filter-option:hover {
  background: #f5f5f5;
}

.filter-option.active {
  background: #e6f7ff;
  color: #1890ff;
}

.filter-option span {
  display: block;
}

.filter-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 8px;
  border-top: 1px solid #f0f0f0;
}

.filter-footer button {
  padding: 4px 10px;
  border: 1px solid #d9d9d9;
  background: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}

.filter-footer button:hover {
  background: #f5f5f5;
}

.filter-footer .confirm-btn {
  background-color: #1890ff;
  color: white;
  border-color: #1890ff;
}

.filter-footer .confirm-btn:hover {
  background: #4096ff;
}
</style>
