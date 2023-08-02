/*global describe, it*/
"use strict";

var fs = require("fs"),
  es = require("event-stream"),
  should = require("chai").should,
  expect = require("chai").expect;

require("mocha");

delete require.cache[require.resolve("../")];

var gutil = require("gulp-util"),
  webpcss = require("../");

var expectedFile = new gutil.File({
  path: "test/expected/default_options.css",
  cwd: "test/",
  base: "test/expected",
  contents: fs.readFileSync("test/expected/default_options.css")
});

var expectedFile2 = new gutil.File({
  path: "test/expected/custom_options.css",
  cwd: "test/",
  base: "test/expected",
  contents: fs.readFileSync("test/expected/custom_options.css")
});

describe("gulp-webpcss", function() {
  it("should produce expected file via buffer", function(done) {
    var stream = webpcss();
    stream.on("error", function(err) {
      expect(err).to.not.exist;
    });

    stream.on("data", function(newFile) {
      expect(newFile).to.exist;
      expect(newFile.contents).to.exist;
      expect(String(newFile.contents)).to.eql(String(expectedFile.contents));
    });

    fs.readFile("test/fixtures/testing.css", function(err, contents) {
      expect(err).to.not.exist;
      var srcFile = new gutil.File({
        path: "test/fixtures/testing.css",
        cwd: "test/",
        base: "test/fixtures",
        contents: contents
      });
      stream.write(srcFile);
      stream.end();
      done();
    });
  });

  it("should produce expected file 2 via buffer", function(done) {
    var stream = webpcss({
      webpClass:".webp1",
      replace_to:".webp"
    });

    stream.on("error", function(err) {
      expect(err).to.not.exist;
    });

    stream.on("data", function(newFile) {
      expect(newFile).to.exist;
      expect(newFile.contents).to.exist;
      expect(String(newFile.contents)).to.eql(String(expectedFile2.contents));
    });

    fs.readFile("test/fixtures/testing.css", function(err, contents) {
      expect(err).to.not.exist;
      var srcFile = new gutil.File({
        path: "test/fixtures/testing.css",
        cwd: "test/",
        base: "test/fixtures",
        contents: contents
      });
      stream.write(srcFile);
      stream.end();
      done();
    });
  });

  it("should error on stream", function(done) {
    var stream = webpcss();

    stream.on("error", function(err) {
      expect(err).to.not.exist;
    });

    stream.on("data", function(newFile) {
      expect(newFile).to.exist;
      expect(newFile.contents).to.exist;
      expect(String(newFile.contents)).to.eql(String(expectedFile2.contents));
    });
    var srcFile = new gutil.File({
      path: "test/fixtures/testing.css",
      cwd: "test/",
      base: "test/fixtures",
      contents: fs.createReadStream("test/fixtures/testing.css")
    });
    stream.write(srcFile);
    stream.end();
    done();
  });

  /*
  xit("should produce expected file via stream", function(done) {

    var srcFile = new gutil.File({
      path: "test/fixtures/testing.css",
      cwd: "test/",
      base: "test/fixtures",
      contents: fs.createReadStream("test/fixtures/testing.css")
    });

    var stream = webpcss("World");

    stream.on("error", function(err) {
      should.exist(err);
      done();
    });

    stream.on("data", function(newFile) {

      should.exist(newFile);
      should.exist(newFile.contents);

      newFile.contents.pipe(es.wait(function(err, data) {
        should.not.exist(err);
        data.should.equal(String(expectedFile.contents));
        done();
      }));
    });

    stream.write(srcFile);
    stream.end();
  });
  */
});
