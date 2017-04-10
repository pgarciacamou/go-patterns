/* globals expect, beforeEach, it, describe, jasmine */
import factoryBuilder from '../../../../src/patterns/creational/factory.js';
import singletonBuilder from '../../../../src/patterns/creational/singleton.js';

describe('Factory', function() {
  var CarFactory;
  var Honda, Civic, civic;
  var Toyota, Corolla, corolla;

  beforeEach(function() {
    Civic = class {
      constructor(year) {
        this.year = year;
      }
    };
    Corolla = class {
      constructor(year) {
        this.year = year;
      }
    };
    CarFactory = factoryBuilder({
      constructor(name) {
        this._name = name;
      },
      publics: {
        test: 'test'
      },
      statics: {
        test: 'test'
      }
    }).build();

    Honda = new CarFactory('Honda San Diego');
    Toyota = new CarFactory('Toyota San Diego');

    Honda.add('civic', Civic);
    Toyota.add('corolla', Corolla);

    civic = Honda.create('civic', 2016);
    corolla = Toyota.create('corolla', 2015);
  });
  it('should allow empty options', function() {
    var emptyOptions = undefined;
    var Factory = factoryBuilder(emptyOptions).build();
    var factory = new Factory();
    factory.add('product', (arg) => ({test: arg}));
    var product = factory.create('product', 'testing');
    expect(product.test).toEqual('testing');
  });
  it('should create a Factory', function() {
    expect(CarFactory).toBeDefined();
    expect(Honda).toBeDefined();
    expect(Toyota).toBeDefined();
    expect(Honda._name).toEqual('Honda San Diego');
    expect(Toyota._name).toEqual('Toyota San Diego');
  });
  it('should inherit the expected functionality', function() {
    expect(civic instanceof Civic).toBeTruthy();
    expect(civic.year).toEqual(2016);
    expect(corolla instanceof Corolla).toBeTruthy();
    expect(corolla.year).toEqual(2015);
  });
  it('should be able to define public properties/functionality', function() {
    expect(Honda.test).toBeDefined();
    expect(Toyota.test).toBeDefined();
  });
  it('should be able to define static properties/functionality', function() {
    expect(CarFactory.test).toBeDefined();
  });
  describe('Mid Level: Singleton Factory', function() {
    var SingletonFactory;
    var Constructor;
    var singletonFactory;
    beforeEach(function() {
      Constructor = function(arg) {
        this.param = arg;
      };
      SingletonFactory = singletonBuilder(factoryBuilder({
        constructor: Constructor
      })).build();
      singletonFactory = new SingletonFactory('test');
    });
    it('should be a singleton', function() {
      expect(new SingletonFactory() === singletonFactory).toBeTruthy();
    });
    it('should work as a constructor', function() {
      expect(singletonFactory.param).toEqual('test');
    });
  });
  describe('Advanced Level: Factory of factories', function() {
    var FactoryOfFactories;
    var factoryOfFactories;
    var Factory;
    var SingletonFactory;
    var factory;
    var singletonFactory;
    var factorySpy;
    var singletonSpy;

    beforeEach(function() {
      factorySpy = jasmine.createSpy('factorySpy');
      singletonSpy = jasmine.createSpy('singletonSpy');
      FactoryOfFactories = factoryBuilder({
        constructor() {},
        publics: {},
        statics: {}
      }).build();
      Factory = factoryBuilder({
        constructor: factorySpy
      }).build();
      SingletonFactory = singletonBuilder(factoryBuilder({
        constructor: singletonSpy
      })).build();

      factoryOfFactories = new FactoryOfFactories();
      factoryOfFactories.add('factory', Factory);
      factoryOfFactories.add('singleton', SingletonFactory);

      factory = factoryOfFactories.create('factory');
      singletonFactory = factoryOfFactories.create('singleton');
    });
    it('should have created a Factory', function() {
      expect(factory).toBeDefined();
      expect(factorySpy).toHaveBeenCalledTimes(1);
    });
    it('should have created a SingletonFactory', function() {
      expect(singletonFactory).toBeDefined();
      expect(singletonSpy).toHaveBeenCalledTimes(1);
      factoryOfFactories.create('singleton');
      expect(singletonSpy).toHaveBeenCalledTimes(1);
    });
  });
});
