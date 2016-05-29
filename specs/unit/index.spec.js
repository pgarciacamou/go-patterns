import patterns from "../../src/index.js";

describe('BDD', function() {
  var executionTimes;
  var SingletonClass;
  var NormalClass;
  var singletonInstance;
  var executionSpy;
  beforeEach(function() {
    executionTimes = 0;
    executionSpy = jasmine.createSpy("executionSpy");
    class _Class {
      constructor() {
        executionSpy();
      }
      static staticMethod (argument) {}
      publicMethod () {}
    }
    SingletonClass = patterns.singleton(_Class);
    NormalClass = _Class;
    singletonInstance = new SingletonClass();
  });

  it('should create a singleton', function() {
    expect(new SingletonClass()).toEqual(singletonInstance);
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
    new SingletonClass();
    expect(executionSpy.calls.count()).toEqual(2);
  });
});