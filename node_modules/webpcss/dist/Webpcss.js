"use strict";

/*
 * webpcss
 * https://github.com/lexich/webpcss
 *
 * Copyright (c) 2015 Efremov Alexey
 * Licensed under the MIT license.
 */

/* eslint no-useless-escape: 0 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mimeTypes = require("mime-types");

var _mimeTypes2 = _interopRequireDefault(_mimeTypes);

var _fileType = require("file-type");

var _fileType2 = _interopRequireDefault(_fileType);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require("lodash");

var _WebpBase = require("./WebpBase64");

var _WebpBase2 = _interopRequireDefault(_WebpBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function readFileAsync(path) {
  return new Promise(function (resolve, reject) {
    (0, _fs.readFile)(path, function (err, data) {
      return err ? reject(err) : resolve(data);
    });
  });
}

var rxHtml = /^html[_\.#\[]{1}/;
var DEFAULTS = {
  webpClass: ".webp",
  noWebpClass: "",
  replace_from: /\.(png|jpg|jpeg)/g,
  replace_to: ".webp",
  inline: false /* root path to folder */
  , image_root: "",
  css_root: "",
  minAddClassFileSize: 0,
  resolveUrlRelativeToFile: false,
  copyBackgroundSize: false,
  replaceRemoteImage: true,
  cwebp_configurator: null,
  process_selector: function process_selector(selector, baseClass) {
    if (baseClass) {
      return rxHtml.test(selector) ? selector.replace("html", "html" + baseClass) : baseClass + " " + selector;
    }
    return selector;
  }
};

function deprecate(msg) {
  /* eslint no-console: 0 */
  typeof console !== "undefined" && console.warn && console.warn(msg);
}

function canURLLocalResolve(url) {
  /* url(//foo.com/image.png) or url(http://foo.com/image.png) or url(https://foo.com/image.png) abs path with host */
  return !/^(https?:)?\/\//i.test(url);
}

