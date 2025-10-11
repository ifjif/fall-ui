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
      { text: "组件", link: "/examples/button" },
    ],

    sidebar: {
      "/examples/": [
        {
          text: "基础",
          items: [
            { text: "button", link: "/examples/button" },
            { text: "checkbox", link: "/examples/checkbox" },
            { text: "radio", link: "/examples/radio" },
            { text: "input", link: "/examples/input" },
            { text: "textarea", link: "/examples/textarea" },
            { text: "form", link: "/examples/form" },
            { text: "container", link: "/examples/container" },
            { text: "row", link: "/examples/row" },
            { text: "message", link: "/examples/message" },
            { text: "messagebox", link: "/examples/messagebox" },
            { text: "drawer", link: "/examples/drawer" },
            { text: "modal", link: "/examples/modal" },
            { text: "icon", link: "/examples/icon" },
            { text: "mask", link: "/examples/mask" },
            { text: "switch", link: "/examples/switch" },
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
