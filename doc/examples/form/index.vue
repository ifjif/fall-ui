<template>
  <h2>表单</h2>
  <div>
    <h3>基础</h3>
    <fl-form ref="formRef" :model="formValue" :rules="rules">
      <fl-form-item prop="name" label="姓名">
        <fl-input v-model="formValue.name"></fl-input>
      </fl-form-item>
      <fl-form-item prop="age" label="年龄">
        <fl-input v-model="formValue.age"></fl-input>
      </fl-form-item>
      <fl-form-item prop="gender" label="性别">
        <fl-radio v-model="formValue.gender" :value="1" label="男"></fl-radio>
        <fl-radio v-model="formValue.gender" :value="0" label="女"></fl-radio>
      </fl-form-item>
      <fl-form-item prop="education" label="学历">
        <fl-radio-group v-model="formValue.education">
          <fl-radio :value="0" label="小学"></fl-radio>
          <fl-radio :value="1" label="中学"></fl-radio>
          <fl-radio :value="2" label="高学"></fl-radio>
          <fl-radio :value="3" label="大学"></fl-radio>
        </fl-radio-group>
      </fl-form-item>
      <fl-form-item prop="hobby" label="爱好">
        <fl-checkbox v-model="formValue.hobby" label="学习" value="学习"></fl-checkbox>
        <fl-checkbox v-model="formValue.hobby" label="篮球" value="篮球"></fl-checkbox>
      </fl-form-item>
      <fl-form-item prop="talent" label="技能">
        <fl-checkbox-group v-model="formValue.talent">
          <fl-checkbox label="编程" value="编程"></fl-checkbox>
          <fl-checkbox label="做菜" value="做菜"></fl-checkbox>
          <fl-checkbox label="教育" value="教育"></fl-checkbox>
        </fl-checkbox-group>
      </fl-form-item>
      <fl-form-item>
        <fl-button type="primary" @click="submit">提交</fl-button>
        <fl-button type="primary" @click="rest">重置</fl-button>
      </fl-form-item>
    </fl-form>
  </div>
  <div>
    <h3>自定义label宽度</h3>
    <fl-form>
      <fl-form-item labelWidth="200" label="自定义宽度">
        <fl-input></fl-input>
      </fl-form-item>
    </fl-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const formValue = ref({
  name: '张三',
  age: '12',
  gender: 1,
  hobby: ['学习'],
  education: 0,
  talent: ['编程']
})
const rules = {
  name: [
    { required: true, message: '请输入姓名', trigge: 'blur' },
    { min: 3, max: 10, message: '长度为3-10', trigge: 'change' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigge: 'blur' },
    { min: 3, max: 10, message: '长度为3-10', trigge: 'change' }
  ],
  gender: [
    { type: 'number', required: true, message: '请选择性别', trigge: 'change' }
  ],
  hobby: [
    { type: 'array', required: true, message: '请选择爱好', trigge: 'change' }
  ],
  education: [
    { type: 'number', required: true, message: '请选择学历', trigge: 'change' }
  ],
  talent: [
    { type: 'array', required: true, message: '请选择技能', trigge: 'change' }
  ],
}
const formRef = ref(null)

const submit = async () => {
  try {
    await formRef.value.validate()
    console.log('成功')
  } catch (e) {
    console.log(e)
  }
}
const rest = () => {
  formRef.value.reset()
}
</script>
