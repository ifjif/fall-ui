import { CHECKBOX_ALL_KEY, CHECKBOX_GROUP_KEY } from "../../contants";
import { FORM_ITEM_KEY } from "../../../form/constant.js";
import { inject } from "vue";

function useCheckboxGroup(props) {
  const groupValue = inject(CHECKBOX_GROUP_KEY, undefined);
  const isGroup = groupValue ? true : false;
  const allValue = inject(CHECKBOX_ALL_KEY, undefined);
  const isAll = allValue ? true : false;
  if (isGroup && isAll) {
    allValue.setValue4All(props.value);
  }

  const formItemKey = inject(FORM_ITEM_KEY, undefined);
  const isFormItem = formItemKey ? true : false;

  return {
    groupValue,
    isGroup,
    formItemKey,
    isFormItem,
  };
}

export { useCheckboxGroup };
