import {
  ACheckCircle, ALoading, ASerch, ACloseCircle, AEyeClose, AEye
} from '@ui-library/icons'

const icons = [ACheckCircle, ALoading, ASerch, ACloseCircle, AEyeClose, AEye]

export default function install(app) {
  icons.forEach(icon => {
    app.use(icon)
  })
}
