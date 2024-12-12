import { validateComponentName } from '../utils/validate.js'
import { checkComponentExists } from '../utils/file.js'
import { createComponent } from '../utils/component.js'
import { input, confirm } from '@inquirer/prompts'
import chalk from 'chalk'

export const create = async () => {
  try {
    // 获取组件名
    const name = await input({
      message: '请输入组件名称',
      validate: async (input) => {
        const nameValidation = validateComponentName(input)
        if (nameValidation !== true) return nameValidation

        const existsValidation = await checkComponentExists(input)
        if (existsValidation !== true) return existsValidation

        return true
      },
    })

    // 确认创建
    const shouldCreate = await confirm({
      message: `创建组件 ${name}?`,
      default: true,
    })

    if (shouldCreate) {
      await createComponent(name)
    } else {
      console.log(chalk.yellow('组件创建取消'))
    }
  } catch (error) {
    console.error(chalk.red('错误:'), error)
    process.exit(1)
  }
}
