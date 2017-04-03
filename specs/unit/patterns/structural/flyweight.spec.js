/* globals expect, beforeEach, it, describe, spyOn */
import flyweightBuilder from '../../../../src/patterns/structural/flyweight.js';
import singletonBuilder from '../../../../src/patterns/creational/singleton.js';

describe('flyweight', function() {
  var Flyweight;
  var flyweight;
  beforeEach(function() {
    Flyweight = flyweightBuilder({
      publics: {
        heuristic(name, obj) {
          return this.flyweights[name] = this.flyweights[name] || obj;
        }
      }
    }).build();

    flyweight = new Flyweight();
  });
  it('should throw an error', function() {
    expect(function() {
      var Flyweight = flyweightBuilder().build();
      var flyweight = new Flyweight();
      flyweight.create();
    }).toThrowError('Flyweight is missing heuristic public method.');
  });
  it('should create a flyweight object', function() {
    var test = flyweight.create('test', {
      test: 'testing'
    });
    expect(test).toBeDefined();
    expect(test.test).toEqual('testing');
  });
  it('should return a previously created flyweight object', function() {
    flyweight.create('test', {
      test: 'testing'
    });
    var test = flyweight.create('test', {
      test: 'already created'
    });
    expect(test).toBeDefined();
    expect(test.test).toEqual('testing');
    expect(test.test).not.toEqual('already created');
  });

  describe('Mid Level: Memoization with Flyweight', function() {
    var FactorialMemoizationFlyweight;
    var factorialMemoizationFlyweight;
    var factorials;
    beforeEach(function() {
      factorials = [2, 3, 4];
      FactorialMemoizationFlyweight = singletonBuilder(flyweightBuilder({
        publics: {
          heuristic(val) {
            return this.flyweights[val + ''] = this.flyweights[val] || this.factorial(val);
          },
          factorial(val) {
            if(val <= 1) return 1;
            return val * this.factorial(val - 1);
          }
        }
      })).build();
      factorialMemoizationFlyweight = new FactorialMemoizationFlyweight();
      factorials.forEach(factorialMemoizationFlyweight.create.bind(factorialMemoizationFlyweight));
    });
    it('should memoize the values', function() {
      expect(Object.keys(factorialMemoizationFlyweight.flyweights).length).toEqual(factorials.length);
    });
    it('should return memoized values', function() {
      // we spy on factorial method, AFTER the initial values were declared already.
      spyOn(factorialMemoizationFlyweight, 'factorial');
      factorials.forEach(factorialMemoizationFlyweight.create.bind(factorialMemoizationFlyweight));
      expect(factorialMemoizationFlyweight.factorial).not.toHaveBeenCalled();
    });
  });

  describe('Advanced Level: Object Creation', function() {
    var LightObjectCreation;
    var lightObjectCreation;
    beforeEach(function() {
      LightObjectCreation = flyweightBuilder({
        constructor() {
          // this overrides the default object.
          this.flyweights = [];
        },
        publics: {
          heuristic(params) {
            return this.find(params) || this.construct(params);
          },
          construct(params) {
            var heavyObject = { data:params.data };
            this.flyweights.push(heavyObject);
            return heavyObject;
          },
          find(params) {
            for(var i = 0, l = this.flyweights.length; i < l; i++) {
              if(this.flyweights[i].data === params.data) {
                return this.flyweights[i];
              }
            }
            return null;
          }
        }
      }).build();

      lightObjectCreation = new LightObjectCreation();

      spyOn(lightObjectCreation, 'construct').and.callThrough();

      lightObjectCreation.create({
        data: 13.01 // dummy specific data
      });
      lightObjectCreation.create({
        data: 13.01 // dummy specific data
      });
    });
    it('should only construct the object only once.', function() {
      expect(lightObjectCreation.construct).toHaveBeenCalledTimes(1);
    });
  });
});
