<template>
  <h2>单选框</h2>
  <div>
    <h3>基础</h3>
    <fl-radio v-model="value1" value="主要" label="主要"></fl-radio>
    <fl-radio v-model="value1" type="success" value="成功" label="成功"></fl-radio>
    <fl-radio v-model="value1" type="warning" value="警告" label="警告"></fl-radio>
    <fl-radio v-model="value1" type="error" value="错误" label="错误"></fl-radio>
  </div>
  <div>
    <h3>禁用</h3>
    <fl-radio disabled v-model="value1" value="主要" label="主要"></fl-radio>
    <fl-radio disabled v-model="value1" type="success" value="成功" label="成功"></fl-radio>
    <fl-radio disabled v-model="value1" type="warning" value="警告" label="警告"></fl-radio>
    <fl-radio disabled v-model="value1" type="error" value="错误" label="错误"></fl-radio>

    <fl-radio disabled v-model="checked1" value="1" label="主要"></fl-radio>
    <fl-radio disabled v-model="checked1" value="1" type="success" label="成功"></fl-radio>
    <fl-radio disabled v-model="checked1" value="1" type="warning" label="警告"></fl-radio>
    <fl-radio disabled v-model="checked1" value="1" type="error" label="错误"></fl-radio>
  </div>
  <div>
    <h3>单选框组</h3>
    <fl-radio-group v-model="value2">
      <fl-radio value="主要" label="主要"></fl-radio>
      <fl-radio type="success" value="成功" label="成功"></fl-radio>
      <fl-radio type="warning" value="警告" label="警告"></fl-radio>
      <fl-radio type="error" value="错误" label="错误"></fl-radio>
    </fl-radio-group>
  </div>
  <div>
    <h3>初始数据，默认选中</h3>
    <h4>单个</h4>
    <fl-radio v-model="value7" value="主要" label="主要"></fl-radio>
    <fl-radio v-model="value7" type="success" value="成功" label="成功"></fl-radio>
    <h4>组中</h4>
    <fl-radio-group v-model="value8">
      <fl-radio type="warning" value="警告" label="警告"></fl-radio>
      <fl-radio type="error" value="错误" label="错误"></fl-radio>
    </fl-radio-group>
  </div>
  <div>
    <h3>异步</h3>
    <h4>属性设置</h4>
    <fl-radio-group v-model="value3">
      <fl-radio loading value="主要" label="主要"></fl-radio>
      <fl-radio loading type="success" value="成功" label="成功"></fl-radio>
    </fl-radio-group>
    <h4>点击设置</h4>
    <fl-radio :beforeChange="beforeChange1" v-model="value4" type="warning" value="警告" label="警告"></fl-radio>
    <fl-radio :beforeChange="beforeChange2" v-model="value4" type="error" value="错误" label="错误"></fl-radio>
  </div>
  <div>
    <h3>事件</h3>
    <h4>单change事件</h4>
    <fl-radio @change="changeEvent1" v-model="value5" type="warning" value="警告" label="警告"></fl-radio>
    <h4>组change事件</h4>
    <fl-radio-group @change="changeEvent2" v-model="value6">
      <fl-radio value="主要" label="主要"></fl-radio>
      <fl-radio type="success" value="成功" label="成功"></fl-radio>
    </fl-radio-group>
  </div>
  <div>
    <h3>大小</h3>
    <h4>单</h4>
    <fl-radio size="small" value="主要" label="主要"></fl-radio>
    <fl-radio type="success" value="成功" label="成功"></fl-radio>
    <fl-radio size="large" type="warning" value="警告" label="警告"></fl-radio>
    <h4>组</h4>
    <fl-radio-group size="small">
      <fl-radio value="主要" label="主要"></fl-radio>
      <fl-radio type="success" value="成功" label="成功"></fl-radio>
      <fl-radio type="warning" value="警告" label="警告"></fl-radio>
    </fl-radio-group>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('')
const value6 = ref('')
const value7 = ref('主要')
const value8 = ref('错误')
const checked1 = ref('1')

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
const changeEvent1 = (val) => {
  console.log('单change事件', val)
}
const changeEvent2 = (val) => {
  console.log('组change事件', val)
}
</script>
