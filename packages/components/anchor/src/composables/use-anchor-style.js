import { ref } from 'vue'
export function useAnchorStyle() {

  const activeBarStyle = ref({
    top: '0',
    height: '0',
  })

  const anchorStyle = ref({})

  return {
    activeBarStyle,
    anchorStyle
  }
}
