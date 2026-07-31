import { useTreeEvent } from "./use-tree-event";
import { useTreeState } from "./use-tree-state";
import { useTreeStyle } from "./use-tree-style";

export function useTree(props, emit) {
  const {

  } = useTreeState()

  const {
    getCheckedKeys,
    setCheckedKeys,
    handleCheckChange,
    propagateUp,
    propagateDown,
  } = useTreeEvent(props, emit)
  const {

  } = useTreeStyle()

  return {
    getCheckedKeys,
    setCheckedKeys,
    handleCheckChange,
    propagateUp,
    propagateDown,
  }
}
