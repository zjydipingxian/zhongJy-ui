// 生成组件索引文件内容的函数
export const generateIndexContent = (name: string): string => `
import { withInstall } from '@jy-ui/utils'

import ${name[0].toUpperCase() + name.slice(1)} from './src/${name}.vue'
import type { SFCWithInstall } from '@jy-ui/utils'

export const Jy${name[0].toUpperCase() + name.slice(1)} = withInstall(${name[0].toUpperCase() + name.slice(1)}) as SFCWithInstall<typeof ${name[0].toUpperCase() + name.slice(1)}>

export default Jy${name[0].toUpperCase() + name.slice(1)}

export * from './src/${name}'
`

// 生成组件类型文件内容的函数
export const generateComponentContent = (name: string): string => `
import type { ExtractPropTypes } from 'vue'
import type ${name[0].toUpperCase() + name.slice(1)} from './${name}.vue'

export const ${name}Props = {} as const

export type ${name[0].toUpperCase() + name.slice(1)}Props = ExtractPropTypes<typeof ${name}Props>

export type ${name[0].toUpperCase() + name.slice(1)}Instance = InstanceType<typeof ${name[0].toUpperCase() + name.slice(1)}>
`

// 生成 Vue 组件文件内容的函数
export const generateVueContent = (name: string): string => `
<template>
  <div class="jy-${name}">
    Hello from ${name}
  </div>
</template>

<script setup lang="ts">
import { ${name}Props } from './${name}'

defineOptions({
  name: 'Jy${name[0].toUpperCase() + name.slice(1)}'
})

defineProps(${name}Props)
</script>
`
