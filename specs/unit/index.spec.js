import patterns from '../../src/index.js'

describe('patterns API', function() {
  it('should describe an API', function() {
    expect(Object.keys(patterns).length).toEqual(1);
  });
  it('should contain patterns', function() {
    expect(patterns.singleton).toBeDefined();
  });
});
