import { types } from '@ui-library/utils'
function useButtonEvent(props, emit, _loading) {

  const clickEvent = async (e) => {
    const isFn = types().isFunction(props.beforeChange)
    if (!isFn) {
      emit('click', e)
      return false
    }

    _loading.value = true

    props.beforeChange().finally(() => _loading.value = false)
  }

  return {
    clickEvent
  }
}

export { useButtonEvent }
