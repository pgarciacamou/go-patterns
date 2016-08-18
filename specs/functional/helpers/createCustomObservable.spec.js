import createCustomObservable from "../../../src/helpers/createCustomObservable.js";
import { skip } from "pipeline";

describe('embedded observables', function() {
  var test;
  var spy;
  beforeEach(function() {
    spy = jasmine.createSpy("spy");
    test = createCustomObservable({
      test1: "test1",
      obs: createCustomObservable({
        test2: "test2",
        anotherObs: createCustomObservable({
          test3: "test3"
        })
      })
    });

    test.
    __pipeline
    .pipe(_ => (spy(_), skip));

    test.obs.anotherObs.test3 = "foobar";
  });
  it('should bubble up the changes', function() {
    expect(spy).toHaveBeenCalledWith(["obs.anotherObs.test3", "foobar", "test3"]);
  });
});