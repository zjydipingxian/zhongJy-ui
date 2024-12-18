import fs from 'fs-extra'
import { resolve } from 'path'
import { PATHS } from './paths'
import dayjs from 'dayjs'

export async function createBackup(componentName: string): Promise<string> {
  const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss')
  const backupDir = resolve(PATHS.root, 'backups', `${componentName}_${timestamp}`)
  const componentDir = resolve(PATHS.components, componentName)

  try {
    // 创建备份目录
    await fs.ensureDir(backupDir)

    // 复制组件文件到备份目录
    await fs.copy(componentDir, backupDir)

    // 创建元数据文件，记录备份信息
    const metadata = {
      componentName,
      backupDate: new Date().toISOString(),
      originalPath: componentDir,
    }
    await fs.writeJSON(resolve(backupDir, 'backup-metadata.json'), metadata, { spaces: 2 })

    return backupDir
  } catch (error) {
    console.error('创建备份失败:', error)
    throw error
  }
}
