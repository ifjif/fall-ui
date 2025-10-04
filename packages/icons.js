import {
  FlCheck,
  FlCheckCircle,
  FlCheckCircleFill,
  FlCloseCircle,
  FlCloseCircleFill,
  FlEye,
  FlEyeClose,
  FlInfoCircle,
  FlInfoCircleFill,
  FlLoading,
  FlSearch,
  FlWarningCircle,
  FlWarningCircleFill,
} from "@ui-library/icons";

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
];

export default function install(app) {
  icons.forEach((icon) => {
    app.use(icon);
  });
}
