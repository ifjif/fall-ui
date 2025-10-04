<template>
  <div v-show="show" @mouseenter="mouseenterEvent" @mouseleave="start" ref="messageRef" :class="[ns.b(),
  ns.m(theme), ns.is('background', bg), ns.m('size', size)]" :style="[top, zIndexStyle]">
    <Icon :class="[ns.e('icon')]">
      <component :is="icon"></component>
    </Icon>
    <span :class="[ns.e('label')]">{{ content }}</span>
    <span @click="onClose" :class="[ns.e('close')]">&times;</span>
  </div>
</template>

<script setup>
import { useNamespace } from '@ui-library/hooks';
import { FlIcon as Icon } from '@ui-library/components';
import { onMounted } from 'vue';
import { useMessage } from './composables/use-message'
const ns = useNamespace('message')

const props = defineProps({
  type: String,
  content: String,
  id: String,
  size: String,
  offset: {
    type: Number,
    default: () => 16
  },
  duration: {
    type: Number,
    default: () => 3000
  },
  bg: Boolean,
  onClose: Function
})

const {
  icon,
  theme,
  height,
  messageRef,
  top,
  show,
  zIndexStyle,
  bottomOffset,
  nextZIndex,
  close,
  start,
  mouseenterEvent,
} = useMessage(props)

onMounted(() => {
  nextZIndex()
  show.value = true
  start()
  const resizeObserver = new ResizeObserver((entries) => {
    height.value = entries[0].contentRect.height
  })
  resizeObserver.observe(messageRef.value)
})
</script>
