import { App, Plugin } from 'vue'

export const makeInstaller = (components: Plugin[]) => {
  return {
    install: (app: App) => {
      components.forEach((c) => app.use(c))
    },
  }
}
