import fs from "fs";
import { outDirRelative, packDir } from "./common.js";
import path from "path";

function deleteDir() {
  fs.rmSync(outDirRelative, { force: true, recursive: true });
}

function copyPackage() {
  fs.cp(path.resolve(packDir, 'package.json'), path.resolve(outDirRelative, 'package.json'), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('copy package.json 成功')
    }
  })
}

function copyReadme() {
  fs.cp(path.resolve(packDir, 'README.md'), path.resolve(outDirRelative, 'README.md'), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('copy README.MD 成功')
    }
  })
}
function copyLicense() {
  fs.cp(path.resolve(packDir, 'LICENSE'), path.resolve(outDirRelative, 'LICENSE'), err => {
    if (err) {
      console.log(err)
    } else {
      console.log('copy LICENSE 成功')
    }
  })
}

export { deleteDir, copyPackage, copyReadme, copyLicense };
