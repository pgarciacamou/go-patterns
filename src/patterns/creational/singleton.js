import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  var instance;

  function Singleton(...args) {
    if(instance !== undefined) { return instance; }
    options.constructor.apply(this, args);
    return (instance = this);
  }

  extend(Singleton.prototype, {
    destroy() {
      instance = undefined;
    },
    getInstance() {
      return instance;
    }
  });

  return Singleton;
});
