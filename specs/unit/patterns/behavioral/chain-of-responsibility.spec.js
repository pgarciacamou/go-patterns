import chainOfResponsibility from "../../../../src/patterns/behavioral/chain-of-responsibility.js";
var { isTypeOf, isInstanceOf } = chainOfResponsibility.heuristics;

describe('chain of responsibility', function() {
  var chain;
  var isObjectSpy;
  var isFunctionSpy;
  var isArraySpy;
  var isStringSpy;
  var isNumberSpy;
  beforeEach(function() {
    isObjectSpy = jasmine.createSpy("isObjectSpy");
    chain = chainOfResponsibility();

    chain
    .addLink(isObjectSpy, [
      isTypeOf("object").and(isInstanceOf(Object))
    ])
    // .addLink(isFunctionSpy, [
    //   isTypeOf("object").and(isInstanceOf(Object))
    // ])
    // .addLink(isArraySpy, [
    //   isTypeOf("object").and(isInstanceOf(Array))
    // ])
    // .addLink(isStringSpy, [
    //   isTypeOf("string").and(isInstanceOf(String))
    // ])
    // .addLink(isNumberSpy, [
    //   isTypeOf("number").and(isInstanceOf(Number))
    // ]);a
  });
  it('should create a chain', function() {
    expect(chain).toBeDefined();
  });
  it('implements a chainable pattern', function() {
    expect(chain.addLink(()=>{})).toEqual(chain);
  });
  it('should execute the isObjectSpy spy', function() {
    var param = {};
    chain(param);
    expect(isObjectSpy).toHaveBeenCalledWidth(param);
  });
  // it('should execute the isFunctionSpy spy', function() {
  //   var param = _ => {};
  //   chain(param);
  //   expect(isFunctionSpy).toHaveBeenCalledWidth(param);
  // });
  // it('should execute the isArraySpy spy', function() {
  //   var param = [];
  //   chain(param);
  //   expect(isArraySpy).toHaveBeenCalledWidth(param);
  // });
  // it('should execute the isStringSpy spy', function() {
  //   var param = "";
  //   chain(param);
  //   expect(isStringSpy).toHaveBeenCalledWidth(param);
  // });
  // it('should execute the isNumberSpy spy', function() {
  //   var param = 0;
  //   chain(param);
  //   expect(isNumberSpy).toHaveBeenCalledWidth(param);
  // });
});
