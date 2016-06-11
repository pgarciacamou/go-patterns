import extend from "../../helpers/extend.js";

/**
 * @class
 *
 */
class Factory {
  constructor (prototype) {
    this.classes = {};
    this.__prototype = prototype;
  }
  add(className, _Constructor) {
    if(this.classes[className] !== undefined) {
      throw new Error("class is already defined in factory");
    }

    // Adds the common functionality to the _Constructor
    // This will give priority to the object's prototype,
    // that is why it looks odd.
    _Constructor.prototype = extend(Object.create(_Constructor.prototype), this.__prototype, _Constructor.prototype);
    _Constructor.prototype.constructor = _Constructor;

    this.classes[className] = _Constructor;
    return this;
  }
  create(className, ...args){
    if(this.classes[className] === undefined) {
      throw new Error("class is not defined in factory");
    }
    return new this.classes[className](...args);
  }
  count() {
    return Object.keys(this.classes).length;
  }
  contains(c) {
    for(var prop in this.classes){
      if(c === prop || c === this.classes[prop]) return true;
    }
    return false;
  }
}

function factory(...args){
  return new Factory(...args);
}

export default factory;