export function useTableGlobal(props) {

  const getRowKey = (row) => {
    const key = row[props.rowKey]
    return key ? key : JSON.stringify(key)
  }

  const getRowKeys = (rows, treeProps) => {
    const keys = []
    const collectKeys = (rows) => {
      rows.forEach(row => {
        keys.push(getRowKey(row))
        if (row[treeProps.children] && row[treeProps.children]?.length) {
          collectKeys(row[treeProps.children])
        }
      })
    }

    collectKeys(rows)

    return keys
  }

  return {
    getRowKey,
    getRowKeys
  }
}
