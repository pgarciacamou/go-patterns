import extend from "../../helpers/extend.js";

/**
 * @method
 *
 * Singleton: A class with only a single instance with global access points.
 *
 * @return {class} Singleton constructor
 * @param {class} _Constructor predecessor
 */
function singleton(options) {
  options = options || {};
  options = extend({
    constructor: function () {},
    publics: {},
    statics: {}
  }, options);

  var instance;
  var prevDistroyer = options.statics.destroy;
  extend(options.statics, {
    destroy(...args) {
      instance = undefined;
      if(prevDistroyer !== undefined) {
        prevDistroyer.apply(this, args);
      }
    }
  });

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
  function Singleton(...args) {
    if(instance !== undefined) { return instance; }
    options.constructor.apply(this, args);
    return (instance = this);
  }
  Singleton.prototype = extend(
    Object.create(options.constructor.prototype),
    { constructor: options.constructor },
    options.publics
  );

  return {
    constructor: Singleton,
    publics: Singleton.prototype,
    statics: options.statics,
    build() {
      return extend(Singleton, options.statics);
    }
  };
}

export default singleton;