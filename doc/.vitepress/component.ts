const moduleFiles = import.meta.glob("../examples/*/*.vue", { eager: true });

let modules = {};
for (const [key, value] of Object.entries(moduleFiles) as any) {
  const keys = key.split("/");
  const name = keys.slice(1).join("/");
  modules[name] = value.default;
}

export default modules
