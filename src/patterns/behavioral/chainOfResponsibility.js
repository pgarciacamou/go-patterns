import extend from '../../helpers/extend.js';
import buildPattern from '../../helpers/buildPattern.js';


export default buildPattern(options => {
  function ChainOfResponsibility(...args) {
    this.chain = [];
    this.run = this.run.bind(this);
    options.constructor.apply(this, args);
  }
  extend(ChainOfResponsibility.prototype, {
    add(fn) {
      if(!this.contains(fn)) {
        this.chain.unshift(fn);
      }
      return this;
    },

    run(...args) {
      for (var i = 0; i < this.chain.length; i++) {
        let next = false;
        let val = this.chain[i].apply(null, [_ => {
          next = true;
        }].concat(args));
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