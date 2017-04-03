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
    heuristic() {
      throw new Error('Flyweight is missing heuristic public method.');
    }
  });
  return Flyweight;
});
