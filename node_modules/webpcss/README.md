[![Build Status](https://travis-ci.org/lexich/webpcss.svg)](https://travis-ci.org/lexich/webpcss)
[![NPM version](https://badge.fury.io/js/webpcss.svg)](http://badge.fury.io/js/webpcss)
[![Coverage Status](https://coveralls.io/repos/lexich/webpcss/badge.png)](https://coveralls.io/r/lexich/webpcss)
[![Dependency Status](https://david-dm.org/lexich/webpcss.png)](https://david-dm.org/lexich/webpcss)
[![devDependency Status](https://david-dm.org/lexich/webpcss/dev-status.png)](https://david-dm.org/lexich/webpcss)

### About
[PostCSS](https://github.com/postcss/postcss) processor to add links to WebP images for browsers that support it.

WebP is image format that is smaller, that PNG or JPEG, but it is [supported](http://caniuse.com/webp) only by Chrome.

### Plugins for intergation with popular frontend build systems
* [grunt-webpcss](https://github.com/lexich/grunt-webpcss)
* [gulp-webpcss](https://github.com/lexich/gulp-webpcss)

### Install
This plugin use [cwebp](https://github.com/Intervox/node-webp) for processing images. If you want to use this functionality read [Installation Guide](https://github.com/Intervox/node-webp#installation)

### Support
Postcss drop support node 0.10.0 by default. But if your need this version
use Promise polyfill.
```js
var Promise = require("es6-promise");
Promise.polyfill();
```
Versions >= 0.12 including 4.0.0 and iojs works without polyfills

### Examples
Using with [webpack](https://webpack.github.io/) and [postcss-loader](https://github.com/postcss/postcss-loader):
*[https://github.com/lexich/example-webpack-postcss-loader-webpcss](https://github.com/lexich/example-webpack-postcss-loader-webpcss)*


Using with [gulp-postcss](https://github.com/w0rm/gulp-postcss):

```js
var gulp = require('gulp');
var webp = require('gulp-webp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var webpcss = require('webpcss');

gulp.task('webp', function () {
    return gulp.src('./images/*.{png,jpg,jpeg}')
        .pipe(webp())
        .pipe(gulp.dest('./images'));
});

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        webpcss.default
    ];
    return gulp.src('./src/*.css')
        .pipe( postcss(processors) )
        .pipe( gulp.dest('./dist') );
});
gulp.task('default',['webp', 'css']);
```

Results of webpcss processor.

```css
/* Source */
.icon { color: #222; background-image: url('../images/icon.png'); }

/* Result */
.icon { background-image: url('../images/icon.png'); }
.icon { color: #222; }
.webp .icon { background-image: url('../images/icon.webp'); }
```

Results of webp task.
webp task appends .webp images for every .png image.

```sh
#Source
> ls images
icon.png

#Result
> ls images
icon.png icon.webp
```

### Options

- `webpClass`
Type: String
Default: '.webp'
Class which prepend selector. For expample:
before

```css
.test { background-image:url('test.png'); }
```

after

```css
.test { background-image:url('test.png'); }
.webp .test { background-image:url('test.webp'); }
```
.webp class indicate webp browser support. Recommends to use [Modernizr](http://modernizr.com/)

- `noWebpClass`
Type: String
Default: ""
Class which prepend selector without webp content. For expample:
`noWebpClass=".no-webp"`
before

```css
.test { background-image:url('test.png'); }
```

after

```css
.no-webp .test { background-image:url('test.png'); }
.webp .test { background-image:url('test.webp'); }
```

- `replace_from`
Type: RegExp
Default: /\.(png|jpg|jpeg)/
RegExp pattern for replace

- `replace_to`
Type: String or Function
Default: .webp
    The contents of `replace_from` will be replaced by `replace_to`. They will be replaced with ".webp" by default.

    If `replace_to` is a Function, not `replace_from` but the whole url will be replaced with the return value of the function.

    The function will have a argument object, which has the following properties:
    > `url`: The whole original url.

To checks browser support of webp format need to use [Modernizr](http://modernizr.com/) which adds `.webp` class to `body` if browser support WebP and browser will download smaller WebP image instead of bigger PNG.

```html
<script>
  document.documentElement.classname += (Modernizr.webp ? "webp" : "no-webp");
</script>
```


- `process_selector`
Type: function(selector, baseClass)
modify `selector` with `baseClass`

- `inline`
Type: Boolean
Default: false
Turn on inline images mode. You need setup `image_path` and `css_path` for
correct resolving image path.

```css
.test { background-image:url('test.png'); } // `${inline}/`test.png
```
after
```css
.test { background-image:url('test.png'); } // `${inline}/`test.png
.webp .test { background-image: url(data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAADwAQCdASoKAAgAAgA0JQBOgB6XKgsI3ogA/gEAtARF3E8iPiuncdF4zSgVjkZEgIatdknUme0fy3LBWFwbOjWUoaOOso78HmdNsa5gir1gmEwgAAA=); }
```

- `image_root`
Type: String
Default: ""
This property needs to resolve absolute paths `url(/images/1.png)` while inlining images or other file info options.

- `css_root`
Type: String
Default: ""
This property needs to resolve relative paths `url(../images/1.png)` `url(image.png)` while inlining images or other file info options.

- `minAddClassFileSize`
Type: Number
Default: 0
`webpClass` will be added when images only of which greater than certain certain file size in bytes. It only works when the file path can be resolved(Either `image_root` or `css_root` or `resolveUrlRelativeToFile`) if they are files but not base64 encoded content.

- `resolveUrlRelativeToFile`
Type: Boolean
Default: false
This property is needed to resolve relative paths `url(../images/1.png)` `url(image.png)` while inlining images or other options which are relative to file info . It will try to find resource file relative to current css file when it's true and `css_root` is not set.

- `localImgFileLocator`
Type: Function
Default: null
When this property is set, it will be used to resolve the file path of image from the css url value while inlining images or other options which are relative to file info. In addition, `resolveUrlRelativeToFile`, `css_root`, `image_root` will be ignored.
This function should return the exact file path in the file system and it has an argument object, which contains the following properties:
```javascript
{
  url, // The original url in the css value
  cssFilePath, // The absolute file path of the css file
}
```

- `copyBackgroundSize`
Type: Boolean
Default: false
It will copy the `background-size` rule of same scope into the webp class rules if it's true

- `replaceRemoteImage`
Type: Boolean
Default: true
It will add webp class when the url it's with host(eg. `url(//foo.com/image.png)` or `url(http://foo.com/image.png)` or `url(https://foo.com/image.png)`) if it's true

- `cwebp_configurator`
Type: function(encoder){}
Default: null
You can configure cwebp encoder according [cwebp documentation](https://github.com/Intervox/node-webp#specifying-conversion-options)

### Changelog
- 1.3.0 - Add option `localImgFileLocator`
- 1.2.1 - Add options `copyBackgroundSize`, `replaceRemoteImage`, bug fixes for absolute URL detection and unsupported based64 encoded content.
- 1.2.0 - Improve cross platform compatibility, add Function type as replace_to option, add options `minAddClassFileSize`, `resolveUrlRelativeToFile`
- 1.1.0 - add webpClass, noWebpClass options deprecate baseClass option
- 1.0.0 - add suport CWeb for automatic inline images in webp format
- 0.0.11 - add support of border-image, update deps
- 0.0.10 - update deps
- 0.0.9 - update postcss to 2.2.6
- 0.0.8 - fix bug with using @media-queryes and @support statement
- 0.0.7 - fix bug with multiple selectors
- 0.0.6 - add process_selector options for transform selectors
- 0.0.5 - update api according postcss convention


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/lexich/webpcss/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

