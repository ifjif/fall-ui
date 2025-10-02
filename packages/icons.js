import {
  ACheck,
  ACheckCircle,
  ACloseCircle,
  AEye,
  AEyeClose,
  ALoading,
  ASearch,
} from "@ui-library/icons";

const icons = [
  ACheckCircle,
  ALoading,
  ASearch,
  ACloseCircle,
  AEyeClose,
  AEye,
  ACheck,
];

export default function install(app) {
  icons.forEach((icon) => {
    app.use(icon);
  });
}
