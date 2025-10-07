import { RADIO_GROUP_KEY } from "../../contants";
import { FORM_ITEM_KEY } from "../../../form/constant.js";
import { inject } from "vue";

function useRadioGroup() {
  const groupValue = inject(RADIO_GROUP_KEY, undefined);
  const isGroup = groupValue ? true : false;
  const formItemKey = inject(FORM_ITEM_KEY, undefined);
  const isFormItem = formItemKey ? true : false;

  return {
    groupValue,
    isGroup,
    formItemKey,
    isFormItem,
  };
}

export { useRadioGroup };
