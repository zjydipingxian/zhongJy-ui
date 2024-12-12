const genSlice = (str: string) => str[0].toUpperCase() + str.slice(1)

// 生成组件索引文件内容的函数
export const generateIndexContent = (name: string): string => `
import { withInstall } from '@jy-ui/utils'

import ${genSlice(name)} from './src/${name}.vue'
import type { SFCWithInstall } from '@jy-ui/utils'

export const Jy${genSlice(name)} = withInstall(${genSlice(name)}) as SFCWithInstall<typeof ${genSlice(name)}>

export default Jy${genSlice(name)}

export * from './src/${name}'
`

// 生成组件类型文件内容的函数
export const generateComponentContent = (name: string): string => `
import type { ExtractPropTypes } from 'vue'
import type ${genSlice(name)} from './${name}.vue'

export const ${name}Props = {} as const

export type ${genSlice(name)}Props = ExtractPropTypes<typeof ${name}Props>

export type ${genSlice(name)}Instance = InstanceType<typeof ${genSlice(name)}>
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
  name: 'Jy${genSlice(name)}'
})

defineProps(${name}Props)
</script>
`
