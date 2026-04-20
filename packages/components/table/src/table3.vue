<template>
  <div :class="[ns.b(), ns.is('border', border), ns.is('stripe', stripe)]">
    <!-- 加载 遮罩 -->
    <fl-loading :loading="loading" />

    <!-- 顶部工具栏 -->
    <div v-if="$slots.toolbar" :class="[ns.e('toolbar')]">
      <slot name="toolbar" />
    </div>

    <!-- 表格 -->
    <div :class="[ns.e('wrapper')]">
      <fl-scrollbar @resize="handleResize">
        <table :class="[ns.e('inner')]">
          <thead :class="[ns.e('thead')]">
            <tr :class="[ns.e('tr')]">
              <th v-for="col in visibleColumns" :key="col.prop || col.type" :style="[getHeaderCellStyle(col)]">
                <!-- 原内容 -->
                <div :class="[ns.e('cell')]">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" />
                  </template>
                  <template v-else>
                    {{ col.label }}
                  </template>

                  <!-- 排序图标 有sortable 或 remote-sort+sortable -->
                  <span v-if="col.sortable || (remoteSort && col.sortable)" :class="[ns.e('sort-icon')]"
                    @click.stop="triggerSort(col.prop)">
                    <span :class="[ns.is('active', getSortOrder(col.prop) === 'ascending')]">↑</span>
                    <span :class="[ns.is('active', getSortOrder(col.prop) === 'descending')]">↓</span>
                  </span>
                </div>

                <!-- 拖拽手柄 -->
                <div v-if="enableResize && col.resizable === true" :class="[ns.e('resize-handle')]"
                  @mousedown="startResize($event, col)">
                </div>

                <!-- 筛选浮层 -->
                <fl-popconfirm placement="bottom" :class="[ns.e('filter-trigger')]"
                  v-if="col.filterable || (remoteFilter && col.filterable)">
                  <template #reference>
                    <span :class="[ns.e('filter-icon')]">▼</span>
                    <span v-if="filterValues[col.prop]" :class="[ns.e('filter-badge')]">●</span>
                  </template>

                  <!-- 输入筛选 -->
                  <div v-if="!col.filterOptions" :class="[ns.e('filter-input-wrapper')]">
                    <input @input="handleFilterInput(col.prop, $event.target.value)" :class="[ns.e('filter-input')]"
                      v-model="filterValues[col.prop]" :placeholder="`筛选${col.label}`" />
                  </div>
                  <!-- 下拉筛选 -->
                  <ul v-else :class="[ns.e('filter-options')]">
                    <li :class="[ns.e('filter-option'), ns.is('active', !filterValues[col.prop])]"
                      @click="handleFilterSelect(col.prop, '')">全部</li>
                    <li :class="[ns.e('filter-option'), ns.is('active', filterValues[col.prop] === opt.value)]"
                      v-for="opt in col.filterOptions" :key="opt.value"
                      @click="handleFilterSelect(col.prop, opt.value)">
                      <span>{{ opt.label }}</span>
                    </li>
                  </ul>
                </fl-popconfirm>
              </th>

              <!-- 占位 -->
              <th :class="[ns.e('placeholder-th')]"
                :style="{ right: `${-placeholderWidth}px`, width: `${placeholderWidth}px` }">
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, index) in paginatedData" :class="[ns.e('tr')]">
              <td v-for="col in visibleColumns" :style="[getCellStyle(col)]">
                <div :class="[ns.e('cell')]">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" />
                  </template>
                  <!-- 有对应插槽，显示它，否则只显示文本, 并专递 row $index 变量 
                  父中  <template #[prop] = "{row, $index}"
                  -->
                  <slot v-else-if="$slots[col.prop]" :name="col.prop" :row="row" :$index="index"></slot>
                  <template v-else>
                    {{ row[col.prop] }}
                  </template>
                </div>
              </td>

              <!-- 占位 -->
              <td :class="[ns.e('placeholder-td')]"
                :style="{ right: `${-placeholderWidth}px`, width: `${placeholderWidth}px` }">
              </td>
            </tr>
          </tbody>
        </table>
      </fl-scrollbar>
    </div>

    <!-- 分页器 -->
    <fl-pagination v-model:currentPage="innerCurrentPage" v-model:pageSize="innerPageSize" :total="pagination.total"
      @change="handlePageChange">
    </fl-pagination>

  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { useTable } from './composables/use-table';
const ns = useNamespace('table')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { useTable } from './composables/use-table';
import { watch } from 'vue'
const ns = useNamespace('table')

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    required: true,
    validator(cols) {
      return cols.every(col => col.type === 'selection' || (typeof col.label === 'string' && (col.prop || col.type))
      )
    },
    default: () => []
  },
  loading: { type: Boolean, default: () => false },
  border: { type: Boolean, default: () => false },
  stripe: { type: Boolean, default: () => false },
  enableResize: { type: Boolean, default: () => false },
  remoteSort: { type: Boolean, default: () => false },
  remoteFilter: { type: Boolean, default: () => false },
  pagination: { //{currentPage, pageSize, total, onPageChange}
    type: Object,
    default: () => null
  }
})

const emit = defineEmits(["sort-change", "filter-change", "page-change"])


const {
  visibleColumns,
  placeholderWidth,
  paginatedData,
  innerCurrentPage,
  innerPageSize,
  filterValues,
  getHeaderCellStyle,
  getCellStyle,
  getSortOrder,
  clearCacheWidths,
  startResize,
  handleResize,
  triggerSort,
  handleFilterSelect,
  handleFilterInput,
  handlePageChange,
  getColByProp
} = useTable(props, emit)

// 重置缓存
watch(props.columns, () => {
  clearCacheWidths()
})
</script>
