/**
 * @class
 *
 */
class Factory {
  constructor () {
    this.classes = {};
  }
  add(className, _Constructor) {
    if(this.classes[className] !== undefined) {
      throw new Error("class is already defined in factory");
    }
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