import createClass from "../../../src/helpers/create-class.js";

describe('create class helper', function() {
  var class1;
  var instance1;
  var publicSpy1;
  var staticSpy1;
  beforeEach(function() {
    publicSpy1 = jasmine.createSpy("public");
    staticSpy1 = jasmine.createSpy("static");

    class1 = createClass({
      constructor: (ctx, a) => {
        ctx.a = a;
      },
      publics: {
        test: publicSpy1
      },
      statics: {
        test: staticSpy1
      }
    });
    instance1 = new class1("testing");
  });
  it('should create a class', function() {
    expect(class1).toBeDefined();
    expect(instance1).toBeDefined();
    expect(instance1.a).toEqual("testing");
  });
  it('should have public methods/properties', function() {
    instance1.test();
    expect(publicSpy1).toHaveBeenCalled();
  });
  it('should have public methods/properties', function() {
    class1.test();
    expect(staticSpy1).toHaveBeenCalled();
  });

  it('should allow to create a default class (no arguments passed)', function() {
    var Temp = createClass();
    var tempInstance = new Temp();
    expect(Temp).toBeDefined();
    expect(tempInstance).toBeDefined();
  });
  it('should allow to create a class with less arguments passed', function() {
    var tempSpy = jasmine.createSpy("temp");
    var Temp = createClass({
      statics: {
        test: tempSpy
      }
    });
    Temp.test();
    expect(tempSpy).toHaveBeenCalled();
  });
});
