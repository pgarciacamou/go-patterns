import extend from "../../helpers/extend.js";
import recursiveInheritance from "../../helpers/recursive-inheritance.js";

function factory(options) {
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
    Object.create(options.constructor), 
    { 
      constructor: Factory,

      /**
       * @param {String} className
       * @param {Class} __class
       */
      add: function(className, __class) {
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
      create(className, ...args){
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
    __class: function () {
      return extend(Factory, options.statics);
    }
  };
}

// /**
//  * A Factory Pattern: makes an instance of several
//  * derived classes based on interfaced data or events.
//  * @method
//  * @param  {object} commonFunctionality which will be inherited from the classes
//  * @return {Factory} factory instance
//  */
// function factory(__superclass) {
//   /**
//    * @class
//    */
//   class Factory {
//     /**
//      * @param  {Object} commonFunctionality
//      */
//     constructor (...args) {
//       this.__superclassArgs = args;
//       this.__classes = {};
//     }

//     /**
//      * @param {String} className
//      * @param {Class} __class
//      */
//     add(className, __class) {
//       if(this.__classes[className] !== undefined) {
//         throw new Error("class is already defined in factory");
//       }

//       // __class.prototype = extend(
//       //   Object.create(__superclass.prototype),
//       //   { constructor: __class },
//       //   __class.prototype
//       // );

//       // this.__classes[className] = (...args) => {
//       //   var instance = Object.create(__class.prototype);
//       //   __class.apply(instance, args);
//       //   __superclass.apply(instance, supperArgs);
//       //   return instance;
//       // };

//       this.__classes[className] = recursiveInheritance(__class, __superclass);
//       return this;
//     }

//     /**
//      * @param  {String} className
//      * @param  {Array} args
//      * @return {Object}
//      */
//     create(className, ...args){
//       if(this.__classes[className] === undefined) {
//         throw new Error("class is not defined in factory");
//       }

//       // class is dynamic instance of RecursiveInheritance.
//       return new this.__classes[className](args, this.__superclassArgs);
//     }
//   }

//   return Factory;
// }

export default factory;