<template>
  <div style="margin-top:100px;">
    <fl-table :data="data" :columns="columns"></fl-table>
  </div>
</template>
<script setup>
const data = [
  {
    name: '张三',
    age: 12,
    gener: '男',
    city: '深圳',
    email: 'xxxx',
    birthday: '2023',
    phone: '123432434',
  },
  {
    name: '李四',
    age: 12,
    gener: '男',
    city: '深圳',
    email: 'xxxx',
    birthday: '2023',
    phone: '123432434',
  }
]

const columns = [
  {
    width: '20%',
    align: 'left',
    label: '姓名',
    prop: 'name'
  },
  {
    width: '20%',
    align: 'left',
    label: '年龄',
    prop: 'age'
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
    width: '20%',
    align: 'left',
    label: '邮箱',
    prop: 'email'
  },
  {
    width: '300px',
    align: 'left',
    label: '出生日期',
    prop: 'birthday'
  },
  {
    width: '300px',
    align: 'left',
    label: '电话号码',
    prop: 'phone'
  }
]
</script>
