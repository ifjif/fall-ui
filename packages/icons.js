import * as icons from '@fall-ui/icons'

export default function install(app) {
  Object.values(icons).forEach(icon => {
    app.use(icon);
  })
}

export * from "@fall-ui/icons"
