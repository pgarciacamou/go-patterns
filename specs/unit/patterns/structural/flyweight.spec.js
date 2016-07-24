import flyweight from "../../../../src/patterns/structural/flyweight.js";
import singleton from "../../../../src/patterns/creational/singleton.js";

describe('flyweight', function() {
  var Flyweight;
  var flyweightInstance;
  beforeEach(function() {
    Flyweight = flyweight({
      publics: {
        heuristic(name, obj) {
          return this.flyweights[name] = this.flyweights[name] || obj;
        }
      }
    }).build();

    flyweightInstance = new Flyweight();
  });
  it('should throw an error', function() {
    expect(function () {
      var TempFW = flyweight().build();
      var tempFW = new TempFW();
      tempFW.create();
    }).toThrowError('Flyweight is missing heuristic public method.');
  });
  it('should create a flyweight object', function() {
    var test = flyweightInstance.create('test', {
      test: 'testing'
    });
    expect(test).toBeDefined();
    expect(test.test).toEqual('testing');
  });
  it('should return a previously created flyweight object', function() {
    flyweightInstance.create('test', {
      test: 'testing'
    });
    var test = flyweightInstance.create('test', {
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
      factorials = [2,3,4];
      FactorialMemoizationFlyweight = singleton(flyweight({
        publics: {
          heuristic(val) {
            return this.flyweights[val+""] = this.flyweights[val] || this.factorial(val);
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
      spyOn(factorialMemoizationFlyweight, "factorial");
      factorials.forEach(factorialMemoizationFlyweight.create.bind(factorialMemoizationFlyweight));
      expect(factorialMemoizationFlyweight.factorial).not.toHaveBeenCalled();
    });
  });

  describe('Advanced Level: Object Creation', function() {
    var LightObjectCreation;
    var lightObjectCreation;
    var withParams;
    beforeEach(function() {
      // HELPER METHODS
      withParams = (fn, ...params) => {
        return (...args) => {
          console.log(params);
          return fn.apply(null, params.concat(args));
        };
      };
    });
    beforeEach(function() {
      LightObjectCreation = flyweight({
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
            var i = 0;
            var length = this.flyweights.length;
            for(var i = 0; i < length; i++) {
              if(this.flyweights[i].data === params.data) {
                return this.flyweights[i];
              }
            }
            return undefined;
          }
        }
      }).build();

      lightObjectCreation = new LightObjectCreation();

      spyOn(lightObjectCreation, "construct").and.callThrough();

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
