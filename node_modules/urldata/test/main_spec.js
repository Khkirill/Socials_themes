/*global describe, it*/
"use strict";
var urldata = require("../"),
    should = require("should"),
    chai = require("chai"),
    expect = chai.expect;

describe("urldata", function(){
  it("check urldata simple url", function(){
    ["images/test.png"].should.eql(
      urldata("url(images/test.png)")
    );
    ["images/test.png"].should.eql(
      urldata("url( images/test.png)")
    );
    ["images/test.png"].should.eql(
      urldata("url(images/test.png )")
    );
    ["images/test.png"].should.eql(
      urldata("url( images/test.png )")
    );
    ["images/test.png"].should.eql(
      urldata("url(  images/test.png  )")
    );
    ["images/test.png"].should.eql(
      urldata("url  (  images/test.png  ) ")
    );
  });
  it("check urldata with single quote", function(){
    ["images/test.png"].should.eql(
      urldata("url('images/test.png')")
    );
    ["images/test.png"].should.eql(
      urldata("url ( 'images/test.png' ) ")
    );
    [" images/test.png "].should.eql(
      urldata("url ( ' images/test.png ' ) ")
    );
  });
  it("check urldata with double quote", function(){
    ["images/test.png"].should.eql(
      urldata("url(\"images/test.png\")")
    );
  });
  it("check urldata with parentheses", function(){
    ["(images/test.png)"].should.eql(
      urldata("url(\"(images/test.png)\")")
    );
  });
  it("check urldata with wrong data", function(){
    expect(urldata("")).to.be.undefined;
    [].should.eql(
      urldata("url")
    );
    ["images/test.png\""].should.eql(
      urldata("url(images/test.png\")")
    );
    [].should.eql(
      urldata("url( \' images/test.png)")
    );
  });
  it("check multiple urls", function(){
    ["cat.png", "dog.png" ].should.eql(
      urldata("url(cat.png), url(dog.png)")
    );
    ["cat.png", "dog.gif", "mouse.jpg" ].should.eql(
      urldata("url( cat.png), url(\'dog.gif\' ), url( \"mouse.jpg\" )")
    );
    ["cat.png", "dog.png" ].should.eql(
      urldata("red url(cat.png) center bottom no-repeat, green url(dog.png) center bottom no-repeat")
    );
  });
  it("check with data-uri", function(){
    var png = "data:image/png;base64,iVBORw";
    [png].should.eql(
      urldata("url(" + png + ")")
    );
    [png, png+"a"].should.eql(
      urldata("url(" + png + "), url(" + png + "a)")
    );
  });
  it("check empty", function(){
    [""].should.eql(
      urldata("url()")
    );
    [""].should.eql(
      urldata("url(  )")
    );
    [""].should.eql(
      urldata("url(\"\")")
    );
    [""].should.eql(
      urldata("url(\'\')")
    );
    ["", "", ""].should.eql(
      urldata("url(), url(\'\'), url(\"\")")
    );
  });
});








