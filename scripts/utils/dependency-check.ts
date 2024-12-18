import fs from 'fs-extra'
import glob from 'fast-glob'

interface DependencyInfo {
  hasDependencies: boolean
  dependencies: string[]
  files: string[]
}

export async function checkComponentDependencies(componentName: string): Promise<DependencyInfo> {
  const result: DependencyInfo = {
    hasDependencies: false,
    dependencies: [],
    files: [],
  }

  try {
    // 搜索所有可能包含组件引用的文件
    const files = await glob(['packages/**/*.{vue,ts,tsx}', '!**/node_modules/**', '!**/dist/**'])

    // 将组件名转换为 Pascal Case (例如: button -> Button)
    const componentPascalCase = componentName.replace(/^\w|-\w/g, (letter) => letter.replace(/-/, '').toUpperCase())

    for (const file of files) {
      // 跳过组件自身的文件
      if (file.includes(`packages/components/${componentName}/`)) continue

      const content = await fs.readFile(file, 'utf-8')

      // 所有可能的引用模式
      const patterns = [
        // 1. 组件名称引用 (如 JyButton)
        new RegExp(`Jy${componentPascalCase}\\b`, 'g'),

        // 2. 路径导入 (如 from '@jy-ui/components/button')
        new RegExp(`['"](.*/${componentName})['"']|from\\s+['"](.*/${componentName})['"]`, 'g'),

        // 3. 模板中的组件使用 (如 <jy-button>)
        new RegExp(`<jy-${componentName}[^>]*>|<jy-${componentName}\\s*/>`, 'g'),

        // 4. 原始组件名使用 (如 <button>)
        new RegExp(`<${componentName}[^>]*>|<${componentName}\\s*/>`, 'g'),

        // 5. 组件注册 (如 components: { Button })
        new RegExp(`components:\\s*{[^}]*${componentPascalCase}[^}]*}`, 'g'),
      ]

      // 检查是否匹配任一模式
      const hasMatch = patterns.some((pattern) => pattern.test(content))

      if (hasMatch) {
        result.hasDependencies = true
        if (!result.dependencies.includes(file)) {
          result.dependencies.push(file)
          result.files.push(file)

          // 调试信息
          //   console.log(`在文件 ${file} 中找到组件 ${componentName} 的引用`)
          // 可以选择性地显示匹配到的具体内容
          // console.log('文件内容:', content)
        }
      }
    }

    return result
  } catch (error) {
    console.error('依赖检查失败:', error)
    throw error
  }
}
