/* globals expect, it, describe, beforeEach */
import createNew from '../../../src/helpers/createPatternBuilder.js';

describe('build pattern helper', function() {
  var pattern;
  var PatternBuilder;
  var PatternClass;
  var patternInstance;
  beforeEach(function() {
    pattern = createNew(options => {
      function Pattern(...args) {
        this.implementsPattern = true;
        options.constructor.apply(this, args);
      }
      return Pattern;
    });

    PatternBuilder = pattern({
      constructor(t) {
        this.test = t;
      }
    });

    PatternClass = PatternBuilder.build();

    patternInstance = new PatternClass(true);
  });
  it('should return a function', function() {
    expect(typeof pattern).toEqual('function');
  });
  it('should return a builder object', function() {
    expect(PatternBuilder instanceof Object).toBeTruthy();
    expect(PatternBuilder.build instanceof Function).toBeTruthy();
  });
  it('should encapsulate the options with a pattern', function() {
    expect(patternInstance.implementsPattern).toBeTruthy();
    expect(patternInstance.test).toBeTruthy();
  });
});
