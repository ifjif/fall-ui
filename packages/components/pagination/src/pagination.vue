<template>
  <div class="my-pagination" :class="[sizeClass]">
    <!-- 动态渲染区域 -->
    <template v-for="item in layoutList" :key="item">
      <!--1.总条数 -->
      <div v-if="item === 'total'" class="pagination-total">
        共 {{ total }} 条
      </div>

      <!-- 2.上一页 -->
      <button v-else-if="item === 'prev'" class="btn-prev" :disable="currentPage === 1"
        @click="changePage(currentPage - 1)">
        < </button>

          <!-- 3.页码 -->
          <ul v-else-if="item === 'pager'" class="pagination-pager">
            <li v-for="(page, index) in pagerList" :key="page" class="pager-item"
              :class="{ active: page === currentPage, 'is-disabled': page === '...' }"
              @click="handlePagerClick(page, index)">
              {{ page }}
            </li>
          </ul>

          <!-- 4.下一页 -->
          <button v-else-if="item === 'next'" class="btn-next" :disabled="currentPage === pageCount"
            @click="changePage(currentPage + 1)">
            >
          </button>

          <!-- 5.每页条数切换 -->
          <div v-else-if="item === 'sizes'" class="pagination-sizes">
            <select v-model="currentPageSize" @change="handleSizeChange">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }} 条/页
              </option>
            </select>
          </div>

          <!-- 快速跳转 -->
          <div v-else-if="item === 'jumper'" class="pagination-jumper">
            前往
            <input type="number" v-model.number="jumpPage" @blur="handleJumpBlur" @keyup.enter="handleJumpEnter" />
            页
          </div>
    </template>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('pagination')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { ref, computed, watch } from 'vue'
const ns = useNamespace('pagination')


const props = defineProps({
  currentPage: { type: Number, default: 1 }, // 当前页
  pageSize: { type: Number, default: 10 }, // 每页条数
  total: { type: Number, default: 0 }, // 数据总量
  pageSizes: { type: Array, default: () => [10, 20, 50, 100] }, // 每页条数选项
  layout: { type: String, default: 'total, prev, pager, next, sizes, jumper' }, // 布局控制
  size: { type: String, default: 'default', validator: (v) => ['default', 'small'].includes(v) }
})


const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change'])
const sizeClass = computed(() => `pagination-${props.size}`)
// 将layout 字符串转换成数组
const layoutList = computed(() => {
  return props.layout.split(',').map(item => item.trim())
})

// 计算总页数
const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

// 内部状态
const jumpPage = ref(props.currentPage)

// 生成页码列表
// 当页数较多时显示 省略号
const pagerCount = 7; // 最多显示的页码数量（包括省略号占位）

const pagerList = computed(() => {
  const current = props.currentPage
  const total = pageCount.value
  const list = []

  if (total <= pageCount) {
    // 如果总页数少于最大显示数, 直接显示所有
    for (let i = 1; i <= total; i++) list.push(i)
  } else {
    // 处理省略号逻辑
    let start = Math.max(1, current - 2)
    let end = Math.min(total, start + pagerCount - 1)

    // 重新调整start,确保始终显示固定数量的按钮
    if (end - start < pagerCount - 1) {
      start = Math.max(1, end - pagerCount + 1)
    }

    // 首页总是显示
    list.push(1)

    // 如果start > 2,说明前面需要省略号
    if (start > 2) {
      list.push('...')
    }

    // 中间页码
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== total) {
        list.push(i)
      }
    }

    // 如果 end < total - 1, 说明后面需要省略号
    if (end < total - 1) {
      list.push('...')
    }

    // 末页总是显示
    if (total > 1) list.push(total)
  }

  return list
})

// 切换页码
const changePage = (page) => {
  if (page < 1 || page > pageCount.value || page === props.currentPage) return

  emit('update:currentPage', page)
  emit('change', { page, pageSize: props.pageSize })
}

// 处理省略号点击（快速跳5页）
const handlePagerClick = (page, index) => {
  if (page === '...') {
    // 如果点在左边省略号，向前跳5页，右边则向后跳5页
    const isStartEllipsis = (index - 1) === 0;
    const jumpDistance = 5;
    if (isStartEllipsis) {
      changePage(props.currentPage - jumpDistance)
    } else {
      changePage(props.currentPage + jumpDistance)
    }

    return
  }

  changePage(page)
}


// 改变每页条数
const currentPageSize = ref(props.pageSize)
const handleSizeChange = () => {
  emit('update:pageSize', currentPageSize.value)
  // 改变条数通常重置回第一页
  emit('update:currentPage', 1)
  emit('change', { page: 1, pageSize: currentPageSize.value })
}

// 跳转输入框失焦
const handleJumpBlur = () => {
  if (!jumpPage.value) {
    jumpPage.value = props.currentPage
    return
  }

  let page = parseInt(jumpPage.value)
  if (page < 1) page = 1
  if (page > pageCount.value) page = pageCount.value

  if (page !== props.currentPage) {
    changePage(page)
  } else {
    jumpPage.value = props.currentPage // 校验失败恢复原状
  }
}

// 跳转回车
const handleJumpEnter = () => {
  handleJumpBlur()
}

// 监听外部变化，同步输入框状态
watch(() => props.currentPage, (val) => {
  jumpPage.value = val
})
</script>

<style scoped>
.my-pagination {
  --pg-height: 32px;
  --pg-font-size: 14px;
  --pg-padding: 0 8px;
  --pg-border-radius: 4px;
  --pg-gap: 8px;
  display: flex;
  align-items: center;
  gap: var(--pg-gap);
  font-size: var(--pg-font-size);
  color: #606266;
  user-select: none;
}

.pagination-small {
  --pg-height: 24px;
  --pg-font-size: 12px;
  --pg-padding: 0 5px;
  --pg-gap: 4px;
}

.btn-prev,
.btn-next {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  min-width: var(--pg-height);
  height: var(--pg-height);
  cursor: pointer;
  border-radius: var(--pg-border-radius);
  transition: all 0.3s;
}

.btn-prev:hover,
.btn-next:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.btn-prev:disabled,
.btn-next:disabled {
  cursor: not-allowed;
  color: #c0c4cc;
  background: #f5f7fa;
  border-color: #e4e7ed;
}

/* 页码列表 */
.pagination-pager {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 4px;
}

.pager-item {
  min-width: var(--pg-height);
  height: var(--pg-height);
  line-height: var(--pg-height);
  text-align: center;
  cursor: pointer;
  border-radius: var(--pg-border-radius);
  color: #606266;
  box-sizing: border-box;
  padding: var(--pg-padding);
}

.pager-item:hover {
  color: #409eff;
}

.pager-item.active {
  background-color: #409eff;
  color: #fff;
}

.pager-item.is-disabled {
  cursor: default;
  color: #c0c4cc;
}

.pager-item.is-disabled:hover {
  color: #c0c4cc;
  background: transparent;
}

/* 下拉框与输入框 */
.pagination-sizes select,
.pagination-jumper input {
  height: var(--pg-height);
  line-height: var(--pg-height);
  padding: 0 8px;
  border: 1px solid #dcdfe6;
  border-radius: var(--pg-border-radius);
  outline: none;
  color: #606266;
  font-size: var(--pg-font-size);
  transition: border-color 0.3s;
}

.pagination-sizes select:focus,
.pagination-jumper input:focus {
  border-color: #409eff;
}

.pagination-jumper input {
  width: 50px;
  text-align: center;
}
</style>
