import { checkComponentExists } from '../utils/file'
import { deleteComponent } from '../utils/component'
import { input, confirm } from '@inquirer/prompts'
import chalk from 'chalk'
import { checkComponentDependencies } from '../utils/dependency-check'
import { createBackup } from '../utils/backup'

export const remove = async () => {
  try {
    // 获取要删除的组件名
    const name = await input({
      message: '请输入要删除的组件名称',
      validate: async (input) => {
        const existsValidation = await checkComponentExists(input)
        console.log('🚀 ~ validate: ~ existsValidation:', existsValidation)
        if (existsValidation !== true) return true
        return '组件不存在'
      },
    })

    // 检查组件依赖
    const dependencies = await checkComponentDependencies(name)
    if (dependencies.hasDependencies) {
      console.log(chalk.yellow('\n⚠️  警告: 该组件被以下文件引用:'))
      dependencies.files.forEach((file) => {
        console.log(chalk.yellow(`  - ${file}`))
      })

      const forceDeletion = await confirm({
        message: chalk.red('组件存在依赖关系，确定要强制删除吗？'),
        default: false,
      })

      if (!forceDeletion) {
        console.log(chalk.yellow('删除操作已取消'))
        return
      }
    }

    // 创建备份
    const backupCreated = await confirm({
      message: '是否在删除前创建备份？',
      default: true,
    })

    if (backupCreated) {
      const backupPath = await createBackup(name)
      console.log(chalk.green(`备份已创建: ${backupPath}`))
    }

    // 最终确认删除
    const shouldDelete = await confirm({
      message: chalk.red(`⚠️ 最后确认: 删除组件 ${name}? 此操作不可恢复！`),
      default: false,
    })

    if (shouldDelete) {
      await deleteComponent(name)
    } else {
      console.log(chalk.yellow('删除操作已取消'))
    }
  } catch (error) {
    console.error(chalk.red('错误:'), error)
    process.exit(1)
  }
}
