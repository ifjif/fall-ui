import { moduleBuild } from "./src/moduleBuild.js";
import { umdBuild } from "./src/umdBuild.js";
import { buildStyle } from "./src/styleBuild.js";
import { deleteDir } from "./src/file.js";

deleteDir()
await moduleBuild();
await umdBuild();
buildStyle();
