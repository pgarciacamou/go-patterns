/* globals expect, it, beforeEach, describe */
import json from '../../../src/helpers/json.js';

describe('json', function() {
  var obj;
  var stringified;
  var parsed;
  beforeEach(function() {
    obj = {
      test: 'testing'
    };
    stringified = json.stringify(obj);
    parsed = json.parse(stringified);
  });
  it('should stringify an object', function() {
    expect(stringified).toEqual(JSON.stringify(obj));
  });
  it('should parse an object', function() {
    expect(obj).toEqual(parsed);
  });
  it('should throw an error on incorrect parsing', function() {
    expect(() => json.parse('')).toThrow();
  });
});
