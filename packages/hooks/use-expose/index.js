import { nextTick } from 'vue'
function useExpose(elem) {
  const _ref = elem

  const focusExpose = async () => {
    await nextTick()
    _ref.value?.focus()
  }

  const blurExpose = async () => {
    await nextTick()
    _ref.value?.blur()
  }

  const selectExpose = async () => {
    await nextTick()
    _ref.value?.select()
  }

  return {
    focusExpose,
    blurExpose,
    selectExpose
  }
}

export { useExpose }
