/* globals expect, beforeEach, it, describe, jasmine */
import singletonBuilder from '../../../../src/patterns/creational/singleton.js';

describe('Singleton', function() {
  var Singleton;
  var ParentClass;
  var singleton;
  var executionSpy;
  beforeEach(function() {
    executionSpy = jasmine.createSpy('executionSpy');
    function _Class(param1) {
      executionSpy(param1);
    }

    Singleton = singletonBuilder({
      constructor: _Class,
      publics: {
        publicMethod() {}
      },
      statics: {
        staticMethod() {}
      }
    }).build();
    ParentClass = _Class;
    singleton = new Singleton('test');
  });
  it('should allow empty options', function() {
    var emptyOptions = undefined;
    var Singleton = singletonBuilder(emptyOptions).build();
    var singleton = new Singleton();
    singleton.test = 'testing';
    expect((new Singleton()).test).toEqual('testing');
  });
  it('should create a singleton', function() {
    expect(new Singleton('test')).toEqual(singleton);
    expect(executionSpy).toHaveBeenCalledWith('test');
    expect(executionSpy.calls.count()).toEqual(1);
  });
  it('should have access to static methods', function() {
    expect(Singleton.staticMethod).toBeDefined();
  });
  it('should have access to public methods', function() {
    expect(singleton.publicMethod).toBeDefined();
  });
  it('should use inheritance', function() {
    expect(singleton instanceof Singleton).toBeTruthy();
    expect(singleton instanceof ParentClass).toBeTruthy();
  });
  it('can destroy the instance', function() {
    singleton.destroy();
    new Singleton('test');
    expect(executionSpy.calls.count()).toEqual(2);
  });
  it('returns the instance created', function() {
    expect(singleton.getInstance() === new Singleton('test'));
  });
});
