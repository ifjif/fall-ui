// 带重构
// scripts/build-icons.ts
import fs from 'fs'
import path from 'path'

const ICONS_DIR = path.resolve('src/icons')
const OUTPUT_DIR = path.resolve('packages/icons/src')

function generate() {
  const files = glob.sync('**/*.svg', { cwd: ICONS_DIR })
  const exports = []

  files.forEach(file => {
    const name = path.basename(file, '.svg')
    const pascalName = toPascalCase(name) // skip-up-fill → SkipUpFill
    const svgContent = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8')

    // 生成单个图标组件
    const component = `
<template>
  <svg class="fall-icon" viewBox="0 0 24 24" fill="currentColor" v-bind="$attrs">
    ${extractInnerContent(svgContent)}
  </svg>
</template>
<script>
import { genericIconName } from '@fall-ui/hooks'

export default {
  name: genericIconName('Loading')
}
</script>`

    fs.writeFileSync(path.join(OUTPUT_DIR, `${pascalName}.vue`), component)
    exports.push(`export { default as ${pascalName} } from './${pascalName}.vue'`)
  })

  // 生成入口文件
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), exports.join('\n'))
}
