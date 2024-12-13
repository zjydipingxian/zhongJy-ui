import { execSync } from 'child_process'
import chalk from 'chalk'

const publishPkg = async () => {
  try {
    // 确保在主分支
    const currentBranch = execSync('git branch --show-current').toString().trim()
    if (currentBranch !== 'master') {
      throw new Error('只允许在 master 分支上发布')
    }

    // 确保工作区干净
    // const status = execSync('git status -s').toString().trim()
    // if (status) {
    //   throw new Error('工作区不干净')
    // }

    // 构建
    // execSync('pnpm build', { stdio: 'inherit' })

    // 创建版本并更新依赖
    execSync('pnpm changeset version', { stdio: 'inherit' })

    // 发布包
    // execSync('pnpm changeset publish', { stdio: 'inherit' })

    // 提交变更
    execSync('git add .')
    execSync('git commit -m "chore: publish packages"')
    execSync('git push')

    console.log(chalk.green('Successfully published packages'))
  } catch (error) {
    console.error(chalk.red('Failed to publish:'), error)
    process.exit(1)
  }
}

publishPkg()
