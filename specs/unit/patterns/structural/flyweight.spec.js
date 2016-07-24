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
});
