import extend from '../../helpers/extend.js';
import createPatternBuilder from '../../helpers/createPatternBuilder.js';

export default createPatternBuilder(options => {
  function Command(...args) {
    options.constructor.apply(this, args);
  }
  extend(Command.prototype, {
    execute(method, ...args) {
      if(this[method]) {
        return this[method](...args);
      }
    }
  });
  return Command;
});
