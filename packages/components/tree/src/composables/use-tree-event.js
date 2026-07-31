export function useTreeEvent(props, emit) {
  const getCheckedKeys = (leafOnly = false) => {
    const result = []

    const traverse = (nodes) => {
      if (!nodes) return

      nodes.forEach(node => {
        if (node.checked) {
          // 添加叶子
          // 如果leafOnly:false, 只添加选中的节点
          // 如: 父节点被选中，视图可能把整个链路表示选中，但是最终只有父被加入
          if (!leafOnly || !node.children || node.children.length === 0) {
            result.push(node.id)
          } else {
            // 递归处理孩子
            traverse(node.children)
          }
        } else {
          // 部分选中
          if (node.children) {
            traverse(node.children)
          }
        }
      })
    }

    traverse(props.data)
    return result
  }

  const setCheckedKeys = (keys) => {
    if (!props.data || !keys.length) return

    // 重置所有节点，防止旧数据干扰
    const resetNodes = (nodes) => {
      nodes.forEach(node => {
        node.checked = false
        node.indeterminate = false
        if (node.children) {
          resetNodes(node.children)
        }
      })
    }
    resetNodes(props.data)

    const traverse = (nodes) => {
      if (!nodes) return

      nodes.forEach(node => {
        if (keys.includes(node.id)) {
          node.checked = true
          node.indeterminate = false

          propagateDown(node, true)
        }

        if (node.children && node.children.length > 0) {
          traverse(node.children)
        }

        if (node.parent) {
          propagateUp(node.parent)
        }
      })
    }

    traverse(props.data)
  }

  const handleCheckChange = () => {
    const result = getCheckedKeys()
    emit('check-change', result)
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
    getCheckedKeys,
    setCheckedKeys,
    handleCheckChange,
    propagateUp,
    propagateDown
  }
}
