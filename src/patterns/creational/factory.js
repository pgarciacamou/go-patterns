import extend from "../../helpers/extend.js";

/**
 * @class
 */
class Factory {
  /**
   * @param  {Object} commonFunctionality
   */
  constructor (commonFunctionality) {
    this.classes = {};
    this.__common = commonFunctionality;
  }

  /**
   * @param {String} className
   * @param {Class} __class
   */
  add(className, __class) {
    if(this.classes[className] !== undefined) {
      throw new Error("class is already defined in factory");
    }

    // Adds the common functionality to the __class
    // This will give priority to the object's prototype,
    // that is why it looks odd.
    __class.prototype = extend(Object.create(__class.prototype), this.__common, __class.prototype);
    __class.prototype.constructor = __class;

    this.classes[className] = __class;
    return this;
  }

  /**
   * @param  {String} className
   * @param  {Array} args
   * @return {Object}
   */
  create(className, ...args){
    if(this.classes[className] === undefined) {
      throw new Error("class is not defined in factory");
    }
    return new this.classes[className](...args);
  }

  /**
   * @return {Number}
   */
  count() {
    return Object.keys(this.classes).length;
  }

  /**
   * @param  {String|Class} c looks for a className or a class
   * @return {Boolean}
   */
  contains(c) {
    for(var prop in this.classes){
      if(c === prop || c === this.classes[prop]) return true;
    }
    return false;
  }
}

/**
 * A Factory Pattern: makes an instance of several
 * derived classes based on interfaced data or events.
 * @method
 * @param  {object} commonFunctionality which will be inherited from the classes
 * @return {Factory} factory instance
 */
function factory(commonFunctionality){
  return new Factory(commonFunctionality);
}

export default factory;