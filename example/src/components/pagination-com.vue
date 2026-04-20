<template>
  <h3>pagination</h3>
  <div>
    <p>total,prev,pager,next,sizes,jumper</p>
    <fl-pagination v-model:currentPage="page1.currentPage" v-model:pageSize="page1.pageSize" :total="page1.total"
      @change="page1Change"></fl-pagination>
    <p>total,prev,pager,next,sizes,jumper</p>
    <fl-pagination size="small" v-model:currentPage="page2.currentPage" v-model:pageSize="page2.pageSize"
      :total="page2.total" :pageSizes="page2.pageSizes"></fl-pagination>
    <p>total</p>
    <fl-pagination layout="total" v-model:currentPage="page3.currentPage" v-model:pageSize="page3.pageSize"
      :total="page1.total"></fl-pagination>
    <p>prev</p>
    <fl-pagination layout="prev" v-model:currentPage="page4.currentPage" v-model:pageSize="page4.pageSize"
      :total="page4.total"></fl-pagination>
    <p>pager</p>
    <fl-pagination layout="pager" v-model:currentPage="page5.currentPage" v-model:pageSize="page5.pageSize"
      :total="page5.total"></fl-pagination>
    <p>next</p>
    <fl-pagination layout="next" v-model:currentPage="page6.currentPage" v-model:pageSize="page6.pageSize"
      :total="page6.total"></fl-pagination>
    <p>sizes</p>
    <fl-pagination layout="sizes" v-model:currentPage="page7.currentPage" v-model:pageSize="page7.pageSize"
      :total="page7.total"></fl-pagination>
    <p>jumper</p>
    <fl-pagination layout="jumper" v-model:currentPage="page8.currentPage" v-model:pageSize="page8.pageSize"
      :total="page8.total"></fl-pagination>
    <p>jumper,sizes,next,pager,prev,total</p>
    <fl-pagination layout="jumper,sizes,next,pager,prev,total" v-model:currentPage="page9.currentPage"
      :pageSize="page9.pageSize" :total="page9.total"></fl-pagination>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'
const page1 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})

const page1Change = () => {
  console.log(page1.value)
}

const page2 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000,
  pageSizes: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
})
const page3 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page4 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page5 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page6 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page7 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page8 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
const page9 = ref({
  currentPage: 1,
  pageSize: 10,
  total: 1000
})
</script>
