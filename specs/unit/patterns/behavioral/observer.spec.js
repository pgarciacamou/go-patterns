import observer from "../../../../src/patterns/behavioral/observer.js";

describe('observer pattern', function() {
  var updateSpy;
  var TestObserver;
  var testObserver;
  beforeEach(function() {
    updateSpy = jasmine.createSpy("test");
    TestObserver = observer().build();
    testObserver = new TestObserver();
    testObserver.add("test", updateSpy);
  });
  afterEach(function() {
    testObserver.remove("test", updateSpy);
  });
  it('should create an observer', function() {
    expect(testObserver).toBeDefined();
  });
  it('should notify the observer', function() {
    testObserver.notify("test");
    testObserver.notify("test");
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.count()).toEqual(2);
  });
  it('should implement method chainable pattern', function() {
    var t = "test";
    testObserver.add(t, ()=>{}).add(t, ()=>{});
    expect(testObserver.count(t)).toEqual(3);
  });
});