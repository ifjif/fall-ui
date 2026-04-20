const componentInstall = (com) => {
  com.install = (app) => {
    app.component(com.name, com);
  };

  return com;
};

const functionInstall = (com, name) => {
  com.install = (app) => {
    app.config.globalProperties[name] = com;
  };
  return com;
};

const directiveInstall = (directive, name) => {
  directive.install = (app) => {
    app.directive(name, directive)
  }

  return directive
}

export { componentInstall, functionInstall, directiveInstall };
