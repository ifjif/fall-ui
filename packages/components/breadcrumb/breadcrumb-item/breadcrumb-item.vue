<template>
  <div :class="[ns.b()]">
    <component :is="to ? 'router-link' : 'span'" :to=to :class="[ns.e('inner')]">
      <slot />
    </component>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('breadcrumb-item')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks';
const ns = useNamespace('breadcrumb-item')

const props = defineProps({
  to: { // vue-router信息，如提供会渲染为 router-link
    // 支持 字符串 和 对象路径 'xx' / {path: 'xxx'}
    type: [String, Object]
  }
})
</script>
