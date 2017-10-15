import Interface from '../../../src/helpers/Interface.js';

describe('interface helper', function() {
  var carInterface;
  var obj;
  beforeEach(function() {
    carInterface = new Interface('Car', ['start', 'run']);
    obj = {
      start() {},
      run() {}
    }
  });
  it('should behave...', function() {
    expect(Interface.implements(obj, carInterface)).toBeTruthy();
  });
});