export * from "./components/index";
export * from "./icons/index";

import components from "./components.js";
import directives from "./directives.js";

const install = (app) => {
  if (install.installed) return;
  directives.forEach(directive => {
    app.use(directive)
  })
  components.forEach((component) => {
    app.use(component);
  });

  install.installed = true;
};

install.installed = false;

export default install;
