export function useTreeNodeEvent(props, expanded, hasChildren) {

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
    propagateDown(props.node, isChecked)

    // 向上改变父亲
    propagateUp(props.node.parent)
  }

  const propagateDown = (node, isChecked) => {
    if (!node.children) return

    node.children.forEach(child => {
      child.checked = isChecked
      child.indeterminate = false
      propagateDown(child, isChecked)
    })
  }

  const propagateUp = (node) => {
    // 得到所有的节点
    // 得到所有的选中节点
    // 判断是否有 indeterminate 节点
    if (!node) return
    const indeterminate = node.children.some(child => child.indeterminate)

    if (indeterminate) {
      node.checked = false
      node.indeterminate = true
      return
    }

    const total = node.children.length
    const checkedLength = node.children.filter(child => child.checked).length

    if (checkedLength === 0) {
      node.checked = false
      node.indeterminate = false
    } else if (total === checkedLength) {
      node.checked = true
      node.indeterminate = false
    } else {
      node.checked = false
      node.indeterminate = true
    }


    propagateUp(node.parent)
  }

  return {
    handleClick,
    handleCheckChange
  }
}
