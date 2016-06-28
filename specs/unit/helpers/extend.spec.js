import extend from "../../../src/helpers/extend.js";

describe('extend helper', function() {
  var extendedObject;
  var extendedFunction;
  var extendedFromFunction;
  var spyFunction;
  var objExtender;
  var fnExtender;
  var extendedFromMultipleObjects;
  beforeEach(function() {
    objExtender = {
      test: "test",
      unique: "unique"
    };

    fnExtender = function() {};
    fnExtender.test = "test";
    fnExtender.unique = "unique";

    extendedObject = extend({test:""}, objExtender);
    extendedFunction = extend(spyFunction = jasmine.createSpy("test"), objExtender);
    extendedFromFunction = extend({test:""}, fnExtender);
    extendedFromMultipleObjects = extend({}, {first:"first"}, {second:"second"});
  });
  it('should be able to extend an object', function() {
    expect(extendedObject.unique).toEqual("unique");
  });
  it('should overwrite properties with the ones from higher hierarchy', function() {
    expect(extendedObject.test).toEqual("test");
    expect(extendedFromFunction.test).toEqual("test");
  });
  it('should be able to extend a function', function() {
    extendedFunction("test");
    expect(spyFunction).toHaveBeenCalledWith("test");
    expect(extendedFunction.test).toEqual("test");
  });
  it('should be able to extend from a function used as first class object', function() {
    expect(extendedFromFunction.unique).toEqual("unique");
  });
  it('should be able to extend from multiple objects', function() {
    expect(extendedFromMultipleObjects.first).toEqual("first");
    expect(extendedFromMultipleObjects.second).toEqual("second");
  });
});