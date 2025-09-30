import { useExpose } from '@ui-library/hooks'
function useInputExpose(elem) {
  const { focusExpose, blurExpose, selectExpose } = useExpose(elem)

  return {
    focusExpose,
    blurExpose,
    selectExpose
  }
}

export { useInputExpose }
