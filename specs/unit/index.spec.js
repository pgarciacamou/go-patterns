import patterns from '../../src/index.js'

describe('patterns API', function() {
  it('should describe an API', function() {
    expect(Object.keys(patterns).length).toEqual(6);
  });
  it('should contain patterns', function() {
    expect(patterns.singleton).toBeDefined();
    expect(patterns.factory).toBeDefined();
    expect(patterns.publishSubscribe).toBeDefined();
    expect(patterns.chainOfResponsibility).toBeDefined();
    expect(patterns.mediator).toBeDefined();
    expect(patterns.command).toBeDefined();
  });
});
