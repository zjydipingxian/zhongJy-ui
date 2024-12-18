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

    for (const file of files) {
      // 跳过组件自身的文件
      if (file.includes(`packages/components/${componentName}/`)) continue

      const content = await fs.readFile(file, 'utf-8')

      // 检查可能的导入语句
      const importPattern = new RegExp(`['"](.*/${componentName})['"']|from\\s+['"](.*/${componentName})['"]`, 'g')
      // 检查组件使用
      const usagePattern = new RegExp(`<${componentName}[^>]*>|<${componentName}\\s*\/>`, 'g')

      if (importPattern.test(content) || usagePattern.test(content)) {
        result.hasDependencies = true
        result.dependencies.push(file)
        result.files.push(file)
      }
    }

    return result
  } catch (error) {
    console.error('依赖检查失败:', error)
    throw error
  }
}
