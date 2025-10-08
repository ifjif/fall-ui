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
  FlWarningCircleFill
} from "./chunk-LWTMSZCB.js";
import "./chunk-ZZEIC257.js";
import "./chunk-BUSYA2B4.js";

// node_modules/fall-ui/es/icons.mjs
var icons = [
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
  FlWarningCircleFill
];
function install(app) {
  icons.forEach((icon) => {
    app.use(icon);
  });
}
export {
  install as default
};
//# sourceMappingURL=fall-ui_es_icons__mjs.js.map
