import extend from "../../helpers/extend.js";

/**
 * @method
 *
 * Singleton: A class with only a single instance with global access points.
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
   *
   * reverted ES2015 class for Babel strict requirements of "super" at the top
   * https://github.com/pgarciacamou/patterns/commit/0dae49df5a93e430ed70da80eb73cacd47e821ad
   */
  function Singleton() {
    if(instance !== undefined) { return instance; }
    _Constructor.apply(this, arguments);
    return (instance = this);
  }
  Singleton.prototype = extend(
    Object.create(_Constructor.prototype), 
    { constructor: _Constructor }
  );
  extend(Singleton, {
    super: _Constructor,
    destroy: _ => { instance = undefined; }
  });
  return Singleton;
}

export default singleton;