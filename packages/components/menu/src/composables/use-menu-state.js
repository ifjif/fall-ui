import { ref } from 'vue'

export function useMenuState() {
  // 需要进行展开的项，根据activeIndex和accordion来进行计算
  const openIndices = ref([])
  const topIndex = ref('')

  return {
    openIndices,
    topIndex
  }
}
