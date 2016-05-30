import observer from "../../../../src/patterns/behavioral/observer.js";

describe('observer pattern', function() {
  var obs;
  var updateSpy;
  beforeEach(function() {
    updateSpy = jasmine.createSpy("test");
    obs = observer("test", updateSpy);
  });
  afterEach(function() {
    obs.destroy();
  });
  it('should create an observer', function() {
    expect(obs).toBeDefined();
  });
  it('should notify the observer', function() {
    observer.notify("test");
    observer.notify("test");
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.count()).toEqual(2);
  });
});