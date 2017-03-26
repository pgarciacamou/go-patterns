import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';
// a intermediary library 'json' is used to ease testing.
import json from '../../helpers/json.js';

export default createPatternBuilder(options => {
  function Memento(...args) {
    this.mementos = [];
    options.constructor.apply(this, args);
  }
  extend(Memento.prototype, {
    add(memento) {
      this.mementos.push(json.stringify(memento));
      return this.mementos.length - 1;
    },

    get(index) {
      return json.parse(this.mementos[index]);
    }
  });
  return Memento;
});
