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
    _Constructor.prototype = extend(Object.create(_Constructor.prototype), this.__prototype, _Constructor.prototype);
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

function factory(){
  return new Factory();
}

export default factory;