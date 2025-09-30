import { ref, getCurrentInstance } from 'vue'
function useEvent() {
  const { emit } = getCurrentInstance()
  const isFocus = ref(false)
  const isHover = ref(false)

  const focusEvent = (e) => {
    isFocus.value = true
    emit('focus', e)
  }
  const blurEvent = (e) => {
    isFocus.value = false
    emit('blur', e)
  }
  const mouseenterEvent = (e) => {
    isHover.value = true
    emit('mouseenter', e)
  }
  const mouseleaveEvent = (e) => {
    isHover.value = false
    emit('mouseleave', e)
  }
  const changeEvent = (e) => {
    emit('change', e)
  }
  const keyupEvent = (e) => {
    emit('keyup', e)
  }
  const keydownEvent = (e) => {
    emit('keydown', e)
  }

  return {
    isFocus,
    isHover,
    focusEvent,
    blurEvent,
    mouseenterEvent,
    mouseleaveEvent,
    changeEvent,
    keyupEvent,
    keydownEvent
  }
}

export { useEvent }
