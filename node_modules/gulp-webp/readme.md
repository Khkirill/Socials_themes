# gulp-webp [![Build Status](https://travis-ci.org/sindresorhus/gulp-webp.svg?branch=master)](https://travis-ci.org/sindresorhus/gulp-webp)

> Convert images to [WebP](https://developers.google.com/speed/webp/)

Supports PNG, JPEG, TIFF, WebP.


## Install

```
$ npm install --save-dev gulp-webp
```


## Usage

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('default', () =>
	gulp.src('src/image.jpg')
		.pipe(webp())
		.pipe(gulp.dest('dist'))
);
```


## API

Note that unsupported files are ignored.

### webp([options])

See the `imagemin-webp` [options](https://github.com/imagemin/imagemin-webp#imageminwebpoptions).


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
