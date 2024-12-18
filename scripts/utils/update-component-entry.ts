import fs from 'fs-extra'
import { resolve } from 'path'
import { PATHS } from './paths'
import { formatCode } from './format'

export const updateComponentEntry = async (name: string) => {
  const componentEntryPath = resolve(PATHS.root, 'packages/jy-ui/component.ts')
  const content = await fs.readFile(componentEntryPath, 'utf-8')

  // 解析现有的导入语句
  const importRegex = /import { [^}]+ } from '@jy-ui\/components\/[^']+'/g
  const imports: string[] = content.match(importRegex) || []

  // 解析现有的导出数组
  const exportRegex = /export default \[(.*?)\] as Plugin\[\]/
  const exportMatch = content.match(exportRegex)
  const exports = exportMatch ? exportMatch[1].split(',').map((s) => s.trim()) : []

  // 添加新组件的导入
  const componentName = `Jy${name.charAt(0).toUpperCase() + name.slice(1)}`
  const newImport = `import { ${componentName} } from '@jy-ui/components/${name}/index'`

  if (!imports.includes(newImport)) {
    imports.push(newImport)
  }

  // 添加新组件到导出数组
  if (!exports.includes(componentName)) {
    exports.push(componentName)
  }

  // 按字母顺序排
  imports.sort()
  exports.sort()

  // 生成新的文件内容
  const newContent = `${imports.join('\n')}

import type { Plugin } from 'vue'

export default [${exports.join(', ')}] as Plugin[]
`

  // 格式化并写入文件
  await fs.writeFile(componentEntryPath, await formatCode(newContent, 'component.ts'))
}
