import { computed, reactive, ref } from 'vue'
export function useTabsState(props) {
  const navRef = ref(null)
  // 活跃的 pane
  const activeName = computed(() => props.modelValue)
  // 存储所有 panes
  const panes = reactive([])

  // 活跃 pane 的rect信息
  const activeTabRect = reactive({})

  return {
    navRef,
    activeName,
    panes,
    activeTabRect
  }
}
