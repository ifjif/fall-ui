function useStyle() {
  const fontSize = (size) => {
    return size ? { "font-size": `${size}px` } : {};
  };
  const height = (height) => {
    return height ? { height: `${height}px` } : {};
  };
  const maxHeight = (maxHeight) => {
    return maxHeight ? { maxHeight: `${maxHeight}px` } : {};
  }
  const maxWidth = (maxWidth) => {
    return maxWidth ? { maxWidth: `${maxWidth}px` } : {};
  }
  const width = (width) => {
    return width ? { width: `${width}px` } : {};
  };
  const color = (color) => {
    return color ? { color: `${color}` } : {};
  };
  const top = (offset) => {
    if (offset === 0) {
      return { top: 0 }
    }
    return offset ? { top: `${offset}px` } : {};
  };
  const bottom = (offset) => {
    if (bottom === 0) {
      return { bottom: 0 }
    }

    return offset ? { bottom: `${offset}px` } : {};
  }
  const left = (offset) => {
    if (offset === 0) {
      return { left: 0 }
    }
    return offset ? { left: `${offset}px` } : {};
  }
  const right = (offset) => {
    if (offset == 0) {
      return { right: 0 }
    }
    return offset ? { right: `${offset}px` } : {};
  }
  const zIndex = (number) => {
    return number ? { "z-index": number } : {};
  };

  return {
    fontSize,
    height,
    maxHeight,
    maxWidth,
    width,
    color,
    top,
    bottom,
    left,
    right,
    zIndex,
  };
}

export { useStyle };
