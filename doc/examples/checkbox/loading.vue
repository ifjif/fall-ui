<template>
  <p>通过loaing属性触发</p>
  <fl-checkbox loading label="primary"></fl-checkbox>
  <fl-checkbox loading type="success" label="success"></fl-checkbox>
  <p>通过给beforeChange传递返回Promise对象的函数后，点击触发</p>
  <p>请注意，必须返回Promise对象，否则可能会一直加载</p>
  <fl-checkbox :beforeChange="beforeChange1" type="warning" label="warning"></fl-checkbox>
  <fl-checkbox :beforeChange="beforeChange1" type="error" label="error"></fl-checkbox>
</template>
<script setup>
const beforeChange1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const beforeChange2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
</script>
