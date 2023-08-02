# gulp-fonter

Font subsetting and converting plugin for gulp

## about

This plugin is basically gulp wrapper for fonteditor-core with ability to save in multiple formats at once.

## example usage 

```javascript
const fonter = require('gulp-fonter');

gulp.task('fonts', () => {
  return gulp
    .src('./src/fonts/*')
    .pipe(fonter({
        subset: [66,67,68, 69, 70, 71],
        formats: ['woff', 'ttf']
      }))
    .pipe(gulp.dest('./dist'));
});
```

## config

Plugin accepts all properties accepted by fonteditor-core, and additionally **formats** property with target formats. Format of original font is recognized automatically via extension of file.


| property       | possible values (default)           | Description                          |
| ------------- |:-----------------------------------:|---------------------------------------|
| subset        | null or array of ascii codes (null) or string | Set of ascii codes of glyphs, which will be left in font file. You can use array with ascii codes or string with letters |
| hinting       | boolean (true)                      | save font hinting                     |
| deflate       | null or function (null)             | deflate function for woff             |
| inflate       | null or function (null)             | inflate function for woff             |
| combinePath   | boolean (false)                     | for svg path                          |
|compound2simple| boolean (false)                     | transform ttf compound glyf to simple |
| formats       | null or array of strings (null).    | Target formats for fonts. Possible: ["ttf", "otf", "eot", "woff", "svg"]              |

## woff files

Currently fonteditor-core is having some problems with woff files as source. Please not use woff files as source if You no need to.
