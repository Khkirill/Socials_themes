"use strict";

/*
 * webpcss
 * https://github.com/lexich/webpcss
 *
 * Copyright (c) 2015 Efremov Alexey
 * Licensed under the MIT license.
 */

/* eslint class-methods-use-this: 0 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urldata = require("urldata");

var _urldata2 = _interopRequireDefault(_urldata);

var _cwebp = require("cwebp");

var _parseDataUri2 = require("parse-data-uri");

var _parseDataUri3 = _interopRequireDefault(_parseDataUri2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var webpBinPath = require("webp-converter/cwebp")();

var base64pattern = "data:";
var base64patternEnd = ";base64,";

var WebpBase64 = function () {
  function WebpBase64() {
    _classCallCheck(this, WebpBase64);
  }

  _createClass(WebpBase64, [{
    key: "extract",
    value: function extract(value, isUrl) {
      var result = [];
      if (!!isUrl) {
        var data = (0, _urldata2.default)(value);
        for (var i = 0; i < data.length; i += 1) {
          /* eslint no-continue: 0 */
          if (!data[i]) {
            continue;
          }
          result[result.length] = WebpBase64.extractor(data[i], isUrl);
        }
      } else {
        var res = WebpBase64.extractor(value, isUrl);
        if (res) {
          result[result.length] = res;
        }
      }
      return result;
    }
  }, {
    key: "convert",
    value: function convert(data, fConfig) {
      var buffer = data instanceof Buffer ? data : Buffer.from(data, "base64");
      var encoderBase = new _cwebp.CWebp(buffer, webpBinPath);
      var encoder = fConfig ? fConfig(encoderBase) : encoderBase;
      return encoder.toBuffer();
    }
  }], [{
    key: "extractor",
    value: function extractor(value) {
      if (!value) {
        return;
      }
      var base64pos = value.indexOf(base64pattern);
      if (base64pos >= 0) {
        var base64posEnd = value.indexOf(base64patternEnd);

        if (base64posEnd < 0) {
          var _parseDataUri = (0, _parseDataUri3.default)(value),
              mimeType = _parseDataUri.mimeType,
              data = _parseDataUri.data;

          return { mimetype: mimeType, data: data };
        } else {
          var mimetype = value.slice(base64pos + base64pattern.length, base64posEnd);
          var _data = value.slice(base64posEnd + base64patternEnd.length);
          return { mimetype: mimetype, data: _data };
        }
      } else {
        return { mimetype: "url", data: value };
      }
    }
  }]);

  return WebpBase64;
}();

exports.default = WebpBase64;
module.exports = exports.default;