import { useTreeNodeState } from "./use-tree-node-state";
import { useTreeNodeEvent } from "./use-tree-node-event";
import { useTreeNodeStyle } from "./use-tree-node-style";
import { useTreeNodeGroup } from "./use-tree-node-group";

export function useTreeNode(props, emit) {

  const {
    treeKey
  } = useTreeNodeGroup()

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
  } = useTreeNodeEvent(props, emit, treeKey, expanded, hasChildren)

  return {
    hasChildren,
    expanded,
    handleClick,
    handleCheckChange,
    indentStyle
  }
}
