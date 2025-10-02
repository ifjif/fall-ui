function types() {
  const isBoolean = (val) => {
    return (typeof val) === "boolean";
  };
  const isArray = (val) => {
    return Array.isArray(val);
  };
  const isFunction = (obj) => {
    return (typeof obj) === "function";
  };

  return {
    isFunction,
    isBoolean,
    isArray,
  };
}

export { types };
