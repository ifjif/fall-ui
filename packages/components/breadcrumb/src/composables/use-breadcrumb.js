export function useBreadcrumb(itemName) {

  const setItem = (com, items, level = 0, maxLevel = 1) => {
    if (level > maxLevel) return
    if (com.type.name === itemName) {
      items.push(com)
      return
    }

    if (com.children && com.children.length > 0) {
      return com.children.forEach(c => setItem(c, items, level + 1, maxLevel))
    }
  }

  return {
    setItem
  }
}
