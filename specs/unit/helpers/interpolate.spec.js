import interpolate from '../../../src/helpers/interpolate.js';

describe('interpolate helper', function() {
  it('should interpolate strings', function() {
    expect(interpolate("$1", "hola")).toEqual("hola");
  });
  it('should interpolate multiple', function() {
    expect(interpolate("$1$2", "hola", "adios")).toEqual("holaadios");
  });
  it('should interpolate multiple same strings', function() {
    expect(interpolate("$1$1", "hola")).toEqual("holahola");
  });
});
