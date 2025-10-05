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
  const isString = (obj) => {
    return (typeof obj) === "string";
  };

  return {
    isFunction,
    isBoolean,
    isArray,
    isString,
  };
}

export { types };
