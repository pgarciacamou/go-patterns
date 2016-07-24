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
});
