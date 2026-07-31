<template>
  <ComponentLayout :anchors="anchors">
    <h2>table</h2>
    <h3 id="fl-table-basic">基础</h3>
    <div style="height:500px;">
      <!-- 注意：跨页全选需要完整数据或知道总数 -->
      <fl-table :data="fullData" :columns="visibleColumns" v-model:selection="selectedRows" :loading="loading"
        :pagination="pagination" border stripe row-key="id" enableResize :remote-sort="true" :remote-filter="true"
        @page-change="handlePageChange" @sort-change="handleSortChange" @filter-change="handleFilterChange">
        <template #operation="{ row }">
          <fl-button type="primary" size="small" @click="edit(row)">编辑</fl-button>
        </template>

        <template #toolbar>
          <button type="primary" @click="exportExcel">导出 Excel</button>
          <!--
          <input type="checkbox" v-model="selectAllAcrossPages" @change="handleSelectAllAcross">
          跨页全选（共 {{ pagination.total }} 条）
          </input>
-->
          <button @click="showColumnPanel = true">列设置</button>
        </template>
      </fl-table>
    </div>

    <!-- 列配置 面板 -->
    <fl-modal fixedScreen @ok="applyColumnSettings" @cancel="showColumnPanel = false" v-model="showColumnPanel"
      title="这是标题">
      <template #content>
        <fl-scrollbar>
          <div class="column-list">
            <div v-for="(element, index) in columnSettings" :key="index" class="column-item">
              <input type="checkbox" v-model="element.visible" />
              <span>{{ element.label }}</span>
              <span class="drag-handle">::</span>
            </div>
          </div>
        </fl-scrollbar>
      </template>
    </fl-modal>

    <h3 id="fl-table-self">自定义</h3>
    <div style="height:500px;">
      <!-- 注意：跨页全选需要完整数据或知道总数 -->
      <fl-table :styles="styles" :data="fullData" :columns="visibleColumns" v-model:selection="selectedRows"
        :loading="loading" :pagination="pagination" border stripe row-key="id" enableResize :remote-sort="false"
        :remote-filter="false" @page-change="handlePageChange" @sort-change="handleSortChange"
        @filter-change="handleFilterChange">
        <template #toolbar>
          <button type="primary" @click="exportExcel">导出 Excel</button>
          <!--
          <input type="checkbox" v-model="selectAllAcrossPages" @change="handleSelectAllAcross">
          跨页全选（共 {{ pagination.total }} 条）
          </input>
          -->
          <button @click="showColumnPanel = true">列设置</button>
        </template>

        <template #operation="{ row }">
          <button @click="edit(row)">编辑</button>
        </template>
      </fl-table>
    </div>

    <h3 id="fl-table-attrs">属性</h3>
    <fl-table :data="data" :columns="columns_">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-table-models">model</h3>
    <fl-table :data="modelData" :columns="columns_"></fl-table>
    <h3 id="fl-table-slots">插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns"></fl-table>
    <h3 id="fl-table-events">事件</h3>
    <fl-table :data="eventData" :columns="eventColumns"></fl-table>

  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns as columns_, slotColumns, eventColumns } from '@/assets/com-props'
import { ref, reactive } from 'vue'

const loading = ref(false)
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 20
})
const selectAllAcrossPages = ref(false)
const sortState = ref({ prop: null, order: null })
const filterState = ref({})

const showColumnPanel = ref(false)
// 跨页全选逻辑
const handleSelectAllAcross = (e) => {
  if (e.target.checked) {
    // 标记“全选所有”，不实际加载全部数据
    selectedRows.value = [{ __all_selected__: true, total: pagination.total }]
  } else {
    selectedRows.value = []
  }
}

const selectedRows = ref([{ id: 1 }])

const handlePageChange = ({ page, pageSize }) => {
  console.log(page, pageSize)
  console.log(pagination.currentPage, pagination.pageSize)
  // 模拟加载
  loading.value = true
  setTimeout(() => {
    fetchData()
    loading.value = false
  }, 500)
}

const edit = (row) => console.log('Edit', row)

// 模拟从 API 获取当前页数据
const fetchData = () => {
  const start = (pagination.currentPage - 1) * pagination.pageSize
  const mockData = Array.from({ length: pagination.pageSize }, (_, i) => ({
    id: start + i + 1,
    name: `用户${start + i + 1}`,
    age: 20 + (i % 10),
    city: ['北京', '上海', '广州', '深圳'][i % 4],
    email: `user${start + i + 1}@example.com`
  }))
  // 如果支持跨页全选但无全量数据，需特殊处理（见下文）
  fullData.value = mockData
}

const fetchData2 = async () => {
  loading.value = true
  // 模拟API
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      page: pagination.currentPage,
      size: pagination.pageSize,
      sortProp: sortState.value.prop,
      sortOrder: sortState.value.order,
      filters: filterState.value
    })
  }).then(r => r.json())
  currentData.value = res.data
  pagination.total = res.total
  loading.value = false
}

