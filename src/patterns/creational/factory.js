import extend from "../../helpers/extend.js";

/**
 * A Factory Pattern: makes an instance of several
 * derived classes based on interfaced data or events.
 * @method
 * @param  {object} commonFunctionality which will be inherited from the classes
 * @return {Factory} factory instance
 */
function factory(options) {
  options = options || {};
  options = extend({
    constructor: function () {},
    publics: {},
    statics: {}
  }, options);

  function Factory(...args) {
    this.__classes = {};
    options.constructor.apply(this, args);
  }
  Factory.prototype = extend(
    Object.create(options.constructor.prototype), 
    { 
      constructor: Factory,

      /**
       * @param {String} className
       * @param {Class} __class
       */
      add(className, __class) {
        if(this.__classes[className] !== undefined) {
          throw new Error("class is already defined in factory");
        }
        this.__classes[className] = __class;
        return this;
      },

      /**
       * @param  {String} className
       * @param  {Array} args
       * @return {Object}
       */
      create(className, ...args) {
        if(this.__classes[className] === undefined) {
          throw new Error("class is not defined in factory");
        }
        return new this.__classes[className](...args);
      }
    },
    options.publics
  );

  return {
    constructor: Factory,
    publics: Factory.prototype,
    statics: options.statics,
    build: _ => {
      return extend(Factory, options.statics);
    }
  };
}

export default factory;