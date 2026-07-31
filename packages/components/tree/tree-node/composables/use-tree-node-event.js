export function useTreeNodeEvent(
  props,
  emit,
  treeKey,
  expanded,
  hasChildren
) {
  const handleClick = () => {
    if (hasChildren.value) {
      expanded.value = !expanded.value
      return
    }

    // 必须存在输入框
    if (!props.showCheckbox) return
    // leaf node，check toggle
    handleCheckChange(!props.node.checked)
  }

  // 处理选择，需要进行 向下传递和 向上传递 来改变父子状态
  const handleCheckChange = (isChecked) => {
    props.node.checked = isChecked
    props.node.indeterminate = false
    // 向下改变子孩子
    treeKey.propagateDown(props.node, isChecked)

    // 向上改变父亲
    treeKey.propagateUp(props.node.parent)

    emit('check-change')
  }


  return {
    handleClick,
    handleCheckChange
  }
}
