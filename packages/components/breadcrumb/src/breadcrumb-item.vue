<template>
  <div class="my-breadcrumb-item">
    <!-- 如果有 to 属性，渲染为链接，否则渲染为 span -->
    <component :is="to ? 'router-link' : 'span'" :to="to" class="my-breadcrumb-item__inner">
      <slot />
    </component>
  </div>
</template>
<script>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('breadcrumb-item')
export default {
  name: ns.b()
}
</script>
<script setup>
import { useNamespace } from '@fall-ui/hooks'
const ns = useNamespace('breadcrumb-item')

const props = defineProps({
  to: { // 支持字符窜路径或对象路径(同 vue-router)
    type: [String, Object],
    default: ''
  }
})
</script>
<style scoped>
.my-breadcrumb-item {
  display: inline-block;
}

.my-breadcrumb-item__inner {
  color: #606266;
  text-decoration: none;
  transition: color 0.2s;
}

.my-breadcrumb-item__inner:hover {
  color: #409eff;
  /* Element Plus 的主色调 */
}

/* 最后一项通常不可点击，样式不同，这里简单处理 */
span.my-breadcrumb-item__inner {
  color: #909399;
  cursor: text;
}
</style>
