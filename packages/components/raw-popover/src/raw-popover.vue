<template>
  <div ref="rawPopoverRef" :class="[ns.b(), ns.m('position', placement)]" :style="style">
    <div :class="[ns.e('title')]" v-if="$slots.title || title">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="[ns.e('content')]">
      <slot>{{ content }}</slot>
    </div>
    <!--箭头 -->
    <div :class="[ns.e('arrow')]" v-if="showArrow"></div>

    <div v-if="footer" :class="[ns.e('footer')]">
      <button @click="onCancel">取消</button>
      <button @click="onConfirm" :class="[ns.e('confirm-btn')]">确定</button>
    </div>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('raw-popover')
export default {
  name: ns.b()
}
</script>

<script setup>
import { useNamespace } from '@fall-ui/hooks';
import { ref, computed, onMounted } from 'vue'
const ns = useNamespace('raw-popover')

const rawPopoverRef = ref(null)

const props = defineProps({
  title: { type: String, default: () => '' },
  content: { type: String, default: () => '' },
  placement: {
    type: String,
    default: () => 'top',
    validator(value) {
      return ['top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'].includes(value)
    }
  },
  showArrow: { type: Boolean, default: () => true },
  trigger: { type: String, default: () => 'hover' }, // 'click' | 'hover'
  slots: { type: Object, default: () => { } },
  // 用于从外部设置位置
  top: { type: Number, default: () => 0 },
  left: { type: Number, default: () => 0 },
  // 显示尾部
  footer: { type: Boolean, default: () => false },
  onCancel: { type: Function },
  onConfirm: { type: Function },
})

const top = ref(props.top)
const left = ref(props.left)
const style = computed(() => ({
  top: `${top.value}px`,
  left: `${top.value}px`
}))

onMounted(() => {
  const el = rawPopoverRef.value
  top.value = el.style.top
  left.value = el.style.left
})

</script>
