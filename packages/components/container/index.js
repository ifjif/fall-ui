import { componentInstall } from "@fall-ui/utils";
import FlContainer from "./src/container.vue";
import FlASide from "./aside/aside.vue";
import FlMain from "./main/main.vue";
import FlHeader from "./header/header.vue";
import FlFooter from "./footer/footer.vue";

const coms = [FlContainer, FlASide, FlMain, FlHeader, FlFooter];

coms.forEach((com) => {
  componentInstall(com);
});

export { FlASide, FlContainer, FlFooter, FlHeader, FlMain };
