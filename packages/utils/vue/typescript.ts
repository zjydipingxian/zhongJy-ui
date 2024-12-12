import type { Plugin, Component } from 'vue'

export type SFCWithInstall<T extends Component> = T & Plugin
