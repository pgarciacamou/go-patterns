import chainOfResponsibility from "../../../../src/patterns/behavioral/chainOfResponsibility.js";

describe('chain of responsibility', function() {
  var arraySpy;
  var functionSpy;
  var constructorSpy;
  var Pattern;
  var patternImplementation;
  var chain;
  beforeEach(function() {
    constructorSpy = jasmine.createSpy("constructor");
    arraySpy = jasmine.createSpy("array");
    functionSpy = jasmine.createSpy("object");
    Pattern = buildPattern({
      constructor: _ => {
        constructorSpy();
      },
      publics: {
        test: "test"
      }
    });
    patternImplementation = Pattern.build();
    chain = new patternImplementation()
    .add((next, t) => {
      return "default";
    })
    .add((next, t) => {
      if(t instanceof Array) {
        arraySpy();
        return t;
      }
      next();
    })
    .add((next, t) => {
      if(t instanceof Function) {
        shouldNotRunSpy();
        return "shouldNotRun";
      }
      next();
    })
    .add((next, t) => {
      if(t instanceof Function) {
        functionSpy();
        return t;
      }
      next();
    });
  });
  it('should wrap a constructor with the pattern', function() {
    expect(chain.test).toEqual("test");
    expect(constructorSpy).toHaveBeenCalled();
  });
  it('should chain callbacks', function() {
    expect(chain.run()).toEqual("default");

  });
  it('can shadow callbacks', function() {
    
  });
  it('can continue the chain even if callback was used', function() {
    
  });
  it('should run regardless of the context', function() {
    
  });
  it('should count the callbacks', function() {
    
  });
  it('should find callbacks', function() {
    
  });

});
