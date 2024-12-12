import { resolve } from 'path'
import { fileURLToPath } from 'url'

// 获取当前模块的目录名
const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 定义项目中常用路径的常量
export const PATHS = {
  root: resolve(__dirname, '../../'), // 项目根目录
  components: resolve(__dirname, '../../packages/components'), // 组件目录
  componentsEntry: resolve(__dirname, '../../packages/components/index.ts'), // 组件入口文件
} as const
