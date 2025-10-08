import { defineConfig } from "vitepress";
import { createDemoContainer } from "./component/demo-container";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Fall UI",
  description: "vue3 ui 组件库",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "组件", link: "/examples/" },
    ],

    sidebar: {
      "/examples/": [
        {
          text: "基础",
          items: [
            { text: "Markdown Examples", link: "/markdown-examples" },
            { text: "Runtime API Examples", link: "/api-examples" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    config: (mk) => {
      createDemoContainer(mk);
    },
  },
});
