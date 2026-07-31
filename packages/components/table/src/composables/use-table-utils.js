export function useTableUtils(
  props,
  getRowKey,
  expandedKeys,
  paginatedData,
  flatData,
  selection,
  selectionMap
) {

  const getColByProp = (prop) => props.columns.find(c => c.prop === prop)

  // 计算扁平化数据
  const flattenTree = (data, level = 0, parent = null) => {
    const result = []
    data.forEach(item => {
      const key = getRowKey(item)
      const isExpanded = expandedKeys.value.has(key)

      // 添加当前节点
      result.push({
        ...item,
        __level: level,
        __isLeaf: !item[props.treeProps.children]?.length,
        __parent: parent
      })

      // 递归添加孩子
      if (item[props.treeProps.children] && isExpanded) {
        result.push(...flattenTree(
          item[props.treeProps.children],
          level + 1,
          item
        ))
      }
    })

    return result
  }

  // 更新扁平化数据
  const updateFlatData = () => {
    flatData.value = flattenTree(paginatedData.value)
  }

  // 收集所有可展开key
  const collectExpandableKeys = (items) => {
    const collectKeys = (items) => {
      items.forEach(item => {
        if (item[props.treeProps.children]?.length) {
          const key = getRowKey(item)
          expandedKeys.value.add(key)
          collectKeys(item[props.treeProps.children])
        }
      })
    }

    collectKeys(items)
  }

  const updateSelectionModel = (value) => {
    selection.value = value
  }

  const pageSelection = () => {
    const result = new Map()
    const collectRow = (rows) => {
      rows.forEach(row => {
        result.set(getRowKey(row), row)
        if (row[props.treeProps.children] && row[props.treeProps.children]?.length) {
          collectRow(row[props.treeProps.children])
        }
      })
    }
    collectRow(paginatedData.value)

    selectionMap.value.data = result
    selectionMap.value.change = true
  }

  return {
    getColByProp,
    flattenTree,
    updateFlatData,
    collectExpandableKeys,
    updateSelectionModel,
    pageSelection,
  }
}
