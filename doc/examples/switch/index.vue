<template>
  <h2>切换按钮</h2>
  <div>
    <h3>基础</h3>
    <fl-switch></fl-switch>
    <fl-switch type="success"></fl-switch>
    <fl-switch type="warning"></fl-switch>
    <fl-switch type="error"></fl-switch>
  </div>
  <div>
    <h3>禁用</h3>
    <fl-switch disabled></fl-switch>
    <fl-switch disabled type="success"></fl-switch>
    <fl-switch disabled type="warning"></fl-switch>
    <fl-switch disabled type="error"></fl-switch>
  </div>
  <div>
    <h3>图标</h3>
    <fl-switch checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch type="success" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch type="warning" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
  </div>
  <div>
    <h3>异步</h3>
    <h4>属性控制</h4>
    <fl-switch loading checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch loading type="success"></fl-switch>
    <fl-switch loading type="warning" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <h4>点击设置</h4>
    <fl-switch :beforeChange="beforeChange1" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch :beforeChange="beforeChange2" type="success"></fl-switch>
    <fl-switch :beforeChange="beforeChange3" type="warning" checkedIcon="fl-eye"
      uncheckedIcon="fl-eye-close"></fl-switch>
    <fl-switch type="error" checkedIcon="fl-eye" uncheckedIcon="fl-eye-close"></fl-switch>
  </div>
  <div>
    <h3>change事件</h3>
    <fl-switch @change="changeEvent1" type="success"></fl-switch>
  </div>
  <div>
    <h3>大小</h3>
    <fl-switch size="small"></fl-switch>
    <fl-switch type="success"></fl-switch>
    <fl-switch size="large" type="warning"></fl-switch>
  </div>
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
const beforeChange3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}
const changeEvent1 = (checked, e) => {
  console.log(checked, e)
}
</script>
