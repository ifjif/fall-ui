<template>
  <div>
    <component :is="demo"></component>
    <div>
      <span @click="openEvent">{{ open ? '收起' : '展开' }}</span>
      <span @click="copyEvent">复制</span>
    </div>
    <div v-show="open">
      <slot name="source" />
    </div>
  </div>
</template>
<script setup>
import { computed, onMounted, ref, useSlots } from 'vue';
import modules from '../component';
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.min.css'
import { FlMessage } from 'fall-ui'

const props = defineProps({
  path: String
})

const demo = computed(() => {
  const key = `examples/${props.path}.vue`
  return modules[key]
})

const slots = useSlots()

const open = ref(true)

const openEvent = computed(() => {
  open.value = !open.value
})
const isCopySuccessfully = ref('')

const copyEvent = async () => {

  if (isCopySuccessfully.value) return
  const content = slots.source()[0]?.children[0]?.children
  if (!content) {
    return
  }
  const text = typeof content === 'string' ? content : ''

  await navigator.clipboard.writeText(text)
  isCopySuccessfully.value = true
  FlMessage({ type: 'success', content: '复制成功', onClose: () => { } })
  FlMessage.closeAll()
}

onMounted(() => {
  prism.highlightAll()
})
</script>
