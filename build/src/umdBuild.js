import { rollup } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import esBuild from "rollup-plugin-esbuild";
import { packDir, umdDir } from "./common.js";
import { resolve } from "path";

const inputOptions = {
  input: resolve(packDir, "index.js"),
  plugins: [
    vue(),
    nodeResolve({ extensions: [".ts"] }),
    esBuild(),
  ],
};
const outputOptions = {
  format: "umd",
  file: resolve(umdDir, "index.full.js"),
  name: "FallUI",
  globals: {
    vue: "Vue",
  },
};

const umdBuild = async () => {
  const build = await rollup(inputOptions);
  await build.write(outputOptions);
};

export { umdBuild };
