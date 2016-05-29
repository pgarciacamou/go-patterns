function singleton(_class) {
  var instance;
  function Singleton() {
    if(instance !== undefined) { return instance; }
    _class.apply((instance = this), arguments);
    return instance;
  }
  Singleton.prototype = Object.create(_class.prototype);
  Singleton.prototype.constructor = _class;
  Singleton.super = _class;
  return Singleton;
}

export default singleton;