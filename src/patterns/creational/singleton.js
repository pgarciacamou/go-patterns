import extend from "../../helpers/extend.js";
import buildPattern from "../../helpers/buildPattern.js";

export default buildPattern(options => {
  var instance;
  
  function Singleton(...args) {
    if(instance !== undefined) { return instance; }
    options.constructor.apply(this, args);
    return (instance = this);
  }

  extend(Singleton.prototype, {
    destroy() {
      instance = undefined;
    }
  })

  return Singleton;
});