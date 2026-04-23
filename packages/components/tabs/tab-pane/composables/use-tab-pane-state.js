import { computed } from 'vue'
export function useTabPaneState(props, rootTabs) {
  const isShow = computed(() => rootTabs.activeName.value === props.name)
  const onlyHeader = computed(() => rootTabs.onlyHeader2.value)
  return {
    isShow,
    onlyHeader
  }
}
