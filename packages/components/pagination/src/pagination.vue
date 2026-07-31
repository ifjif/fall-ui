<template>
  <div :class="[ns.b(), ns.m('size', size)]">
    <template v-for="item in layoutList" :key="item">
      <div v-if="item === 'total'" :class="[ns.e('total')]">共 10 条</div>

      <button v-else-if="item === 'prev'" :class="[ns.e('btn-prev')]" @click="pageChange(currentPage - 1)">&lt;</button>

      <div v-else-if="item === 'pager'" :class="[ns.e('pager-wrapper')]">
        <FlScrollBar wheel="x">
          <ul :class="[ns.e('pager')]">
            <li :class="[ns.e('pager-item'), ns.is('active', page === currentPage)]" v-for="(page, index) in pagerList"
              @click="pagerClick(page, index)">
              {{ page }}
            </li>
          </ul>
        </FlScrollBar>
      </div>

      <button v-else-if="item === 'next'" :class="[ns.e('btn-next')]" @click="pageChange(currentPage + 1)">&gt;</button>

      <div v-else-if="item === 'sizes'" :class="[ns.e('sizes')]">
        <select v-model="pageSize" @change="handleSizeChange">
          <option v-for="size in pageSizes" :key="size" :value="size">{{ size }} 条/页</option>
        </select>
      </div>

      <div v-else-if="item === 'jumper'" :class="[ns.e('jumper')]">
        前往
        <input type="number" v-model.number="jumpPage" @blur="handleJumpBlur" />
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
import { usePagination } from './composables/use-pagination';
import { FlScrollBar } from '@fall-ui/components'
import { watch } from 'vue'
const ns = useNamespace('pagination')

const props = defineProps({
  total: { // 总数据量
    type: Number,
    default: 0
  },
  pageSizes: { // 每页条数选项
    type: Array,
    default: () => [10, 20, 50, 100]
  },
  layout: { // 布局控制
    type: String,
    default: 'total, prev, pager, next, sizes, jumper'
  },
  size: {
    type: String,
    validator(s) {
      return !s || s === 'small'
    },
    default: ''
  }
})

const emit = defineEmits(['change'])

const currentPage = defineModel('currentPage', {
  type: Number,
  default: 1
})

const pageSize = defineModel('pageSize', {
  type: Number,
  default: 10
})

const {
  pagerList,
  jumpPage,
  layoutList,
  pageChange,
  pagerClick,
  handleSizeChange,
  handleJumpBlur,
} = usePagination(props, currentPage, pageSize, emit)

watch(() => props.currentPage, nv => {
  jumpPage.value = nv
})
</script>
