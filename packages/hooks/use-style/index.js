function useStyle() {

  const fontSize = (size) => {
    return size ? { 'font-size': `${size}px` } : {}
  }
  const height = (height) => {
    return height ? { height: `${height}px` } : {}
  }
  const width = (width) => {
    return width ? { width: `${width}px` } : {}
  }
  const color = (color) => {
    return color ? { color: `${color}` } : {}
  }

  return {
    fontSize,
    height,
    width,
    color
  }
}

export { useStyle }
