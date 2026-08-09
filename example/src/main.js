import { createApp } from "vue";
import App from "./App.vue";

import FallUI from "../../packages/index";
import FallUIcon from "../../packages/icons.js";
import "../../packages/themes/src/index.scss";
/*
import FallUI from "../../fall-ui/es/index.mjs";
import FallUIcon from "../../fall-ui/es/icons.mjs";
import "../../fall-ui/themes/index.css";
*/

/*
import FallUI from 'fall-ui'
import FallUIcon from 'fall-ui/icons'
import "fall-ui/themes/index.css"
*/

import router from "./router";

const app = createApp(App);
app.use(FallUI);
app.use(FallUIcon)
app.use(router)
app.mount("#app");
