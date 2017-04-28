/* globals expect, it, describe */
import patterns from '../../index.js';

describe('patterns API', function() {
  it('should describe an API', function() {
    expect(Object.keys(patterns).length).toEqual(9);
  });
  it('should contain patterns', function() {
    expect(patterns.singleton).toBeDefined();
    expect(patterns.factory).toBeDefined();
    expect(patterns.publishSubscribe).toBeDefined();
    expect(patterns.chainOfResponsibility).toBeDefined();
    expect(patterns.mediator).toBeDefined();
    expect(patterns.command).toBeDefined();
    expect(patterns.memento).toBeDefined();
    expect(patterns.flyweight).toBeDefined();
    expect(patterns.mvw).toBeDefined();
  });
});
