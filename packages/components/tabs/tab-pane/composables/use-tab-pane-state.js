import { computed } from 'vue'
export function useTabPaneState(props, rootTabs) {
  const isShow = computed(() => rootTabs.activeName.value === props.name)
  return {
    isShow
  }
}
