<template>
  <i :class="ns.b()" :style="style" v-bind="$attrs">
    <slot />
  </i>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import type { CSSProperties } from 'vue'

  import { useNamespace } from '@jy-ui/hooks'
  import { iconProps } from './icon'
  import { addUnit, isUndefined } from '@jy-ui/utils'

  const ns = useNamespace('icon')

  defineOptions({
    name: 'JyIcon',
  })

  const props = defineProps(iconProps)

  const style = computed<CSSProperties>(() => {
    const { size, color } = props
    if (!size && !color) return {}

    return {
      fontSize: isUndefined(size) ? undefined : addUnit(size),
      '--color': color,
    }
  })
</script>
