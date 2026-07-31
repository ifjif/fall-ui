<template>
  <div :style="styles" :class="[ns.b(), ns.is('border', border), ns.is('stripe', stripe)]">
    <!-- 加载 遮罩 -->
    <FlLoading :loading="loading" />

    <!-- 顶部工具栏 -->
    <div v-if="$slots.toolbar" :class="[ns.e('toolbar')]">
      <slot name="toolbar" />
    </div>

    <!-- 表格 -->
    <div :class="[ns.e('wrapper')]">
      <FlScrollBar @resize="handleResize">
        <table :class="[ns.e('inner')]">
          <thead :class="[ns.e('thead')]">
            <tr :class="[ns.e('tr')]">
              <th v-for="col in visibleColumns" :key="col.prop || col.type" :style="[getHeaderCellStyle(col)]">
                <!-- 原内容 -->
                <div :class="[ns.e('cell')]">
                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" :checked="allSelected" :indeterminate="partialSelected"
                      @change="toggleAllSelection($event)" />
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
                <FlPopover :showArrow="false" placement="bottom" :class="[ns.e('filter-trigger')]"
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
                </FlPopover>
              </th>

              <!-- 占位 -->
              <th :class="[ns.e('placeholder-th'), ns.is('placeholder-non-border', !props.border)]"
                :style="{ right: `${placeholderRight}px`, width: `${placeholderWidth}px` }">
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(row, index) in flatData" :class="[ns.e('tr')]" :key="getRowKey(row)">
              <td v-for="col in visibleColumns" :style="[getCellStyle(col, row.__level)]">
                <div :class="[ns.e('cell')]">
                  <!-- 树形控件 -->
                  <template v-if="col === visibleColumns[0] && isTreeData">
                    <span :class="[ns.e('tree-toggle'),
                    ns.is('tree-toggle-expanded', expandedKeys.has(row[props.rowKey]))
                    ]" v-if="!row.__isLeaf" @click.stop="toggleExpand(row)">
                      ▶
                    </span>

                    <!-- 无叶子节点，保持占位空间 -->
                    <span v-else :class="[ns.e('tree-toggle')]"></span>

                    <!--缩进占位 -->
                    <span v-if="col === visibleColumns[0]" :class="[ns.e('tree-indent')]"
                      :style="{ width: `${row.__level * props.indentSize}px` }"></span>
                  </template>

                  <template v-if="col.type === 'selection'">
                    <input type="checkbox" :checked="selectionMap.data.has(getRowKey(row))"
                      @change="toggleRowSelection($event, row)" />
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
              <td :class="[ns.e('placeholder-td'), ns.is('placeholder-non-border', !props.border),
              ns.is('last-placeholder', index === (flatData.length - 1))
              ]" :style="{ right: `${placeholderRight}px`, width: `${placeholderWidth}px` }">
              </td>
            </tr>
          </tbody>
        </table>
      </FlScrollBar>
    </div>

    <div v-if="props.pagination" :class="[ns.e('pagination')]">
      <!-- 分页器 -->
      <FlPagination v-model:currentPage="innerCurrentPage" v-model:pageSize="innerPageSize" :total="pagination.total"
        @change="handlePageChange">
      </FlPagination>
    </div>

  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { useTable } from './composables/use-table';
import { FlLoading, FlScrollBar, FlPopover, FlPagination } from '@fall-ui/components'
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
  rowKey: { type: String, default: 'id' }, // 自定义 row-key 字段名
  enableResize: { type: Boolean, default: () => false },
  remoteSort: { type: Boolean, default: () => false },
  remoteFilter: { type: Boolean, default: () => false },
  pagination: { //{currentPage, pageSize, total}
    type: Object,
    default: () => null
  },
  treeProps: {
    type: Object,
    default: () => ({ children: 'children' })
  },
  indentSize: { type: Number, default: 8 },
  expandAll: {
    type: Boolean,
    default: () => false
  },
  styles: {
    type: Object
  }
})

const emit = defineEmits(["sort-change", "filter-change", "page-change"])

const selection = defineModel('selection', {
  type: Array,
  default: () => []
})


const {
  selectionMap,
  visibleColumns,
  placeholderWidth,
  placeholderRight,
  paginatedData,
  innerCurrentPage,
  innerPageSize,
  filterValues,
  isTreeData,
  expandedKeys,
  flatData,
  allSelected,
  partialSelected,
  styles,
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
  toggleExpand,
  toggleRowSelection,
  toggleAllSelection,
  getColByProp,
  getRowKey,
  flattenTree,
  collectExpandableKeys
} = useTable(props, emit, selection)

// 重置缓存
watch(() => props.columns, () => {
  clearCacheWidths()
})

watch(() => paginatedData.value, (newData) => {
  if (props.expandAll) {
    collectExpandableKeys(newData)
  }
  flatData.value = flattenTree(newData)
}, { immediate: true })

watch(() => selection.value, (data) => {
  // 判断 selectionMap是否被内部改变
  // 是，selection也变了，这次更新不需要
  if (selectionMap.value.change) {
    selectionMap.value.change = false
    return
  }
  if (!data || !data?.length || data.length <= 0) return

  data.forEach(item => {
    selectionMap.value.data.set(getRowKey(item), item)
  })
}, { immediate: true })

</script>
