<template>
  <div style="margin-top:100px;">
  </div>

  <div style="height: 400px;display: flex;flex-direction: column;">
    <fl-container class="gray">
      <fl-header height="60" class="skyblue">
        header
      </fl-header>
      <fl-container class="gray">
        <fl-aside width="80" class="yellow">
          <fl-scrollbar>
            <div style="height: 500px;">aside</div>
          </fl-scrollbar>
        </fl-aside>
        <fl-container class="gray">
          <fl-container class="gray">
            <fl-main class="beige">

              <fl-table :data="data" :columns="columns" v-model:selection="selectedRows" :loading="loading" :pagination="{
                currentPage: page,
                pageSize: size,
                total: total,
                onPageChange: handlePageChange
              }" border stripe row-key="id">
                <template #operation="{ row }">
                  <button @click="edit(row)">编辑</button>
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
</template>
<script setup>
import { ref } from 'vue'

const loading = ref(false)
const page = ref(1)
const size = ref(10)
const total = ref(20)

const data = [
  { id: 1, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 2, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 3, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 4, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 5, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 6, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 7, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 8, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 9, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 10, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 11, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 12, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 13, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
  { id: 14, name: '李四', age: 13, gener: '男', city: '上海', email: 'shanghan', birthday: '2024', phone: '2222222222', },
  { id: 15, name: '张三', age: 12, gener: '男', city: '深圳', email: 'xxxx', birthday: '2023', phone: '1111111111', },
]

const columns = ref([
  { type: 'selection', width: '55px', fixed: 'left' },
  { prop: 'id', label: 'ID', width: '80px', sortable: true, fixed: 'left' },
  {
    width: '20%',
    align: 'left',
    label: '姓名',
    prop: 'name'
  },
  {
    width: '120px',
    align: 'center',
    label: '年龄',
    prop: 'age',
    sortable: true,
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
    { type: 'selection', width: '55px', fixed: 'left' },
    { prop: 'id', label: 'ID', width: '80px', sortable: true, fixed: 'left' },
    {
      width: '20%',
      align: 'left',
      label: '姓名',
      prop: 'name'
    },
    {
      width: '120px',
      align: 'center',
      label: '年龄',
      prop: 'age',
      sortable: true,
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
      width: '1000px',
      align: 'left',
      label: '电话号码',
      prop: 'phone',
    },
    {
      prop: 'operation', label: '操作', width: '100px',
      fixed: 'right',
    }
  ]
}, 2000)

const selectedRows = ref([])

const handlePageChange = (newPage) => {
  page.value = newPage
  // 模拟加载
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

const edit = (row) => console.log('Edit', row)
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
</style>
