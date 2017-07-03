import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function Flyweight(...args) {
    this.flyweights = {};
    options.constructor.apply(this, args);
  }
  extend(Flyweight.prototype, {
    create(name, creator, ...args) {
      if(this.heuristic(name)) {
        this.flyweights[name] = creator instanceof Function ? creator(...args) : creator;
      }
      return this.flyweights[name];
    },

    heuristic(name) {
      return this.flyweights[name] === undefined;
    }
  });
  return Flyweight;
});
