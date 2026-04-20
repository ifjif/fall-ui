<template>
  <h3>table</h3>
  <div style="height: 500px;display: flex;flex-direction: column;">
    <fl-container class="gray">
      <fl-header height="60" class="skyblue">
        header
      </fl-header>
      <fl-container class="gray">
        <fl-aside class="yellow">
          <fl-scrollbar>
            <div style="width:80px;height: 500px;">
              aside
            </div>
          </fl-scrollbar>
        </fl-aside>
        <fl-container class="gray">
          <fl-container class="gray">
            <fl-main class="beige">

              <!-- 注意：跨页全选需要完整数据或知道总数 -->
              <fl-table :data="fullData" :columns="visibleColumns" v-model:selection="selectedRows" :loading="loading"
                :pagination="pagination" border stripe row-key="id" enableResize :remote-sort="false"
                :remote-filter="false" @page-change="handlePageChange" @sort-change="handleSortChange"
                @filter-change="handleFilterChange">
                <template #operation="{ row }">
                  <button @click="edit(row)">编辑</button>
                </template>

                <template #toolbar>
                  <button type="primary" @click="exportExcel">导出 Excel</button>
                  <input type="checkbox" v-model="selectAllAcrossPages" @change="handleSelectAllAcross">
                  跨页全选（共 {{ pagination.total }} 条）
                  </input>
                  <button @click="showColumnPanel = true">列设置</button>
                </template>
              </fl-table>

            </fl-main>
            <fl-aside width="80" class="yellow">
              <fl-scrollbar>
                <div style="height: 500px;">aside</div>
              </fl-scrollbar>
            </fl-aside>
          </fl-container>
          <fl-footer height="60" class="skyblue">
            footer
          </fl-footer>
        </fl-container>
      </fl-container>
    </fl-container>
  </div>

  <!-- 列配置 面板 -->
  <fl-modal v-model="showColumnPanel" title="这是标题">
    <template #content>
      <div class="column-list">
        <div v-for="(element, index) in columnSettings" :key="index" class="column-item">
          <input type="checkbox" v-model="element.visible" />
          <span>{{ element.label }}</span>
          <span class="drag-handle">::</span>
        </div>
      </div>

      <button @click="showColumnPanel = false">取消</button>
      <button @click="applyColumnSettings">确定</button>
    </template>
  </fl-modal>

</template>
<script setup>
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

const selectedRows = ref([])

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
  page.value = 1
  fetchData()
}

const handleFilterChange = (filters) => {
  filterState.value = filters
  page.value = 1
  console.log(filters)
  fetchData()
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
    width: '20%',
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
      width: '20%',
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
      width: '120px',
      align: 'left',
      label: '邮箱',
      prop: 'email',
      //minWidth: '120px', 设置后，无法进行 拖拽大小了
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
  max-height: 400px;
  overflow-y: auto;
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
