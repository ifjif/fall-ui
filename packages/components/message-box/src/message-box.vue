<template>
  <Mask @close="close" :maskClose="maskClose" :style="[zIndexStyle]">
    <div @click.stop :class="[ns.b(), ns.e(themeType)]" :style="[widthStyle]">
      <div :class="[ns.e('header')]">
        <Icon>
          <component :is="themeIcon"></component>
        </Icon>
        <span :class="[ns.e('title')]">{{ title }}</span>
      </div>
      <div :class="[ns.e('content')]">
        <template v-if="isStringContent">{{ content }}</template>
        <template v-if="isVNodeContent">
          <component :is="content"></component>
        </template>
      </div>
      <div :class="[ns.e('footer')]">
        <Button @click="cancelEvent" text size="large">取消</Button>
        <Button @click="confirmEvent" :beforeChange="beforeChange" type="primary" size="large">确认</Button>
      </div>
    </div>
  </Mask>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
import { onMounted } from 'vue';
const ns = useNamespace('messagebox')

export default {
  name: ns.b()
}
</script>
<script setup>
import { useMessageBox } from './composables/use-messagebox.js'
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('messagebox')

const props = defineProps({
  type: {
    type: String,
    default: () => 'info',
    validator(v) {
      return ['info', 'success', 'warning', 'error'].includes(v)
    }
  },
  title: String,
  content: [String, Object],
  onClose: Function,
  beforeChange: Function,
  width: [String, Number],
  maskClose: {
    type: Boolean,
    default: () => false
  }
})
const emit = defineEmits(['cancel', 'ok'])


const {
  themeIcon,
  themeType,
  Button,
  Icon,
  Mask,
  isStringContent,
  isVNodeContent,
  zIndexStyle,
  nextZIndex,
  widthStyle,
  close,
  cancelEvent,
  confirmEvent
} = useMessageBox(props, emit)

defineExpose({
  close
})

onMounted(() => {
  nextZIndex()
})
</script>
