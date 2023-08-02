"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.plugins = void 0;

var _gulpReplace = _interopRequireDefault(require("gulp-replace"));

var _gulpPlumber = _interopRequireDefault(require("gulp-plumber"));

var _gulpNotify = _interopRequireDefault(require("gulp-notify"));

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _gulpNewer = _interopRequireDefault(require("gulp-newer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var plugins = {
  replace: _gulpReplace["default"],
  plumber: _gulpPlumber["default"],
  notify: _gulpNotify["default"],
  browsersync: _browserSync["default"],
  newer: _gulpNewer["default"]
};
exports.plugins = plugins;