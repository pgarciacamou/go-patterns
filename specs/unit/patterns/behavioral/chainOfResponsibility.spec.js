import chainOfResponsibilityBuilder from "../../../../src/patterns/behavioral/chainOfResponsibility.js";

describe('chain of responsibility', function() {
  var arraySpy;
  var functionSpy;
  var constructorSpy;
  var shouldNotRunSpy;
  var defaultSpy;
  var ChainOfResponsibility;
  var chainOfResponsibility;
  var chain;
  beforeEach(function() {
    constructorSpy = jasmine.createSpy("constructor");
    arraySpy = jasmine.createSpy("array");
    functionSpy = jasmine.createSpy("object");
    shouldNotRunSpy = jasmine.createSpy("shouldNotRun");
    defaultSpy = jasmine.createSpy("default");
    ChainOfResponsibility = chainOfResponsibilityBuilder({
      constructor: _ => {
        constructorSpy();
      },
      publics: {
        test: "test"
      }
    });
    chainOfResponsibility = ChainOfResponsibility.build();
    chain = new chainOfResponsibility()
    .add(defaultSpy)
    .add((next, t) => {
      if(t instanceof Array) {
        arraySpy();
        return "array";
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
        return "function";
      }
      next();
    })
    .add((next, t) => {
      if(t === "continue") {
        next();
        return "shouldNotReturnThis";
      }
      next();
    });
  });
  it('should wrap a constructor with the pattern', function() {
    expect(chain.test).toEqual("test");
    expect(constructorSpy).toHaveBeenCalled();
  });
  it('should chain callbacks', function() {
    chain.run();
    expect(chain.run([])).toEqual("array");
    expect(chain.run(_ => {})).toEqual("function");
    expect(defaultSpy).toHaveBeenCalled();
    expect(functionSpy).toHaveBeenCalled();
    expect(arraySpy).toHaveBeenCalled();
  });
  it('can shadow callbacks', function() {
    expect(chain.run(_ => {})).not.toEqual("shouldNotRun");
    expect(shouldNotRunSpy).not.toHaveBeenCalled();
  });
  it('can continue the chain even if callback was used', function() {
    var t = chain.run("continue")
    expect(t).not.toEqual("shouldNotReturnThis");
    expect(defaultSpy).toHaveBeenCalled();
  });
  it('should run regardless of the context allowing to pass as callback', function(done) {
    setTimeout(chain.run);
    setTimeout(_ => {
      expect(defaultSpy).toHaveBeenCalled();
      done();
    }, 30);
  });
  it('should count the callbacks', function() {
    expect(chain.count()).toEqual(5);
  });
  it('should find callbacks', function() {
    expect(chain.contains(defaultSpy)).toBeTruthy();
    expect(chain.contains(_ => {})).toBeFalsy();
  });
});