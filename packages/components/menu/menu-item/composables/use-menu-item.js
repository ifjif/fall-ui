import { useMenuItemEvent } from "./use-menu-item-event";
import { useMenuItemState } from "./use-menu-item-state";
import { useMenuItemStyle } from "./use-menu-item-style";

export function useMenuItem(props, emit) {
  const {
    submenuRef,
    ssubmenuRef,
    hasChildren,
    isOpen,
    isActive,
  } = useMenuItemState(props)

  const {
    toggleMenu,
  } = useMenuItemEvent(props, emit, hasChildren)

  const {
    styles,
    indentStyle,
    subMenuStyle,
    updatePosition
  } = useMenuItemStyle(props, submenuRef, ssubmenuRef, isOpen)

  return {
    submenuRef,
    ssubmenuRef,
    hasChildren,
    isOpen,
    isActive,
    toggleMenu,
    styles,
    indentStyle,
    subMenuStyle,
    updatePosition
  }
}
