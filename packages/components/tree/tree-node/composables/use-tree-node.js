import { useTreeNodeState } from "./use-tree-node-state";
import { useTreeNodeEvent } from "./use-tree-node-event";
import { useTreeNodeStyle } from "./use-tree-node-style";

export function useTreeNode(props) {

  const {
    hasChildren,
    expanded
  } = useTreeNodeState(props)

  const {
    indentStyle
  } = useTreeNodeStyle(props)

  const {
    handleClick,
    handleCheckChange
  } = useTreeNodeEvent(props, expanded, hasChildren)

  return {
    hasChildren,
    expanded,
    handleClick,
    handleCheckChange,
    indentStyle
  }
}
