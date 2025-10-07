import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
const curFilePath = fileURLToPath(import.meta.url);
const curDir = dirname(curFilePath);
const rootDir = resolve(curDir, "..", "..");
const outDir = "fall-ui";
const packDir = resolve(rootDir, "packages");
const esDir = resolve(rootDir, outDir, "es");
const csDir = resolve(rootDir, outDir, "lib");
const umdDir = resolve(rootDir, outDir, "dist");
const themeDir = resolve(rootDir, outDir, "themes");

export { csDir, esDir, outDir, packDir, themeDir, umdDir };