var Webpcss = function () {
  function Webpcss(opts) {
    _classCallCheck(this, Webpcss);

    if (!opts) {
      this.options = DEFAULTS;
    } else {
      this.options = _extends({}, DEFAULTS, opts);
      if (opts.baseClass) {
        this.options.webpClass = opts.baseClass;
        delete opts.baseClass;
        deprecate("Option `baseClass` is deprecated. Use webpClass instead.");
      }
    }
    this.base64 = new _WebpBase2.default();
  }

  _createClass(Webpcss, [{
    key: "postcss",
    value: function postcss(css, cb) {
      var _this = this;

      var asyncNodes = [];
      css.walkDecls(function (decl) {
        if ((decl.prop.indexOf("background") === 0 || decl.prop.indexOf("border-image") === 0) && decl.value.indexOf("url") >= 0) {
          asyncNodes[asyncNodes.length] = _this.asyncProcessNode(decl);
        }
      });
      return Promise.all(asyncNodes).then(function (nodes) {
        nodes.filter(function (decl) {
          return decl;
        }).forEach(function (decl) {
          return css.append(decl);
        });
        cb();
      }).catch(function () {
        return cb();
      });
    }
  }, {
    key: "asyncProcessNode",
    value: function asyncProcessNode(decl) {
      var options = this.options,
          base64 = this.base64;


      function resolveUrlPath(url) {
        var urlPath = url;
        var canLocalResolve = canURLLocalResolve(url);

        if (canLocalResolve) {
          var localImgFileLocator = options.localImgFileLocator;

          if (localImgFileLocator) {
            var input = decl.source.input;

            if (input && input.file) {
              var cssFilePath = _path2.default.resolve(input.file);
              urlPath = localImgFileLocator({
                url: url,
                cssFilePath: cssFilePath
              });
            } else {
              console.warn("Source input not found: " + url);
            }
          } else if (url[0] === "/") {
            /* url(/image.png) abs path */
            urlPath = _path2.default.resolve(_path2.default.join(options.image_root, url));
          } else {
            /* url(../images.png) or url(image.png) - relative css path */
            var resolveUrlRelativeToFile = options.resolveUrlRelativeToFile;

            if (options.css_root || !resolveUrlRelativeToFile) {
              urlPath = _path2.default.resolve(_path2.default.join(options.css_root, url));
            } else if (resolveUrlRelativeToFile) {
              // resolve relative path automatically
              var _input = decl.source.input;

              if (_input && _input.file) {
                var file = _input.file;

                urlPath = _path2.default.resolve(_path2.default.join(_path2.default.dirname(file), url));
              } else {
                console.warn("Source input not found: " + url);
              }
            }
          }
        }
        return {
          urlPath: urlPath,
          canLocalResolve: canLocalResolve
        };
      }

      var breaks = 0;
      var selector = decl.parent.selectors.map(function (sel) {
        return options.process_selector(sel, options.webpClass);
      }).join(", ");
      var urls = base64.extract(decl.value, true);
      if (!urls.length) {
        return;
      }
      var rx = options.replace_from instanceof RegExp ? options.replace_from : new RegExp(options.replace_from, "g");
      var asyncUrls = urls.map(function (item) {
        var url = item.data;
        var minAddClassFileSize = options.minAddClassFileSize;

        if (item.mimetype === "url") {
          var shouldAddClass = true;

          if (minAddClassFileSize > 0) {
            var _resolveUrlPath = resolveUrlPath(url),
                urlPath = _resolveUrlPath.urlPath,
                canLocalResolve = _resolveUrlPath.canLocalResolve;

            if (canLocalResolve) {
              try {
                var fileSize = _fs2.default.statSync(urlPath).size;
                if (fileSize < minAddClassFileSize) {
                  shouldAddClass = false;
                }
              } catch (e) {
                console.warn("Analyze file " + urlPath + " size failed", e);
              }
            }
          }

          if (!options.inline) {
            var replaceTo = options.replace_to;

            var src = url;

            if (shouldAddClass) {
              var replaceRemoteImage = options.replaceRemoteImage;

              if (replaceRemoteImage || canURLLocalResolve(url)) {
                src = (0, _lodash.isFunction)(replaceTo) ? replaceTo({
                  url: url
                }) : url.replace(rx, replaceTo);
              }
            }
            breaks += +(src === url);
            return "url(" + src + ")";
          } else {
            // eslint-disable-next-line no-lonely-if
            if (shouldAddClass) {
              var _resolveUrlPath2 = resolveUrlPath(url),
                  _urlPath = _resolveUrlPath2.urlPath,
                  _canLocalResolve = _resolveUrlPath2.canLocalResolve;

              if (_canLocalResolve) {
                return readFileAsync(_urlPath).then(function (data) {
                  return base64.convert(data, options.cwebp_configurator).then(function (buffer) {
                    return buffer && "url(data:image/webp;base64," + buffer.toString("base64") + ")";
                  }).catch(function () {
                    return "url(" + item.data + ")";
                  });
                }).catch(function () {
                  breaks += 1;
                  return "url(" + item.data + ")";
                });
              } else {
                breaks += 1;
                return "url(" + item.data + ")";
              }
            } else {
              breaks += 1;
              return "url(" + item.data + ")";
            }
          }
        } else {
          var buffer = url instanceof Buffer ? url : Buffer.from(url, "base64");

          var _shouldAddClass = true;
          var ext = _mimeTypes2.default.extension(item.mimetype);
          if (!ext) {
            var ft = (0, _fileType2.default)(buffer);
            if (ft) {
              ext = ft.ext;
            }
          }
          // Unsupported types guarding
          if (!/png|jpg|jpeg|gif/i.test(ext)) {
            _shouldAddClass = false;
          } else if (minAddClassFileSize > 0) {
            if (Buffer.byteLength(buffer) < minAddClassFileSize) {
              _shouldAddClass = false;
            }
          }

          if (_shouldAddClass) {
            return base64.convert(url).then(function (buffer) {
              if (buffer) {
                return "url(data:image/webp;base64," + buffer.toString("base64") + ")";
              }
            }).catch(function () {
              breaks += 1;
              return "url(" + item.data + ")";
            });
          } else {
            breaks += 1;
            return "url(" + item.data + ")";
          }
        }
      });
      return Promise.all(asyncUrls).then(function (urls) {
        if (breaks !== urls.length) {
          var originalRule = decl.parent;
          var copyBackgroundSize = options.copyBackgroundSize;


          if (options.noWebpClass) {
            // add .no-webp
            var selectorNoWebP = originalRule.selectors.map(function (sel) {
              return options.process_selector(sel, options.noWebpClass);
            }).join(", ");

            var noWebpRule = Webpcss.formatRule(originalRule.cloneBefore({
              selector: selectorNoWebP
            }));

            decl.raws.before = " ";
            decl.moveTo(noWebpRule);
          }

          // add .webp
          var value = decl.value.split(" ").map(function (val) {
            return val.indexOf("url") >= 0 ? val.replace(/(url)\(.*\)/, urls.shift()) : val;
          }).join(" ");

          var webpRule = Webpcss.formatRule(originalRule.clone({
            selector: selector
          }));

          var webpDecl = decl.clone({
            prop: decl.prop,
            value: value
          });
          webpDecl.raws.semicolon = true;
          webpDecl.raws.before = " ";

          webpRule.append(webpDecl);
          var webpTreeRule = Webpcss.appendToCopyTree(originalRule.parent, webpRule);

          originalRule.walkDecls(function (decl) {
            if (copyBackgroundSize) {
              if (decl.prop === "background-size") {
                webpRule.append(decl.clone());
              }
            }
          });

          // clean if original rule is empty
          !originalRule.nodes.length && originalRule.remove();
          return webpTreeRule;
        }
      });
    }
  }], [{
    key: "appendToCopyTree",
    value: function appendToCopyTree(aRoot, aRule) {
      var root = aRoot;
      var rule = aRule;
      while (root.type !== "root") {
        rule = root.clone().removeAll().append(rule);
        root = root.parent;
      }
      return rule;
    }
  }, {
    key: "formatRule",
    value: function formatRule(rule) {
      var isRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      rule.raws.semicolon = true;
      rule.raws.after = " ";
      return isRemove ? rule.removeAll() : rule;
    }
  }]);

  return Webpcss;
}();

exports.default = Webpcss;
module.exports = exports.default;