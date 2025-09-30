export * from './components/index'
export * from './icons/index'

import components from './components.js'

const install = (app) => {
  if (install.installed) return
  components.forEach(component => {
    app.use(component)
  })

  install.installed = true
}

install.installed = false

export default install




