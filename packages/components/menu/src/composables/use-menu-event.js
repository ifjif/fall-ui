export function useMenuEvent(props, emit, openIndices, openIndicesUnique, topIndex) {

  // 选中菜单
  const handleSelect = ({ index, item }) => {
    emit('select', index, item)
    // 设置顶部索引
    topIndex.value = item?.[props.keyProp]
  }

  const findParent = (items, targetIndex) => {
    const parents = []

    const doFind = (items) => {
      for (let item of items) {
        if (item[props.keyProp] === targetIndex) {
          return true
        }

        if (item.children && item.children.length > 0) {
          if (doFind(item.children)) {
            parents.push(item[props.keyProp])
            return true
          }
        }
      }
      return false
    }

    doFind(items)
    return parents
  }

  // 处理菜单的展开和收起
  const handleToggle = (index) => {
    // 判断初始是展开 还是 关闭
    const isOpen = openIndices.value.includes(index)
    if (isOpen) {
      openIndices.value = openIndices.value.filter(i => i !== index)
      return
    }

    if (props.accordion) {
      const parents = findParent(props.data, index)
      parents.push(index)
      openIndices.value = parents
      return
    }
    openIndices.value.push(index)
    openIndicesUnique()
  }


  // 根据activeIndex 递归找它的父亲
  // 初始topIndex
  const updateIndecies = () => {
    const targetIndex = props.activeIndex
    const parents = findParent(props.data, targetIndex)

    if (parents.length > 0) {
      topIndex.value = parents[parents.length - 1]
    } else {
      topIndex.value = ''
    }

    if (props.accordion) {
      openIndices.value = parents
      return
    }

    openIndices.value.push(...parents)
    openIndicesUnique()

  }

  return {
    handleToggle,
    handleSelect,
    updateIndecies
  }
}
