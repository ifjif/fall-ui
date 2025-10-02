function useCheckboxEvent(props, emit, model, isGroup, _loading) {
  const clickEvent = (e) => {
    if (props.disabled || _loading.value || props.beforeChange) {
      e.preventDefault();
      if (props.beforeChange && !props.disabled && !_loading.value) {
        _loading.value = true;
        props.beforeChange().then(() => {
          updateData();
          _loading.value = false;
        }).catch(() => {
          _loading.value = false;
        });
      }
      return;
    }
  };
  const changeEvent = (e) => {
    emit("change", e.target.checked, e);
  };

  const updateData = () => {
    if (isGroup) {
      const idx = model.value.findIndex((item) => item === props.value);
      if (idx != -1) {
        model.value.splice(idx, 1);
      } else {
        model.value.push(props.value);
      }
    } else {
      model.value = !model.value;
    }
  };

  return {
    clickEvent,
    changeEvent,
  };
}

export { useCheckboxEvent };
