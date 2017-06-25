import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function ChainOfResponsibility(...args) {
    this.chain = [];
    this.run = this.run.bind(this);
    options.constructor.apply(this, args);
  }
  extend(ChainOfResponsibility.prototype, {
    add(fn) {
      if(!this.contains(fn)) {
        this.chain.push(fn);
      }
      return this;
    },

    run(...args) {
      for(var i = 0; i < this.chain.length; i++) {
        let next = false;
        let val = this.chain[i].apply(null, [
          () => { next = true; },
          ...args
        ]);
        if(!next) {
          return val;
        }
      }
    },

    count() {
      return this.chain.length;
    },

    contains(fn) {
      return this.chain.indexOf(fn) > -1;
    }
  });
  return ChainOfResponsibility;
});
