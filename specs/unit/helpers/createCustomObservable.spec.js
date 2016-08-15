import createCustomObservable from "../../../src/helpers/createCustomObservable.js";

describe('createCustomObservable helper', function() {
  var observable;
  var callback;
  beforeEach(function() {
    callback = jasmine.createSpy("observable updated");
    observable = createCustomObservable({
      test1: "testing1",
      test2: "testing2"
    });
    observable.__pipeline.pipe(callback);
  });
  it('should not update on initial values', function() {
    expect(callback).not.toHaveBeenCalled();
  });
  it('should not update on properties not specified at the beginning', function() {
    observable.unwatched = true;
    expect(callback).not.toHaveBeenCalled();
  });
  it('should not update if the values are the same', function() {
    observable.test1 = "testing1";
    expect(callback).not.toHaveBeenCalled();
  });
  it('should return the value on setter as well', function() {
    expect(observable.test1 = 3).toEqual(3);
  });
  it('should observe properties defined', function() {
    observable.test1 = observable.test2;
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should be able to get and set properties', function() {
    expect(observable.test1).toEqual("testing1");
    observable.test1 = "testing2";
    expect(observable.test1).toEqual("testing2");
  });
  it('should allow functions to set and execute functions', function() {
    observable.test2 = jasmine.createSpy("test");
    observable.test2();
    expect(observable.test2).toHaveBeenCalled();
  });
  it('should have execute callback with old and new values', function() {
    var newvalue = "newvalue"
    var oldvalue = observable.test1;
    observable.test1 = newvalue;
    expect(callback).toHaveBeenCalledWith(["test1", newvalue, oldvalue]);
  });
});
