import { resolve } from 'path'
import { Transform } from 'stream'
// import chalk from 'chalk'
import type Vinyl from 'vinyl'
import { type TaskFunction, parallel, series, src, dest } from 'gulp'

import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import rename from 'gulp-rename'
import postcss from 'postcss'
import cssnano from 'cssnano'
// import cssnano from 'gulp-cssnano'
const distFolder = resolve(__dirname, 'dist')

function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false,
        },
      ],
    }),
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinyl

      if (file.isNull()) {
        callback(null, file)
        return
      }

      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        // const name = basename(file.path)
        file.contents = Buffer.from(result.css)
        // console.log(
        //   `${chalk.cyan(name)}: ${chalk.yellow(cssString.length / 1000)} KB -> ${chalk.green(result.css.length / 1000)} KB`,
        // )
        callback(null, file)
      })
    },
  })
}

const buildThemeChalk = () => {
  const sass = gulpSass(dartSass)
  const noElPrefixFile = /(index|base|display)/
  return src(resolve(__dirname, 'src/*.scss'))
    .pipe(sass.sync())
    .pipe(
      autoprefixer({
        cascade: true,
      }),
    )
    .pipe(compressWithCssnano())
    .pipe(
      rename((path) => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `jy-${path.basename}`
        }
      }),
    )
    .pipe(dest(distFolder))
}

export const build: TaskFunction = parallel(series(buildThemeChalk))

export default build
