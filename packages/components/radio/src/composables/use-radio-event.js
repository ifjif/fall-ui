function useRadioEvent(
  props,
  emit,
  model,
  _loading,
  isSelected,
) {
  const clickEvent = (e) => {
    if (
      props.disabled || _loading.value || props.beforeChange || isSelected.value
    ) {
      e.preventDefault();
      if (props.beforeChange && !props.disabled && !_loading.value) {
        _loading.value = true;
        props.beforeChange().then(() => {
          updateData(isSelected.value);
          _loading.value = false;
        }).catch(() => {
          _loading.value = false;
        });
      } else if (!props.disabled && isSelected.value) {
        model.value = "";
        emit("change", false);
      }
    }
  };
  const changeEvent = (e) => {
    emit("change", e.target.checked);
  };

  const updateData = (isSelected) => {
    if (isSelected) {
      model.value = "";
      emit("change", false);
    } else {
      model.value = props.value;
    }
  };

  return {
    clickEvent,
    changeEvent,
  };
}

export { useRadioEvent };
