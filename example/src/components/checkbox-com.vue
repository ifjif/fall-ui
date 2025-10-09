<template>
  <h2>多选框</h2>
  <div>
    <h3>基础</h3>
    <fl-checkbox label="主要" value="主要"></fl-checkbox>
    <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
    <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
    <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
  </div>
  <div>
    <h3>禁用</h3>
    <fl-checkbox disabled label="主要" value="主要"></fl-checkbox>
    <fl-checkbox disabled type="success" label="成功" value="成功"></fl-checkbox>
    <fl-checkbox disabled type="warning" label="警告" value="警告"></fl-checkbox>
    <fl-checkbox disabled type="error" label="错误" value="错误"></fl-checkbox>
    <fl-checkbox disabled v-model="checked1" label="主要" value="主要"></fl-checkbox>
    <fl-checkbox disabled v-model="checked1" type="success" label="成功" value="成功"></fl-checkbox>
    <fl-checkbox disabled v-model="checked1" type="warning" label="警告" value="警告"></fl-checkbox>
    <fl-checkbox disabled v-model="checked1" type="error" label="错误" value="错误"></fl-checkbox>
    <fl-checkbox disabled v-model="checked1" type="error" label="错误" value="错误"></fl-checkbox>
  </div>
  <div>
    <h3>多选框组</h3>
    <fl-checkbox-group v-model="value">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
    </fl-checkbox-group>
  </div>
  <div>
    <h3>初始数据，默认选中</h3>
    <h4>组中存在数据</h4>
    <fl-checkbox-group v-model="value2">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
    </fl-checkbox-group>
    <h4>单独设置true</h4>
    <fl-checkbox v-model="value3" type="success" label="设置true选中"></fl-checkbox>
    <fl-checkbox type="error" label="未设置"></fl-checkbox>
  </div>
  <div>
    <h3>事件</h3>
    <h4>组事件</h4>
    <fl-checkbox-group @change="changeEvent" v-model="value4">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
    </fl-checkbox-group>
    <h4>单checkbox事件</h4>
    <fl-checkbox @change="changeEvent2" type="error" label="值" value="值"></fl-checkbox>
  </div>
  <div>
    <h3>异步</h3>
    <h4>属性触发</h4>
    <fl-checkbox loading label="主要"></fl-checkbox>
    <fl-checkbox loading type="success" label="成功"></fl-checkbox>
    <h4>点击触发</h4>
    <fl-checkbox :beforeChange="beforeChange1" type="warning" label="警告"></fl-checkbox>
    <fl-checkbox :beforeChange="beforeChange2" type="error" label="错误"></fl-checkbox>
  </div>
  <div>
    <h3>全选</h3>
    <fl-checkbox-all @change="changeEvent3" v-model="value5">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
      <fl-checkbox type="error" label="错误" value="错误"></fl-checkbox>
    </fl-checkbox-all>
  </div>
  <div>
    <h3>大小</h3>
    <h4>单个</h4>
    <fl-checkbox size="small" label="主要" value="主要"></fl-checkbox>
    <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
    <fl-checkbox size="large" type="warning" label="警告" value="警告"></fl-checkbox>
    <h4>组</h4>
    <fl-checkbox-group size="small">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
    </fl-checkbox-group>
    <h4>全选</h4>
    <fl-checkbox-all size="large">
      <fl-checkbox label="主要" value="主要"></fl-checkbox>
      <fl-checkbox type="success" label="成功" value="成功"></fl-checkbox>
      <fl-checkbox type="warning" label="警告" value="警告"></fl-checkbox>
    </fl-checkbox-all>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const value = ref([])
const value2 = ref(['主要', '警告'])
const value3 = ref(true)
const value4 = ref([])
const checked1 = ref(true)
const changeEvent = (val) => {
  console.log('组change事件', val)
}
const changeEvent2 = (e) => {
  console.log('单change事件', e)
}
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
const value5 = ref([])
const changeEvent3 = () => {
  console.log(value5.value)
}
</script>
