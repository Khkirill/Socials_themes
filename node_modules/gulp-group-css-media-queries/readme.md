# [gulp](http://gulpjs.com)-group-css-media-queries

[![Build Status](https://travis-ci.org/avaly/gulp-group-css-media-queries.svg?branch=master)](https://travis-ci.org/avaly/gulp-group-css-media-queries)
[![Dependency Status](https://david-dm.org/avaly/gulp-group-css-media-queries.svg)](https://david-dm.org/avaly/gulp-group-css-media-queries)
[![Flattr](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=avaly&url=https://github.com/avaly/gulp-group-css-media-queries&title=gulp-group-css-media-queries&language=&tags=github&category=software)

> CSS postprocessing: group media queries. Useful for postprocessing preprocessed CSS files.

This plugin is a wrapper for the [group-css-media-queries](https://github.com/Se7enSky/group-css-media-queries) plugin.


## Install

```bash
$ npm install --save-dev gulp-group-css-media-queries
```


## Usage

```js
var gulp = require('gulp');
var gcmq = require('gulp-group-css-media-queries');

gulp.task('default', function () {
	gulp.src('src/style.css')
		.pipe(gcmq())
		.pipe(gulp.dest('dist'));
});
```


## License

[MIT](http://opensource.org/licenses/MIT) © [Valentin Agachi](https://github.com/avaly)
