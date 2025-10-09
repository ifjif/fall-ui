import {
  FlCheck,
  FlCheckCircle,
  FlCheckCircleFill,
  FlCloseCircle,
  FlCloseCircleFill,
  FlCode,
  FlEye,
  FlEyeClose,
  FlFileCopy,
  FlInfoCircle,
  FlInfoCircleFill,
  FlLoading,
  FlSearch,
  FlWarningCircle,
  FlWarningCircleFill,
} from "@fall-ui/icons";

const icons = [
  FlCheckCircle,
  FlLoading,
  FlSearch,
  FlCloseCircle,
  FlEyeClose,
  FlEye,
  FlCheck,
  FlInfoCircle,
  FlWarningCircle,
  FlCheckCircleFill,
  FlCloseCircleFill,
  FlInfoCircleFill,
  FlWarningCircleFill,
  FlFileCopy,
  FlCode,
];

export default function install(app) {
  icons.forEach((icon) => {
    app.use(icon);
  });
}
