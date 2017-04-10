import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function Flyweight(...args) {
    this.flyweights = {};
    options.constructor.apply(this, args);
  }
  extend(Flyweight.prototype, {
    create(...args) {
      return this.heuristic(...args);
    },
    heuristic(name, obj) {
      return this.flyweights[name] = this.flyweights[name] || obj;
    }
  });
  return Flyweight;
});
