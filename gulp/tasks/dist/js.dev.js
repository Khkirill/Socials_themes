"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.js = void 0;

var _webpackStream = _interopRequireDefault(require("webpack-stream"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var js = function js() {
  return app.gulp.src(app.path.src.js, {
    sourcemaps: true
  }).pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: "JS",
    message: "Error <%= error.message %>"
  }))).pipe((0, _webpackStream["default"])({
    mode: 'development',
    output: {
      filename: 'app.min.js'
    }
  })).pipe(app.gulp.dest(app.path.build.js)).pipe(app.plugins.browsersync.stream());
};

exports.js = js;