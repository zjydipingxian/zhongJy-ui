import type { App, Component } from 'vue'
import { SFCWithInstall } from './typescript'

export const withInstall = <T extends Component>(component: T) => {
  ;(component as SFCWithInstall<T>).install = (app: App): void => {
    const { name } = component as unknown as { name: string }
    app.component(name, component)
  }
  return component
}
