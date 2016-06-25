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
    function _Class(param1){
      executionSpy(param1);
    }
      
    SingletonClass = singleton({
      constructor: _Class,
      publics: {
        publicMethod () {}
      },
      statics: {
        staticMethod (argument) {}
      }
    }).build();
    NormalClass = _Class;
    singletonInstance = new SingletonClass("test");
  });

  it('should create a singleton', function() {
    expect(new SingletonClass("test")).toEqual(singletonInstance);
    expect(executionSpy).toHaveBeenCalledWith("test");
    expect(executionSpy.calls.count()).toEqual(1);
  });
  it('should have access to static methods', function() {
    expect(SingletonClass.staticMethod).toBeDefined();
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
});