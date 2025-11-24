import { createApp } from "vue";
import App from "./App.vue";
import ChengUI from "../../packages/index";
import ChenUIcon from "../../packages/icons.js";
import "../../packages/themes/src/index.scss";
//import ChengUI from "../../fall-ui/es/index.mjs";
//import ChenUIcon from "../../fall-ui/es/icons.mjs";
//import "../../fall-ui/themes/index.css";

const app = createApp(App);
app.use(ChengUI);
app.use(ChenUIcon);
app.mount("#app");
