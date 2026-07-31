export function useAnchorGlobal() {

  // 将数据进行 扁平化
  const flattenTree = (data) => {
    let result = []

    data.forEach(item => {
      result.push(item)
      if (item.children && item.children.length > 0) {
        result.push(...flattenTree(item.children))
      }
    })

    return result
  }


  const getScrollContainer = (container) => {
    // window
    if (container === 'window') return window

    // 选择器，进行查找
    if (typeof container === 'string') return document.querySelector(container)

    // dom对象， 直接返回
    return container
  }

  // {title, href:'#xxx'}
  const getAnchorEl = (item) => {
    const id = item.href.replace('#', '')
    const targetEl = document.getElementById(id)

    return targetEl
  }

  const getScrollTop = (container) => {
    const el = getScrollContainer(container)
    if (el === window) return el.pageYOffset || el.document.documentElement.scrollTop

    return el.scrollTop
  }


  return {
    flattenTree,
    getAnchorEl,
    getScrollContainer,
    getScrollTop,
  }
}
