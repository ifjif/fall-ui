<template>
  <ComponentLayout :anchors="anchors">
    <h2>表单</h2>
    <div>
      <h3 id="fl-form-basic">基础</h3>
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
      <h3 id="fl-form-label-width-self">自定义label宽度</h3>
      <fl-form>
        <fl-form-item labelWidth="200" label="自定义宽度">
          <fl-input></fl-input>
        </fl-form-item>
      </fl-form>
    </div>
    <h3 id="fl-form-attrs">form属性</h3>
    <fl-table :data="formData" :columns="columns">
      <template #value="{ row }">
        <pre>{{ row.value }}</pre>
      </template>
    </fl-table>
    <h3 id="fl-form-slots">form插槽</h3>
    <fl-table :data="slotData" :columns="slotColumns">
    </fl-table>
    <h3 id="fl-form-expose">form暴露</h3>
    <fl-table :data="formExposeData" :columns="exposeColumns"></fl-table>
    <h3 id="fl-form-item-attrs">form-item属性</h3>
    <fl-table :data="formItemData" :columns="columns"></fl-table>
    <h3 id="fl-form-item-slots">form-item插槽</h3>
    <fl-table :data="formItemSlotData" :columns="slotColumns">
    </fl-table>
  </ComponentLayout>
</template>
<script setup>
import ComponentLayout from '@/layout/component-layout.vue'
import { columns, exposeColumns, slotColumns } from '@/assets/com-props'
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

const anchors = [
  { title: '基础', href: '#fl-form-basic' },
  { title: '自定义label宽度', href: '#fl-form-label-width-self' },
  { title: 'form属性', href: '#fl-form-attrs' },
  { title: 'form插槽', href: '#fl-form-slots' },
  { title: 'form暴露', href: '#fl-form-expose' },
  { title: 'form-item属性', href: '#fl-form-item-attrs' },
  { title: 'form-item插槽', href: '#fl-form-item-slots' },
]


const rulesInfo = [
  { required: 'true|false', message: '', trigger: 'change|blur' },
  { min: '', max: '', message: '', trigger: 'change|blur' },
  { type: 'number|array', message: '', trigger: 'change|blur' },
]
const formData = [
  { name: 'model', type: 'Object', default: '{}', value: '', desc: '' },
  { name: 'rules', type: 'Object', default: '{}', value: JSON.stringify(rulesInfo, null, 2), desc: '' },
]

const slotData = [
  { name: 'default', param: '', desc: '' },
]

const formExposeData = [
  { name: 'validate', type: '函数', desc: '进行表单验证' },
  { name: 'reset', type: '函数', desc: '重置表单' },
]

const formItemData = [
  { name: 'label', type: 'String', default: '', value: '', desc: '' },
  { name: 'required', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'colon', type: 'Boolean', default: 'true', value: 'true, false', desc: '' },
  { name: 'prop', type: 'String', default: '', value: '', desc: '' },
  { name: 'labelWidth', type: 'String, Number', default: '', value: '', desc: '' },
]

const formItemSlotData = [
  { name: 'default', param: '', desc: '' },
]
</script>
