import { moduleBuild } from "./src/moduleBuild.js";
import { umdBuild } from "./src/umdBuild.js";
import { buildStyle } from "./src/styleBuild.js";
import { deleteDir, copyPackage, copyReadme, copyLicense } from "./src/file.js";

deleteDir()
await moduleBuild();
await umdBuild();
buildStyle();
copyPackage()
copyReadme()
copyLicense()
