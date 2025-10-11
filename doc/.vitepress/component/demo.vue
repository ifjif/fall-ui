<template>
  <div>
    <div :class="['com-description']">
      <h3>
        <slot name="description" />
      </h3>
    </div>
    <component :is="demo"></component>
    <div :class="['code-action']" @mouseleave="mouseleaveEvent">
      <CodeAction @open="openEvent" @copy="copyEvent"></CodeAction>
    </div>
    <div v-if="open">
      <slot name="source" />
    </div>
  </div>
</template>
<script setup>
import { computed, nextTick, ref, useSlots } from 'vue';
import modules from '../component';
import prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.min.css'
import { FlMessage } from 'fall-ui'

const props = defineProps({
  path: String,
  codeAction: [String, Object]
})

const demo = computed(() => {
  const key = `examples/${props.path}.vue`
  return modules[key]
})

const slots = useSlots()

const open = ref(false)

const openEvent = () => {
  open.value = !open.value
  nextTick(() => {
    prism.highlightAll()
  })
}

const copySuccessfully = ref('')

const mouseleaveEvent = () => {
  copySuccessfully.value = false
}

const copyEvent = async () => {
  if (copySuccessfully.value) {
    return
  }
  const content = slots.source()[0]?.children[0]?.children
  if (!content) {
    return
  }
  const text = typeof content === 'string' ? content : ''

  await navigator.clipboard.writeText(text)
  copySuccessfully.value = true
  FlMessage({ type: 'success', content: '复制成功' })
}
</script>
<style scoped>
.com-description {
  padding: 10px 0;
}
</style>
