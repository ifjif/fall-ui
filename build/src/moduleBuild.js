import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esBuild from "rollup-plugin-esbuild";
import glob from "fast-glob";
import { csDir, esDir, packDir } from "./common.js";

const input = await glob("**/*.{js,ts,vue}", {
  cwd: packDir,
  onlyFiles: true,
  absolute: true,
});

const inputOptions = {
  input,
  plugins: [
    vue(),
    nodeResolve({ extensions: [".ts"] }),
    esBuild(),
  ],
  external: [
    "vue",
    "async-validator",
  ],
};
const esOutputOptions = {
  format: "es",
  dir: esDir,
  entryFileNames: `[name].mjs`,
  sourcemap: true,
  preserveModules: true,
};
const cjsOutputOptions = {
  format: "cjs",
  dir: csDir,
  entryFileNames: `[name].cjs`,
  sourcemap: true,
  preserveModules: true,
};

const moduleBuild = async () => {
  const build = await rollup(inputOptions);
  await build.write(esOutputOptions);
  await build.write(cjsOutputOptions);
};

export { moduleBuild };
