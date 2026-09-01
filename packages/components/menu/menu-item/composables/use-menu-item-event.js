export function useMenuItemEvent(props, emit, hasChildren) {

  const toggleMenu = () => {
    if (hasChildren.value) {
      emit('toggle', props.menu[props.keyProp])
    } else {
      emit('select', { index: props.menu[props.keyProp], item: props.menu })
    }
  }

  return {
    toggleMenu,
  }
}
