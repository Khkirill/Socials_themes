# gulp-webp-html-nosvg

This is a modified version of the plugin [gulp-webp-html](https://www.npmjs.com/package/gulp-webp-html). Here was fixed thebug that added two dots before webp to the final html file. No SVG format.

## Example
```html
// Input
<img src="/images/catalogImage.jpg">

// Output
<picture>
    <source srcset="/images/catalogImage.webp" type="image/webp">
    <img src="/images/catalogImage.jpg">
</picture>


// Input
<img src="/images/catalogImage.jpg" srcset="/images/catalogImage2x.jpg 2x">

// Output
<picture>
    <source srcset="/images/catalogImage.webp, /images/catalogImage2x.webp 2x" type="image/webp">
    <img src="/images/catalogImage.jpg" srcset="/images/catalogImage2x.jpg 2x">
</picture>

// Input
<img src="/images/catalogImage.svg">

// Output
<img src="/images/catalogImage.svg">
```


## Install
```bash
npm i --save-dev gulp-webp-html-nosvg
```
## Usage
```javascript
let webphtml = require('gulp-webp-html-nosvg');

gulp.task('html',function(){
    gulp.src('./assets/**/*.html')
        .pipe(webphtml())
        .pipe(gulp.dest('./public/'))
});
```
