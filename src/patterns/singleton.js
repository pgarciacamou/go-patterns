/**
 * @method
 *
 * Creates a constructor which implements a design pattern
 * called Singleton.
 *
 * @return {class} Singleton constructor
 * @param {class} _constructor predecessor
 */
function singleton(_constructor) {
  var instance;

  /**
   * @constructor
   *
   * always returns the first instance
   *
   * @implements _constructor (inheritance)
   * @return {object} instance which is only created once.
   */
  function Singleton() {
    if(instance !== undefined) { return instance; }
    _constructor.apply((instance = this), arguments);
    return instance;
  }
  Singleton.prototype = Object.create(_constructor.prototype);
  Singleton.prototype.constructor = _constructor;
  Singleton.super = _constructor;
  return Singleton;
}

export default singleton;