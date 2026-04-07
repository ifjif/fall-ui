<template>
  <div class="my-table-wrapper" ref="tableWrapperRef">
    <!-- 加载遮罩 -->
    <div v-if="loading" class="my-table-loading">
      <div class="spinner"></div>
    </div>

    <div :class="[ns.b(), { 'my-table--border': border, 'my-table--stripe': stripe }]" ref="tablRef">
      <FlScrollBar ref="flScrollBar">
        <table :class="[ns.m('inner')]">
          <thead style="position:sticky;top:0;z-index:10;">
            <tr>
              <th v-for="col in visibleColumns" :key="col.prop || col.type" :style="getHeaderCellStyle(col)"
                :class="{ 'is-sortable': col.sortable, 'is-fixed-left': col.fixed === 'left', 'is-fixed-right': col.fixed === 'right' }"
                @click="col.sortable ? handleSort(col.prop) : null">
                <div class="cell">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" :checked="allSelected" :indeterminate="partialSelected"
                      @change="toggleAllSelection" />
                  </template>
                  <template v-else>
                    {{ col.label }}
                    <span v-if="col.sortable" class="sort-icon">
                      <span :class="{ active: sortProp === col.prop && sortOrder === 'ascending' }"
                        @click.stop="setSort(col.prop, 'ascending')">↑</span>

                      <span :class="{ active: sortProp === col.prop && sortOrder === 'descending' }"
                        @click.stop="setSort(col.prop, 'descending')">↓</span>
                    </span>
                  </template>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in paginatedData" :key="getRowKey(row)"
              :class="{ 'selected-row': selectionMap.has(getRowKey(row)) }">
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
    </div>
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
import { computed, ref, watch } from 'vue'
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
    default: () => []
  },
  loading: { type: Boolean, default: false },
  border: { type: Boolean, default: false },
  stripe: { type: Boolean, default: false },
  pagination: {
    type: Object,
    dfeault: null // {currentPage, pageSize, total, onPageChange}
  },
  // 双向绑定多选
  selection: { type: Array, default: () => [] },
  rowKey: { type: String, default: 'id' } // 自定义 row-key 字段名
})

const emit = defineEmits(['update:selection'])
//====================
// refs
//====================
const tableWrapperRef = ref(null)
const tableRef = ref(null)

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
const sortProp = ref(null)
const sortOrder = ref('ascending') // 'ascending' | 'descending'

const sortedData = computed(() => {
  if (!sortProp.value) return props.data
  const factor = sortOrder.value === 'ascending' ? 1 : -1
  return [...props.data].sort((a, b) => {
    const aVal = a[sortProp.value]
    const bVal = b[sortProp.value]
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return (aVal - bVal) * factor
    }
    return (String(aVal).localeCompare(String(bVal))) * factor
  })
})

const handleSort = (prop) => {
  if (sortedData.value === prop) {
    sortOrder.value = sortOrder.value === 'ascending' ? 'descending' : 'ascending'
  } else {
    sortProp.value = prop
    sortOrder.value = 'ascending'
  }
}

const setSort = (prop, order) => {
  sortProp.value = prop
  sortOrder.value = order
}

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
  flScrollBar.value.scrollToTop()
  flScrollBar.value.scrollToLeft()
}
const afterPage = (onPageChange, page) => {
  onPageChange(page)
  flScrollBar.value.scrollToTop()
  flScrollBar.value.scrollToLeft()
}

//==================
// 多选 & 全选
//==================
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
}

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
    style.zIndex = 9
    style.background = '#fff'
  } else if (col.fixed === 'right') {
    style.position = 'sticky'
    style.right = computedStickyRight(col)
    style.zIndex = 9
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
  flex: 1;
  overflow: auto;
}

.fl-table--inner {
  /*width: fit-content;*/
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
  display: flex;
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
  z-index: 8;
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
</style>
