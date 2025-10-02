import { componentInstall } from "@ui-library/utils";
import AContainer from "./src/container.vue";
import AASide from "./aside/aside.vue";
import AMain from "./main/main.vue";
import AHeader from "./header/header.vue";
import AFooter from "./footer/footer.vue";

const coms = [AContainer, AASide, AMain, AHeader, AFooter];

coms.forEach((com) => {
  componentInstall(com);
});

export { AASide, AContainer, AFooter, AHeader, AMain };
