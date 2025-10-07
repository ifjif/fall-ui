import { useFormItemEvent } from "./use-form-item-event";
import { useFormItemGroup } from "./use-form-item-group";
import { useFormItemState } from "./use-form-item-state";

export function useFormItem(props) {
  const { formKey } = useFormItemGroup();
  const {
    _required,
    _colon,
    tip,
    labelWidthStyle,
  } = useFormItemState(props);
  const { observer, initRules, setField, setInitValue } = useFormItemEvent(
    props,
    tip,
    formKey,
  );

  return {
    _required,
    _colon,
    tip,
    labelWidthStyle,
    observer,
    initRules,
    setField,
    setInitValue,
  };
}
