import {
  FlCheck,
  FlCheckCircle,
  FlCloseCircle,
  FlEye,
  FlEyeClose,
  FlLoading,
  FlSearch,
} from "@ui-library/icons";

const icons = [
  FlCheckCircle,
  FlLoading,
  FlSearch,
  FlCloseCircle,
  FlEyeClose,
  FlEye,
  FlCheck,
];

export default function install(app) {
  icons.forEach((icon) => {
    app.use(icon);
  });
}
