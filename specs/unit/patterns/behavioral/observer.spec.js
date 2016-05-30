import observer from "../../../../src/patterns/behavioral/observer.js";

describe('observer pattern', function() {
  var updateSpy;
  var testObserver;
  beforeEach(function() {
    updateSpy = jasmine.createSpy("test");
    testObserver = observer("test");
    testObserver.add(updateSpy);
  });
  afterEach(function() {
    testObserver.remove(updateSpy);
  });
  it('should create an observer', function() {
    expect(testObserver).toBeDefined();
  });
  it('should notify the observer', function() {
    testObserver.notify();
    testObserver.notify();
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.count()).toEqual(2);
  });
});