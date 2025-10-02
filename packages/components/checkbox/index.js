import { componentInstall } from "@ui-library/utils";
import ACheckbox from "./src/checkbox.vue";
import ACheckboxGroup from "./checkbox-group/checkbox-group.vue";
import ACheckboxAll from "./checkbox-all/checkbox-all.vue";

const coms = [ACheckbox, ACheckboxGroup, ACheckboxAll];

coms.forEach((com) => {
  componentInstall(com);
});

export { ACheckbox, ACheckboxAll, ACheckboxGroup };
