import gulp from "gulp";
import gulpSass from "gulp-sass";
import gulpConcat from "gulp-concat";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";
import { packDir, themeDir, umdDir } from "./common.js";

const buildCssModules = async () => {
  const sass = gulpSass(dartSass);

  await new Promise((resolve, reject) => {
    gulp.src(`${packDir}/themes/src/**/*.scss`)
      .pipe(sass.sync()) //编译
      .pipe(autoprefixer({ cascade: false })) //兼容
      .pipe(cleanCSS()) //压缩
      .pipe(gulp.dest(`${themeDir}`)) //输出到指定目录
      .on("end", resolve);
  });
};

const buildCssFull = async () => {
  const sass = gulpSass(dartSass);

  await new Promise((resolve, reject) => {
    gulp.src(`${packDir}/themes/src/index.scss`)
      .pipe(sass.sync())
      .pipe(autoprefixer({ cascade: false }))
      .pipe(cleanCSS())
      .pipe(gulpConcat(`index.min.css`))
      .pipe(gulp.dest(umdDir))
      .on("end", resolve);
  });
};

export const buildStyle = async () => {
  await Promise.all([buildCssFull(), buildCssModules()]);
};
