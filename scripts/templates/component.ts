export const genSlice = (str: string) => str[0].toUpperCase() + str.slice(1)
export const defaultNamespace = 'Jy'

// 生成组件索引文件内容的函数
export const generateIndexContent = (name: string): string => `
import { withInstall } from '@jy-ui/utils'

import ${genSlice(name)} from './src/${name}.vue'
import type { SFCWithInstall } from '@jy-ui/utils'

export const ${defaultNamespace}${genSlice(name)} = withInstall(${genSlice(name)}) as SFCWithInstall<typeof ${genSlice(name)}>

export default ${defaultNamespace}${genSlice(name)}

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
  <div :class="ns.b()">
    Hello from ${name}
  </div>
</template>

<script setup lang="ts">
import { useNamespace } from '@jy-ui/hooks'
import { ${name}Props } from './${name}'

const ns = useNamespace('${name}')

defineOptions({
  name: '${defaultNamespace}${genSlice(name)}'
})

defineProps(${name}Props)
</script>
`
