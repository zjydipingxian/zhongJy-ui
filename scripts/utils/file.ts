import fs from 'fs-extra'
import { resolve } from 'path'
import { PATHS } from './paths.js'

export const checkComponentExists = async (name: string) => {
  const componentDir = resolve(PATHS.components, name)
  if (await fs.pathExists(componentDir)) {
    return `组件 ${name} 已存在`
  }
  return true
}
