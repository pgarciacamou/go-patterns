import logicalFunction from "../../../src/helpers/logical-function.js";

describe('logical function', function() {
  var returnValue;
  var operation;
  beforeEach(function() {
    returnValue = function (val) { 
      return () => { return val; };
    };
  });
  afterEach(function() {
    operation = undefined;
  });
  it('should contain logical operators', function() {
    operation = logicalFunction(() => {});
    expect(operation.and).toBeDefined();
    expect(operation.or).toBeDefined();
  });
  it('should allow "and"', function() {
    operation = logicalFunction(returnValue(true)).and(returnValue(false));
    expect(operation()).toBeFalsy();
  });
  it('should allow "and" (2)', function() {
    operation = logicalFunction(returnValue(false)).and(returnValue(true));
    expect(operation()).toBeFalsy();
  });
  it('should allow "and" (3)', function() {
    operation = logicalFunction(returnValue(true)).and(returnValue(true));
    expect(operation()).toBeTruthy();
  });
  it('should allow "or"', function() {
    operation = logicalFunction(returnValue(false)).or(returnValue(false));
    expect(operation()).toBeFalsy();
  });
  it('should allow "or" (2)', function() {
    operation = logicalFunction(returnValue(false)).or(returnValue(true));
    expect(operation()).toBeTruthy();
  });
  it('should allow "or" (3)', function() {
    operation = logicalFunction(returnValue(true)).or(returnValue(false));
    expect(operation()).toBeTruthy();
  });
  it('should allow "or" (4)', function() {
    operation = logicalFunction(returnValue(true)).or(returnValue(true));
    expect(operation()).toBeTruthy();
  });

  it('should be chainable', function() {
    operation = logicalFunction(returnValue(true))
    .and(returnValue(true))
    .or(returnValue(false));

    expect(operation()).toBeTruthy();
  });
  it('should allow embeding logical functions', function() {
    var temp = logicalFunction(returnValue(true));
    operation = logicalFunction(returnValue(true)).and(temp.and(returnValue(true)));

    expect(operation()).toBeTruthy();
  });

  it('should allow more complex operations', function() {
    var isTypeOfObject = logicalFunction(function (item) {
      return typeof item === "object";
    });
    var isInstanceOfObject = logicalFunction(function (item) {
      return item instanceof Object;
    });

    var isObject = isTypeOfObject.and(isInstanceOfObject);
    expect(isObject(new Object())).toBeTruthy();
  });
});
