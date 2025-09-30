function types() {
  const isFunction = (obj) => {
    return (typeof obj) === 'function'
  }

  return {
    isFunction
  }
}

export { types }

