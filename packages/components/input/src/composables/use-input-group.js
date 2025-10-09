import { FORM_ITEM_KEY } from "../../../form/constant.js";
import { inject } from "vue";

export function useInputGroup() {
  const formItemKey = inject(FORM_ITEM_KEY, undefined);
  const isFormItem = formItemKey ? true : false;

  return {
    formItemKey,
    isFormItem,
  };
}
