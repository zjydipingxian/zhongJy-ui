import fs from 'fs-extra'
import { resolve } from 'path'
import { PATHS } from './paths.js'
import { formatCode } from './format.js'
import { generateIndexContent, generateComponentContent, generateVueContent } from '../templates/component.js'
import chalk from 'chalk'
import ora from 'ora'

export const createComponent = async (name: string) => {
  const spinner = ora('正在创建组件...').start()
  const componentDir = resolve(PATHS.components, name)
  let created = false

  try {
    // 先尝试创建和格式化所有文件内容，但不写入
    const files: Record<string, string> = {
      'index.ts': await formatCode(generateIndexContent(name), 'index.ts'),
      [`src/${name}.ts`]: await formatCode(generateComponentContent(name), `${name}.ts`),
      [`src/${name}.vue`]: await formatCode(generateVueContent(name), `${name}.vue`),
    }

    // 创建目录结构
    await fs.ensureDir(componentDir)
    await fs.ensureDir(resolve(componentDir, 'src'))
    await fs.ensureDir(resolve(componentDir, 'style'))

    // 写入文件
    for (const [file, content] of Object.entries(files)) {
      await fs.writeFile(resolve(componentDir, file), content)
    }
    created = true

    // 更新入口文件
    await updateComponentsEntry(name)

    spinner.succeed(chalk.green(`组件 ${name} 创建成功！`))
  } catch (error) {
    spinner.fail(chalk.red(`组件 ${name} 创建失败`))
    // 如果文件已经创建，但后续步骤失败，则清理已创建的文件
    if (created) {
      try {
        await fs.remove(componentDir)
      } catch (cleanupError) {
        console.error(chalk.red('清理失败的组件文件失败:'), cleanupError)
      }
    }
    throw error
  }
}

// 更新组件库入口文件
const updateComponentsEntry = async (newComponent: string) => {
  try {
    // 读取现有的导出语句
    let content = await fs.readFile(PATHS.componentsEntry, 'utf-8')
    const exportStatements = content.match(/export \* from '\.\/[^']+'/g) || []

    // 添加新的导出语句
    exportStatements.push(`export * from './${newComponent}'`)

    // 按字母顺序排序
    exportStatements.sort()

    // 格式化并写入文件
    content = exportStatements.join('\n') + '\n'
    await fs.writeFile(PATHS.componentsEntry, await formatCode(content))
  } catch (error) {
    console.error(chalk.red('更新入口文件失败:'), error)
    throw error
  }
}