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

export { componentInstall, functionInstall };
