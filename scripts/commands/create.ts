import { validateComponentName } from '../utils/validate.js' // 导入用于验证组件名称的函数
import { checkComponentExists } from '../utils/file.js' // 导入用于检查组件是否已存在的函数
import { createComponent } from '../utils/component.js' // 导入用于创建组件的函数
import { input, confirm } from '@inquirer/prompts' // 导入用于命令行交互的输入和确认函数
import chalk from 'chalk' // 导入用于在命令行中输出彩色文本的库

export const create = async () => {
  try {
    // 获取组件名
    const name = await input({
      message: '请输入组件名称',
      validate: async (input) => {
        const nameValidation = validateComponentName(input) // 验证组件名称是否合法
        if (nameValidation !== true) return nameValidation // 如果验证失败，返回错误信息

        const existsValidation = await checkComponentExists(input) // 检查组件是否已存在
        if (existsValidation !== true) return existsValidation // 如果组件已存在，返回错误信息

        return true
      },
    })

    // 确认创建
    const shouldCreate = await confirm({
      message: `创建组件 ${name}?`,
      default: true,
    })

    if (shouldCreate) {
      await createComponent(name) // 如果用户确认创建，调用函数创建组件
    } else {
      console.log(chalk.yellow('组件创建取消')) // 如果用户取消创建，输出取消信息
    }
  } catch (error) {
    console.error(chalk.red('错误:'), error)
    process.exit(1)
  }
}
