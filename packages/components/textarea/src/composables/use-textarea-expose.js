import { useExpose } from '@ui-library/hooks'
function useTextareaExpose(elem) {
  const { focusExpose, blurExpose, selectExpose } = useExpose(elem)

  return {
    focusExpose,
    blurExpose,
    selectExpose
  }
}

export { useTextareaExpose }
