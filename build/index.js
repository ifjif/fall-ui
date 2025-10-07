import { moduleBuild } from "./src/moduleBuild.js";
import { umdBuild } from "./src/umdBuild.js";
import { buildStyle } from "./src/styleBuild.js";

await moduleBuild();
await umdBuild();
buildStyle();
