"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.path = void 0;

var nodePath = _interopRequireWildcard(require("path"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var rootFolder = nodePath.basename(nodePath.resolve());
var buildFolder = "./dist";
var srcFolder = "./src";
var path = {
  build: {
    js: "".concat(buildFolder, "/js/"),
    images: "".concat(buildFolder, "/img/"),
    css: "".concat(buildFolder, "/css/"),
    html: "".concat(buildFolder, "/"),
    fonts: "".concat(buildFolder, "/fonts"),
    files: "".concat(buildFolder, "/files/")
  },
  src: {
    js: "".concat(srcFolder, "/js/app.js"),
    images: "".concat(srcFolder, "/img/**/*.{jpg,jpeg,png,gif,webp}"),
    svg: "".concat(srcFolder, "/img/**/*.svg"),
    scss: "".concat(srcFolder, "/scss/style.scss"),
    html: "".concat(srcFolder, "/*.html"),
    files: "".concat(srcFolder, "/files/**/*.*")
  },
  watch: {
    js: "".concat(srcFolder, "/js/**/*.js"),
    images: "".concat(srcFolder, "/img/**/*.{jpg,jpeg,svg,ico,png,gif,webp}"),
    scss: "".concat(srcFolder, "/scss/**/*.scss"),
    html: "".concat(srcFolder, "/**/*.html"),
    files: "".concat(srcFolder, "/files/**/*.*")
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ""
};
exports.path = path;