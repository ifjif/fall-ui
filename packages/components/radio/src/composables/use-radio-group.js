import { RADIO_GROUP_KEY } from "../../contants";
import { inject } from "vue";

function useRadioGroup() {
  const groupValue = inject(RADIO_GROUP_KEY, undefined);
  const isGroup = groupValue ? true : false;

  return {
    groupValue,
    isGroup,
  };
}

export { useRadioGroup };
