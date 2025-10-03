import { componentInstall } from "@ui-library/utils";
import FlCheckbox from "./src/checkbox.vue";
import FlCheckboxGroup from "./checkbox-group/checkbox-group.vue";
import FlCheckboxAll from "./checkbox-all/checkbox-all.vue";

const coms = [FlCheckbox, FlCheckboxGroup, FlCheckboxAll];

coms.forEach((com) => {
  componentInstall(com);
});

export { FlCheckbox, FlCheckboxAll, FlCheckboxGroup };
