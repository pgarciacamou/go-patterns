import { defaultProperties } from '../../../src/helpers/properties.js';

describe('properties helpers', function() {
  describe('default properties method', function() {
    var defaults;
    var newProps;
    var afterMath;
    beforeEach(function() {
      newProps = {
        three: 4
      };
      defaults = {
        one: 1,
        two: 2,
        three: 3
      };
      afterMath = defaultProperties(defaults, newProps);
    });
    it('should default properties', function() {
      expect(afterMath.one).toEqual(defaults.one);
      expect(afterMath.two).toEqual(defaults.two);
    });
    it('should replace properties', function() {
      expect(afterMath.three).toEqual(newProps.three);
    });
  });
});