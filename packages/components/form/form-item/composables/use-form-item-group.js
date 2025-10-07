import { FORM_KEY } from "../../constant.js";
import { inject } from "vue";
export function useFormItemGroup() {
  const formKey = inject(FORM_KEY, undefined);

  return {
    formKey,
  };
}
