import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Demo from "../component/demo.vue";
import FallUI from "fall-ui/es/index.mjs";
import FallIcon from "fall-ui/es/icons.mjs";
import "fall-ui/dist/index.min.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("Demo", Demo);
    app.use(FallUI);
    app.use(FallIcon);
  },
} satisfies Theme;
