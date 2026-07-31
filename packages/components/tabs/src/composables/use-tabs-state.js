import { computed, reactive, ref } from 'vue'
export function useTabsState(props) {
  const navRef = ref(null)
  // 活跃的 pane
  const activeName = computed(() => props.modelValue)
  // 存储所有 panes
  const panes = reactive([])

  // 活跃 pane 的rect信息
  const activeTabRect = reactive({})

  // 是否只展示头
  const onlyHeader2 = computed(() => props.onlyHeader)

  // 滚动方向
  const wheel = computed(() => {
    if (['left', 'right'].includes(props.topPosition)) {
      return 'y'
    }

    return 'x'
  })

  return {
    navRef,
    activeName,
    panes,
    activeTabRect,
    onlyHeader2,
    wheel
  }
}
