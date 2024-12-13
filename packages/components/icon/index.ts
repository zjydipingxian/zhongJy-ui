import { withInstall } from '@jy-ui/utils'

import Icon from './src/icon.vue'
import type { SFCWithInstall } from '@jy-ui/utils'

export const JyIcon = withInstall(Icon) as SFCWithInstall<typeof Icon>

export default JyIcon

export * from './src/icon'
