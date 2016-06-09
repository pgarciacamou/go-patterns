import singleton from "../../../../src/patterns/creational/singleton.js";

describe('Singleton', function() {
  var executionTimes;
  var SingletonClass;
  var NormalClass;
  var singletonInstance;
  var executionSpy;
  beforeEach(function() {
    executionTimes = 0;
    executionSpy = jasmine.createSpy("executionSpy");
    class _Class {
      constructor(param1) {
        executionSpy(param1);
      }
      static staticMethod (argument) {}
      publicMethod () {}
    }
    SingletonClass = singleton(_Class);
    NormalClass = _Class;
    singletonInstance = new SingletonClass("test");
  });

  it('should create a singleton', function() {
    expect(new SingletonClass("test")).toEqual(singletonInstance);
    expect(executionSpy).toHaveBeenCalledWith("test");
    expect(executionSpy.calls.count()).toEqual(1);
  });
  it('should have access to static methods', function() {
    expect(SingletonClass.super.staticMethod).toEqual(NormalClass.staticMethod);
    expect(SingletonClass.super).toEqual(NormalClass);
    expect(SingletonClass.super).toEqual(SingletonClass.prototype.constructor);
  });
  it('should have access to public methods', function() {
    expect(singletonInstance.publicMethod).toBeDefined();
  });
  it('should use inheritance', function() {
    expect(singletonInstance instanceof SingletonClass).toBeTruthy();
    expect(singletonInstance instanceof NormalClass).toBeTruthy();
  });
  it('can destroy the instance', function() {
    SingletonClass.destroy();
    new SingletonClass("test");
    expect(executionSpy.calls.count()).toEqual(2);
  });
  fdescribe('complex functionality', function() {
    var regularFunction;
    var S;
    var s;
    beforeEach(function() {
      regularFunction = _ => "test";
      S = singleton(regularFunction);
      s = new S();
      console.log(s);
    });
    it('should return a simple string', function() {
      expect(s).toEqual("test");
    });
  });
});