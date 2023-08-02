/*
 * webpcss
 * https://github.com/lexich/webpcss
 *
 * Copyright (c) 2015 Efremov Alexey
 * Licensed under the MIT license.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform = transform;

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _Webpcss = require("./Webpcss");

var _Webpcss2 = _interopRequireDefault(_Webpcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultWebpcss = null;

var plugin = _postcss2.default.plugin("webpcss", function (options) {
  var pt = options ? new _Webpcss2.default(options) : defaultWebpcss || (defaultWebpcss = new _Webpcss2.default());
  return function (css) {
    return new Promise(function (resolve, reject) {
      return pt.postcss(css, function (err, data) {
        return err ? reject(err, data) : resolve(data);
      });
    });
  };
});

exports.default = plugin;
function transform(data, options, processOptions) {
  return (0, _postcss2.default)([plugin(options)]).process(data, processOptions);
}