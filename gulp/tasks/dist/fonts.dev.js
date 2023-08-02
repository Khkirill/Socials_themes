"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fontsStyle = exports.ttfToWoff = exports.otfToTtf = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _gulpFonter = _interopRequireDefault(require("gulp-fonter"));

var _gulpTtf2woff = _interopRequireDefault(require("gulp-ttf2woff2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var otfToTtf = function otfToTtf() {
  return app.gulp.src("".concat(app.path.srcFolder, "/fonts/*.otf"), {}).pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: "FONTS",
    message: "Error: <%= error.message %>"
  }))).pipe((0, _gulpFonter["default"])({
    formats: ['ttf']
  })).pipe(app.gulp.dest("".concat(app.path.srcFolder, "/fonts/")));
};

exports.otfToTtf = otfToTtf;

var ttfToWoff = function ttfToWoff() {
  return app.gulp.src("".concat(app.path.srcFolder, "/fonts/*.ttf"), {}).pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: "FONTS",
    message: "Error: <%= error.message %>"
  }))).pipe((0, _gulpFonter["default"])({
    formats: ['woff']
  })).pipe(app.gulp.dest("".concat(app.path.build.fonts))).pipe(app.gulp.src("".concat(app.path.srcFolder, "/fonts/*.ttf"))).pipe((0, _gulpTtf2woff["default"])()).pipe(app.gulp.dest("".concat(app.path.build.fonts)));
};

exports.ttfToWoff = ttfToWoff;

var fontsStyle = function fontsStyle() {
  var fontsFile = "".concat(app.path.srcFolder, "/scss/fonts.scss");

  _fs["default"].readdir(app.path.build.fonts, function (err, fontsFiles) {
    if (fontsFiles) {
      if (!_fs["default"].existsSync(fontsFile)) {
        _fs["default"].writeFile(fontsFile, '', cb);

        var newFileOnly;

        for (var i = 0; i < fontsFiles.length; i++) {
          var fontFileName = fontsFiles[i].split('.')[0];

          if (newFileOnly !== fontFileName) {
            var fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
            var fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

            if (fontWeight.toLowerCase() === 'thin') {
              fontWeight = 100;
            } else if (fontWeight.toLowerCase() === 'extralight') {
              fontWeight = 200;
            } else if (fontWeight.toLowerCase() === 'light') {
              fontWeight = 300;
            } else if (fontWeight.toLowerCase() === 'medium') {
              fontWeight = 500;
            } else if (fontWeight.toLowerCase() === 'semibold') {
              fontWeight = 600;
            } else if (fontWeight.toLowerCase() === 'bold') {
              fontWeight = 700;
            } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
              fontWeight = 800;
            } else if (fontWeight.toLowerCase() === 'black') {
              fontWeight = 900;
            } else {
              fontWeight = 400;
            }

            _fs["default"].appendFile(fontsFile, "@font-face{\n\tfont-family: ".concat(fontName, ";\n\tfont-display: swap;\n\tsrc: url(\"../fonts/").concat(fontFileName, ".woff2\") format(\"woff2\"), url(\"../fonts/").concat(fontFileName, ".woff\") format(\"woff\");\n\tfont-weight: ").concat(fontWeight, ";\n\tfont-style: normal;\n}\r\n"), cb);
          }
        }
      }
    }
  });

  return app.gulp.src("".concat(app.path.srcFolder));

  function cb() {}
};

exports.fontsStyle = fontsStyle;