const currentData = ref([])

const handleSortChange = (sortList) => {
  console.log('多列排序：', sortList)
  //page.value = 1
  //fetchData()
}

const handleFilterChange = (filters) => {
  filterState.value = filters
  //page.value = 1
  console.log(filters)
  //fetchData()
}
// 如果前端有全量数据，否则需要后端配合
const fullData = ref([
  {
    id: 1, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111',
    children: [
      {
        id: 12, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222',
        children: [
          { id: 121, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
          { id: 122, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
          { id: 123, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
          { id: 124, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
        ]
      },
      { id: 13, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
      { id: 14, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
    ]
  },
  { id: 2, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 3, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 4, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 5, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 6, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 7, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 8, name: '李四', status: 'active', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 9, name: '张三', status: 'active', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 10, name: '李四', status: 'inactive', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 11, name: '张三', status: 'inactive', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 12, name: '李四', status: 'inactive', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 13, name: '张三', status: 'inactive', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 14, name: '李四', status: 'inactive', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 15, name: '张三', status: 'inactive', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
])

// 原始列
const columns = ref([
  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'id', label: 'ID', width: '80px', sortable: true, fixed: 'left' },
  {
    width: '100px',
    align: 'left',
    label: '姓名',
    prop: 'name',
    filterable: true,
  },
  {
    width: '120px',
    align: 'center',
    label: '年龄',
    prop: 'age',
    sortable: true,
  },
  {
    width: '120px',
    align: 'center',
    label: '状态',
    prop: 'status',
    filterable: true,
    filterOptions: [
      { value: 'active', label: '启用' },
      { value: 'inactive', label: '禁用' },
    ]
  },
  {
    width: '20%',
    align: 'left',
    label: '性别',
    prop: 'gener'
  },
  {
    width: '20%',
    align: 'left',
    label: '地区',
    prop: 'city'
  },
  {
    width: '120px',
    align: 'left',
    label: '邮箱',
    prop: 'email',
    minWidth: '180px'
  },
  {
    width: '300px',
    align: 'left',
    label: '出生日期',
    prop: 'birthday'
  },
  {
    width: '100px',
    align: 'left',
    label: '电话号码',
    prop: 'phone',
  },
  {
    prop: 'operation', label: '操作', width: '100px',
    fixed: 'right',
  }
])

setTimeout(() => {
  columns.value = [
    { type: 'selection', width: '55px', fixed: 'left', resizable: true },
    { prop: 'id', label: 'ID', width: '80px', sortable: true, fixed: 'left', resizable: true },
    {
      width: '100px',
      align: 'left',
      label: '姓名',
      prop: 'name',
      resizable: true,
      filterable: true,
    },
    {
      width: '120px',
      align: 'center',
      label: '年龄',
      prop: 'age',
      sortable: true,
      resizable: true,
      filterable: true,
    },
    {
      width: '120px',
      align: 'center',
      label: '状态',
      prop: 'status',
      filterable: true,
      filterOptions: [
        { value: 'active', label: '启用' },
        { value: 'inactive', label: '禁用' },
      ]
    },
    {
      width: '20%',
      align: 'left',
      label: '性别',
      prop: 'gener',
      resizable: true
    },
    {
      width: '20%',
      align: 'left',
      label: '地区',
      prop: 'city',
      resizable: true
    },
    {
      width: '160px',
      align: 'left',
      label: '邮箱',
      prop: 'email',
      minWidth: '120px',
      resizable: true
    },
    {
      width: '300px',
      align: 'left',
      label: '出生日期',
      prop: 'birthday',
      resizable: true
    },
    {
      width: '1000px',
      align: 'left',
      label: '电话号码',
      prop: 'phone',
      resizable: true
    },
    {
      prop: 'operation', label: '操作', width: '100px',
      fixed: 'right',
      resizable: true
    }
  ]
}, 2000)

// 当前可见列
const visibleColumns = ref(columns.value.filter(col => col.prop !== 'email'))
// 列设置面板数据
const columnSettings = ref(columns.value.map(col => ({
  prop: col.prop,
  label: col.label,
  visible: visibleColumns.value.some(v => v.prop === col.prop)
})))
const applyColumnSettings = () => {
  visibleColumns.value = columns.value.filter(col =>
    columnSettings.value.find(s => s.prop === col.prop)?.visible
  )
  showColumnPanel.value = false
}
/*
#FF5733 (鲜亮的珊瑚红)
#33FF57 (清新的薄荷绿)
#3357FF (深邃的皇家蓝)
#F0E68C (柔和的卡其色)
#8A2BE2 (优雅的蓝紫色)
#FF69B4 (活泼的热粉色)
#00CED1 (清透的暗绿松石色)
#FF8C00 (浓郁的暗橙色)
#7FFF00 (明艳的黄绿色)
#4B0082 (神秘的靛青色)
#DC143C (热烈的猩红色)
#00FA9A (透亮的中春绿色)
#BA55D3 (温柔的中兰花紫)
#2F4F4F (沉稳的暗灰色)
*/

const styles = {
  root: {
    color: '#FF5733',
    bd_color: '#33FF57',
    th_bg_color: '#3357FF',
    tr_bg_color: '#F0E68C',
    filter_icon_color: '#8A2BE2',
    filter_icon_badge_color: '#FF69B4',
    tree_icon_color: '#00CED1'
  },
  fixed: {
    th_bg_color: '#7FFF00',
    tr_bg_color: '#FF8C00',
  },
  active: {
    sort_icon_color: '#4B0082',
    tree_icon_color: '#DC143C',
  },
  hover: {
    bg_color: '#00FA9A',
    filter_icon_color: '#BA55D3',
  },
  stripe: {
    bg_color: '#2F4F4F'
  }
}
const styles_ = {
  root: {
    color: '',
    bd_color: '',
    th_bg_color: '',
    tr_bg_color: '',
    filter_icon_color: '',
    filter_icon_badge_color: '',
    tree_icon_color: ''
  },
  fixed: {
    th_bg_color: '',
    tr_bg_color: '',
  },
  active: {
    sort_icon_color: '',
    tree_icon_color: '',
  },
  hover: {
    bg_color: '',
    filter_icon_color: '',
  },
  stripe: {
    bg_color: ''
  }
}

const anchors = [
  { title: '基础', href: '#fl-table-basic' },
  { title: '自定义', href: '#fl-table-self' },
  { title: '属性', href: '#fl-table-attrs' },
  { title: 'model', href: '#fl-table-models' },
  { title: '插槽', href: '#fl-table-slots' },
  { title: '事件', href: '#fl-table-events' },
]

const columns__ = {
  type: 'selection',
  prop: '',
  label: '',
  width: '',
  minWidth: '',
  fixed: 'left/right',
  align: 'left/right/center',
  sortable: 'true/false',
  resizable: 'true/false',
  filterable: 'true/false',
  filterOptions: [
    { value: '', label: '' },
  ]
}


const data = [
  { name: 'data', type: 'Array', default: '[]', value: '', desc: 'columns中prop对应的值就是它的key' },
  { name: 'columns', type: 'Array', default: '[]', value: JSON.stringify(columns__, null, 2), desc: '列配置,type,prop二选一' },
  { name: 'loading', type: 'Boolean', default: 'false', value: 'true, false', desc: '带加载屏障' },
  { name: 'border', type: 'Boolean', default: 'false', value: 'true, false', desc: '带边框' },
  { name: 'stripe', type: 'Boolean', default: 'false', value: 'true, false', desc: '带条纹' },
  { name: 'rowKey', type: 'String', default: 'id', value: '', desc: 'key属性名' },
  { name: 'enableResize', type: 'Boolean', default: 'false', value: 'true, false', desc: '列可改变大小' },
  {
    name: 'remoteSort', type: 'Boolean', default: 'false', value: 'true, false', desc:
      '排序为远程排序，true会触发sort-change事件'
  },
  {
    name: 'remoteFilter', type: 'Boolean', default: 'false', value: 'true, false', desc:
      '过滤为远程过滤,true会触发filter-change'
  },
  { name: 'pagination', type: 'Object', default: 'null', value: '{currentPage, pageSize, total}', desc: '' },
  { name: 'treeProps', type: 'Object', default: '{ children: "children" }', value: '{children:}', desc: '孩子属性' },
  { name: 'indentSize', type: 'Number', default: '8', value: '', desc: '属性缩进' },
  { name: 'expandAll', type: 'Boolean', default: 'false', value: 'true, false', desc: '整页展开' },
  { name: 'styles', type: 'Object', default: '', value: JSON.stringify(styles_, null, 2), desc: '自定义样式' },
]

const modelData = [
  { name: 'selection', type: 'Array', default: '[]', value: '', desc: '选中的行, 数据是data中的' },
]

const slotData = [
  { name: 'toolbar', param: '', desc: '表格上方的工具栏' },
  { name: '', param: '{row, $index}', desc: 'columns中prop对应的值就是它的 slot name' },
]

const eventData = [
  {
    name: 'sort-change', params: '([{prop:"", order:"ascending | descending"},...])', desc:
      '排序事件'
  },
  { name: 'filter-change', params: '({prop:value, ...})', desc: '过滤事件' },
  { name: 'page-change', params: '({ page, pageSize })', desc: '页改变事件' }
]

</script>

<style scoped>
.gray {
  background-color: gray;
}

.skyblue {
  background-color: skyblue;
}

.yellow {
  background-color: yellow;
}

.beige {
  background-color: beige;
}

.column-list {
  min-width: 400px;
  min-height: 400px;
}

.column-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  border: 1px solid #eee;
  margin-bottom: 4px;
  border-radius: 4px;
}

.drag-handle {
  cursor: move;
  color: #999;
}
</style>
