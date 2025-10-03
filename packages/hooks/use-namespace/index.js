const namespace = "fl";
const iconNamespace = "Fl";

const genericIconName = (name) => {
  return iconNamespace + name;
};

const useNamespace = (block) => {
  const b = () => _bem(block, "", "", "");
  const e = (element) => element ? _bem(block, element, "", "") : "";
  const m = (modifier, value) =>
    modifier ? _bem(block, "", modifier, value) : "";
  const is = (activeName, state) =>
    activeName && state ? "is-" + activeName : "";

  return {
    b,
    e,
    m,
    is,
  };
};

function _bem(block, element, modifier, value) {
  let name = namespace + "-" + block;
  element && (name += "__" + element);
  modifier && (name += "--" + modifier);
  value && (name += "_" + value);
  return name;
}

export { genericIconName, useNamespace };
