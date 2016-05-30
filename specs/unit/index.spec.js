import patterns from '../../src/index.js'

describe('patterns API', function() {
  it('should describe an API', function() {
    expect(Object.keys(patterns).length).toEqual(2);
  });
  it('should contain patterns', function() {
    expect(patterns.singleton).toBeDefined();
    expect(patterns.observer).toBeDefined();
  });
});
