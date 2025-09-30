import { ref, computed } from 'vue'
function useButtonState(props, parentSize) {
  const _loading = ref(false)
  const controlSize = computed(() => {
    return props.size || parentSize
  })

  return { _loading, controlSize }
}

export { useButtonState }
