import { useMenuEvent } from "./use-menu-event"
import { useMenuState } from "./use-menu-state"
import { useMenuStyle } from "./use-menu-style"
import { useMenuUtils } from "./use-menu-utils"
export function useMenu(props, emit) {

  const {
    openIndices
  } = useMenuState()

  const {
    openIndicesUnique
  } = useMenuUtils(openIndices)

  const {
    handleToggle,
    handleSelect,
    updateIndecies
  } = useMenuEvent(props, emit, openIndices, openIndicesUnique)

  const { } = useMenuStyle()

  return {
    openIndices,
    handleToggle,
    handleSelect,
    updateIndecies
  }
}
