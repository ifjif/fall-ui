import fs from "fs";
import { outDirRelative } from "./common.js";

function deleteDir() {
  fs.rmSync(outDirRelative, { force: true });
}

export { deleteDir };
