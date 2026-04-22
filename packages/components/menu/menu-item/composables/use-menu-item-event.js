export function useMenuItemEvent(props, emit, hasChildren) {

  const toggleMenu = () => {
    if (hasChildren.value) {
      emit('toggle', props.menu.index)
    } else {
      emit('select', props.menu.index)
    }
  }

  return {
    toggleMenu,
  }
}
