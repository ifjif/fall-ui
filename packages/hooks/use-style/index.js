function useStyle() {
  const fontSize = (size) => {
    return size ? { "font-size": `${size}px` } : {};
  };
  const height = (height) => {
    return height ? { height: `${height}px` } : {};
  };
  const width = (width) => {
    return width ? { width: `${width}px` } : {};
  };
  const color = (color) => {
    return color ? { color: `${color}` } : {};
  };
  const top = (offset) => {
    return offset ? { top: `${offset}px` } : {};
  };
  const zIndex = (number) => {
    return number ? { "z-index": number } : {};
  };

  return {
    fontSize,
    height,
    width,
    color,
    top,
    zIndex,
  };
}

export { useStyle };
