<template>
  <fl-container style="width:100%;height:100%;">
    <fl-main>
      <fl-scrollbar ref="scrollbarRef" @resize="handleResize">
        <div :style="{ width: `${tableWidth}px` }">
          <slot />
        </div>
      </fl-scrollbar>
    </fl-main>
    <fl-aside style="width:200px;">
      <fl-scrollbar>
        <fl-anchor :container="scrollContainer" :data="anchors"></fl-anchor>
      </fl-scrollbar>
    </fl-aside>
  </fl-container>
</template>
<script setup>
import { ref, computed } from 'vue';
const props = defineProps({
  anchors: {
    type: Array,
    default: () => []
  }
})

const scrollbarRef = ref(null)
const tableWidth = ref(0)
const handleResize = ({ clientWidth }) => {
  tableWidth.value = clientWidth
}
const scrollContainer = computed(() => {
  if (!scrollbarRef.value) {
    return null
  }
  return scrollbarRef.value.getScrollContainer()
})
</script>
