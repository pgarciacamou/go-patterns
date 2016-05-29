/**
 * @method
 *
 * A class with only a single instance with global access points.
 *
 * @return {class} Singleton constructor
 * @param {class} _Constructor predecessor
 */
function singleton(_Constructor) {
  var instance;

  /**
   * @class
   *
   * always returns the first instance
   *
   * @implements _Constructor (inheritance)
   * @return {object} instance which is only created once.
   */
  class Singleton extends _Constructor {
    constructor(...args) {
      super(...args);
      if(instance !== undefined) { return instance; }
      return instance = this;
    }
    static destroy (){
      instance = undefined;
    }
  }
  return Singleton;
}

export default singleton;