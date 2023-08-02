"use strict";

var through2 = require("through2"),
  webpcss = require("webpcss");

function transform(self, contents, params, file, callback) {
  return webpcss.transform(contents, params)
    .then(function(res) {
      file.contents = new Buffer(res.css);
      self.push(file);
      callback();
    })
    .catch(callback);
}

module.exports = function(params) {
  function webpcss_func(file, enc, callback) {
    /*jshint validthis:true*/
    if (file.isNull()) {
      this.push(file);
      return callback();
    }

    var self = this;
    if (file.isStream()) {
      var buffers = [];
      file.contents.on("data", function(d) {
        buffers.push(d);
      });
      file.contents.on("end", function() {
        transform(self, Buffer.concat(buffers), params, file, callback);
      });
    }

    if (file.isBuffer()) {
      transform(self, file.contents, params, file, callback);
    }
  }
  return through2.obj(webpcss_func);
};
