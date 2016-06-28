import publishSubscribe from "../../../../src/patterns/behavioral/publishSubscribe.js";

describe('publish subscribe pattern', function() {
  var updateSpy;
  var TestPublishSubscribe;
  var testPublishSubscribe;
  beforeEach(function() {
    updateSpy = jasmine.createSpy("test");
    TestPublishSubscribe = publishSubscribe().build();
    testPublishSubscribe = new TestPublishSubscribe();
    testPublishSubscribe.subscribe("test", updateSpy);
  });
  afterEach(function() {
    testPublishSubscribe.unsubscribe("test", updateSpy);
  });
  it('should create an publishSubscribe', function() {
    expect(testPublishSubscribe).toBeDefined();
  });
  it('should publish the publishSubscribe', function() {
    testPublishSubscribe.publish("test");
    testPublishSubscribe.publish("test");
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.calls.count()).toEqual(2);
  });
  it('should implement method chainable pattern', function() {
    var t = "test";
    testPublishSubscribe.subscribe(t, ()=>{}).subscribe(t, ()=>{});
    expect(testPublishSubscribe.count(t)).toEqual(3);
  });
});